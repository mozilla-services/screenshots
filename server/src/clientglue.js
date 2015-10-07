/* jslint browser:true */

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
    let toolbar = document.getElementById("toolbar");
    let fullPageButton = document.getElementById("full-page-button");
    let fullPageButtonScrollable = document.getElementById("full-page-button-scrollable");
    let frameElement = document.getElementById("frame");
    let offset = (fullPageButtonScrollable.clientHeight / 2);
    window.onscroll = function (e) {
      if (e.pageY > 40) {
        toolbar.style.visibility = "visible";
        let frameOffset = frameElement.getBoundingClientRect().top + window.scrollY;
        let toolbarHeight = toolbar.clientHeight;
        let visibleHeight = window.innerHeight - toolbarHeight;
        let frameTop = frameOffset - toolbarHeight;
        if (e.pageY >= frameTop - visibleHeight - offset) {
          fullPageButton.style.visibility = "hidden";
          fullPageButtonScrollable.style.visibility = "visible";
        } else {
          fullPageButton.style.visibility = "visible";
          fullPageButtonScrollable.style.visibility = "hidden";
        }
      } else {
        toolbar.style.visibility = "hidden";
      }
    };

    document.addEventListener("helper-ready", function onHelperReady(e) {
      document.removeEventListener("helper-ready", onHelperReady, false);
      requestProfile();
    }, false);
    document.addEventListener("refresh-profile", refreshProfile, false);
    window.addEventListener("hashchange", refreshHash, false);
    refreshHash();
  }
  render();
};

function render() {
  setGitRevision(model.gitRevision);
  let attrs = { staticLink };
  for (let attr in model) {
    attrs[attr] = model[attr];
  }
  for (let attr in profile) {
    attrs[attr] = profile[attr];
  }
  let frame = FrameFactory(attrs);

  React.render(
    frame,
    document.getElementById("react-body-container"));
}

function refreshProfile(e) {
  profile = JSON.parse(e.detail);
  render();
}

function refreshHash() {
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
  render();
  ga("send", "event", source, {page: location.toString()});
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
