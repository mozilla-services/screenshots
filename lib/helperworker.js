/* This adds a worker that helps our shot pages */
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var simplePrefs = require('sdk/simple-prefs');
var { captureTab } = require("./screenshot.js");
var pageMod = require("sdk/page-mod");
var clipboard = require("sdk/clipboard");
var notifications = require("sdk/notifications");

var existing;

function resetPageMod(backend) {
  backend = backend || simplePrefs.prefs.backend;
  if (existing) {
    existing.destroy();
  }
  var include = backend.replace(/^https?:\/\//, "");
  include = include.replace(/\/.*/, "");
  include = include.replace(/:.*/, "");
  include = "*." + include;
  existing = pageMod.PageMod({
    include: include,
    contentScriptFile: [self.data.url("viewerworker.js")],
    onAttach: function (worker) {
      worker.port.on("requestScreenshot", function (info) {
        var image = captureTab(worker.tab, info);
        worker.port.emit("screenshot", image, info);
      });
      worker.port.on("requestClipboard", function (info) {
        if (info.text) {
          clipboard.set(info.text, "text");
        }
        if (info.image) {
          clipboard.set(info.image, "html");
        }
        if (info.html) {
          clipboard.set(info.html, "html");
        }
        if (info.confirmationMessage) {
          notifications.notify({
            title: info.confirmationTitle,
            text: info.confirmationMessage,
            iconURL: backend + "/clipboard-8-xl.png"
          });
        }
      });
    }
  });
}

exports.trackMods = function (backendOverride) {
  resetPageMod(backendOverride);
  simplePrefs.on("backend", function () {
    resetPageMod(simplePrefs.prefs.backend);
  });
};
