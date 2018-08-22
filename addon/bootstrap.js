/* globals ADDON_DISABLE Services CustomizableUI LegacyExtensionsUtils PageActions */
const ADDON_ID = "screenshots@mozilla.org";
const PREF_BRANCH = "extensions.screenshots.";
const USER_DISABLE_PREF = "extensions.screenshots.disabled";
const UPLOAD_DISABLED_PREF = "extensions.screenshots.upload-disabled";
const HISTORY_ENABLED_PREF = "places.history.enabled";

ChromeUtils.import("resource://gre/modules/XPCOMUtils.jsm");
ChromeUtils.defineModuleGetter(this, "AddonManager",
                               "resource://gre/modules/AddonManager.jsm");
ChromeUtils.defineModuleGetter(this, "CustomizableUI",
                               "resource:///modules/CustomizableUI.jsm");
ChromeUtils.defineModuleGetter(this, "LegacyExtensionsUtils",
                               "resource://gre/modules/LegacyExtensionsUtils.jsm");
ChromeUtils.defineModuleGetter(this, "Services",
                               "resource://gre/modules/Services.jsm");

let addonResourceURI;
let appStartupDone;
let appStartupPromise = new Promise((resolve, reject) => {
  appStartupDone = resolve;
});

const prefs = Services.prefs;
const prefObserver = {
  register() {
    prefs.addObserver(PREF_BRANCH, this, false); // eslint-disable-line mozilla/no-useless-parameters
  },

  unregister() {
    prefs.removeObserver(PREF_BRANCH, this, false); // eslint-disable-line mozilla/no-useless-parameters
  },

  observe(aSubject, aTopic, aData) {
    // aSubject is the nsIPrefBranch we're observing (after appropriate QI)
    // aData is the name of the pref that's been changed (relative to aSubject)
    if (aData === USER_DISABLE_PREF) {
      // eslint-disable-next-line promise/catch-or-return
      appStartupPromise = appStartupPromise.then(handleStartup);
    }
  }
};

const LibraryButton = {
  ITEM_ID: "appMenu-library-screenshots",

  init(webExtension) {
    this._initialized = true;
    const permissionPages = [...webExtension.extension.permissions].filter(p => (/^https?:\/\//i).test(p));
    if (permissionPages.length > 1) {
      Cu.reportError(new Error("Should not have more than 1 permission page, but got: " + JSON.stringify(permissionPages)));
    }
    this.PAGE_TO_OPEN = permissionPages.length === 1 ? permissionPages[0].replace(/\*$/, "") : "https://screenshots.firefox.com/";
    this.PAGE_TO_OPEN += "shots";
    this.ICON_URL = webExtension.extension.getURL("icons/icon-v2.svg");
    this.LABEL = webExtension.extension.localizeMessage("libraryLabel");
    CustomizableUI.addListener(this);
    for (const win of CustomizableUI.windows) {
      this.onWindowOpened(win);
    }
  },

  uninit() {
    if (!this._initialized) {
      return;
    }
    for (const win of CustomizableUI.windows) {
      const item = win.document.getElementById(this.ITEM_ID);
      if (item) {
        item.remove();
      }
    }
    CustomizableUI.removeListener(this);
    this._initialized = false;
  },

  onWindowOpened(win) {
    const libraryViewInsertionPoint = win.document.getElementById("appMenu-library-remotetabs-button");
    // If the library view doesn't exist (on non-photon builds, for instance),
    // this will be null, and we bail out early.
    if (!libraryViewInsertionPoint) {
      return;
    }
    const parent = libraryViewInsertionPoint.parentNode;
    const {nextSibling} = libraryViewInsertionPoint;
    const item = win.document.createElement("toolbarbutton");
    item.className = "subviewbutton subviewbutton-iconic";
    item.addEventListener("command", () => win.openWebLinkIn(this.PAGE_TO_OPEN, "tab"));
    item.id = this.ITEM_ID;
    const iconURL = this.ICON_URL;
    item.setAttribute("image", iconURL);
    item.setAttribute("label", this.LABEL);

    parent.insertBefore(item, nextSibling);
  },
};

const APP_SHUTDOWN = 2;
let addonData, startupReason;

function startup(data, reason) { // eslint-disable-line no-unused-vars
  addonData = data;
  startupReason = reason;
  appStartupDone();
  prefObserver.register();
  addonResourceURI = data.resourceURI;
  // eslint-disable-next-line promise/catch-or-return
  appStartupPromise = appStartupPromise.then(handleStartup);
}

function shutdown(data, reason) { // eslint-disable-line no-unused-vars
  prefObserver.unregister();
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: addonResourceURI
  });
  // Immediately exit if Firefox is exiting, #3323
  if (reason === APP_SHUTDOWN) {
    stop(webExtension, reason);
    return;
  }
  // Because the prefObserver is unregistered above, this _should_ terminate the promise chain.
  appStartupPromise = appStartupPromise.then(() => { stop(webExtension, reason); });
}

function install(data, reason) {} // eslint-disable-line no-unused-vars

function uninstall(data, reason) {} // eslint-disable-line no-unused-vars

function getBoolPref(pref) {
  return prefs.getPrefType(pref) && prefs.getBoolPref(pref);
}

function shouldDisable() {
  return getBoolPref(USER_DISABLE_PREF);
}

function handleStartup() {
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: addonResourceURI
  });

  if (!shouldDisable() && !webExtension.started) {
    start(webExtension);
  } else if (shouldDisable()) {
    stop(webExtension, ADDON_DISABLE);
  }
}

function start(webExtension) {
  return webExtension.startup(startupReason, addonData).then((api) => {
    api.browser.runtime.onMessage.addListener(handleMessage);
    LibraryButton.init(webExtension);
  }).catch((err) => {
    // The startup() promise will be rejected if the webExtension was
    // already started (a harmless error), or if initializing the
    // WebExtension failed and threw (an important error).
    console.error(err);
    if (err.message !== "This embedded extension has already been started") {
      // TODO: Should we send these errors to Sentry? #2420
    }
  });
}

function stop(webExtension, reason) {
  if (reason !== APP_SHUTDOWN) {
    LibraryButton.uninit();
  }
  return Promise.resolve(webExtension.shutdown(reason));
}

function handleMessage(msg, sender, sendReply) {
  if (!msg) {
    return;
  }

  if (msg.funcName === "isUploadDisabled") {
    const uploadDisabled = getBoolPref(UPLOAD_DISABLED_PREF);
    sendReply({type: "success", value: uploadDisabled});
  } else if (msg.funcName === "isHistoryEnabled") {
    const historyEnabled = getBoolPref(HISTORY_ENABLED_PREF);
    sendReply({type: "success", value: historyEnabled});
  }
}
