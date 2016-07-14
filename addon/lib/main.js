/* globals UITour */
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
const { Cu, Cc, Ci } = require("chrome");
const winutil = require("sdk/window/utils");
const req = require("./req");
const { setTimeout } = require("sdk/timers");
var { Hotkey } = require("sdk/hotkeys");

let Services;

// Give the server a chance to start if the pref is set
require("./headless").init();

Cu.import("resource:///modules/UITour.jsm");

let loadReason = null; // eslint-disable-line no-unused-vars
let initialized = false;

function getNotificationBox(browser) {
  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
  let win = wm.getMostRecentWindow("navigator:browser");
  let gBrowser = win.gBrowser;

  browser = browser || gBrowser.selectedBrowser;
  return gBrowser.getNotificationBox(browser);
}

function showNotificationBar(shotcontext) {
  var nb = require("./notificationbox");
  if (nb.notificationbox().getNotificationWithValue("pageshot-notification-bar") !== null) {
    return;
  }
  let thebox = nb.notificationbox();
  let fragment = thebox.ownerDocument.createDocumentFragment();
  let myShots = thebox.ownerDocument.createElement("button");
  myShots.className = "myshots";
  myShots.setAttribute("label", "myshots");
  let preMyShots = thebox.ownerDocument.createElement("span");
  preMyShots.className = "pre-myshots";
  myShots.appendChild(preMyShots);
  let myShotsText = thebox.ownerDocument.createElement("span");
  myShotsText.className = "myshots-text";
  myShotsText.textContent = "My Shots";
  myShots.appendChild(myShotsText);
  let postMyShots = thebox.ownerDocument.createElement("span");
  postMyShots.className = "post-myshots";
  myShots.appendChild(postMyShots);
  myShots.className = "myshots";
  myShots.onclick = watchFunction(exports.openMyShots);
  let messageNode = thebox.ownerDocument.createElement("span");
  messageNode.style.border = "none";
  messageNode.style.marginLeft = "10px";
  messageNode.style.fontWeight = "normal";
  messageNode.appendChild(thebox.ownerDocument.createTextNode("Select part of the page to save:"));
  //fragment.appendChild(myShots);
  fragment.appendChild(messageNode);
  nb.banner({
    id: "pageshot-notification-bar",
    msg: fragment,
    callback: function (message) {
      // Only message should be AlertClose
      if (message !== "removed") {
        console.warn("Unexpected message on notificationbox:", message);
        return;
      }
      shotcontext.destroy();
    },
    buttons: [
      nb.buttonMaker.yes({
        // FIXME: the label and the identifier for this button are conflated
        // (here, below in this file, and in pageshot-notification-bar.scss)
        label: "Save",
        callback: function(notebox, button) {
          hideNotificationBar();
          setTimeout(function () {
            shotcontext.takeShot();
          }, 0);
        }
      }),
      nb.buttonMaker.no({
        label: "Cancel",
        callback: function(notebox, button) {
          hideNotificationBar();
          setTimeout(function () {
            shotcontext.destroy();
          }, 0);
        }
      })
    ]
  });

  setSaveButtonText("Save", true);

  if (!initialized) {
    if (! Services) {
      let importer = {};
      Cu.import("resource://gre/modules/Services.jsm", importer);
      Services = importer.Services;
    }

    initialized = true;
    // Load our stylesheets.
    let styleSheetService = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);

    let cssurl = self.data.url("pageshot-notification-bar.css");

    let styleSheetURI = Services.io.newURI(cssurl, null, null);
    styleSheetService.loadAndRegisterSheet(styleSheetURI,
                                           styleSheetService.AUTHOR_SHEET);
  }
}

function hideNotificationBar(browser) {
  let box = getNotificationBox(browser);
  let notification = box.getNotificationWithValue("pageshot-notification-bar");
  let removed = false;
  if (notification) {
    box.removeNotification(notification);
    removed = true;
  }
  return removed;
}

exports.openMyShots = function () {
  if (! prefs.hasUsedMyShots) {
    prefs.hasUsedMyShots = true;
  }
  hideNotificationBar();
  setTimeout(() => {
    tabs.open(exports.getBackend() + "/shots");
  });
};

exports.showSaveFullPage = function () {
  setSaveButtonText("Save Full Page");
};

exports.showSave = function () {
  setSaveButtonText("Save", false);
};

function setSaveButtonText(text, disabled) {
  let box = getNotificationBox();
  let notification = box.getNotificationWithValue("pageshot-notification-bar");
  let els = notification.getElementsByTagName("*");
  for (let i=0; i<els.length; i++) {
    console.log("checking element", els[i].tagName, els[i].outerHTML);
    if (els[i].tagName == "button" && els[i].className.indexOf("notification-button-default") != -1) {
      if (disabled === true || disabled === false) {
        els[i].setAttribute("disabled", disabled);
      }
      els[i].setAttribute("label", text);
      console.log("did it!");
      break;
    }
  }
}

exports.hideNotificationBar = hideNotificationBar;

function showTopbar(shotContext) {
  let box = getNotificationBox();
  let notification = box.getNotificationWithValue("pageshot-notification-bar");
  if (!notification) {
    hideInfoPanel();
    showNotificationBar(shotContext);
    req.sendEvent("addon", "overlay-ui");
  }
}

exports.showTopbar = showTopbar;

function takeShot(source) {
  let shotContext = shooter.ShotContext(exports.getBackend());
}

var hotKey = Hotkey({
  combo: "accel-alt-control-c",
  onPress: function() {
    takeShot("press-shot-hotkey");
  }
});

var shootButton = ActionButton({
  id: "pageshot-shooter",
  label: "Make shot",
  icon: self.data.url("icons/pageshot.svg"),
  onClick: watchFunction(function () {
    takeShot("click-shot-button");
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

let infoPanelShownForWindow = null;

exports.showInfoPanel = function showInfoPanel(magicCookie, title, description) {
  /*let win = winutil.getMostRecentBrowserWindow();
  let target = {
    node: win.document.getElementById(magicCookie),
    targetName: magicCookie
  };
  UITour.showInfo(win, null, target, title, description);
  UITour.showHighlight(win, target, "wobble");
  infoPanelShownForWindow = win;*/
};

function showTour(newTab) {
  let helpurl = exports.getBackend() + "/homepage/help.html";
  let win = winutil.getMostRecentBrowserWindow();
  if (newTab) {
    shooter.showTourOnNextLinkClick();
    tabs.open(helpurl);
    let newtab = tabs[tabs.length - 1];
    newtab.on("close", hideInfoPanel);
    newtab.on("deactivate", hideInfoPanel);
  } else {
    win.loadURI(helpurl);
  }
  exports.showInfoPanel(
    "toggle-button--jid1-neeaf3sahdkhpajetpack-pageshot-shooter",
    "Welcome to PageShot",
    "Click the camera button to clip a part of the page");
}

function hideInfoPanel() {
  if (infoPanelShownForWindow) {
    UITour.hideInfo(infoPanelShownForWindow);
    UITour.hideHighlight(infoPanelShownForWindow);
    infoPanelShownForWindow = null;
  }
}

// For reasons see https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Listening_for_load_and_unload
exports.main = function (options) {
  loadReason = options.loadReason;
  if (options.loadReason === "install") {
    showTour();
  }
  helperworker.trackMods(backendOverride || null);
  require("./user").initialize(exports.getBackend(), options.loadReason).catch((error) => {
    console.warn("Failed to log in to server:", error+"");
  });
};

exports.onUnload = function (reason) {
  if (reason == "shutdown") {
    return;
  }
  hideNotificationBar();
  console.info("Unloading PageShot framescripts");
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
  // We can't rely on the server removing cookies, because the request may not
  // complete locally, since the addon is being destroyed
  removeCookies();
};

/** Remove the user and user.sig cookies for the backend */
function removeCookies() {
  let namespace = {};
  Cu.import('resource://gre/modules/Services.jsm', namespace);
  let domain = require("sdk/url").URL(exports.getBackend()).hostname;
  namespace.Services.cookies.add(domain, "/", "user", "", false, false, false, 0);
  namespace.Services.cookies.add(domain, "/", "user.sig", "", false, false, false, 0);
}
