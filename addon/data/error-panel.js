/* globals unsafeWindow, cloneInto */
/** Worker to go with error-panel.html

    This displays unexpected errors, and is controlled by `lib/errors.js`
    */

var errorContainer = document.getElementById("error-container");

self.port.on("showError", function(error) {
  let popupMessage = error.popupMessage || "generic";
  let el = document.getElementById(`error-${popupMessage}`);
  if (!el) {
    console.error("No error template found for", popupMessage);
    el = document.getElementById("error-generic");
  }
  el = el.cloneNode(true);
  el.id = el.id + "-instantiated";
  el.className += " error";
  let messageEl = el.querySelector(".error-message");
  if (error.message && messageEl) {
    messageEl.textContent = error.message;
    el.appendChild(messageEl);
  } else if (messageEl && !error.message) {
    messageEl.parentNode.removeChild(messageEl);
  }
  errorContainer.innerHTML = "";
  errorContainer.insertBefore(el, null);
  unsafeWindow.error = cloneInto(error, unsafeWindow);
  unsafeWindow.captureException(unsafeWindow.error);
});

document.getElementById("my-shots").addEventListener(
  "click",
  function() {
    self.port.emit("my-shots");
  },
  false
);
