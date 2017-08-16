const sendEvent = require("../../browser-send-event.js");
const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");

const TEN_SECONDS = 10 * 1000;

let model;

let firstRun = true;

exports.launch = function(m) {
  if (m.hasDeviceId) {
    if (m.shots) {
      m.shots = m.shots.map((shot) => new AbstractShot(m.backend, shot.id, shot.json));
    }
    let match = /[?&]q=([^&]{1,4000})/.exec(location.href);
    if (match) {
      m.defaultSearch = decodeURIComponent(match[1]);
    }
    model = m;
    render();
    if (firstRun && m.shots === null) {
      // The actual shot data hasn't been loaded yet, so we'll immediately request it:
      refreshModel();
    }
    firstRun = false;
    return;
  }
  if (window.wantsauth) {
    if (window.wantsauth.getAuthData()) {
      location.reload();
    } else {
      let authTimeout = setTimeout(() => {
        location.pathname = "";
      }, TEN_SECONDS);
      window.wantsauth.addAuthDataListener((data) => {
        clearTimeout(authTimeout);
        location.reload();
      });
    }
  }
};

function render() {
  page.render(model);
}

exports.onChangeSearch = function(query) {
  model.defaultSearch = query;
  let url = `/shots?q=${encodeURIComponent(query)}`;
  if (!query) {
    url = "/shots";
  }
  window.history.pushState(null, "", url);
  refreshModel();
};

// FIXME: copied from shot/controller.js
exports.deleteShot = function(shot) {
  let url = model.backend + "/api/delete-shot";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function() {
    if (req.status >= 300) {
      // FIXME: a lame way to do an error message
      let errorMessage = document.getElementById("shotIndexPageErrorDeletingShot").textContent;
      errorMessage = errorMessage.replace('{status}', req.status);
      errorMessage = errorMessage.replace('{statusText}', req.statusText);
      window.alert(errorMessage);
    } else {
      refreshModel();
    }
  };
  req.send(`id=${encodeURIComponent(shot.id)}&_csrf=${encodeURIComponent(model.csrfToken)}`);
};

window.addEventListener("popstate", () => {
  let match = /[?&]q=([^&]{0,4000})/.exec(location.search);
  if (!match) {
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
});

function refreshModel() {
  let req = new XMLHttpRequest();
  let url = "/shots?withdata=true&data=json";
  if (model.defaultSearch) {
    url += "&q=" + encodeURIComponent(model.defaultSearch);
  }
  req.open("GET", url);
  req.onload = function() {
    document.body.classList.remove("search-results-loading");
    if (req.status != 200) {
      console.warn("Error refreshing:", req.status, req);
      return;
    }
    let data = JSON.parse(req.responseText);
    if (data.shots && !data.shots.length) {
      sendEvent("no-search-results");
    }
    exports.launch(data);
  };
  req.send();
}

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
});

window.controller = exports;
