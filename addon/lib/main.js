/** The main module is loaded on startup

This also contains the UI that is directly in the browser,
specifically the button and control over the panel.  `lib/errors.js`
controls some error-specific UI
*/

"use strict";
// cfx set this to true, and causes a ton of messages
require("sdk/preferences/service").set("javascript.options.strict", false);

const self = require("sdk/self");
const shooter = require("./shooter");
const { prefs } = require('sdk/simple-prefs');
const helperworker = require("./helperworker");
const { ToggleButton } = require('sdk/ui/button/toggle');
const panels = require("sdk/panel");
const { watchFunction, watchWorker } = require("./errors");

// FIXME: this button should somehow keep track of whether there is an active shot associated with this page
var shootButton = ToggleButton({
  id: "pageshot-shooter",
  label: "Make shot",
  icon: self.data.url("icons/pageshot-camera-empty.svg"),
  onClick: watchFunction(function () {
    PanelContext.onShootButtonClicked();
  })
});
exports.shootButton = shootButton;

var shootPanel = panels.Panel({
  contentURL: self.data.url("shoot-panel.html"),
  contentScriptFile: [self.data.url("panel-bundle.js")],
  contentScriptOptions: {
    type: "shoot"
  },
  position: shootButton,
  height: 250,
  width: 400,
  onHide: watchFunction(function () {
    shootButton.state("window", null);
    shootButton.checked = false;
    PanelContext.shootPanelHidden();
  }),
  onShow: watchFunction(function () {
    shootButton.state("window", null);
    shootButton.checked = true;
    PanelContext.shootPanelShown();
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

  shootPanelHidden: function () {
    if (this._activeContext) {
      this._activeContext.isHidden();
    }
  },

  shootPanelShown: function () {
    if (this._activeContext) {
      this._activeContext.isShowing();
    }
  },

  /** Show a ShotContext, hiding any other if necessary */
  show: function (shotContext) {
    if (this._activeContext === shotContext) {
      shootPanel.show();
      shotContext.isShowing();
      return;
    }
    if (this._activeContext) {
      throw new Error("Another context (" + this._activeContext.id + ") is showing");
    }
    this._activeContext = shotContext;
    shootPanel.show();
    shotContext.isShowing();
    shootButton.checked = true;
    this.updateShot(this._activeContext, this._activeContext.shot.asJson());
  },

  /** Fired whenever the toolbar button is clicked, this activates
      a ShotContext, or creates a new one, or hides the panel */
  onShootButtonClicked: function () {
    /* FIXME: remove, once I'm sure the panel really works right...
    console.log(
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
        shootPanel.show(this._activeContext);
      }
    }
  },

  /** Called whenever the underlying data/model has been changed
      for a shot */
  updateShot: function (shotContext) {
    if (this._activeContext !== shotContext) {
      return;
    }
    shootPanel.port.emit("shotData",
      {
        backend: shotContext.shot.backend,
        id: shotContext.shot.id,
        shot: shotContext.shot.asJson(),
        activeClipName: shotContext.activeClipName
      }
    );
  },

  /** Called when the panel is switching from simple to edit view or vice versa */
  setSize: function (size) {
    if (size === "large") {
      shootPanel.resize(400, 525);
    } else if (size === "small") {
      shootPanel.resize(400, 250);
    } else {
      console.warn("setSize called with unknown size:", size, new Error().stack);
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
  }
};

// This pipes all messages that ShotContext expects over to the
// active context:
Object.keys(shooter.ShotContext.prototype.panelHandlers).forEach(function (messageType) {
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
    console.info("Using backend", options.staticArgs.backend, "instead of", prefs.backend);
    backendOverride = options.staticArgs.backend;
  }

  // Activates history tracking implicitly:
  //require("./historytracker");

  helperworker.trackMods(backendOverride || null);
  require("user").initialize(exports.getBackend());
  require("recall");
};
