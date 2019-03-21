/* globals main, auth, browser, catcher, communication, log */

"use strict";

this.analytics = (function() {
  const exports = {};
  let telemetryEnabled;

  exports.sendEvent = function(action, label, options) {
    return Promise.resolve();
  };

  exports.incrementCount = function(scalar) {
    const allowedScalars = ["download", "upload", "copy"];
    if (!allowedScalars.includes(scalar)) {
      const err = `incrementCount passed an unrecognized scalar ${scalar}`;
      log.warn(err);
      return Promise.resolve();
    }
    return browser.telemetry.scalarAdd(`screenshots.${scalar}`, 1).catch(err => {
      log.warn(`incrementCount failed with error: ${err}`);
    });
  };

  exports.refreshTelemetryPref = function() {
    return browser.telemetry.canUpload().then((result) => {
      telemetryEnabled = result;
    }, (error) => {
      // If there's an error reading the pref, we should assume that we shouldn't send data
      telemetryEnabled = false;
      throw error;
    });
  };


  exports.isTelemetryEnabled = function() {
    catcher.watchPromise(exports.refreshTelemetryPref());
    return telemetryEnabled;
  };

  exports.refreshTelemetryPref().catch((e) => {
    console.error("Error getting Telemetry pref:", e);
  });

  return exports;
})();
