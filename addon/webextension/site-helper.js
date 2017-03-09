/* globals document, alert, chrome, setInterval, clearTimeout */

function sendEvent(type, detail) {
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent(type, true, true, detail);
  document.dispatchEvent(event);
}

document.addEventListener("has-saved-shot", (event) => {
  chrome.runtime.sendMessage({
    type: "has-saved-shot",
    id: event.detail
  }, (response) => {
    sendEvent("has-saved-shot-result", JSON.stringify(response));
  });
}, false);

document.addEventListener("request-saved-shot", (event) => {
  chrome.runtime.sendMessage({
    type: "request-saved-shot",
    id: event.detail
  }, (response) => {
    delete response.created;
    sendEvent("saved-shot-data", JSON.stringify(response));
  });
}, false);

document.addEventListener("remove-saved-shot", (event) => {
  chrome.runtime.sendMessage({
    type: "remove-saved-shot",
    id: event.detail
  });
}, false);

document.addEventListener("delete-everything", (event) => {
  // FIXME: implement
  alert("Not yet implemented");
}, false);

let readyTimeout = setInterval(function () {
  var readyEvent = document.createEvent("CustomEvent");
  readyEvent.initCustomEvent("helper-ready", true, true, null);
  document.dispatchEvent(readyEvent);
}, 200);

document.addEventListener("page-ready", function () {
  clearTimeout(readyTimeout);
}, false);
