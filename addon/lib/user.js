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
    watchPromise(saveLogin(backend, info).then(function () {
      ss.storage.userInfo = info;
    }));
  } else {
    let info = ss.storage.userInfo;
    let loginUrl = backend + "/api/login";
    Request({
      url: loginUrl,
      content: {userId: info.userId, secret: info.secret},
      onComplete: watchFunction(function (response) {
        if (response.status == 404) {
          // Need to save login anyway...
          watchPromise(saveLogin(backend, info));
        } else if (response.status >= 300) {
          throw new Error("Could not log in: " + response.status);
        }
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
      content: info,
      onComplete: function (response) {
        if (response.status == 200) {
          resolve();
        } else {
          reject(response);
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
