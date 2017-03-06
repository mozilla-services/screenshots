/* globals chrome */
/* globals main, makeUuid, deviceInfo, analytics, catcher, defaultSentryDsn */

window.auth = (function () {
  let exports = {};

  let registrationInfo;
  let initialized = false;
  let authHeader = null;
  let sentryPublicDSN = null;

  chrome.storage.local.get(["registrationInfo"], catcher.watchFunction((result) => {
    if (chrome.runtime.lastError) {
      catcher.unhandled(new Error(chrome.runtime.lastError.message));
      if (! result) {
        return;
      }
    }
    if (result.registrationInfo) {
      registrationInfo = result.registrationInfo;
    } else {
      registrationInfo = generateRegistrationInfo();
      chrome.storage.local.set({
        registrationInfo: registrationInfo
      }, () => {
        if (chrome.runtime.lastError) {
          catcher.unhandled(new Error(chrome.runtime.lastError.message));
        } else {
          console.info("Device authentication saved");
        }
      });
      console.info("Generating new device authentication ID", registrationInfo);
    }
  }));

  exports.getDeviceId = function () {
    return registrationInfo && registrationInfo.deviceId;
  };

  function generateRegistrationInfo() {
    let info = {
      deviceId: "anon" + makeUuid() + "",
      secret: makeUuid()+"",
      // FIXME-chrome: need to figure out the reason the extension was created
      // (i.e., startup or install)
      //reason,
      deviceInfo: JSON.stringify(deviceInfo())
    };
    return info;
  }

  function register() {
    return new Promise((resolve, reject) => {
      let registerUrl = main.getBackend() + "/api/register";
      let req = new XMLHttpRequest();
      req.open("POST", registerUrl);
      req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      req.onload = catcher.watchFunction(() => {
        if (req.status == 200) {
          console.info("Registered login");
          initialized = true;
          saveAuthInfo(JSON.parse(req.responseText));
          resolve();
          analytics.sendEvent("registered");
        } else {
          console.warn("Error in response:", req.responseText);
          reject(new Error("Bad response: " + req.status));
        }
      });
      req.send(uriEncode(registrationInfo));
    });
  }

  function login() {
    return new Promise((resolve, reject) => {
      let loginUrl = main.getBackend() + "/api/login";
      let req = new XMLHttpRequest();
      req.open("POST", loginUrl);
      req.onload = catcher.watchFunction(() => {
        if (req.status == 404) {
          // No such user
          resolve(register());
        } else if (req.status >= 300) {
          console.warn("Error in response:", req.responseText);
          reject(new Error("Could not log in: " + req.status));
        } else if (req.status === 0) {
          let error = new Error("Could not log in, server unavailable");
          analytics.sendEvent("login-failed");
          reject(error);
        } else {
          initialized = true;
          console.info("Page Shot logged in");
          analytics.sendEvent("login");
          saveAuthInfo(JSON.parse(req.responseText));
          resolve();
        }
      });
      req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      req.send(uriEncode({
        deviceId: registrationInfo.deviceId,
        secret: registrationInfo.secret,
        // FIXME: give proper reason
        reason: "install",
        deviceInfo: JSON.stringify(deviceInfo())
      }));
    });
  }

  function saveAuthInfo(responseJson) {
    if (responseJson.sentryPublicDSN) {
      sentryPublicDSN = responseJson.sentryPublicDSN;
    }
    if (responseJson.authHeader) {
      authHeader = responseJson.authHeader;
    }
  }

  function uriEncode(obj) {
    let s = [];
    for (let key in obj) {
      s.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
    return s.join("&");
  }

  exports.getDeviceId = function () {
    return registrationInfo.deviceId;
  };

  exports.authHeaders = function () {
    let initPromise = Promise.resolve();
    if (! initialized) {
      initPromise = login();
    }
    return initPromise.then(() => {
      if (authHeader) {
        return {"x-pageshot-auth": authHeader};
      } else {
        console.warn("No auth header available");
        return {};
      }
    });
  };

  exports.getSentryPublicDSN = function () {
    return sentryPublicDSN || defaultSentryDsn;
  };

  return exports;
})();
