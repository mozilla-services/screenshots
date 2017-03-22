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
    const path = active ? "icons/icon-green-38.png" : "icons/icon-38.png";
    browser.browserAction.setIcon({path, tabId});
  }

  function toggleSelector(tab) {
    return analytics.refreshTelemetryPref()
      .then(() => selectorLoader.toggle())
      .then(active => {
        setIconActive(active, tab.id);
        return active;
      });
  }

  browser.browserAction.onClicked.addListener(catcher.watchFunction((tab) => {
    if (tab.url.match(/about:(newtab|blank)/i)) {
      catcher.watchPromise(analytics.refreshTelemetryPref().then(() => {
        sendEvent("goto-myshots", "about-newtab");
      }));
      catcher.watchPromise(browser.tabs.update({url: backend + "/shots"}));
    } else {
      catcher.watchPromise(
        toggleSelector(tab)
          .then(active => {
            const event = active ? "start-shot" : "cancel-shot";
            sendEvent(event, "toolbar-button");
          }));
    }
  }));

  browser.contextMenus.create({
    id: "create-screenshot",
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
    catcher.watchPromise(
      toggleSelector(tab)
        .then(() => sendEvent("start-shot", "context-menu")));
  }));


  communication.register("sendEvent", (sender, ...args) => {
    catcher.watchPromise(sendEvent(...args));
    // We don't wait for it to complete:
    return null;
  });

  communication.register("openMyShots", (sender) => {
    return browser.tabs.create({url: backend + "/shots"});
  });

  communication.register("openShot", (sender, {url, copied}) => {
    if (copied) {
      const id = makeUuid();
      return browser.notifications.create(id, {
        type: "basic",
        iconUrl: "../icons/clipboard-32.png",
        title: browser.i18n.getMessage("notificationLinkCopiedTitle"),
        message: browser.i18n.getMessage("notificationLinkCopiedDetails", pasteSymbol)
      });
    } else {
      catcher.watchPromise(browser.tabs.query({active: true, currentWindow: true})
      .then((tabs) => {
        for (let tab of tabs) {
          if(tab.url.match(/\/creating/i)) {
            catcher.watchPromise(browser.tabs.remove(tab.id));
          }
        }
      }));
    }
  });

  communication.register("closeSelector", (sender) => {
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
