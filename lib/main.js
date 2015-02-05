"use strict";
// cfx set this to true.
require("sdk/preferences/service").set("javascript.options.strict", false);

var self = require("sdk/self");
var shooter = require("shooter");
var { ActionButton } = require("sdk/ui/button/action");
var { prefs } = require('sdk/simple-prefs');
var helperworker = require("./helperworker");
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var { getHashList } = require("hashlist");

var button = ActionButton({
  id: "pageshot-button",
  label: "Take a shot of this page",
  icon: self.data.url("icon.png"),
  onClick: function () {
    shooter.makeShot(backend, null);
  }
});

var selectButton = ToggleButton({
  id: "pageshot-selector",
  label: "Save a shot to...",
  icon: self.data.url("icon-select.png"),
  onChange: function (state) {
    if (state.checked) {
      panel.show({
        position: selectButton
      });
    }
  }
});

var panel = panels.Panel({
  contentURL: self.data.url("selector.html"),
  contentScriptFile: self.data.url("selector.js"),
  onHide: function () {
    selectButton.state('window', {checked: false});
  }
});

var inlineButton = ActionButton({
  id: "pageshot-inline-button",
  label: "Select a point of interest in this page",
  icon: self.data.url("icon-inline.png"),
  onClick: function () {
    shooter.inlineShot(backend, null);
  }
});

exports.inlineButton = inlineButton;

panel.port.on("hello", function () {
  panel.port.emit("set-list", getHashList());
});

panel.port.on("click", function (name) {
  panel.hide();
  shooter.makeShot(backend, name);
});

panel.port.on("view", function (name) {
  panel.hide();
  require("sdk/tabs").open({
    url: backend + "/tag/" + name
  });
});

getHashList.on("add", function (newList) {
  panel.port.emit("set-list", newList);
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

  const {Cc, Ci} = require("chrome");
  var prefServiceBranch = Cc["@mozilla.org/preferences-service;1"]
      .getService(Ci.nsIPrefService).getBranch("");

  // Activates history tracking implicitly:
  require("historytracker");

  helperworker.trackMods(options.staticArgs.backend ? backend : null);
};
