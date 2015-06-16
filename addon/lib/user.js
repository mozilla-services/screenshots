const { Cu } = require('chrome');
const ss = require("sdk/simple-storage");
const { uuid } = require('sdk/util/uuid');
const { Request } = require("sdk/request");
const { watchFunction, watchPromise } = require("./errors");
const { URL } = require('sdk/url');
const { FxAccountsOAuthClient } = Cu.import("resource://gre/modules/FxAccountsOAuthClient.jsm", {});
const { FxAccountsProfileClient } = Cu.import("resource://gre/modules/FxAccountsProfileClient.jsm", {});

exports.initialize = function (backend) {
  if (! (ss.storage.deviceInfo && ss.storage.deviceInfo.deviceId && ss.storage.deviceInfo.secret)) {
    let info = {
      deviceId: "anon" + makeUuid() + "",
      secret: makeUuid()+""
    };
    console.info("Generating new device authentication ID", info.deviceId);
    watchPromise(saveLogin(backend, info).then(function () {
      ss.storage.deviceInfo = info;
      console.info("Successfully saved ID");
    }));
  } else {
    let info = ss.storage.deviceInfo;
    let loginUrl = backend + "/api/login";
    Request({
      url: loginUrl,
      contentType: "application/x-www-form-urlencoded",
      content: {deviceId: info.deviceId, secret: info.secret},
      onComplete: watchFunction(function (response) {
        if (response.status == 404) {
          // Need to save login anyway...
          console.log("Login failed with 404, trying to register");
          watchPromise(saveLogin(backend, info));
          return;
        } else if (response.status >= 300) {
          throw new Error("Could not log in: " + response.status);
        }
        console.log("logged in with cookie:", !!response.headers["Set-Cookie"]);
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
          console.log("Registered login with cookie:", !!response.headers["Set-Cookie"]);
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

exports.getDeviceInfo = function () {
  return ss.storage.deviceInfo;
};

// Serializes profile updates to ensure that concurrent writes don't clobber
// one another (e.g., if a user updates her avatar, then immediately changes
// her nickname).
let pendingProfileUpdates = Promise.resolve();
function enqueueProfileUpdate(func) {
  let result = pendingProfileUpdates.then(func);
  // Swallow rejections to avoid deadlocking queued updates. Since we return
  // the promise, callers can still handle rejections.
  pendingProfileUpdates = result.catch(() => {});
  return result;
}

exports.setDefaultProfileInfo = function (attrs) {
  return enqueueProfileUpdate(() => {
    if (! attrs) {
      throw new Error("Missing default profile information");
    }
    let info = ss.storage.profileInfo || {};
    for (let attr of Object.keys(attrs)) {
      // Only update the attribute if the user hasn't already set a value.
      if (! info[attr]) {
        info[attr] = attrs[attr];
      }
    }
    ss.storage.profileInfo = info;
    return info;
  });
};

function updateLocalProfileInfo(attrs) {
  let info = Object.assign(ss.storage.profileInfo || {}, attrs);
  ss.storage.profileInfo = info;
  return info;
}

exports.getProfileInfo = function () {
  return enqueueProfileUpdate(() => {
    return ss.storage.profileInfo;
  });
};

exports.updateProfile = function (backend, info) {
  return enqueueProfileUpdate(() => {
    if (! info) {
      throw new Error("Missing updated profile information");
    }
    let updateUrl = backend + "/api/update";
    return new Promise((resolve, reject) => {
      Request({
        url: updateUrl,
        contentType: "application/json",
        content: JSON.stringify(info),
        onComplete: function (response) {
          if (response.status >= 200 && response.status < 300) {
            // Update stored profile info.
            let newInfo = updateLocalProfileInfo(info);
            resolve(newInfo);
          } else {
            reject(response.json);
          }
        }
      }).post();
    });
  });
};

exports.OAuthHandler = class OAuthHandler {
  constructor(backend) {
    this.backend = backend;
    this.withParams = null;
    this.withProfile = new Promise((resolve, reject) => {
      this.profileDeferred = { resolve, reject };
    });
  }

  getProfileInfo() {
    return this.withProfile.then(client => {
      return client.fetchProfile();
    });
  }

  getOAuthParams() {
    if (this.withParams) {
      return this.withParams;
    }
    this.withParams = new Promise((resolve, reject) => {
      let url = new URL("/api/fxa-oauth/params", this.backend);
      Request({
        url,
        onComplete: response => {
          let { json } = response;
          if (response.status >= 200 && response.status < 300) {
            resolve(json);
            return;
          }
          let err = new Error("Error fetching OAuth params");
          err.status = response.status;
          err.json = json;
          reject(err);
        }
      }).get();
    });
    return this.withParams;
  }

  tradeCode(tokenData) {
    return new Promise((resolve, reject) => {
      let url = new URL("/api/fxa-oauth/token", this.backend);
      Request({
        url,
        content: tokenData,
        onComplete: response => {
          let { json } = response;
          if (response.status >= 200 && response.status < 300) {
            resolve(json);
            return;
          }
          let err = new Error("Error trading OAuth code");
          err.status = response.status;
          err.json = json;
          reject(err);
        }
      }).post();
    });
  }

  logInWithParams(parameters) {
    return new Promise((resolve, reject) => {
      let client = new FxAccountsOAuthClient({ parameters });
      client.onComplete = resolve;
      client.onError = reject;
      client.launchWebFlow();
    }).then(tokenData => {
      return this.tradeCode(tokenData);
    }).then(response => {
      this.profileDeferred.resolve(new FxAccountsProfileClient({
        serverURL: parameters.profile_uri,
        token: response.access_token
      }));
      return response;
    });
  }
};
