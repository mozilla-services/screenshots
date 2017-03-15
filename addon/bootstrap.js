/* globals Components, AddonManager */
/* eslint-disable no-unused-vars */

const OLD_ADDON_PREF_NAME = "extensions.jid1-NeEaf3sAHdKHPA@jetpack.deviceIdInfo";
const OLD_ADDON_ID = "jid1-NeEaf3sAHdKHPA@jetpack";

const prefs = Components.classes["@mozilla.org/preferences-service;1"]
  .getService(Components.interfaces.nsIPrefBranch);
Components.utils.import("resource://gre/modules/AddonManager.jsm");

function startup(data, reason) {
  data.webExtension.startup().then((api) => {
    const {browser} = api;
    browser.runtime.onMessage.addListener(handleMessage);
  });
}

function shutdown(data, reason) {}
function install(data, reason) {}
function uninstall(data, reason) {}

function handleMessage(msg, sender, sendReply) {
  if (msg && msg.funcName === "getTelemetryPref") {
    let enableTelemetry = prefs.getPrefType('toolkit.telemetry.enabled') && prefs.getBoolPref("toolkit.telemetry.enabled");
    sendReply({type: "success", value: enableTelemetry});
  } else if (msg && msg.funcName === "getOldDeviceInfo") {
    let oldDeviceInfo = prefs.prefHasUserValue(OLD_ADDON_PREF_NAME) && prefs.getCharPref(OLD_ADDON_PREF_NAME);
    sendReply({type: "success", value: oldDeviceInfo || null});
  } else if (msg && msg.funcName === "removeOldAddon") {
    AddonManager.getAddonByID(OLD_ADDON_ID, (addon) => {
      // FIXME: remove OLD_ADDON_PREF_NAME, see #2370
      if (addon) {
        addon.uninstall();
      }
      sendReply({type: "success", value: !! addon});
    });
  }
}
