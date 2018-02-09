/* globals Raven */
/** This allows for early communication with the add-on to ask for authentication information
    Including this script on a page indicates that the page would like to be authenticated
    (and that it isn't currently authenticated)

    A controller might use this like:

    if (window.wantsauth) {
      if (window.wantsauth.getAuthData()) {
        add window.wantsauth.getAuthData() to model
      } else {
        window.wantsauth.addAuthDataListener((data) => {
          add data to model
        });
      }
    }
*/
window.wantsauth = (function() {
  let exports = {};

  let savedAuthData = null;
  let authDataCallbacks = [];

  // Note that this module is only loosely bound to any controller, but there
  // is special logic for view pages where ownership is interesting in addition to
  // authentication.  As a result we have to parse the URL on our own:
  let maybeShotId = location.href.replace(/^https?:\/\/[^/]{1,4000}\//i, "");
  maybeShotId = maybeShotId.replace(/\?.*/, "").replace(/#.{0,4000}/, "");
  if (maybeShotId.search(/[a-z0-9]+\/[a-z0-9._-]{1,4000}$/i) === -1) {
    // Not a shot ID, which should look like {stuff}/{stuff}
    maybeShotId = null;
  }

  // These events are used to communicate with sitehelper.js:
  document.addEventListener("login-successful", (event) => {
    let {deviceId, isOwner, backupCookieRequest} = JSON.parse(event.detail);
    savedAuthData = {
      deviceId,
      isOwner,
      loginFailed: false
    };
    let promise = Promise.resolve(true);
    if (!backupCookieRequest) {
      // The client may not support login with third party cookies turned off.
      // We will do a request to confirm authentication really worked.
      promise = checkLogin();
    }
    promise.then((loginWorked) => {
      if (!loginWorked) {
        savedAuthData.loginFailed = true;
      }
    }, (e) => { // Exception branch
      console.warn("Error checking login:", e);
      savedAuthData.loginFailed = true;
      if (typeof Raven !== "undefined") {
        Raven.captureException(e);
      }
    }).then(() => {
      for (let callback of authDataCallbacks) {
        callback(savedAuthData);
      }
    }).catch((e) => {
      if (typeof Raven !== "undefined") {
        Raven.captureException(e);
      }
    });
  });

  function checkLogin() {
    return fetch('/api/check-login-cookie', {credentials: "include"}).then((resp) => {
      // The server only returns 200 if the user is logged in
      return resp.ok;
    });
  }

  document.addEventListener("addon-present", () => {
    document.dispatchEvent(new CustomEvent("request-login", {detail: maybeShotId}));
  });

  document.dispatchEvent(new CustomEvent("request-addon-present"));

  exports.getAuthData = function() {
    return savedAuthData;
  };

  exports.addAuthDataListener = function(func) {
    authDataCallbacks.push(func);
  };

  return exports;
})();
