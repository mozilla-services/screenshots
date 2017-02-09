/** This worker is attached to all documents served directly by Page Shot
    It effectively gives those pages some superpowers

    The real work is generally done in `lib/helperworker.js`
    */

document.addEventListener(
  "error",
  function(event) {
    console.error("Error via helper from", location.href);
    self.port.emit("alertError", event.detail);
  },
  false
);

document.addEventListener("delete-everything", function(event) {
  self.port.emit("deleteEverything");
});
/*
document.addEventListener("has-saved-shot", function (event) {
  self.port.emit("hasSavedShot", event.detail);
});
document.addEventListener("request-saved-shot", function (event) {
  self.port.emit("requestSavedShot", event.detail);
});
document.addEventListener("remove-saved-shot", function (event) {
  self.port.emit("removeSavedShot", event.detail);
});
*/
document.addEventListener("error-no-sendEvent", function(event) {
  self.port.emit("error-no-sendEvent");
});
document.addEventListener("sendRichCopy", function(event) {
  self.port.emit("sendRichCopy", event.detail);
});

/*
self.port.on("hasSavedShotResult", function (hasShot) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("has-saved-shot-result", true, true, JSON.stringify(hasShot));
  document.dispatchEvent(event);
});

self.port.on("savedShotData", function (data) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("saved-shot-data", true, true, JSON.stringify(data));
  document.dispatchEvent(event);
});
*/

let readyTimeout = setInterval(
  function() {
    var readyEvent = document.createEvent("CustomEvent");
    readyEvent.initCustomEvent("helper-ready", true, true, null);
    document.dispatchEvent(readyEvent);
  },
  200
);

document.addEventListener(
  "page-ready",
  function() {
    clearTimeout(readyTimeout);
  },
  false
);
