/* globals AddonManager, Components, CustomizableUI, LegacyExtensionsUtils,
   Services, XPCOMUtils */

const OLD_ADDON_PREF_NAME = "extensions.jid1-NeEaf3sAHdKHPA@jetpack.deviceIdInfo";
const OLD_ADDON_ID = "jid1-NeEaf3sAHdKHPA@jetpack";
const ADDON_ID = "screenshots@mozilla.org";
const TELEMETRY_ENABLED_PREF = "datareporting.healthreport.uploadEnabled";
const PREF_BRANCH = "extensions.screenshots.";
const USER_DISABLE_PREF = "extensions.screenshots.disabled";
const SYSTEM_DISABLE_PREF = "extensions.screenshots.system-disabled";

const { interfaces: Ci, utils: Cu } = Components;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "AddonManager",
                                  "resource://gre/modules/AddonManager.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Console",
                                  "resource://gre/modules/Console.jsm");
// TODO: lazy loading CUI seems to fail?
//XPCOMUtils.defineLazyModuleGetter(this, "CustomizableUI",
//                                  "resource:///modules/CustomizableUI.jsm");
Cu.import("resource:///modules/CustomizableUI.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Services",
                                  "resource://gre/modules/Services.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "LegacyExtensionsUtils",
                                  "resource://gre/modules/LegacyExtensionsUtils.jsm");

let webExtensionStarted;
let addonResourceURI;
let appStartupDone;
const appStartupPromise = new Promise((resolve, reject) => {
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
    if (aData == USER_DISABLE_PREF || aData == SYSTEM_DISABLE_PREF) {
      // eslint-disable-next-line promise/catch-or-return
      appStartupPromise.then(initButton);
    }
  }
};

function startup(data, reason) { // eslint-disable-line no-unused-vars
  console.log("bootstrap startup called");
  appStartupDone();
  // TODO: We have to disable the prefObserver so that we can disable the built-in
  // screenshots addon. Ughhh
  // prefObserver.register();
  addonResourceURI = data.resourceURI;
  // eslint-disable-next-line promise/catch-or-return
  appStartupPromise.then(initButton);
}

function shutdown(data, reason) { // eslint-disable-line no-unused-vars
  console.log("bootstrap shutdown called");
  prefObserver.unregister();
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: addonResourceURI
  });
  if (webExtension.started) {
    stop(webExtension);
  }
}

function install(data, reason) {} // eslint-disable-line no-unused-vars

function uninstall(data, reason) {} // eslint-disable-line no-unused-vars

function getBoolPref(pref) {
  return prefs.getPrefType(pref) && prefs.getBoolPref(pref);
}

function shouldDisable() {
  return getBoolPref(USER_DISABLE_PREF) || getBoolPref(SYSTEM_DISABLE_PREF);
}

// the postmessage channel opened once the webextension is started
let webExtensionPort;
function onConnect(port) {
  webExtensionPort = port;
}

function onClick() {
  console.log("onClick called");
  if (!webExtensionPort) { return; } // just do nothing till the port is ready
  // TODO: figure out how to send the tab ID over
  webExtensionPort.postMessage({ content: "click" });
}


function handleStartup() {
  console.log("inside handleStartup");
  // TODO: check the pref _before_ calling into ExtensionsUtils.
  const webExtension = LegacyExtensionsUtils.getEmbeddedExtensionFor({
    id: ADDON_ID,
    resourceURI: addonResourceURI
  });

  if (!shouldDisable() && !webExtension.started) {
    start(webExtension);
  } else if (shouldDisable()) {
    stop(webExtension);
  }
}

function start(webExtension) {
  console.log("inside start");
  webExtension.startup().then((api) => {
     webExtensionStarted = true;
    api.browser.runtime.onMessage.addListener(handleMessage);
    api.browser.runtime.onConnect.addListener(onConnect);
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

function stop(webExtension) {
  // TODO: does shutdown return a promise? there are no docs
  webExtension.shutdown().then(() => {
    webExtensionStarted = false;
  });
}

function handleMessage(msg, sender, sendReply) {
  if (!msg) {
    return;
  }

  if (msg.funcName === "getTelemetryPref") {
    let telemetryEnabled = getBoolPref(TELEMETRY_ENABLED_PREF);
    sendReply({type: "success", value: telemetryEnabled});
  } else if (msg.funcName === "getOldDeviceInfo") {
    let oldDeviceInfo = prefs.prefHasUserValue(OLD_ADDON_PREF_NAME) && prefs.getCharPref(OLD_ADDON_PREF_NAME);
    sendReply({type: "success", value: oldDeviceInfo || null});
  } else if (msg.funcName === "removeOldAddon") {
    AddonManager.getAddonByID(OLD_ADDON_ID, (addon) => {
      prefs.clearUserPref(OLD_ADDON_PREF_NAME);
      if (addon) {
        addon.uninstall();
      }
      sendReply({type: "success", value: !!addon});
    });
    return true;
  }
}

// TODO: deal with toggling the prefs on/off
function initButton() {
  // From MDN - stylesheet-free icon insertion method
  // https://mdn.io/CustomizableUI.jsm#Giving_the_button_an_icon_non-style_sheet_method
  const widgetListener = {
    onWidgetAdded: function(aWidgetId, aArea, aPosition) {
      if (aWidgetId !== "screenshots-button") {
        return;
      }
      console.log("Screenshots widgetListener onWidgetAdded called");
      const instances = CustomizableUI.getWidget("screenshots-button").instances;
      instances.forEach(instance => {
        instance.node.setAttribute("image", "chrome://screenshots-skin/content/icon-16.png");
      });
    },
    onWidgetDestroyed: function(aWidgetId) {
      if (aWidgetId !== "screenshots-button") {
        return;
      }
      console.log("Screenshots widgetListener onWidgetDestroyed called");
      CustomizableUI.removeListener(widgetListener);
    }
  };
  CustomizableUI.addListener(widgetListener);


  // From MDN - really simple button snippet
  // https://mdn.io/CustomizableUI.jsm#CreateWidget_-_Button_Type
  CustomizableUI.createWidget({
    id: "screenshots-button",
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: "Screenshots", // TODO: l10n
    tooltiptext: "Take a screenshot", // TODO: l10n
    onCommand: (aEvent) => {
      console.log("inside CustomizableUI widget onCommand");
      if (!webExtensionStarted) {
        handleStartup();
      }
      onClick(aEvent);
    }
  });



}
