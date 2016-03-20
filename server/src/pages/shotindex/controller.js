/* jshint browser:true */

const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");

let model;

exports.launch = function (m) {
  m.shots = m.shots.map((shot) => new AbstractShot(m.backend, shot.id, shot.json));
  let match = /[\?&]q=([^&]+)/.exec(location.href);
  if (match) {
    m.defaultSearch = decodeURIComponent(match[1]);
  }
  model = m;
  render();
};

function render() {
  page.render(model);
}

exports.onChangeSearch = function (query) {
  model.defaultSearch = query;
  window.history.pushState(null, "", "/shots?q=" + encodeURIComponent(query));
  refreshModel();
};

// FIXME: this works, but we don't have a way to know when to trigger the refresh
function refreshModel() {
  let req = new XMLHttpRequest();
  let url = "/shots?data=json";
  if (model.defaultSearch) {
    url += "&q=" + encodeURIComponent(model.defaultSearch);
  }
  req.open("GET", url);
  req.onload = function () {
    if (req.status != 200) {
      console.warn("Error refreshing:", req.status, req);
      return;
    }
    let data = JSON.parse(req.responseText);
    exports.launch(data);
  };
  req.send();
}

document.addEventListener("helper-ready", function onHelperReady(e) {
  document.removeEventListener("helper-ready", onHelperReady, false);
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent("page-ready", true, true, null);
  document.dispatchEvent(event);
}, false);


window.controller = exports;
