const sendEvent = require("../../browser-send-event.js");
const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");
const queryString = require("query-string");

const FIVE_SECONDS = 5 * 1000;

let model;

let firstRun = true;

const queryParamModelPropertyMap = {
  q: "defaultSearch",
  p: "pageNumber",
};

exports.launch = function(m) {
  if (m.hasDeviceId) {
    if (m.shots) {
      m.shots = m.shots.map((shot) => {
        const s = new AbstractShot(m.backend, shot.id, shot.json);
        s.expireTime = shot.expireTime;
        s.isSynced = shot.isSynced;
        return s;
      });
    }
    Object.assign(m, extractQueryParamValues(queryParamModelPropertyMap));
    model = m;
  }

  if (window.wantsauth) {
    // Handle non-owner my shots page redirection
    if (!m.hasDeviceId) {
      if (window.wantsauth.getAuthData() && !location.search.includes("reloaded")) {
        location.search = "reloaded";
        return;
      }
      const authTimeout = setTimeout(() => {
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
      return;
    }
    // On redirection after FxA login, check if model.hasFxa set in reactrender and
    // model.accountId is unavailable. If yes, update model with savedAuthData returned
    // from wantsauth API
    if (!model.accountId && !model.hasFxa) {
      if (window.wantsauth.getAuthData()) {
        updateModel(window.wantsauth.getAuthData());
      } else {
        window.wantsauth.addAuthDataListener((data) => {
          updateModel(data);
        });
      }
    }
  } else if (firstRun && m.shots === null) {
    // The actual shot data hasn't been loaded yet, so we'll immediately request it:
    refreshModel();
  }
  firstRun = false;
  render();
};

function updateModel(authData) {
  Object.assign(model, authData);
  model.hasFxa = !!model.accountId;
  refreshModel();
}

function render() {
  page.render(model);
}

function extractQueryParamValues(searchKeys) {
  const o = {};
  const qs = queryString.parse(window.location.search);

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
  });

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
};

// queryParamsToUpdate is a dictionary of query param(s) to insert/update/delete
// in the query string; it does not represent all the params going into the query string.
exports.getNewUrl = function(queryParamsToUpdate) {
  let url = "/shots";

  if (!queryParamsToUpdate) {
    return url;
  }

  const qs = queryString.parse(window.location.search);

  Object.keys(queryParamsToUpdate).forEach(x => {
    if (queryParamsToUpdate[x]) {
      qs[x] = queryParamsToUpdate[x];
    } else if (!queryParamsToUpdate[x] && qs[x]) {
      delete qs[x];
    }
  });

  if (Object.keys(qs).length) {
    url = `/shots?${queryString.stringify(qs)}`;
  }

  return url;
};

function updateHistory(queryParamsToUpdate) {
  const url = exports.getNewUrl(queryParamsToUpdate);
  window.history.pushState(null, "", url);
}

// FIXME: copied from shot/controller.js
exports.deleteShot = function(shot) {
  const url = model.backend + "/api/delete-shot";
  const req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function() {
    if (req.status >= 300) {
      // FIXME: a lame way to do an error message
      let errorMessage = document.getElementById("shotIndexPageErrorDeletingShot").textContent;
      errorMessage = errorMessage.replace("{status}", req.status);
      errorMessage = errorMessage.replace("{statusText}", req.statusText);
      window.alert(errorMessage);
      window.Raven.captureException(new Error(`Error calling /api/delete-shot: ${req.status} ${req.statusText}`));
    } else if ((model.totalShots % model.shotsPerPage) === 1 && model.pageNumber > 1) {
      // On the boundary case where the user deletes the last image on a page
      // (where page number > 1), we need to decrement the page number.
      exports.onChangePage(model.pageNumber - 1);
    } else {
      refreshModel();
    }
  };
  req.send(`id=${encodeURIComponent(shot.id)}&_csrf=${encodeURIComponent(model.csrfToken)}`);
};

window.addEventListener("popstate", () => {
  const match = /[?&]q=([^&]{0,4000})/.exec(location.search);
  if (!match) {
    model.defaultSearch = "";
  } else {
    model.defaultSearch = decodeURIComponent(match[1]);
  }
  // FIXME: this isn't the "right" way to research the search box, but given that
  // it's an uncontrolled field it doesn't seem to be reset in this case otherwise:
  const el = document.getElementById("search");
  if (el) {
    el.value = model.defaultSearch;
  }
  refreshModel();
});

function refreshModel() {
  const req = new XMLHttpRequest();
  let url = "/shots?withdata=true&data=json";
  const extraQueryParams = buildQueryStringFromModel(queryParamModelPropertyMap, model);
  if (extraQueryParams) {
    url += "&" + extraQueryParams;
  }
  req.open("GET", url);
  req.onload = function() {
    document.body.classList.remove("search-results-loading");
    if (req.status !== 200) {
      console.warn("Error refreshing:", req.status, req);
      return;
    }
    const data = JSON.parse(req.responseText);
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
    if (node.nodeType !== document.ELEMENT_NODE) {
      node = node.parentNode;
      continue;
    }
    if (node.classList.contains("shot")) {
      place = "shot-tile";
      break;
    }
    if (node.tagName === "FORM") {
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
