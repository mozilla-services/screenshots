/* browser: true */

const page = require("./page").page;

let model;

exports.launch = function(m) {
  model = m;
  render();
};

function render() {
  page.render(model);
}

window.controller = exports;
