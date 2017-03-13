/* globals Components */
/* eslint-disable no-unused-vars */

const prefs = Components.classes["@mozilla.org/preferences-service;1"]
  .getService(Components.interfaces.nsIPrefBranch);

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
  }
}
