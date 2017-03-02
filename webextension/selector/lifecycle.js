/* globals loadSelector, catcher */

window.lifecycle = (function () {
  let exports = {};
  if (window.lifecycle) {
    window.lifecycle.unload();
  }
  document.dispatchEvent(new Event("pageshot-unload"));

  exports.unload = function () {
    let watchFunction = catcher.watchFunction;
    let moduleNames = loadSelector.moduleNames;
    // Make sure we unload catcher last, and don't call lifecycle.unload():
    moduleNames = moduleNames.filter((n) => {
      return n != "catcher" && n != "lifecycle";
    });
    moduleNames.reverse();
    moduleNames.push("catcher");
    for (let moduleName of moduleNames) {
      if (moduleName == "catcher" || moduleName == "lifecycle") {
        continue;
      }
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
    document.removeEventListener("pageshot-unload", listenForUnload);
  };

  function listenForUnload() {
    exports.unload();
  }

  document.addEventListener("pageshot-unload", listenForUnload);

  return exports;
})();
null;
