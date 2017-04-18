// const page = require("./page").page;

const sendEvent = require("../../browser-send-event.js");
let helperReadyResolve;
let helperReadyPromise = new Promise((resolve, reject) => {
  helperReadyResolve = resolve;
});

document.addEventListener("addon-present", () => {
  helperReadyResolve();
}, false);

document.dispatchEvent(new CustomEvent("request-addon-present"));

exports.launch = function(m) {
  if (m.complete) {
    sendEvent("leave-service-completed");
    // eslint-disable-next-line promise/catch-or-return
    helperReadyPromise.then(() => {
      let event = new CustomEvent("delete-everything");
      document.dispatchEvent(event);
    });
  } else {
    sendEvent("start-leave-service");
  }
};

window.controller = exports;
