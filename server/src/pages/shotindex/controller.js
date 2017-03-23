const sendEvent = require("../../browser-send-event.js");
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
  let url = `/shots?q=${encodeURIComponent(query)}`;
  if (! query) {
    url = "/shots";
  }
  window.history.pushState(null, "", url);
  refreshModel();
};

// FIXME: copied from shot/controller.js
exports.deleteShot = function (shot) {
  let url = model.backend + "/api/delete-shot";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function () {
    if (req.status >= 300) {
      // FIXME: a lame way to do an error message
      window.alert("Error deleting shot: " + req.status + " " + req.statusText);
    } else {
      refreshModel();
    }
  };
  req.send(`id=${encodeURIComponent(shot.id)}`);
};

window.addEventListener("popstate", () => {
  let match = /[?&]q=([^&]*)/.exec(location.search);
  if (! match) {
    model.defaultSearch = "";
  } else {
    model.defaultSearch = decodeURIComponent(match[1]);
  }
  // FIXME: this isn't the "right" way to research the search box, but given that
  // it's an uncontrolled field it doesn't seem to be reset in this case otherwise:
  let el = document.getElementById("search");
  if (el) {
    el.value = model.defaultSearch;
  }
  refreshModel();
}, false);

function refreshModel() {
  let req = new XMLHttpRequest();
  let url = "/shots?data=json";
  if (model.defaultSearch) {
    url += "&q=" + encodeURIComponent(model.defaultSearch);
  }
  req.open("GET", url);
  req.onload = function () {
    document.body.classList.remove("search-results-loading");
    if (req.status != 200) {
      console.warn("Error refreshing:", req.status, req);
      return;
    }
    let data = JSON.parse(req.responseText);
    if (! data.shots.length) {
      sendEvent("no-search-results");
    }
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

document.addEventListener("contextmenu", (event) => {
  let place = "background";
  let node = event.target;
  while (node) {
    if (node.nodeType != document.ELEMENT_NODE) {
      node = node.parentNode;
      continue;
    }
    if (node.classList.contains("shot")) {
      place = "shot-tile";
      break;
    }
    if (node.tagName == "FORM") {
      place = "search";
      break;
    }
    if (node.classList.contains("header")) {
      place = "header";
      break;
    }
    node = node.parentNode;
  }
  sendEvent("contextmenu", place);
}, false);

window.controller = exports;
