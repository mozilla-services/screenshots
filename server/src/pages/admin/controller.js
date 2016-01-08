/* browser: true */
/* globals window, XMLHttpRequest, alert */

const page = require("./page").page;

let model;

exports.launch = function (m) {
  model = m;
  render();
};

function render() {
  page.render(model);
}

exports.onChangeLastShotTime = function (days) {
  model.lastShotTimeDays = days;
  model.lastShotCount = '\u2B6E';
  render();
  let req = new XMLHttpRequest();
  req.open("GET", `./api/recent/lastShotCount?lastShotTimeDays=${encodeURIComponent(days)}`);
  req.onload = function () {
    if (req.status == 200) {
      let data = JSON.parse(req.responseText);
      model.lastShotTimeDays = days;
      model.lastShotCount = data.count;
      render();
    } else {
      alert("Failed: " + req.status);
    }
  };
  req.send();
};

window.controller = exports;
