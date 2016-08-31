const page = require("./page").page;

document.addEventListener("helper-ready", () => {
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent("page-ready", true, true, null);
  document.dispatchEvent(event);
}, false);

exports.launch = function (m) {
  page.render(m);
};

window.controller = exports;
