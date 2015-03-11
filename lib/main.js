/** The main module is loaded on startup

This also contains the UI that is directly in the browser,
specifically the button and control over the panel.  `lib/errors.js`
controls some error-specific UI
*/

"use strict";
// cfx set this to true, and causes a ton of messages
require("sdk/preferences/service").set("javascript.options.strict", false);

const self = require("sdk/self");
const shooter = require("shooter");
const { prefs } = require('sdk/simple-prefs');
const helperworker = require("./helperworker");
const { ToggleButton } = require('sdk/ui/button/toggle');
const panels = require("sdk/panel");
const { watchFunction, watchWorker } = require("errors");

// FIXME: this button should somehow keep track of whether there is an active shot associated with this page
var shootButton = ToggleButton({
  id: "pageshot-shooter",
  label: "Make shot",
  icon: self.data.url("icons/icon-shoot.png"),
  onClick: watchFunction(function () {
    PanelContext.onShootButtonClicked();
  })
});
exports.shootButton = shootButton;

var shootPanel = panels.Panel({
  contentURL: self.data.url("shoot-panel.html"),
  contentScriptFile: [self.data.url("error-utils.js"), self.data.url("shoot-panel.js")],
  position: shootButton,
  height: 400,
  width: 400,
  onHide: watchFunction(function () {
    shootButton.state("window", null);
    shootButton.checked = false;
  }),
  onShow: watchFunction(function () {
    shootButton.state("window", null);
    shootButton.checked = true;
  })
});

watchWorker(shootPanel);

/** PanelContext manages the ShotContext (defined in shooter.js) that
    is associated with the panel.  Because the panel is a singleton,
    and any tab may have its own shot associated with it, we have to
    manage these centrally.

    This instantiates ShotContext as necessary.  It also routes all
    messages from the panel (data/shoot-panel.js) to the individual
    ShotContext.
    */
const PanelContext = {
  _contexts: {},
  _activeContext: null,

  /** Hides the given ShotContext; error if you try to hide when
      you are not active */
  hide: function (shotContext) {
    if (this._activeContext != shotContext) {
      throw new Error("Hiding wrong shotContext");
    }
    this._activeContext = null;
    shootPanel.hide();
    shootButton.checked = false;
  },

  /** Show a ShotContext, hiding any other if necessary */
  show: function (shotContext) {
    if (this._activeContext === shotContext) {
      shootPanel.show();
      return;
    }
    if (this._activeContext) {
      throw new Error("Another context (" + this._activeContext.id + ") is showing");
    }
    this._activeContext = shotContext;
    shootPanel.show();
    shootButton.checked = true;
    this.updateShot(this._activeContext, this._activeContext.shot.allData());
  },

  /** Fired whenever the toolbar button is clicked, this activates
      a ShotContext, or creates a new one, or hides the panel */
  onShootButtonClicked: function () {
    if (! this._activeContext) {
      for (let id in this._contexts) {
        let shotContext = this._contexts[id];
        if (shotContext.couldBeActive()) {
          this.show(shotContext);
          console.log("found", shotContext.id);
          return;
        }
      }
      let shotContext = shooter.ShotContext(this, exports.getBackend());
      this.addContext(shotContext);
      this.show(shotContext);
    } else {
      shootPanel.show(this._activeContext);
    }
  },

  /** Called whenever the underlying data/model has been changed
      for a shot */
  updateShot: function (shotContext) {
    if (this._activeContext !== shotContext) {
      return;
    }
    shootPanel.port.emit("shotData", shotContext.shot.allData());
  },

  /** Called when a ShotContext is going away, to remove its
      registration with this PanelContext */
  removeContext: function (shotContext) {
    if (! this._contexts[shotContext.id]) {
      throw new Error("No such context: " + shotContext.id);
    }
    if (this._activeContext == shotContext) {
      this.hide(shotContext);
    }
    delete this._contexts[shotContext.id];
  },

  addContext: function (shotContext) {
    this._contexts[shotContext.id] = shotContext;
  }
};

// This pipes all messages that ShotContext expects over to the
// active context:
Object.keys(require("shooter.js").ShotContext.prototype.panelHandlers).forEach(function (messageType) {
  shootPanel.port.on(messageType, watchFunction(function () {
    if (! PanelContext._activeContext) {
      console.warn("Got " + messageType + " with no activeContext");
      return;
    }
    let method = PanelContext._activeContext.panelHandlers[messageType];
    method.apply(PanelContext._activeContext, arguments);
  }));
});

/** We use backendOverride to temporarily change the backend with a
    command-line argument (as used in the `run` script), otherwise
    falls back to the addon pref */
var backendOverride = null;

exports.getBackend = function () {
  return backendOverride || prefs.backend;
};

exports.main = function (options) {
  if (options.staticArgs.backend) {
    console.log("Using backend", options.staticArgs.backend, "instead of", prefs.backend);
    backendOverride = options.staticArgs.backend;
  }

  // Activates history tracking implicitly:
  //require("historytracker");

  helperworker.trackMods(backendOverride || null);
};
