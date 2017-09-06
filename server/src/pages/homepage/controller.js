/* globals Mozilla */
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
  } else if (location.hash === "#tour") {
    try {
      Mozilla.UITour.showHighlight("screenshots");
    } catch (e) {
      console.warn("Attempted to start #tour on non-Firefox version or unsupported version");
      throw e;
    }
  }
});

document.dispatchEvent(new CustomEvent("request-addon-present"));

window.controller = exports;
