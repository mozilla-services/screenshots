/* globals chrome */

window.loadSelector = (function () {
  const scripts = [
    "selector/callBackground.js",
    "catcher.js",
    "makeUuid.js",
    "build/shot.js",
    "randomString.js",
    "domainFromUrl.js",
    "selector/documentMetadata.js",
    "selector/util.js",
    "selector/ui.js",
    "selector/snapping.js",
    "selector/shooter-interactive-worker.js",
    "selector/shooter.js"
  ];

  return function loadSelector() {
    let lastPromise = Promise.resolve(null);
    scripts.forEach((script) => {
      lastPromise = lastPromise.then(() => {
        return chrome.tabs.executeScript({
          file: script
        });
      });
    });
    return lastPromise.then(() => {
      console.log("finished loading scripts:", scripts.join(" "), "->", chrome.runtime.lastError || "no error");
    });
  };

})();
