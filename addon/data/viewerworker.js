/** This worker is attached to all documents served directly by Page Shot
    It effectively gives those pages some superpowers

    The real work is generally done in `lib/helperworker.js`
    */

document.addEventListener("request-clipboard", function (event) {
  self.port.emit("requestClipboard", event.detail);
}, false);

document.addEventListener("add-tags", function (event) {
  self.port.emit("addTags", event.detail);
}, false);

document.addEventListener("error", function (event) {
  console.error("Error via helper from", location.href);
  self.port.emit("alertError", event.detail);
}, false);

document.addEventListener("request-sign-up", function (event) {
  self.port.emit("requestSignUp");
});
document.addEventListener("request-sign-in", function (event) {
  self.port.emit("requestSignIn");
});
document.addEventListener("request-profile", function (event) {
  self.port.emit("requestProfile");
});
document.addEventListener("set-profile-state", function (event) {
  self.port.emit("setProfileState", event.detail);
});
document.addEventListener("delete-everything", function (event) {
  self.port.emit("deleteEverything");
});
document.addEventListener("content-tour-complete", function (event) {
  self.port.emit("contentTourComplete");
});
document.addEventListener("has-saved-shot", function (event) {
  self.port.emit("hasSavedShot", event.detail);
});
document.addEventListener("request-saved-shot", function (event) {
  self.port.emit("requestSavedShot", event.detail);
});
document.addEventListener("remove-saved-shot", function (event) {
  self.port.emit("removeSavedShot", event.detail);
});
document.addEventListener("error-no-sendEvent", function (event) {
  self.port.emit("error-no-sendEvent");
});
document.addEventListener("sendRichCopy", function (event) {
  self.port.emit("sendRichCopy", event.detail);
});

self.port.on("profile", function (profile) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("refresh-profile", true, true, JSON.stringify(profile));
  document.dispatchEvent(event);
});

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

let readyTimeout = setInterval(function () {
  var readyEvent = document.createEvent("CustomEvent");
  readyEvent.initCustomEvent("helper-ready", true, true, null);
  document.dispatchEvent(readyEvent);
}, 200);

document.addEventListener("page-ready", function () {
  clearTimeout(readyTimeout);
}, false);
