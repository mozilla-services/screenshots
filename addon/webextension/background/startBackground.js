/* globals browser, main, communication */
/* This file handles:
     browser.browserAction.onClicked
     browser.contextMenus.onClicked
     browser.runtime.onMessage
   and loads the rest of the background page in response to those events, forwarding
   the events to main.onClicked, main.onClickedContextMenu, or communication.onMessage
*/

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
      console.error("Error loading Screenshots:", error);
    });
  });


  browser.contextMenus.create({
    id: "create-screenshot",
    title: browser.i18n.getMessage("contextMenuLabel"),
    contexts: ["page"],
    documentUrlPatterns: ["<all_urls>"]
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    loadIfNecessary().then(() => {
      main.onClickedContextMenu(info, tab);
    }).catch((error) => {
      console.error("Error loading Screenshots:", error);
    });
  });

  // Note this duplicates functionality in main.js, but we need to change
  // the onboarding icon before main.js loads up
  browser.storage.local.get(["hasSeenOnboarding"]).then((result) => {
    let hasSeenOnboarding = !!result.hasSeenOnboarding;
    if (!hasSeenOnboarding) {
      let path = "icons/icon-starred-32.svg";
      browser.browserAction.setIcon({path});
    }
  }).catch((error) => {
    console.error("Error loading Screenshots onboarding flag:", error);
  });

  browser.runtime.onMessage.addListener((req, sender, sendResponse) => {
    loadIfNecessary().then(() => {
      return communication.onMessage(req, sender, sendResponse);
    }).catch((error) => {
      console.error("Error loading Screenshots:", error);
    });
    return true;
  });

  let loadedPromise;

  function loadIfNecessary() {
    if (loadedPromise) {
      return loadedPromise;
    }
    loadedPromise = Promise.resolve();
    backgroundScripts.forEach((script) => {
      loadedPromise = loadedPromise.then(() => {
        return new Promise((resolve, reject) => {
          let tag = document.createElement("script");
          tag.src = browser.extension.getURL(script);
          tag.onload = () => {
            resolve();
          };
          tag.onerror = (error) => {
            let exc = new Error(`Error loading script: ${error.message}`);
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
