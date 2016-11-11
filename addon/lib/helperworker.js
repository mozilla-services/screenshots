/** Adds a worker (viewerworker) to any pages on the pageshot domain

    Also handles requests from those pages, as piped through the worker

    This gives pageshot pages the ability to do things like copy to the
    clipboard.
    */

var self = require("sdk/self");
var simplePrefs = require("sdk/simple-prefs");
var pageMod = require("sdk/page-mod");
var clipboard = require("sdk/clipboard");
var notifications = require("sdk/notifications");
const shotstore = require("./shotstore");
const { watchFunction, watchWorker } = require("./errors");
const user = require("./user");
const {Cu} = require("chrome");
const { copyMultiple } = require("./multiclip");
const { copyInstructions } = require("./copy-instructions.js");

var existing;

Cu.import("resource:///modules/UITour.jsm");

function handleOAuthFlow(worker, backend, action) {
  return user.getProfileInfo().then(currentProfile => {
    if (currentProfile && currentProfile.email) {
      worker.port.emit("profile", currentProfile);
      return;
    }
    let handler = new user.OAuthHandler(backend);
    return handler.getOAuthParams().then(defaults => {
      let params = Object.assign({ action }, defaults);
      return handler.logInWithParams(params).then(() => {
        return handler.getProfileInfo();
      });
    });
  }).then(profile => {
    return user.setDefaultProfileInfo({
      email: profile.email,
      nickname: profile.display_name,
      avatarurl: profile.avatar
    });
  }).then(newProfile => {
    worker.port.emit("profile", newProfile);
  });
}

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
      watchWorker(worker);

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

      worker.port.on("requestSignUp", watchFunction(function () {
        handleOAuthFlow(worker, backend, "signup").catch(error => {
          console.error("Error creating account", error);
        });
      }));

      worker.port.on("requestSignIn", watchFunction(function () {
        handleOAuthFlow(worker, backend, "signin").catch(error => {
          console.error("Error signing in", error);
        });
      }));

      worker.port.on("requestProfile", watchFunction(function () {
        user.getProfileInfo().then(profile => {
          worker.port.emit("profile", profile);
        }).catch(error => {
          console.error("Error fetching profile", error);
        });
      }));

      worker.port.on("deleteEverything", watchFunction(function () {
        user.deleteEverything();
      }));

      worker.port.on("setProfileState", watchFunction(function ({ nickname, avatarurl }) {
        user.updateProfile(backend, { nickname, avatarurl }).then(newProfile => {
          worker.port.emit("profile", newProfile);
        }).catch(error => {
          console.error("Error updating profile state", error);
        });
      }));

      worker.port.on("error-no-sendEvent", watchFunction(function () {
        let error = new Error("Error: sendEvent missing in web view");
        error.noPopup = true;
        throw error;
      }));

      worker.port.on("sendRichCopy", watchFunction(function (data) {
        notifications.notify({
          title: "Rich Text Copied",
          text: `The image and link to your shot have been copied. ${copyInstructions()}`,
          iconURL: self.data.url("../data/copy.png")
        });
        copyMultiple({html: data.html, text: data.text});
      }));

      // FIXME: we aren't using this, but it does allow richer clipboard access
      // than the normal DOM API
      worker.port.on("requestClipboard", watchFunction(function (info) {
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
      }));

    }
  });
}

/** Used to track changes to to the backend pref */
exports.trackMods = function (backendOverride) {
  resetPageMod(backendOverride);
  simplePrefs.on("backend", function () {
    resetPageMod(simplePrefs.prefs.backend);
  });
};
