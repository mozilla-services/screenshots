/* browser: true */

const page = require("./page").page;

let model;

exports.launch = function(m) {
  model = m;
  window.history.pushState({}, m.title, m.finishedUrl);
  render();
};

function render() {
  page.render(model);
}

window.controller = exports;
