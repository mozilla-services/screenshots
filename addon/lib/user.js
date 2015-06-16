const ss = require("sdk/simple-storage");
const { uuid } = require('sdk/util/uuid');
const { Request } = require("sdk/request");
const { watchFunction, watchPromise } = require("./errors");

exports.initialize = function (backend) {
  if (! (ss.storage.userInfo && ss.storage.userInfo.userId && ss.storage.userInfo.secret)) {
    let info = {
      userId: "anon" + makeUuid() + "",
      secret: makeUuid()+""
    };
    console.info("Generating new device authentication ID", info.userId);
    watchPromise(saveLogin(backend, info).then(function () {
      ss.storage.userInfo = info;
      console.info("Successfully saved ID");
    }));
  } else {
    let info = ss.storage.userInfo;
    let loginUrl = backend + "/api/login";
    Request({
      url: loginUrl,
      contentType: "application/x-www-form-urlencoded",
      content: {userId: info.userId, secret: info.secret},
      onComplete: watchFunction(function (response) {
        if (response.status == 404) {
          // Need to save login anyway...
          console.info("Login failed with 404, trying to register");
          watchPromise(saveLogin(backend, info));
          return;
        } else if (response.status >= 300) {
          throw new Error("Could not log in: " + response.status);
        }
        console.info("logged in with cookie:", !!response.headers["Set-Cookie"]);
        // The only other thing we do is preload the cookies
      })
    }).post();
  }
};

function saveLogin(backend, info) {
  let registerUrl = backend + "/api/register";
  return new Promise(function (resolve, reject) {
    Request({
      url: registerUrl,
      contentType: "application/x-www-form-urlencoded",
      content: info,
      onComplete: function (response) {
        if (response.status == 200) {
          console.info("Registered login with cookie:", !!response.headers["Set-Cookie"]);
          resolve();
        } else {
          reject(new Error("Bad response: " + response.status));
        }
      }
    }).post();
  });
}

function makeUuid() {
  let s = uuid() + "";
  return s.replace(/\{/g, "").replace(/\}/g, "");
}

exports.getUserInfo = function () {
  return ss.storage.userInfo;
};
