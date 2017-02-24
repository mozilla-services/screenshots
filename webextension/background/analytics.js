/* globals main, auth */

window.analytics = (function () {
  let exports = {};

  exports.sendEvent = function (action, label) {
    let eventCategory = "addon";
    let url = main.getBackend() + "/event";
    let req = new XMLHttpRequest();
    req.open("POST", url);
    req.setRequestHeader("content-type", "application/json");
    req.onload = () => {
      if (req.status >= 300) {
        console.warn("Event gave non-2xx response:", req.status);
      }
    };
    // FIXME: add cdX and other details from req.js
    req.send(JSON.stringify({
      deviceId: auth.getDeviceId(),
      event: eventCategory,
      action,
      label
    }));
  };

  return exports;
})();
