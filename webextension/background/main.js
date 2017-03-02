/* globals chrome, console, XMLHttpRequest, Image, document, setTimeout, navigator */
/* globals loadSelector, analytics, communication, catcher */
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
    sendEvent("start-shot", "toolbar-pageshot-button");
    loadSelector().catch((e) => {
      console.error("Error loading scripts:", e);
    });
  });

  communication.register("sendEvent", (...args) => {
    catcher.watchPromise(sendEvent(...args));
    // We don't wait for it to complete:
    return null;
  });

  return exports;
})();
