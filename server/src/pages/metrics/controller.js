const page = require("./page").page;

let model;

exports.launch = function(m) {
  model = m;
  render();
};

function render() {
  page.render(model);
}

exports.onChangeLastShotTime = function(days) {
  if (days <= 0 || isNaN(days)) {
    return;
  }
  model.lastShotTimeDays = days;
  model.lastShotCount = '\u2B6E';
  render();
  const req = new XMLHttpRequest();
  req.open("GET", `./api/recent/lastShotCount?lastShotTimeDays=${encodeURIComponent(days)}`);
  req.onload = function() {
    if (req.status == 200) {
      const data = JSON.parse(req.responseText);
      model.lastShotTimeDays = days;
      model.lastShotCount = data.count;
      render();
    } else {
      alert("Failed: " + req.status);
    }
  };
  req.send();
};

exports.onChangeNumberOfShotsTime = function(days) {
  if (days <= 0 || isNaN(days)) {
    return;
  }
  model.numberOfShotsTime = days;
  model.numberOfShotsBuckets = {1: 0};
  render();
  const req = new XMLHttpRequest();
  req.open("GET", `./api/recent/numberOfShots?lastShotTimeDays=${encodeURIComponent(days)}`);
  req.onload = function() {
    if (req.status == 200) {
      const data = JSON.parse(req.responseText);
      model.numberOfShotsBuckets = data.buckets;
      render();
    } else {
      alert("Failed: " + req.status);
    }
  };
  req.send();
};

window.controller = exports;
