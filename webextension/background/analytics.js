/* globals main, auth, browser, catcher, communication, log */

"use strict";

this.analytics = (function() {
  const exports = {};

  const GA_PORTION = 0.1; // 10% of users will send to the server/GA
  // This is set from storage, or randomly; if it is less that GA_PORTION then we send analytics:
  let myGaSegment = 1;
  let telemetryPrefKnown = false;
  let telemetryEnabled;
  // If we ever get a 410 Gone response (or 404) from the server, we'll stop trying to send events for the rest
  // of the session
  let hasReturnedGone = false;
  // If there's this many entirely failed responses (e.g., server can't be contacted), then stop sending events
  // for the rest of the session:
  let serverFailedResponses = 3;

  const EVENT_BATCH_DURATION = 1000; // ms for setTimeout
  let pendingEvents = [];
  let pendingTimings = [];
  let eventsTimeoutHandle, timingsTimeoutHandle;
  const fetchOptions = {
    method: "POST",
    mode: "cors",
    headers: { "content-type": "application/json" },
    credentials: "include",
  };

  function shouldSendEvents() {
    return !hasReturnedGone && serverFailedResponses > 0 && myGaSegment < GA_PORTION;
  }

  function flushEvents() {
    if (pendingEvents.length === 0) {
      return;
    }

    const eventsUrl = `${main.getBackend()}/event`;
    const deviceId = auth.getDeviceId();
    const sendTime = Date.now();

    pendingEvents.forEach(event => {
      event.queueTime = sendTime - event.eventTime;
      log.info(`sendEvent ${event.event}/${event.action}/${event.label || "none"} ${JSON.stringify(event.options)}`);
    });

    const body = JSON.stringify({deviceId, events: pendingEvents});
    const fetchRequest = fetch(eventsUrl, Object.assign({body}, fetchOptions));
    fetchWatcher(fetchRequest);
    pendingEvents = [];
  }

  function flushTimings() {
    if (pendingTimings.length === 0) {
      return;
    }

    const timingsUrl = `${main.getBackend()}/timing`;
    const deviceId = auth.getDeviceId();
    const body = JSON.stringify({deviceId, timings: pendingTimings});
    const fetchRequest = fetch(timingsUrl, Object.assign({body}, fetchOptions));
    fetchWatcher(fetchRequest);
    pendingTimings.forEach(t => {
      log.info(`sendTiming ${t.timingCategory}/${t.timingLabel}/${t.timingVar}: ${t.timingValue}`);
    });
    pendingTimings = [];
  }

  function sendTiming(timingLabel, timingVar, timingValue) {
    // sendTiming is only called in response to sendEvent, so no need to check
    // the telemetry pref again here.
    if (!shouldSendEvents()) {
      return;
    }
    const timingCategory = "addon";
    pendingTimings.push({
      timingCategory,
      timingLabel,
      timingVar,
      timingValue,
    });
    if (!timingsTimeoutHandle) {
      timingsTimeoutHandle = setTimeout(() => {
        timingsTimeoutHandle = null;
        flushTimings();
      }, EVENT_BATCH_DURATION);
    }
  }

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
      telemetryPrefKnown = true;
      telemetryEnabled = result;
    }, (error) => {
      // If there's an error reading the pref, we should assume that we shouldn't send data
      telemetryPrefKnown = true;
      telemetryEnabled = false;
      throw error;
    });
  };

  exports.isTelemetryEnabled = function() {
    catcher.watchPromise(exports.refreshTelemetryPref());
    return telemetryEnabled;
  };

  return exports;
})();
