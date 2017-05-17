const page = require("./page").page;

let model;

exports.launch = function(m) {
  model = m;
  render();
};

function render() {
  page.render(model);
}

document.addEventListener("addon-present", () => {
  if (location.hash === "#hello") {
    document.dispatchEvent(new CustomEvent("request-onboarding"));
  }
});

document.dispatchEvent(new CustomEvent("request-addon-present"));

window.controller = exports;
