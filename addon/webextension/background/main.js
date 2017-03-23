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

  function shouldOpenMyShots(url) {
    return /^about:(?:newtab|blank)/i.test(url) || /^resource:\/\/activity-streams\//i.test(url);
  }

  browser.browserAction.onClicked.addListener(catcher.watchFunction((tab) => {
    if (shouldOpenMyShots(tab.url)) {
      catcher.watchPromise(analytics.refreshTelemetryPref().then(() => {
        sendEvent("goto-myshots", "about-newtab");
      }));
      catcher.watchPromise(
        auth.authHeaders()
        .then(() => browser.tabs.update({url: backend + "/shots"})));
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

  function urlEnabled(url) {
    if (shouldOpenMyShots(url)) {
      return true;
    }
    if (url.startsWith(backend) || /^(?:about|data|moz-extension):/i.test(url)) {
      return false;
    }
    return true;
  }


  browser.tabs.onUpdated.addListener(catcher.watchFunction((id, info, tab) => {
    if (info.url && tab.selected) {
      if (urlEnabled(info.url)) {
        browser.browserAction.enable(tab.id);
      }
      else {
        browser.browserAction.disable(tab.id);
      }
    }
  }));

  communication.register("sendEvent", (sender, ...args) => {
    catcher.watchPromise(sendEvent(...args));
    // We don't wait for it to complete:
    return null;
  });

  communication.register("openMyShots", (sender) => {
    return catcher.watchPromise(
      auth.authHeaders()
      .then(() => browser.tabs.create({url: backend + "/shots"})));
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
