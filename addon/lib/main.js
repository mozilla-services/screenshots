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
const { prefs } = require('sdk/simple-prefs');
const helperworker = require("./helperworker");
const { ToggleButton } = require('sdk/ui/button/toggle');
const panels = require("sdk/panel");
const { watchFunction, watchWorker } = require("./errors");
const {Cu} = require("chrome");
const winutil = require("sdk/window/utils");
const req = require("./req");

// Give the server a chance to start if the pref is set
require("./headless").init();

Cu.import("resource:///modules/UITour.jsm");

let loadReason = null;
let PanelContext;

const PANEL_SHORT_HEIGHT = 220;
const PANEL_TALL_HEIGHT = 500;


function showNotificationBar(shotcontext) {
  var nb = require("./notificationbox");
  let banner = nb.banner(
    {msg:"Select part of the page to save",
    buttons: [
      nb.buttonMaker.yes({
        label: "Upload",
        callback: function(nb,b) {
          console.log("YES BUTTON");
          shotcontext.uploadShot();
          shotcontext.copyRichDataToClipboard();
          shotcontext.openInNewTab();
        }
      })
    ]
  });
}
// FIXME: this button should somehow keep track of whether there is an active shot associated with this page
var shootButton = ToggleButton({
  id: "pageshot-shooter",
  label: "Make shot",
  icon: self.data.url("icons/pageshot-camera-empty.svg"),
  onClick: watchFunction(function () {
    hideInfoPanel();
    PanelContext.onShootButtonClicked();
    req.sendEvent("addon", "click-shot-button");
  })
});
exports.shootButton = shootButton;

/** PanelContext manages the ShotContext (defined in shooter.js) that
    is associated with the panel.  Because the panel is a singleton,
    and any tab may have its own shot associated with it, we have to
    manage these centrally.

    This instantiates ShotContext as necessary.  It also routes all
    messages from the panel (data/shoot-panel.js) to the individual
    ShotContext.
    */
PanelContext = {
  _contexts: {},
  _activeContext: null,
  _stickyPanel: false,

  /** Hides the given ShotContext; error if you try to hide when
      you are not active */
  hide: function (shotContext) {
    if (this._activeContext != shotContext) {
      throw new Error("Hiding wrong shotContext");
    }
    this._activeContext = null;
    //shootPanel.hide();
    shootButton.checked = false;
  },

  shootPanelHidden: function () {
    if (this._activeContext) {
      this._activeContext.isHidden();
    }
    if (this._stickyPanel && this._activeContext) {
      require("sdk/timers").setTimeout(() => {
        if (this._activeContext) {
          this.show(this._activeContext);
        }
      }, 5000);
    }
  },

  shootPanelShown: function () {
    if (this._activeContext) {
      this._activeContext.isShowing();
    }
  },

  toggleStickyPanel: function () {
    this._stickyPanel = ! this._stickyPanel;
    require("sdk/notifications").notify({
      title: "Sticky",
      text: this._stickyPanel ? "Sticky panel debugging ON" : "Sticky panel debugging OFF",
    });
  },

  /** Show a ShotContext, hiding any other if necessary */
  show: function (shotContext) {
    if (this._activeContext === shotContext) {
      //shootPanel.show();
      showNotificationBar(shotContext);
      shotContext.isShowing();
      return;
    }
    if (this._activeContext) {
      throw new Error("Another context (" + this._activeContext.id + ") is showing");
    }
    this._activeContext = shotContext;
    showNotificationBar(shotContext);
    //shootPanel.show();
    shotContext.isShowing();
    shootButton.checked = true;
    this.updateShot(this._activeContext, this._activeContext.shot.asJson());
    if (this._activeContext.isEditing) {
      //shootPanel.resize(400, PANEL_TALL_HEIGHT);
    } else {
      //shootPanel.resize(400, PANEL_SHORT_HEIGHT);
    }
  },

  /** Fired whenever the toolbar button is clicked, this activates
      a ShotContext, or creates a new one, or hides the panel */
  onShootButtonClicked: function () {
    /* FIXME: remove, once I'm sure the panel really works right...
    console.info(
      "onShootButtonClicked.  activeContext:",
      this._activeContext ? this._activeContext.tabUrl : "none",
      this._activeContext ? this._activeContext.couldBeActive() : "",
      "any good contexts?",
      Object.keys(this._contexts).map((function (id) {
        return this._contexts[id];
      }).bind(this)).filter(function (context) {
        return context.couldBeActive();
      }).map(function (context) {
        return context.tabUrl;
      })
    ); */
    if (! this._activeContext) {
      for (let id in this._contexts) {
        let shotContext = this._contexts[id];
        if (shotContext.couldBeActive()) {
          this.show(shotContext);
          return;
        }
      }
      let shotContext = shooter.ShotContext(this, exports.getBackend());
      this.addContext(shotContext);
      this.show(shotContext);
    } else {
      if (this._activeContext.couldBeActive()) {
        showNotificationBar(this._activeContext);
        //shootPanel.show(this._activeContext);
      }
    }
  },

  /** Called whenever the underlying data/model has been changed
      for a shot */
  updateShot: function (shotContext) {
    if (this._activeContext !== shotContext) {
      return;
    }

    /*shootPanel.port.emit("shotData",
      {
        backend: shotContext.shot.backend,
        id: shotContext.shot.id,
        shot: shotContext.shot.asJson(),
        activeClipName: shotContext.activeClipName,
        isEditing: shotContext.isEditing
      },
      loadReason
    );*/
  },

  /** Called when the panel is switching from simple to edit view or vice versa */
  setEditing: function (editing) {
    this._activeContext.isEditing = editing;
    if (editing) {
      //shootPanel.resize(400, PANEL_TALL_HEIGHT);
      req.sendEvent("addon", "click-short-panel-edit");
    } else {
      //shootPanel.resize(400, PANEL_SHORT_HEIGHT);
    }
  },

  /** Called when a ShotContext is going away, to remove its
      registration with this PanelContext */
  removeContext: function (shotContext) {
    if (! this._contexts[shotContext.id]) {
      // FIXME: this sometimes throws on browser shutdown,
      // not sure why.  Something must be double-destroying.
      console.warn("No such context:", shotContext.id);
    }
    if (this._activeContext == shotContext) {
      this.hide(shotContext);
    }
    delete this._contexts[shotContext.id];
  },

  addContext: function (shotContext) {
    this._contexts[shotContext.id] = shotContext;
  },
};

// This pipes all messages that ShotContext expects over to the
// active context:
Object.keys(shooter.ShotContext.prototype.panelHandlers).forEach(function (messageType) {
  /*shootPanel.port.on(messageType, watchFunction(function () {
    if (! PanelContext._activeContext) {
      console.warn("Got " + messageType + " with no activeContext");
      return;
    }
    let method = PanelContext._activeContext.panelHandlers[messageType];
    method.apply(PanelContext._activeContext, arguments);
  }));*/
});

/*shootPanel.port.on("showTour", watchFunction(function () {
  showTour(true);
}));
*/

/** We use backendOverride to temporarily change the backend with a
    command-line argument (as used in the `run` script), otherwise
    falls back to the addon pref */
var backendOverride = null;

exports.getBackend = function () {
  return backendOverride || prefs.backend;
};

let infoPanelShownForWindow = null;

exports.showInfoPanel = function showInfoPanel(magicCookie, title, description) {
  let win = winutil.getMostRecentBrowserWindow();
  let target = {
    node: win.document.getElementById(magicCookie),
    targetName: magicCookie
  };
  UITour.showInfo(win, null, target, title, description);
  UITour.showHighlight(win, target, "wobble");
  infoPanelShownForWindow = win;
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
  require("./recall").initialize(hideInfoPanel, showTour);
};

exports.onUnload = function (reason) {
  if (reason == "shutdown") {
    return;
  }
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
