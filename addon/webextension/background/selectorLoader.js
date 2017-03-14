/* globals browser, catcher */
window.selectorLoader = (function () {
  const exports = {};
  // These modules are loaded in order, and some need to be listed before others
  // due to dependencies:
  const scripts = [
    "catcher.js",
    "background/selectorLoader.js",
    "selector/callBackground.js",
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

  exports.unloadIfLoaded = function () {
    return browser.tabs.executeScript({
      code: "window.selectorLoader && window.selectorLoader.unloadModules()"
    }).then(result => {
      return result && result.toString() === "true";
    });
  };

  exports.loadModules = function () {
    return scripts.reduce(
      (previous, file) =>
        previous.then(() => browser.tabs.executeScript({file})),
      Promise.resolve(null))
      .catch(err => {
        console.error(`Error loading script: ${err}`);
        catcher.unhandled(err);
        exports.unloadModules();
      });
  };

  exports.unloadModules = function () {
    const watchFunction = catcher.watchFunction;
    const moduleNames = scripts.map((filename) =>
      filename.replace(/^.*\//, "").replace(/\.js$/, ""));
    moduleNames.reverse();
    for (let moduleName of moduleNames) {
      let moduleObj = window[moduleName];
      if (moduleObj && moduleObj.unload) {
        try {
          watchFunction(moduleObj.unload)();
        } catch (e) {
          // ignore (watchFunction handles it)
        }
      }
      delete window[moduleName];
    }
    return true;
  };

  exports.toggle = function () {
    return exports.unloadIfLoaded()
      .then(wasLoaded => {
        if (!wasLoaded) {
          exports.loadModules();
        }
        return !wasLoaded;
      })
  };

  return exports;
})();
null;
