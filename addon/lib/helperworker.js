/** Adds a worker (viewerworker) to any pages on the pageshot domain

    Also handles requests from those pages, as piped through the worker

    This gives pageshot pages the ability to do things like copy to the
    clipboard.
    */

var self = require("sdk/self");
var simplePrefs = require("sdk/simple-prefs");
var pageMod = require("sdk/page-mod");
var notifications = require("sdk/notifications");
//const shotstore = require("./shotstore");
const { watchFunction, watchWorker } = require("./errors");
const user = require("./user");
const { copyMultiple } = require("./multiclip");
const { copyInstructions } = require("./copy-instructions.js");

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
    onAttach: function(worker) {
      watchWorker(worker);

      /*
      worker.port.on("hasSavedShot", watchFunction(function (id) {
        worker.port.emit("hasSavedShotResult", shotstore.hasShot(id));
      }));

      worker.port.on("requestSavedShot", watchFunction(function (id) {
        let data = Object.assign({}, shotstore.getShot(id));
        delete data.created;
        worker.port.emit("savedShotData", data);
      }));

      worker.port.on("removeSavedShot", watchFunction(function (id) {
        shotstore.removeSaved(id);
      }));
      */

      worker.port.on(
        "deleteEverything",
        watchFunction(function() {
          user.deleteEverything();
        })
      );

      worker.port.on(
        "error-no-sendEvent",
        watchFunction(function() {
          let error = new Error("Error: sendEvent missing in web view");
          error.noPopup = true;
          throw error;
        })
      );

      worker.port.on(
        "sendRichCopy",
        watchFunction(function(data) {
          notifications.notify({
            title: "Rich Text Copied",
            text: `The image and link to your shot have been copied. ${copyInstructions()}`,
            iconURL: self.data.url("../data/copy.png")
          });
          copyMultiple({ html: data.html, text: data.text });
        })
      );
    }
  });
}

/** Used to track changes to to the backend pref */
exports.trackMods = function(backendOverride) {
  resetPageMod(backendOverride);
  simplePrefs.on("backend", function() {
    resetPageMod(simplePrefs.prefs.backend);
  });
};
