/* globals main, auth, catcher */

window.analytics = (function () {
  let exports = {};

  exports.sendEvent = function (action, label, options) {
    if (typeof label == "object" && (! options)) {
      options = label;
      label = undefined;
    }
    return new Promise((resolve, reject) => {
      let eventCategory = "addon";
      let url = main.getBackend() + "/event";
      let req = new XMLHttpRequest();
      req.open("POST", url);
      req.setRequestHeader("content-type", "application/json");
      req.onload = catcher.watchFunction(() => {
        if (req.status >= 300) {
          let exc = new Error("Bad response from POST /event");
          exc.status = req.status;
          exc.statusText = req.statusText;
          reject(exc);
        } else {
          resolve();
        }
      });
      // FIXME: add cdX and other details from req.js; see #2257
      req.send(JSON.stringify({
        deviceId: auth.getDeviceId(),
        event: eventCategory,
        action,
        label,
        options
      }));
    });
  };

  return exports;
})();
