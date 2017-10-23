const sendEvent = require("../../browser-send-event.js");
const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");
const queryString = require("query-string");

const FIVE_SECONDS = 5 * 1000;

let model;

let firstRun = true;

const queryParamModelPropertyMap = {
  q: "defaultSearch",
  p: "pageNumber"
}

exports.launch = function(m) {
  if (m.hasDeviceId) {
    if (m.shots) {
      m.shots = m.shots.map((shot) => new AbstractShot(m.backend, shot.id, shot.json));
    }
    Object.assign(m, extractQueryParamValues(queryParamModelPropertyMap));
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
    if (window.wantsauth.getAuthData() && location.search.indexOf("reloaded") === -1) {
      location.search = "reloaded";
      return;
    }
    let authTimeout = setTimeout(() => {
      // eslint-disable-next-line no-global-assign, no-native-reassign
      location = location.origin + "/#tour";
    }, FIVE_SECONDS);
    window.wantsauth.addAuthDataListener((data) => {
      if (location.search.indexOf("reloaded") > -1) {
        return;
      }
      clearTimeout(authTimeout);
      location.search = "reloaded";
    });
  }
};

function render() {
  page.render(model);
}

function extractQueryParamValues(searchKeys) {
  const o = {};
  let qs = queryString.parse(window.location.search)

  Object.keys(searchKeys).forEach(x => {
    if (qs[x] !== undefined) {
      o[searchKeys[x]] = qs[x];
    }
  });

  return o;
}

function buildQueryStringFromModel(searchKeys, model) {
  const queryParams = {};

  Object.keys(searchKeys).forEach(x => {
    if (model[searchKeys[x]] !== undefined && model[searchKeys[x]] !== null) {
      queryParams[x] = model[searchKeys[x]];
    }
  })

  return queryString.stringify(queryParams);
}

exports.onChangeSearch = function(query) {
  model.defaultSearch = query;
  model.pageNumber = 1;
  updateHistory({q: query, p: null});
  refreshModel();
};

exports.onChangePage = function(pageNumber) {
  pageNumber = pageNumber || 1;
  model.pageNumber = pageNumber;
  updateHistory({p: pageNumber});
  refreshModel();
}

exports.getNewUrl = function(queryParam) {
  let url = "/shots";

  if (!queryParam) {
    return url;
  }

  let qs = queryString.parse(window.location.search)

  Object.keys(queryParam).forEach(x => {
    if (queryParam[x]) {
      qs[x] = queryParam[x];
    } else if (!queryParam[x] && qs[x]) {
      delete qs[x];
    }
  });

  if (Object.keys(qs).length) {
    url = `/shots?${queryString.stringify(qs)}`;
  }

  return url;
}

function updateHistory(queryParam) {
  let url = exports.getNewUrl(queryParam);
  window.history.pushState(null, "", url);
}

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
      window.Raven.captureException(new Error(`Error calling /api/delete-shot: ${req.status} ${req.statusText}`));
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
  let extraQueryParams = buildQueryStringFromModel(queryParamModelPropertyMap, model);
  if (extraQueryParams) {
    url += "&" + extraQueryParams;
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
