/* globals chrome, catcher */

window.loadSelector = (function () {
  const scripts = [
    "selector/callBackground.js",
    "catcher.js",
    "clipboard.js",
    "makeUuid.js",
    "build/shot.js",
    "randomString.js",
    "domainFromUrl.js",
    "build/inlineSelectionCss.js",
    "selector/documentMetadata.js",
    "selector/util.js",
    "selector/ui.js",
    "selector/shooter.js",
    "selector/uicontrol.js"
  ];

  return function loadSelector() {
    let lastPromise = Promise.resolve(null);
    scripts.forEach((script) => {
      lastPromise = lastPromise.then(() => {
        return chrome.tabs.executeScript({
          file: script
        }, () => {
          if (chrome.runtime.lastError
              && chrome.runtime.lastError.message != "Script returned non-structured-clonable data") {
              catcher.unhandled(chrome.runtime.lastError, {script: script});
              console.error("Error loading script", script, ":", chrome.runtime.lastError);
          }
        });
      });
    });
    return lastPromise.then(() => {
      console.log("finished loading scripts:", scripts.join(" "), "->", chrome.runtime.lastError || "no error");
    });
  };

})();
