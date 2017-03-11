/* globals browser, catcher */

window.loadSelector = (function () {
  // These modules are loaded in order, and some need to be listed before others
  // due to dependencies:
  const scripts = [
    "background/loadSelector.js",
    "selector/lifecycle.js",
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

  function loadSelector() {
    let lastPromise = Promise.resolve(null);
    scripts.forEach((script) => {
      lastPromise = lastPromise.then(() => {
        return browser.tabs.executeScript({
          file: script
        }, () => {
          if (browser.runtime.lastError
              && browser.runtime.lastError.message != "Script returned non-structured-clonable data") {
              catcher.unhandled(browser.runtime.lastError, {script: script});
              console.error("Error loading script", script, ":", browser.runtime.lastError);
          }
        });
      });
    });
    return lastPromise.then(() => {
      console.log("finished loading scripts:", scripts.join(" "), "->", browser.runtime.lastError || "no error");
    });
  }

  loadSelector.moduleNames = scripts.map((filename) => {
    return filename.replace(/^.*\//, "").replace(/\.js$/, "");
  });

  return loadSelector;

})();
