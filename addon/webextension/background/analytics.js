/* globals main, auth, catcher, deviceInfo */

window.analytics = (function () {
  let exports = {};

  exports.sendEvent = function (action, label, options) {
    if (typeof label == "object" && (! options)) {
      options = label;
      label = undefined;
    }
    options = options || {};
    let di = deviceInfo();
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
      options.applicationName = di.appName;
      options.applicationVersion = di.version;
      let abTests = auth.getAbTests();
      for (let testName in abTests) {
        options[abTests[testName].gaField] = abTests[testName].value;
      }
      console.info(`sendEvent ${eventCategory}/${action}/${label || 'none'} ${JSON.stringify(options)}`);
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
