/* globals browser, XMLHttpRequest, Image, document, setTimeout, navigator */
/* globals selectorLoader, analytics, communication, catcher, log, makeUuid, auth, senderror */

"use strict";

this.main = (function() {
  let exports = {};

  const pasteSymbol = (window.navigator.platform.match(/Mac/i)) ? "\u2318" : "Ctrl";
  const { sendEvent } = analytics;

  let manifest = browser.runtime.getManifest();
  let backend;

  // TODO: hard-coding this for the moment...
  let hasSeenOnboarding = true;

  exports.setBackend = function(newBackend) {
    backend = newBackend;
    backend = backend.replace(/\/*$/, "");
  };

  exports.getBackend = function() {
    return backend;
  };

  communication.register("getBackend", () => {
    return backend;
  });

  function getOnboardingUrl() {
    return backend + "/#hello";
  }

  for (let permission of manifest.permissions) {
    if (/^https?:\/\//.test(permission)) {
      exports.setBackend(permission);
      break;
    }
  }

  function setIconActive(active, tabId) {
    communication.sendToBootstrap("setIconActive", active, tabId);
    return;
  }

  function toggleSelector(tab) {
    return analytics.refreshTelemetryPref()
      .then(() => selectorLoader.toggle(tab.id, hasSeenOnboarding))
      .then(active => {
        setIconActive(active, tab.id);
        return active;
      })
      .catch((error) => {
        error.popupMessage = "UNSHOOTABLE_PAGE";
        throw error;
      });
  }

  function startSelectionWithOnboarding(tab) {
    return analytics.refreshTelemetryPref().then(() => {
      return selectorLoader.testIfLoaded(tab.id);
    }).then((isLoaded) => {
      if (!isLoaded) {
        sendEvent("start-shot", "site-request");
        setIconActive(true, tab.id);
        selectorLoader.toggle(tab.id, false);
      }
    });
  }

  function forceOnboarding() {
    return browser.tabs.create({url: getOnboardingUrl()}).then((tab) => {
      return toggleSelector(tab);
    });
  }

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
        iconUrl: "../icons/copy.png",
        title: browser.i18n.getMessage("notificationLinkCopiedTitle"),
        message: browser.i18n.getMessage("notificationLinkCopiedDetails", pasteSymbol)
      });
    }
  });

  communication.register("downloadShot", (sender, info) => {
    // 'data:' urls don't work directly, let's use a Blob
    // see http://stackoverflow.com/questions/40269862/save-data-uri-as-file-using-downloads-download-api
    const binary = atob(info.url.split(',')[1]); // just the base64 data
    const data = Uint8Array.from(binary, char => char.charCodeAt(0))
    const blob = new Blob([data], {type: "image/png"})
    let url = URL.createObjectURL(blob);
    let downloadId;
    let onChangedCallback = catcher.watchFunction(function(change) {
      if (!downloadId || downloadId != change.id) {
        return;
      }
      if (change.state && change.state.current != "in_progress") {
        URL.revokeObjectURL(url);
        browser.downloads.onChanged.removeListener(onChangedCallback);
      }
    });
    browser.downloads.onChanged.addListener(onChangedCallback)
    return browser.downloads.download({
      url,
      filename: info.filename
    }).then((id) => {
      downloadId = id;
    });
  });

  communication.register("closeSelector", (sender) => {
    setIconActive(false, sender.tab.id)
  });

  catcher.watchPromise(communication.sendToBootstrap("getOldDeviceInfo").then((deviceInfo) => {
    if (deviceInfo === communication.NO_BOOTSTRAP || !deviceInfo) {
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

  communication.register("hasSeenOnboarding", () => {
    hasSeenOnboarding = true;
    catcher.watchPromise(browser.storage.local.set({hasSeenOnboarding}));
    setIconActive(false, null);
    browser.browserAction.setTitle({
      title: browser.i18n.getMessage("contextMenuLabel")
    });
  });

  communication.register("abortFrameset", () => {
    sendEvent("abort-start-shot", "frame-page");
    // Note, we only show the error but don't report it, as we know that we can't
    // take shots of these pages:
    senderror.showError({
      popupMessage: "UNSHOOTABLE_PAGE"
    });
  });

  // Note: this signal is only needed until bug 1357589 is fixed.
  communication.register("openTermsPage", () => {
    return catcher.watchPromise(browser.tabs.create({url: "https://www.mozilla.org/about/legal/terms/services/"}));
  });

  // Note: this signal is also only needed until bug 1357589 is fixed.
  communication.register("openPrivacyPage", () => {
    return catcher.watchPromise(browser.tabs.create({url: "https://www.mozilla.org/privacy/firefox-cloud/"}));
  });

  // A Screenshots page wants us to start/force onboarding
  communication.register("requestOnboarding", (sender) => {
    return startSelectionWithOnboarding(sender.tab);
  });

  // Open a port to let the embedding legacy addon tell us when a button is pressed
  // TODO: do we need to specify the extensionID in the connect call?
  // TODO: as soon as the port exists, send a "hello" message over, so the embedding
  // addon can get a reference to the port.
  const port = browser.runtime.connect({name: "screenshots-legacy-connection"});
  port.onMessage.addListener((message) => {
    if (message.content === "click") {
      console.log("got a click signal from the legacy addon");
      // TODO: figure out how to get the tabID of the clicked tab
    }
  });

  return exports;
})();
