"use strict";
// cfx set this to true.
require("sdk/preferences/service").set("javascript.options.strict", false);

var self = require("sdk/self");
var shooter = require("shooter");
var { ActionButton } = require("sdk/ui/button/action");
var { prefs } = require('sdk/simple-prefs');

var button = ActionButton({
  id: "pageshot-button",
  label: "Take a shot of this page",
  icon: self.data.url("icon.png"),
  onClick: function () {
    shooter.makeShot(backend);
  }
});

var backend = prefs.backend;

exports.main = function (options) {
  if (options.staticArgs.backend) {
    console.log("Using backend", options.staticArgs.backend, "instead of", backend);
    backend = options.staticArgs.backend;
  }
};
