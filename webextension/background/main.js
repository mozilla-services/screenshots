/* globals chrome, console, XMLHttpRequest, Image, document, setTimeout, navigator */
/* globals loadSelector, analytics, communication */
window.main = (function () {
  let exports = {};

  const { sendEvent } = analytics;

  let manifest = chrome.runtime.getManifest();
  let backend;

  exports.setBackend = function (newBackend) {
    backend = newBackend;
    backend = backend.replace(/\/*$/, "");
  };

  exports.getBackend = function () {
    return backend;
  };

  for (let permission of manifest.permissions) {
    if (permission.search(/^https?:\/\//i) != -1) {
      exports.setBackend(permission);
      break;
    }
  }

  chrome.runtime.onInstalled.addListener(function () {
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    sendEvent("addon", "click-shot-button");
    loadSelector().catch((e) => {
      console.error("Error loading scripts:", e);
    });
  });

  communication.register("sendEvent", (...args) => {
    sendEvent(...args);
    // We don't wait for it to complete:
    return null;
  });

  communication.register("reportError", (error) => {
    console.error("FIXME: should send to Sentry:", error);
  });

  return exports;
})();
