/* globals unsafeWindow, cloneInto */
/** Worker to go with error-panel.html

    This displays unexpected errors, and is controlled by `lib/errors.js`
    */

var errorContainer = document.getElementById("errors");

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
    let thisMessage = document.createElement("div");
    thisMessage.className = "error-message"
    thisMessage.textContent = error.message;
    thisError.appendChild(thisMessage);
  }
  var titleElement = document.querySelector("h1");
  if (error.title) {
    titleElement.textContent = error.title;
  }
  console.warn(new Date(), "Page Shot Error:", thisError.textContent, error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  unsafeWindow.error = cloneInto(error, unsafeWindow);
  unsafeWindow.captureException(unsafeWindow.error);

  thisError.setAttribute("data-timestamp", Date.now());
  cullErrors();
  if (! errorExists(thisError)) {
    // Only show one error at a time, for now.
    while (errorContainer.firstChild) {
      errorContainer.removeChild(errorContainer.firstChild);
    }
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

document.getElementById("my-shots").addEventListener("click", function () {
  self.port.emit("my-shots");
}, false);

// FIXME remove when we're sure we don't want this ui any more.
/*
document.getElementById("clear").addEventListener("click", function () {
  errorContainer.innerHTML = "";
  self.port.emit("close");
}, false);

document.getElementById("ok").addEventListener("click", function () {
  self.port.emit("close");
}, false);
*/
