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
  icon: self.data.url("icon-shoot.png"),
  /*onClick: function () {
    console.log("got shot click");
    PanelContext.onShootButtonClicked();
  },*/
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

const PanelContext = {
  _contexts: {},
  _activeContext: null,

  hide: function (shotContext) {
    if (this._activeContext != shotContext) {
      throw new Error("Hiding wrong shotContext");
    }
    this._activeContext = null;
    shootPanel.hide();
    shootButton.checked = false;
  },

  show: function (shotContext) {
    if (this._activeContext === shotContext) {
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
      let shotContext = shooter.ShotContext(this, backend);
      this.addContext(shotContext);
      this.show(shotContext);
    } else {
      shootPanel.show();
    }
  },

  updateShot: function (shotContext) {
    if (this._activeContext !== shotContext) {
      return;
    }
    shootPanel.port.emit("shotData", shotContext.shot.allData());
  },

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

["addComment", "copyLink", "openLink"].forEach(function (messageType) {
  shootPanel.port.on(messageType, watchFunction(function () {
    if (! PanelContext._activeContext) {
      console.warn("Got " + messageType + " with no activeContext");
      return;
    }
    let method = PanelContext._activeContext.panelHandlers[messageType];
    method.apply(PanelContext._activeContext, arguments);
  }));
});

var backend = prefs.backend;

exports.getBackend = function () {
  return backend;
};

exports.main = function (options) {
  if (options.staticArgs.backend) {
    console.log("Using backend", options.staticArgs.backend, "instead of", backend);
    backend = options.staticArgs.backend;
  }

  // Activates history tracking implicitly:
  require("historytracker");

  helperworker.trackMods(options.staticArgs.backend ? backend : null);
};
