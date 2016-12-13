/** The main module is loaded on startup

This also contains the UI that is directly in the browser,
specifically the button and control over the panel.  `lib/errors.js`
controls some error-specific UI
*/

"use strict";
// cfx set this to true, and causes a ton of messages
require("sdk/preferences/service").set("javascript.options.strict", false);

const self = require("sdk/self");
const tabs = require("sdk/tabs");
const shooter = require("./shooter");
const { prefs } = require("sdk/simple-prefs");
const helperworker = require("./helperworker");
const { ActionButton } = require("sdk/ui/button/action");
const { watchFunction } = require("./errors");
const { Cu } = require("chrome");
const req = require("./req");
const { setTimeout, clearTimeout } = require("sdk/timers");
const { Hotkey } = require("sdk/hotkeys");
const { AddonManager } = require('resource://gre/modules/AddonManager.jsm');
const { addXULStylesheet } = require("./xulcss");
const { storage } = require("sdk/simple-storage");
const contextMenu = require("sdk/context-menu");

// Give the server a chance to start if the pref is set
require("./headless").init();

let loadReason = null; // eslint-disable-line no-unused-vars
let tabsBeingShot = {};

function cleanUpTabsBeingShot(tab) {
  delete tabsBeingShot[tab.id];
}

for (let tab of tabs) {
  tab.on("pageshow", cleanUpTabsBeingShot);
}

tabs.on("open", function(tab) {
  tab.on("pageshow", cleanUpTabsBeingShot);
});


exports.openMyShots = function () {
  if (! prefs.hasUsedMyShots) {
    prefs.hasUsedMyShots = true;
  }
  setTimeout(() => {
    tabs.open(exports.getBackend() + "/shots");
  });
};


function takeShot(source) {
  let backend = exports.getBackend();
  let url = tabs.activeTab.url;
  if (url.startsWith(backend)) {
    let error = Error("You can't take a shot of a Page Shot page.");
    if (url.replace(/\?.*/, "").endsWith("/shots")) {
      error.popupMessage = "MY_SHOTS";
    } else {
      error.popupMessage = "SHOT_PAGE";
    }
    error.noSentry = true;
    require("./errors").unhandled(error);
    return;
  }
  if (url.startsWith("resource:") || url === "about:blank" || url === "about:newtab") {
    tabs.activeTab.url = backend + "/shots";
    return;
  }
  let thisTabId = tabs.activeTab.id;
  if (tabsBeingShot[thisTabId] !== true) {
    tabsBeingShot[thisTabId] = true;
    shooter.ShotContext(backend, () => {
      delete tabsBeingShot[thisTabId];
    });
    req.sendEvent("start-shot", source);
  } else {
    req.sendEvent("aborted-start-shot", "toolbar-pageshot-button");
    console.warn("Tried to take a shot while a shot was already in progress.");
  }
}

Hotkey({
  combo: "accel-alt-control-c",
  onPress: watchFunction(function() {
    takeShot("keyboard-shortcut");
  })
});

Hotkey({
  combo: "accel-alt-control-x",
  onPress: watchFunction(function() {
    throw new Error("Client-side exception test");
  })
});

contextMenu.Item({
  label: "Create Page Shot",
  context: contextMenu.PageContext(),
  contentScript: `self.on("click", self.postMessage)`,
  onMessage: watchFunction(() => {
    takeShot("context-menu");
  })
});

var shootButton = ActionButton({
  id: "pageshot-shooter",
  label: "Make shot",
  icon: './icons/transparent-16.png',
  onClick: watchFunction(function () {
    takeShot("toolbar-pageshot-button");
  })
});
exports.shootButton = shootButton;

/** We use backendOverride to temporarily change the backend with a
    command-line argument (as used in the `run` script), otherwise
    falls back to the addon pref */
var backendOverride = null;

exports.getBackend = function () {
  return backendOverride || prefs.backend;
};

// For reasons see https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Listening_for_load_and_unload
exports.main = function (options) {
  loadReason = options.loadReason;
  helperworker.trackMods(backendOverride || null);
  addXULStylesheet(self.data.url("toolbar-button.css"));
  require("./user").initialize(exports.getBackend(), options.loadReason).then(() => {
    req.sendEvent("open-browser", loadReason);
    if (options.loadReason === "install") {
      req.sendEvent("install");
      AddonManager.getAddonByID("@testpilot-addon", (addon) => {
        if (addon === null) {
          req.sendEvent("test-pilot-not-installed");
        } else {
          req.sendEvent("test-pilot-installed");
        }
      });
    }
    startDailyPing();
  }).catch((error) => {
    console.warn("Failed to log in to server:", exports.getBackend(), error+"", error.stack);
    error.noPopup = true;
    require("./errors").unhandled(error);
  });
};

let timeoutId;
const intervalMilliseconds = 1000*60*60*24; // 1 day
function startDailyPing() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  let lastTime = storage.lastPingTime;
  let now = Date.now();
  if ((! lastTime) || (now - lastTime + 60000) > intervalMilliseconds) {
    req.sendEvent("daily-ping");
    storage.lastPingTime = now;
    timeoutId = setTimeout(startDailyPing, intervalMilliseconds);
  } else {
    let timeToGo = intervalMilliseconds - (now - lastTime);
    timeoutId = setTimeout(startDailyPing, timeToGo);
  }
}

exports.onUnload = function (reason) {
  if (reason == "shutdown") {
    return;
  }
  req.sendEvent("uninstall");
  console.info("Unloading Page Shot framescripts");
  require("./framescripter").unload();
  console.info("Informing site of unload reason:", reason);
  let deviceInfo = require("./deviceinfo").deviceInfo();
  require("./req").request(exports.getBackend() + "/api/unload", {
    ignoreLogin: true,
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    content: {
      reason,
      deviceInfo: JSON.stringify(deviceInfo)
    }
  });
  if (reason == "disable" || reason == "uninstall") {
    // We can't rely on the server removing cookies, because the request may not
    // complete locally, since the addon is being destroyed
    removeCookies();
  }
};

/** Remove the user and user.sig cookies for the backend */
function removeCookies() {
  let namespace = {};
  Cu.import('resource://gre/modules/Services.jsm', namespace);
  let domain = require("sdk/url").URL(exports.getBackend()).hostname;
  namespace.Services.cookies.add(domain, "/", "user", "", false, false, false, 0);
  namespace.Services.cookies.add(domain, "/", "user.sig", "", false, false, false, 0);
}
