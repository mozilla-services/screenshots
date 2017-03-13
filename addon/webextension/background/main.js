/* globals browser, console, XMLHttpRequest, Image, document, setTimeout, navigator */
/* globals loadSelector, analytics, communication, catcher, makeUuid, auth */
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
      catcher.watchPromise(loadSelector());
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
    catcher.watchPromise(loadSelector());
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
        title: browser.i18n.getMessage("notificationLinkCopied"),
        message: browser.i18n.getMessage("notificationLinkCopiedDetails", pasteSymbol)
      });
    }
  });

  catcher.watchPromise(browser.runtime.sendMessage({funcName: "getOldDeviceInfo"}).then((deviceInfo) => {
    deviceInfo = deviceInfo.value;
    if (! deviceInfo) {
      return;
    }
    deviceInfo = JSON.parse(deviceInfo);
    if (deviceInfo && typeof deviceInfo == "object") {
      return auth.setDeviceInfoFromOldAddon(deviceInfo).then((updated) => {
        if (updated) {
          return browser.runtime.sendMessage({funcName: "removeOldAddon"});
        }
      });
    }
  }));

  return exports;
})();
