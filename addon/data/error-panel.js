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
    thisError.textContent = error.help || error.message || error.name || JSON.stringify(error);
  }
  var titleElement = document.querySelector("h1");
  titleElement.textContent = error.title || "PageShot Error :(";
  console.error(new Date(), "PageShot Error :-(", thisError.textContent);
  if (error.stack) {
    console.error(error.stack);
  }
  thisError.setAttribute("data-timestamp", Date.now());
  cullErrors();
  errorContainer.insertBefore(thisError, null);
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

document.getElementById("clear").addEventListener("click", function () {
  errorContainer.innerHTML = "";
  self.port.emit("close");
}, false);

document.getElementById("ok").addEventListener("click", function () {
  self.port.emit("close");
}, false);
