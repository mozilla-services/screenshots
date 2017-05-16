/* globals AddonManager, Components, CustomizableUI, LegacyExtensionsUtils,
   Services, XPCOMUtils */

const OLD_ADDON_PREF_NAME = "extensions.jid1-NeEaf3sAHdKHPA@jetpack.deviceIdInfo";
const OLD_ADDON_ID = "jid1-NeEaf3sAHdKHPA@jetpack";
const ADDON_ID = "screenshots@mozilla.org";
const TELEMETRY_ENABLED_PREF = "datareporting.healthreport.uploadEnabled";
const PREF_BRANCH = "extensions.screenshots.";
const USER_DISABLE_PREF = "extensions.screenshots.disabled";
const SYSTEM_DISABLE_PREF = "extensions.screenshots.system-disabled";

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "AddonManager",
                                  "resource://gre/modules/AddonManager.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Console",
                                  "resource://gre/modules/Console.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "CustomizableUI",
                                  "resource:///modules/CustomizableUI.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "Services",
                                  "resource://gre/modules/Services.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "LegacyExtensionsUtils",
                                  "resource://gre/modules/LegacyExtensionsUtils.jsm");
XPCOMUtils.defineLazyServiceGetter(this, "styleSheetService",
                                   "@mozilla.org/content/style-sheet-service;1",
                                   "nsIStyleSheetService");

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
      appStartupPromise.then(initUI);
    }
  }
};

function startup(data, reason) { // eslint-disable-line no-unused-vars
  appStartupDone();
  prefObserver.register();
  addonResourceURI = data.resourceURI;
  // eslint-disable-next-line promise/catch-or-return
  appStartupPromise.then(initUI);
}

function initUI() {
  initButton();
  // TODO: check the pref state, then either init or shutdown the context menu
  contextMenu.init();
}

function shutdown(data, reason) { // eslint-disable-line no-unused-vars
  prefObserver.unregister();
  contextMenu.shutdown();
  if(buttonStyleSheet && styleSheetService.sheetRegistered(buttonStyleSheet, styleSheetService.AUTHOR_SHEET)) {
    styleSheetService.unregisterSheet(buttonStyleSheet, styleSheetService.AUTHOR_SHEET);
  }
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
  if (!webExtensionPort) { return; } // just do nothing till the port is ready
  // TODO: figure out how to send the tab ID over
  webExtensionPort.postMessage({ content: "click" });
}


function handleStartup() {
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
  webExtension.shutdown();
  webExtensionStarted = false;
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

let buttonStyleSheet;

// TODO: deal with toggling the prefs on/off
function initButton() {
  // From MDN - really simple button snippet
  // https://mdn.io/CustomizableUI.jsm#CreateWidget_-_Button_Type
  CustomizableUI.createWidget({
    id: "screenshots-button",
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: "Screenshots", // TODO: l10n
    tooltiptext: "Take a screenshot", // TODO: l10n
    onCommand: (aEvent) => {
      if (!webExtensionStarted) {
        handleStartup();
      }
      onClick(aEvent);
    }
  });
  // From MDN - stylesheet-based icon insertion method
  // https://mdn.io/CustomizableUI.jsm
	const css = `@-moz-document url("chrome://browser/content/browser.xul") {
    #screenshots-button {
      list-style-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQzLjIgKDM5MDY5KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5pY29uLTE2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTExLDIgTDE1LDIgTDE1LDQgTDExLDQgTDExLDIgWiBNMTcsMiBMMjEsMiBMMjEsNCBMMTcsNCBMMTcsMiBaIE0xNCwyOCBMMTgsMjggTDIxLDI4IEwyMSwzMCBMMTQsMzAgTDE0LDI4IFogTTI4LDExIEwzMCwxMSBMMzAsMTUgTDI4LDE1IEwyOCwxMSBaIE0yOCwxNyBMMzAsMTcgTDMwLDIxIEwyOCwyMSBMMjgsMTcgWiBNMzAsMy4wMDI5MjkzMyBMMzAsOSBMMjgsOSBMMjgsNC40OTc2OTg3OCBDMjgsNC4yMTQ4NDM3NSAyNy43NzcxNzI3LDQgMjcuNTAyMzAxMiw0IEwyMyw0IEwyMywyIEwyOC45OTcwNzA3LDIgQzI5LjU2MjExODYsMiAzMCwyLjQ0OTAyNjc2IDMwLDMuMDAyOTI5MzMgWiBNMjguOTk3MDcwNywzMCBMMjMsMzAgTDIzLDI4IEwyNy41MDIzMDEyLDI4IEMyNy43ODUxNTYyLDI4IDI4LDI3Ljc3NzE3MjcgMjgsMjcuNTAyMzAxMiBMMjgsMjMgTDMwLDIzIEwzMCwyOC45OTcwNzA3IEMzMCwyOS41NjIxMTg2IDI5LjU1MDk3MzIsMzAgMjguOTk3MDcwNywzMCBaIE05LDIgTDksNCBMNC40OTc2OTg3OCw0IEM0LjIxNDg0Mzc1LDQgNCw0LjIyNTk1NDkyIDQsNC41MDQ2ODQ0NSBMNCw2IEwyLDYgTDIsMy4wMDkzNjg5IEMyLDIuNDQzMzUzMTggMi40NDkwMjY3NiwyIDMuMDAyOTI5MzMsMiBMOSwyIFoiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgICAgICA8ZmlsdGVyIHg9Ii0xLjglIiB5PSItNy4xJSIgd2lkdGg9IjEwMy42JSIgaGVpZ2h0PSIxMTIuNSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci0yIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgICAwIDAgMCAwIDEgICAwIDAgMCAwIDEgIDAgMCAwIDAuMyAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZmlsdGVyIHg9Ii0xLjglIiB5PSItNy4xJSIgd2lkdGg9IjEwMy42JSIgaGVpZ2h0PSIxMTIuNSUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci0zIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldElubmVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4wNSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxwYXRoIGQ9Ik0xMi41MzE4OTEzLDE4LjUgTDEwLjUzMjg3NjcsMTcuMDg4OTMwOCBDOS42NjM0NTA5NSwxNy42NjQ3MDA0IDguNjIwODgyMTgsMTggNy41LDE4IEM0LjQ2MjQzMzg4LDE4IDIsMTUuNTM3NTY2MSAyLDEyLjUgQzIsOS40NjI0MzM4OCA0LjQ2MjQzMzg4LDcgNy41LDcgQzEwLjUzNzU2NjEsNyAxMyw5LjQ2MjQzMzg4IDEzLDEyLjUgQzEzLDEyLjk1NTU1MjcgMTIuOTQ0NjE1MiwxMy4zOTgxNjk3IDEyLjg0MDIxMTksMTMuODIxNDg0NiBMMTYsMTYuMDUxOTIzMyBMMjMuMzQ2NjMzNiwxMC44NjYwNjQzIEMyNC4yNDkwMzE0LDEwLjIyOTA3NzYgMjUuNDk2OTQ5MSwxMC40NDQyMzU4IDI2LjEzMzkzNTcsMTEuMzQ2NjMzNiBDMjYuNzcwOTIyNCwxMi4yNDkwMzE0IDI2LjU1NTc2NDIsMTMuNDk2OTQ5MSAyNS42NTMzNjY0LDE0LjEzMzkzNTcgTDEyLjg0MDIxMTksMjMuMTc4NTE1NCBDMTIuOTQ0NjE1MiwyMy42MDE4MzAzIDEzLDI0LjA0NDQ0NzMgMTMsMjQuNSBDMTMsMjcuNTM3NTY2MSAxMC41Mzc1NjYxLDMwIDcuNSwzMCBDNC40NjI0MzM4OCwzMCAyLDI3LjUzNzU2NjEgMiwyNC41IEMyLDIxLjQ2MjQzMzkgNC40NjI0MzM4OCwxOSA3LjUsMTkgQzguNjIwODgyMTgsMTkgOS42NjM0NTA5NSwxOS4zMzUyOTk2IDEwLjUzMjg3NjcsMTkuOTExMDY5MiBMMTIuNTMxODkxMywxOC41IFogTTE3LjUsMjIuMDA2OTAwMiBMMjAuOTY4MTA4NywxOS41NTg4MjM1IEwyNS42NTMzNjY0LDIyLjg2NjA2NDMgQzI2LjU1NTc2NDIsMjMuNTAzMDUwOSAyNi43NzA5MjI0LDI0Ljc1MDk2ODYgMjYuMTMzOTM1NywyNS42NTMzNjY0IEMyNS40OTY5NDkxLDI2LjU1NTc2NDIgMjQuMjQ5MDMxNCwyNi43NzA5MjI0IDIzLjM0NjYzMzYsMjYuMTMzOTM1NyBMMTcuNSwyMi4wMDY5MDAyIFogTTcuNSwxNS4yNSBDOS4wMTg3ODMwNiwxNS4yNSAxMC4yNSwxNC4wMTg3ODMxIDEwLjI1LDEyLjUgQzEwLjI1LDEwLjk4MTIxNjkgOS4wMTg3ODMwNiw5Ljc1IDcuNSw5Ljc1IEM1Ljk4MTIxNjk0LDkuNzUgNC43NSwxMC45ODEyMTY5IDQuNzUsMTIuNSBDNC43NSwxNC4wMTg3ODMxIDUuOTgxMjE2OTQsMTUuMjUgNy41LDE1LjI1IFogTTcuNSwyNy4yNSBDOS4wMTg3ODMwNiwyNy4yNSAxMC4yNSwyNi4wMTg3ODMxIDEwLjI1LDI0LjUgQzEwLjI1LDIyLjk4MTIxNjkgOS4wMTg3ODMwNiwyMS43NSA3LjUsMjEuNzUgQzUuOTgxMjE2OTQsMjEuNzUgNC43NSwyMi45ODEyMTY5IDQuNzUsMjQuNSBDNC43NSwyNi4wMTg3ODMxIDUuOTgxMjE2OTQsMjcuMjUgNy41LDI3LjI1IFoiIGlkPSJwYXRoLTQiPjwvcGF0aD4KICAgICAgICA8ZmlsdGVyIHg9Ii0yLjAlIiB5PSItMi4yJSIgd2lkdGg9IjExNi4zJSIgaGVpZ2h0PSIxMDguNyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci01Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDEgICAwIDAgMCAwIDEgICAwIDAgMCAwIDEgIDAgMCAwIDAuMyAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVDb2xvck1hdHJpeD4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZmlsdGVyIHg9Ii0yLjAlIiB5PSItMi4yJSIgd2lkdGg9IjExNi4zJSIgaGVpZ2h0PSIxMDguNyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci02Ij4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldElubmVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dPZmZzZXRJbm5lcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJhcml0aG1ldGljIiBrMj0iLTEiIGszPSIxIiByZXN1bHQ9InNoYWRvd0lubmVySW5uZXIxIj48L2ZlQ29tcG9zaXRlPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgIDAgMCAwIDAgMCAgMCAwIDAgMC4wNSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Ik9uYm9hcmRpbmciIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJpY29uIj4KICAgICAgICAgICAgPGcgaWQ9IkNvbWJpbmVkLVNoYXBlIj4KICAgICAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0yKSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiM0RDRENEQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMykiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDxnIGlkPSJDb21iaW5lZC1TaGFwZSI+CiAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItNSkiIHhsaW5rOmhyZWY9IiNwYXRoLTQiPjwvdXNlPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjNEQ0RDREIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTQiPjwvdXNlPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTYpIiB4bGluazpocmVmPSIjcGF0aC00Ij48L3VzZT4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+);
    }
  }`;
  const cssEnc = encodeURIComponent(css);
  const newURIParam = {
    aURL: 'data:text/css,' + cssEnc,
    aOriginCharset: null,
    aBaseURI: null
  };
  // implicit global assignment.
  buttonStyleSheet = Services.io.newURI(newURIParam.aURL, newURIParam.aOriginCharset, newURIParam.aBaseURI);
  styleSheetService.loadAndRegisterSheet(buttonStyleSheet, styleSheetService.AUTHOR_SHEET);
}

// borrowed from PocketContextMenu in m-c
const contextMenu = {
  init: function() {
    Services.obs.addObserver(this, "on-build-contextmenu");
  },
  shutdown: function() {
    Services.obs.removeObserver(this, "on-build-contextmenu");
    for (let win of CustomizableUI.windows) {
      const item = win.document.getElementById("context-screenshots");
      if (item) {
        item.remove();
      }
    }
  },
  observe: function(aSubject, aTopic, aData) {
    const document = aSubject.wrappedJSObject.menu.ownerDocument;
    let item = document.getElementById("context-screenshots");
    if (!item) {
      item = document.createElement("menuitem");
      item.setAttribute("id", "context-screenshots");
      item.setAttribute("label", "screenshots"); // TODO solve l10n without webextensions :-(
      item.setAttribute("oncommand", "window.alert('clicked screenshots context menu')");
      // TODO: add an "accesskey" attribute?
      const parent = document.getElementById("context-navigation");
      parent.appendChild(item);
    }
  }
};
