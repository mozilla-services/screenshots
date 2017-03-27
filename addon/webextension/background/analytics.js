/* globals main, auth, catcher, deviceInfo, communication */

window.analytics = (function () {
  let exports = {};

  let telemetryPrefKnown = false;
  let telemetryPref;

  exports.sendEvent = function (action, label, options) {
    let eventCategory = "addon";
    if (! telemetryPrefKnown) {
      console.warn("sendEvent called before we were able to refresh");
      return Promise.resolve();
    }
    if (! telemetryPref) {
      console.info(`Cancelled sendEvent ${eventCategory}/${action}/${label || 'none'} ${JSON.stringify(options)}`);
      return Promise.resolve();
    }
    if (typeof label == "object" && (! options)) {
      options = label;
      label = undefined;
    }
    options = options || {};
    let di = deviceInfo();
    return new Promise((resolve, reject) => {
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

  exports.refreshTelemetryPref = function () {
    return communication.sendToBootstrap("getTelemetryPref").then((result) => {
      telemetryPrefKnown = true;
      if (result === communication.NO_BOOTSTRAP) {
        telemetryPref = true;
      } else {
        telemetryPref = result;
      }
    }, (error) => {
      // If there's an error reading the pref, we should assume that we shouldn't send data
      telemetryPrefKnown = true;
      telemetryPref = false;
      throw error;
    });
  };

  exports.getTelemetryPrefSync = function() {
    catcher.watchPromise(exports.refreshTelemetryPref());
    return !!telemetryPref;
  };

  return exports;
})();
