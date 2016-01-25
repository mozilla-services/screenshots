/* jslint browser:true */
/* globals ga */

let React = require("react"),
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
  model.shot = new AbstractShot(data.backend, data.id, data.shot);
  model.shot.contentUrl = `//${data.contentOrigin}/content/${model.shot.id}`;
  model.shot.urlIfDeleted = data.urlIfDeleted;
  model.shot.expireTime = new Date(data.expireTime);
  model.shot.deleted = data.deleted;

  if (firstSet) {
    let button = document.getElementById("full-page-button-scrollable");
    if (button) {
      // Button isn't present on expiration page
      let offset = button.clientHeight / 2;
      document.body.classList.add("window-scrolled-up");
      window.onscroll = function (e) {
        if (e.pageY > 40) {
          let toolbar = document.getElementById("toolbar");
          let frameElement = document.getElementById("frame");
          document.body.classList.remove("window-scrolled-up");
          let frameOffset = frameElement.getBoundingClientRect().top + window.scrollY;
          let toolbarHeight = toolbar.clientHeight;
          let visibleHeight = window.innerHeight - toolbarHeight;
          let frameTop = frameOffset - toolbarHeight;
          if (e.pageY >= frameTop - visibleHeight - offset) {
            document.body.classList.add("window-scrolled-fully");
            document.body.classList.remove("window-scrolled-down");
          } else {
            document.body.classList.add("window-scrolled-down");
            document.body.classList.remove("window-scrolled-fully");
          }
        } else {
          document.body.classList.add("window-scrolled-up");
          document.body.classList.remove("window-scrolled-down");
          document.body.classList.remove("window-scrolled-fully");
        }
      };
    }

    document.addEventListener("helper-ready", function onHelperReady(e) {
      document.removeEventListener("helper-ready", onHelperReady, false);
      requestProfile();
    }, false);
    document.addEventListener("refresh-profile", refreshProfile, false);
    window.addEventListener("hashchange", refreshHash, false);
    refreshHash();
  }
  try {
    exports.render();
  } catch (e) {
    window.Raven.captureException(e);
    throw e;
  }
};

exports.render = function render() {
  if (window.introJSRunning) {
    console.info("intro.js was running, not rendering.");
    return;
  }
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

  React.render(
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
      location.href = model.backend + "/shot-deleted";
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
  let source = "change-clip";
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
  ga("send", "event", "website", "navigated", {page: location.toString()});
}

function sendShowElement(clipId) {
  let frame = document.getElementById("frame");
  if (! frame) {
    throw new Error("Could not find #frame");
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

if (typeof window != "undefined") {
  window.clientglue = exports;
}
