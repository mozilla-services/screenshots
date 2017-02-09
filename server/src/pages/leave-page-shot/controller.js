// const page = require("./page").page;

const sendEvent = require("../../browser-send-event.js");
let helperReadyResolve;
let helperReadyPromise = new Promise((resolve, reject) => {
  helperReadyResolve = resolve;
});

document.addEventListener(
  "helper-ready",
  () => {
    helperReadyResolve();
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent("page-ready", true, true, null);
    document.dispatchEvent(event);
  },
  false
);

exports.launch = function(m) {
  if (m.complete) {
    sendEvent("leave-page-shot-completed");
    helperReadyPromise.then(() => {
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("delete-everything", true, true, null);
      document.dispatchEvent(event);
    });
  } else {
    sendEvent("start-leave-page-shot");
  }
};

window.controller = exports;
