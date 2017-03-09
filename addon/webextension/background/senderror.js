/* globals chrome, communication, makeUuid, Raven, catcher, auth */

window.errorpopup = (function () {
  let exports = {};

  let messages = {
    REQUEST_ERROR: {
      title: "Page Shot is out of order.",
      info: "Your shot was not saved.  We apologize for the inconvenience. Try again soon."
    },
    CONNECTION_ERROR: {
      title: "Cannot connect to the Page Shot server.",
      info: "There may be a problem with the service or with your network connection."
    },
    LOGIN_ERROR: {
      title: "Page Shot is out of order.",
      info: "Your shot was not saved.  There was an error authenticating with the server."
    },
    LOGIN_CONNECTION_ERROR: {
      title: "Cannot connect to the Page Shot server.",
      info: "There may be a problem with the service or your network connection."
    },
    UNSHOOTABLE_PAGE: {
      title: "Page cannot be screenshotted",
      info: "This is not a normal web page, and Page Shot cannot capture screenshots from it."
    },
    SHOT_PAGE: {
      title: "You can't take a shot of a Page Shot page!"
    },
    MY_SHOTS: {
      title: "You can't take a shot of a Page Shot page!"
    },
    generic: {
      title: "Page Shot went haywire.",
      info: "Try again or take a shot on another page?",
      showMessage: true
    }
  };

  communication.register("reportError", (error) => {
    catcher.unhandled(error);
  });

  exports.showError = function (error) {
    let id = makeUuid();
    let popupMessage = error.popupMessage || "generic";
    if (! messages[popupMessage]) {
      popupMessage = "generic";
    }
    let title = messages[popupMessage].title;
    let message = messages[popupMessage].message || null;
    let showMessage = messages[popupMessage].showMessage;
    if (error.message && showMessage) {
      if (message) {
        message += "\n" + error.message;
      } else {
        message = error.message;
      }
    }
    chrome.notifications.create(id, {
      type: "basic",
      // FIXME: need iconUrl for an image, see #2239
      title,
      message
    });
  };

  exports.reportError = function (e) {
    let dsn = auth.getSentryPublicDSN();
    if (! dsn) {
      console.warn("Error:", e);
      return;
    }
    if (! Raven.isSetup()) {
      Raven.config(dsn).install();
    }
    let exception = new Error(e.message);
    exception.stack = e.multilineStack || e.stack || undefined;
    let rest = {};
    for (let attr in e) {
      if (! ["name", "message", "stack", "multilineStack", "popupMessage", "version", "sentryPublicDSN", "help"].includes(attr)) {
        rest[attr] = e[attr];
      }
    }
    rest.stack = e.multilineStack || e.stack;
    Raven.captureException(exception, {
      logger: 'addon',
      tags: {version: e.version, category: e.popupMessage},
      message: exception.message,
      extra: rest
    });
  };

  catcher.registerHandler((errorObj) => {
    exports.showError(errorObj);
    if (! errorObj.noPopup) {
      exports.reportError(errorObj);
    }
  });

  return exports;
})();
