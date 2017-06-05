/* globals browser, main */
/* This file handles browser.browser.onClicked, and loads the rest of the background
   page in response to that event. */

this.startBackground = (function() {
  const backgroundScripts = [
    "log.js",
    "makeUuid.js",
    "catcher.js",
    "background/selectorLoader.js",
    "background/communication.js",
    "background/auth.js",
    "background/senderror.js",
    "build/raven.js",
    "build/shot.js",
    "background/analytics.js",
    "background/deviceInfo.js",
    "background/takeshot.js",
    "background/main.js"
  ];

  browser.browserAction.onClicked.addListener((tab) => {
    loadIfNecessary().then(() => {
      main.onClicked(tab);
    }).catch((error) => {
      console.error("Error loading:", error);
    });
  });

  let loadedPromise;

  function loadIfNecessary() {
    if (loadedPromise) {
      return loadedPromise;
    }
    loadedPromise = Promise.resolve()
    backgroundScripts.forEach((script) => {
      loadedPromise = loadedPromise.then(() => {
        return new Promise((resolve, reject) => {
          let tag = document.createElement("script");
          tag.src = browser.extension.getURL(script);
          tag.onload = () => {
            resolve();
          };
          tag.onerror = (error) => {
            let exc = new Error("Error loading script");
            exc.scriptName = script;
            reject(exc);
          };
          document.head.appendChild(tag);
        });
      });
    });
    return loadedPromise;
  }

})();
