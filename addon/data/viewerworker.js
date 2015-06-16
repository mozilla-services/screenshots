/** This worker is attached to all documents served directly by PageShot
    It effectively gives those pages some superpowers

    The real work is generally done in `lib/helperworker.js`
    */

// FIXME: we shouldn't do name translations (e.g., request-screenshot to
// requestScreenshot), and we should pipe messages as a loop:
document.addEventListener("request-screenshot", function (event) {
  self.port.emit("requestScreenshot", event.detail);
}, false);

document.addEventListener("request-clipboard", function (event) {
  self.port.emit("requestClipboard", event.detail);
}, false);

document.addEventListener("add-tags", function (event) {
  self.port.emit("addTags", event.detail);
}, false);

document.addEventListener("check-captured", function (event) {
  self.port.emit("checkCaptured", event.detail);
}, false);

document.addEventListener("error", function (event) {
  console.error("Error via helper from", location.href);
  self.port.emit("alertError", event.detail);
}, false);

self.port.on("screenshot", function (image, info) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("got-screenshot", true, true, JSON.stringify({
    image: image,
    info: info
  }));
  document.dispatchEvent(event);
});

self.port.on("checkCapturedResult", function (result) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("check-captured-result", true, true, JSON.stringify(result));
  document.dispatchEvent(event);
});

var readyEvent = document.createEvent("CustomEvent");
readyEvent.initCustomEvent("helper-ready", true, true, null);
document.dispatchEvent(readyEvent);

// FIXME: not sure if this might mess up an in-content onerror handler, though I suppose
// we just shouldn't create one?
window.onerror = function (message, url, line, col, error) {
  console.error("Error from onerror", url);
  self.port.emit("alertError", {
    name: error.name || "ERROR",
    message: message,
    help: "Uncaught error: " + error + " at " + url + "@" + line + ":" + col
  });
};
