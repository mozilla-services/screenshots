/* jslint browser:true */

const sendEvent = require("./browser-send-event.js");
let ReactDOM = require("react-dom"),
  { FrameFactory } = require("./views/frame.js"),
  { setGitRevision, staticLink } = require("./linker"),
  { AbstractShot } = require("../shared/shot"),
  { requestProfile } = require("./events");

// This represents the model we are rendering:
let model;

// This represents the current user's profile.
let profile;

exports.setModel = function (data) {
  let firstSet = ! model;
  model = data;
  model.hasSavedShot = false;
  model.shot = new AbstractShot(data.backend, data.id, data.shot);
  model.shot.contentUrl = `//${data.contentOrigin}/content/${model.shot.id}`;
  model.shot.urlIfDeleted = data.urlIfDeleted;
  model.shot.expireTime = new Date(data.expireTime);
  model.shot.deleted = data.deleted;

  if (firstSet) {
    document.addEventListener("helper-ready", function onHelperReady(e) {
      document.removeEventListener("helper-ready", onHelperReady, false);
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("page-ready", true, true, null);
      document.dispatchEvent(event);
      requestProfile();
      requestHasSavedShot(model.shot.id);
    }, false);
    document.addEventListener("refresh-profile", refreshProfile, false);
    document.addEventListener("has-saved-shot-result", function (event) {
      let result = JSON.parse(event.detail);
      model.hasSavedShot = result;
      exports.render();
    }, false);
    document.addEventListener("saved-shot-data", function (event) {
      let result = JSON.parse(event.detail);
      addSavedShotData(result);
    }, false);
    refreshHash();
  }
  try {
    exports.render();
  } catch (e) {
    window.Raven.captureException(e);
    throw e;
  }
  // FIXME: copied from frame.js
  let isExpired = model.expireTime !== null && Date.now() > model.expireTime;
  if (model.isOwner) {
    if (isExpired) {
      sendEvent("view-expired", "owner");
    } else {
      sendEvent("visit", "owner");
      if (Date.now() - model.shot.createdDate < 30000) {
        // FIXME: hacky way to determine if this is the first visit:
        sendEvent("visit", "owner-first");
      }
    }
  } else {
    if (isExpired) {
      sendEvent("view-expired", "non-owner");
    } else {
      sendEvent("visit", "non-owner");
    }
  }
};

exports.render = function render() {
  setGitRevision(model.gitRevision);
  let attrs = { staticLink };
  for (let attr in model) {
    attrs[attr] = model[attr];
  }
  for (let attr in profile) {
    attrs[attr] = profile[attr];
  }
  attrs.clientglue = exports;
  let frame = FrameFactory(attrs);

  ReactDOM.render(
    frame,
    document.getElementById("react-body-container"));
};

exports.changeShotExpiration = function (shot, expiration) {
  let wasExpired = model.expireTime !== null && model.expireTime < Date.now();
  let url = model.backend + "/api/set-expiration";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function () {
    if (req.status >= 300) {
      window.alert("Error saving expiration: " + req.status + " " + req.statusText);
    } else {
      if (expiration === 0) {
        model.shot.expireTime = model.expireTime = null;
      } else {
        model.shot.expireTime = model.expireTime = new Date(Date.now() + expiration);
      }
      exports.render();
    }
  };
  if (wasExpired) {
    req.onload = function () {
      location.reload();
    };
  }
  req.send(`id=${encodeURIComponent(shot.id)}&expiration=${encodeURIComponent(expiration)}`);
};

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
      location.href = model.backend + "/shots";
    }
  };
  req.send(`id=${encodeURIComponent(shot.id)}`);
};

function refreshProfile(e) {
  profile = JSON.parse(e.detail);
  exports.render();
}

function refreshHash() {
  if (location.hash === "#fullpage") {
    let frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
    let toolbarHeight = document.getElementById("toolbar").clientHeight;
    let frameTop = frameOffset - (toolbarHeight * 2);
    window.scroll(0, frameTop);
    return;
  }
  let clipId = null;
  let match = (/clip=([^&]+)/).exec(location.hash);
  if (match) {
    clipId = decodeURIComponent(match[1]);
  }
  let source = "change-clip"; // eslint-disable-line no-unused-vars
  match = (/source=([^&]+)/).exec(location.hash);
  if (match) {
    source = decodeURIComponent(match[1]);
  }
  if ((model.activeClipId || null) === clipId) {
    // No change
    return;
  }
  model.activeClipId = clipId;
  sendShowElement(clipId);
  exports.render();
}

function sendShowElement(clipId) {
  let frame = document.getElementById("frame");
  if (! frame) {
    return;
  }
  let postMessage;
  if (clipId) {
    let clip = model.shot.getClip(clipId);
    if (! clip) {
      throw new Error("Could not find clip with id " + clipId);
    }
    postMessage = {
      type: "displayClip",
      clip: clip.asJson()
    };
  } else {
    postMessage = {
      type: "removeDisplayClip"
    };
  }

  try {
    window.sendToChild(postMessage);
  } catch (e) {
    console.error("Error sending postMessage:", e);
    console.error("Message:", postMessage);
    throw e;
  }
}

function requestHasSavedShot(id) {
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent("has-saved-shot", true, true, id);
  document.dispatchEvent(event);
}

exports.requestSavedShot = function () {
  let event = document.createEvent("CustomEvent");
  event.initCustomEvent("request-saved-shot", true, true, model.shot.id);
  document.dispatchEvent(event);
};

function addSavedShotData(data) {
  if (! data) {
    model.hasSavedShot = false;
    exports.render();
    return;
  }
  for (let attr in data) {
    if (! data[attr]) {
      delete data[attr];
    }
  }
  data.showPage = true;
  model.shot.update(data);
  model.hasSavedShot = false;
  let url = model.backend + "/api/add-saved-shot-data/" + model.shot.id;
  let req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status >= 300) {
      window.alert("Error saving expiration: " + req.status + " " + req.statusText);
      return;
    }
    let event = document.createEvent("CustomEvent");
    event.initCustomEvent("remove-saved-shot", true, true, model.shot.id);
    document.dispatchEvent(event);
    exports.render();
  };
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/json");
  req.send(JSON.stringify(data));
}

if (typeof window != "undefined") {
  window.clientglue = exports;
}
