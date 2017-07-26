/* globals catcher, log */

"use strict";

var global = this;

this.selectorLoader = (function() {
  const exports = {};

  // These modules are loaded in order, first standardScripts, then optionally onboardingScripts, and then selectorScripts
  // The order is important due to dependencies
  const standardScripts = [
    "build/buildSettings.js",
    "log.js",
    "catcher.js",
    "assertIsTrusted.js",
    "assertIsBlankDocument.js",
    "background/selectorLoader.js",
    "selector/callBackground.js",
    "selector/util.js"
  ];

  const selectorScripts = [
    "clipboard.js",
    "makeUuid.js",
    "build/shot.js",
    "randomString.js",
    "domainFromUrl.js",
    "build/inlineSelectionCss.js",
    "selector/documentMetadata.js",
    "selector/ui.js",
    "selector/shooter.js",
    "selector/uicontrol.js"
  ];

  // These are loaded on request (by the selector worker) to activate the onboarding:
  const onboardingScripts = [
    "build/onboardingCss.js",
    "build/onboardingHtml.js",
    "onboarding/slides.js"
  ];

  exports.unloadIfLoaded = function(tabId) {
    return browser.tabs.executeScript(tabId, {
      code: "this.selectorLoader && this.selectorLoader.unloadModules()",
      runAt: "document_start"
    }).then(result => {
      return result && result[0];
    });
  };

  exports.testIfLoaded = function(tabId) {
    if (loadingTabs.has(tabId)) {
      return true;
    }
    return browser.tabs.executeScript(tabId, {
      code: "!!this.selectorLoader",
      runAt: "document_start"
    }).then(result => {
      return result && result[0];
    });
  };

  let loadingTabs = new Set();

  exports.loadModules = function(tabId, hasSeenOnboarding) {
    // Sometimes loadModules is called when the tab is already loading.
    // Adding a check here seems to help avoid catastrophe.
    if (loadingTabs.has(tabId)) {
      return Promise.resolve(null);
    }
    let promise;
    loadingTabs.add(tabId);
    if (hasSeenOnboarding) {
      promise = executeModules(tabId, standardScripts.concat(selectorScripts));
    } else {
      promise = executeModules(tabId, standardScripts.concat(onboardingScripts).concat(selectorScripts));
    }
    return promise.then((result) => {
      loadingTabs.delete(tabId);
      return result;
    }, (error) => {
      loadingTabs.delete(tabId);
      throw error;
    });
  };

  function readFile(path) {
    return fetch(path, { mode: 'same-origin' }).then((response) => {
      return response.blob();
    }).then(blob => {
      let reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.readAsText(blob);
        reader.onload = (evt) => {
          let contents = evt.target.result;
          resolve(contents);
        };
        reader.onerror = (evt) => {
          reject(evt.target.error);
        };
      });
    });
  }

  function executeModules(tabId, scripts) {
    let filePromises = [];
    scripts.forEach((file) => {
      let fileURL = browser.extension.getURL(file);
      let fileContents = readFile(fileURL);
      filePromises.push(fileContents);
    });
    return Promise.all(filePromises).then(fileContents => {
      let allScripts = fileContents.reduce((concatted, script) => { return concatted + ' ; ' + script });
      return Promise.resolve(allScripts);
    }).then(scripts => {
      return browser.tabs.executeScript(tabId, {
        code: scripts,
        runAt: "document_start"
      }).catch((error) => {
        log.error("error in script:", error);
        throw error;
      });
    }).then(() => {
      log.debug("finished loading scripts:", scripts.join(" "));
    },
    (error) => {
      exports.unloadIfLoaded(tabId);
      catcher.unhandled(error);
      throw error;
    });
  }

  exports.unloadModules = function() {
    const watchFunction = catcher.watchFunction;
    let allScripts = standardScripts.concat(onboardingScripts).concat(selectorScripts);
    const moduleNames = allScripts.map((filename) =>
      filename.replace(/^.*\//, "").replace(/\.js$/, ""));
    moduleNames.reverse();
    for (let moduleName of moduleNames) {
      let moduleObj = global[moduleName];
      if (moduleObj && moduleObj.unload) {
        try {
          watchFunction(moduleObj.unload)();
        } catch (e) {
          // ignore (watchFunction handles it)
        }
      }
      delete global[moduleName];
    }
    return true;
  };

  exports.toggle = function(tabId, hasSeenOnboarding) {
    return exports.unloadIfLoaded(tabId)
      .then(wasLoaded => {
        if (!wasLoaded) {
          exports.loadModules(tabId, hasSeenOnboarding);
        }
        return !wasLoaded;
      })
  };

  return exports;
})();
null;
