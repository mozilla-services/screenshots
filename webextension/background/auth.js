/* globals chrome */
/* globals main, makeUuid, deviceInfo, analytics, communication */

window.auth = (function () {
  let exports = {};

  let registrationInfo;
  let initialized = false;

  chrome.storage.local.get(["backend", "registrationInfo"], (result) => {
    if (result.backend) {
      main.setBackend(result.backend);
    }
    if (result.registrationInfo) {
      registrationInfo = result.registrationInfo;
      login();
    } else {
      registrationInfo = generateRegistrationInfo();
      chrome.storage.local.set({
        registrationInfo: registrationInfo
      }, () => {
        console.info("Device authentication saved");
      });
      console.info("Generating new device authentication ID", registrationInfo);
      register();
    }
  });

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
      req.onload = () => {
        if (req.status == 200) {
          console.info("Registered login");
          initialized = true;
          resolve();
          analytics.sendEvent("registered");
        } else {
          console.warn("Error in response:", req.responseText);
          reject(new Error("Bad response: " + req.status));
        }
      };
      req.send(uriEncode(registrationInfo));
    });
  }

  function login() {
    return new Promise((resolve, reject) => {
      let loginUrl = main.getBackend() + "/api/login";
      let req = new XMLHttpRequest();
      req.open("POST", loginUrl);
      req.onload = () => {
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
          resolve();
        }
      };
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

  function uriEncode(obj) {
    let s = [];
    for (let key in obj) {
      s.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
    }
    return s.join("&");
  }

  communication.register("requestConfiguration", () => {
    return {
      backend: main.getBackend(),
      deviceId: registrationInfo.deviceId,
      deviceInfo: registrationInfo.deviceInfo,
      secret: registrationInfo.secret
    };
  });

  return exports;
})();
