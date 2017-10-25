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
  if (maybeShotId.search(/[a-z0-9]+\/[a-z0-9.-_]{1,4000}$/i) === -1) {
    // Not a shot ID, which should look like {stuff}/{stuff}
    maybeShotId = null;
  }

  // These events are used to communicate with sitehelper.js:
  document.addEventListener("login-successful", (event) => {
    let {deviceId, isOwner} = JSON.parse(event.detail);
    savedAuthData = {
      deviceId,
      isOwner
    };
    for (let callback of authDataCallbacks) {
      callback(savedAuthData);
    }
  });

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
