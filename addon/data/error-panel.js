/** Worker to go with error-panel.html

    This displays unexpected errors, and is controlled by `lib/errors.js`
    */

var errorContainer = document.getElementById("errors");

var firstError = true;

self.port.on("showError", function (error) {
  var thisError = document.createElement("div");
  thisError.className = "error";
  if (error.helpHtml) {
    thisError.innerHTML = error.helpHtml;
  } else {
    let errorFallback = JSON.stringify(error);
    if (errorFallback == "{}") {
      errorFallback = error + "";
    }
    thisError.textContent = error.help || error.message || error.name || errorFallback;
  }
  var titleElement = document.querySelector("h1");
  titleElement.textContent = error.title || "PageShot Error :(";
  console.warn(new Date(), "PageShot Error :-(", thisError.textContent);
  if (error.stack) {
    console.error(error.stack);
  }
  if (firstError) {
    // TODO Parameterize the dsn url
    unsafeWindow.sentryDSN = cloneInto("https://debfcc92d9cc4487867f0dd221dc6595@sentry.prod.mozaws.net/79", unsafeWindow);
    unsafeWindow.Raven.config(unsafeWindow.sentryDSN).install();
    firstError = false;
  }
  unsafeWindow.error = cloneInto(error, unsafeWindow);
  unsafeWindow.captureException(unsafeWindow.error);

  thisError.setAttribute("data-timestamp", Date.now());
  cullErrors();
  if (! errorExists(thisError)) {
    errorContainer.insertBefore(thisError, null);
  }
});

var MAX_AGE = 3 * 60 * 1000; // 3 minutes

/** Get rid of any errors that are too old (when a new error comes in) */
function cullErrors() {
  var now = Date.now();
  var children = errorContainer.querySelectorAll(".error");
  for (var i=children.length-1; i>=0; i--) {
    var child = children[i];
    var timestamp = parseInt(child.getAttribute("data-timestamp"), 10);
    if (! timestamp) {
      continue;
    }
    var age = now - timestamp;
    if (age > MAX_AGE) {
      child.parentNode.removeChild(child);
    }
  }
}

function errorExists(el) {
  var children = errorContainer.querySelectorAll(".error");
  for (var i=0; i<children.length; i++) {
    if (children[i].innerHTML == el.innerHTML) {
      return true;
    }
  }
  return false;
}

document.getElementById("clear").addEventListener("click", function () {
  errorContainer.innerHTML = "";
  self.port.emit("close");
}, false);

document.getElementById("ok").addEventListener("click", function () {
  self.port.emit("close");
}, false);
