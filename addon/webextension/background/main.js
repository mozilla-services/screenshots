/* globals browser, console, XMLHttpRequest, Image, document, setTimeout, navigator */
/* globals selectorLoader, analytics, communication, catcher, makeUuid, auth */

window.main = (function () {
  let exports = {};

  const pasteSymbol = (window.navigator.platform.match(/Mac/i)) ? "\u2318" : "Ctrl";
  const { sendEvent } = analytics;

  let manifest = browser.runtime.getManifest();
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

  function setIconActive(active, tabId) {
    const path = active ? "icons/pageshot-icon-green-38.png" : "icons/pageshot-icon-38.png";
    browser.browserAction.setIcon({path, tabId});
  }

  function toggleTab(tab) {
    return catcher.watchPromise(
      selectorLoader.toggle()
        .then(active => setIconActive(active, tab.id)));
  }

  browser.browserAction.onClicked.addListener(catcher.watchFunction((tab) => {
    if (tab.url.match(/about:(newtab|blank)/i)) {
      catcher.watchPromise(analytics.refreshTelemetryPref().then(() => {
        sendEvent("goto-myshots", "about-newtab");
      }));
      catcher.watchPromise(browser.tabs.update({url: backend + "/shots"}));
    } else {
      catcher.watchPromise(analytics.refreshTelemetryPref().then(() => {
        sendEvent("start-shot", "toolbar-pageshot-button");
      }));
      toggleTab(tab);
    }
  }));

  browser.contextMenus.create({
    id: "create-pageshot",
    title: browser.i18n.getMessage("contextMenuLabel"),
    contexts: ["page"]
  }, () => {
    // Note: unlike most browser.* functions this one does not return a promise
    if (browser.runtime.lastError) {
      catcher.unhandled(new Error(browser.runtime.lastError.message));
    }
  });

  browser.contextMenus.onClicked.addListener(catcher.watchFunction((info, tab) => {
    if (! tab) {
      // Not in a page/tab context, ignore
      return;
    }
    sendEvent("start-shot", "context-menu");
    toggleTab(tab);
  }));


  communication.register("sendEvent", (...args) => {
    catcher.watchPromise(sendEvent(...args));
    // We don't wait for it to complete:
    return null;
  });

  communication.register("openMyShots", () => {
    return browser.tabs.create({url: backend + "/shots"});
  });

  communication.register("openShot", ({url, copied}) => {
    if (copied) {
      const id = makeUuid();
      return browser.notifications.create(id, {
        type: "basic",
        iconUrl: "../icons/clipboard-32.png",
        title: browser.i18n.getMessage("notificationLinkCopiedTitle"),
        message: browser.i18n.getMessage("notificationLinkCopiedDetails", pasteSymbol)
      });
    }
  });

  communication.register("closeSelector", sender => {
    setIconActive(false, sender.tab.id)
  });

  catcher.watchPromise(communication.sendToBootstrap("getOldDeviceInfo").then((deviceInfo) => {
    if (deviceInfo === communication.NO_BOOTSTRAP || ! deviceInfo) {
      return;
    }
    deviceInfo = JSON.parse(deviceInfo);
    if (deviceInfo && typeof deviceInfo == "object") {
      return auth.setDeviceInfoFromOldAddon(deviceInfo).then((updated) => {
        if (updated === communication.NO_BOOTSTRAP) {
          throw new Error("bootstrap.js disappeared unexpectedly");
        }
        if (updated) {
          return communication.sendToBootstrap("removeOldAddon");
        }
      });
    }
  }));

  return exports;
})();
