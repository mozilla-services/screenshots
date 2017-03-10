/* globals loadSelector, catcher */

window.lifecycle = (function () {
  let exports = {};
  if (window.lifecycle) {
    window.lifecycle.unloadModules();
  }

  exports.unloadModules = function () {
    let watchFunction = catcher.watchFunction;
    let moduleNames = loadSelector.moduleNames;
    // Make sure we unload catcher last, and don't call lifecycle.unload():
    moduleNames = moduleNames.filter((n) => {
      return n != "catcher" && n != "lifecycle";
    });
    moduleNames.reverse();
    moduleNames.push("catcher");
    for (let moduleName of moduleNames) {
      let moduleObj = window[moduleName];
      if (moduleObj && moduleObj.unload) {
        try {
          watchFunction(moduleObj.unload)();
        } catch (e) {
          // ignore (watchFunction handles it)
        }
      }
    }
    for (let moduleName of moduleNames) {
      if (moduleName in window) {
        delete window[moduleName];
      }
    }
    if (window.lifecycle === exports) {
      delete window.lifecycle;
    }
  };

  return exports;
})();
null;
