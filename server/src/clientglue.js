/* jshint browser:true */

let React = require("react"),
  { FrameFactory } = require("./views/frame.js"),
  { setGitRevision, staticLink } = require("./linker"),
  { AbstractShot } = require("../../shared/dist/shot");

let model;

exports.setModel = function (data) {
  let firstSet = ! model;
  model = data;
  model.shot = new AbstractShot(data.backend, data.id, data.shot);
  render();
  console.log("firstSet", firstSet);
  if (firstSet) {
    window.addEventListener("hashchange", refreshHash, false);
    refreshHash();
  }
};

function render() {
  setGitRevision(model.gitRevision);
  let attrs = {
    staticLink: staticLink
  };
  for (let attr in model) {
    attrs[attr] = model[attr];
  }
  let frame = FrameFactory(attrs);
  React.render(frame, document);
}

function refreshHash() {
  let clipId = null;
  let match = (/clip=([^&]+)/).exec(location.hash);
  if (match) {
    clipId = decodeURIComponent(match[1]);
  }
  console.log("refresh hash", clipId, model.activeClipId);
  if ((model.activeClipId || null) === clipId) {
    // No change
    return;
  }
  model.activeClipId = clipId;
  render();
  sendShowElement(clipId);
}

let _pendingMessage;

function sendShowElement(clipId) {
  let frame = document.getElementById("frame");
  if (! frame) {
    throw new Error("Could not find #frame");
  }
  let message;
  if (clipId) {
    let clip = model.shot.getClip(clipId);
    if (! clip) {
      throw new Error("Could not find clip with id " + clipId);
    }
    message = {
      type: "displayClip",
      clip: clip.asJson()
    };
  } else {
    message = {
      type: "removeDisplayClip"
    };
  }
  function post(message) {
    message = message || _pendingMessage;
    console.log("sending to child", message);
    frame.contentWindow.postMessage(message, location.origin);
    _pendingMessage = null;
  }
  if (frame.contentDocument.readyState == "complete") {
    post(message);
  } else {
    _pendingMessage = message;
    frame.contentWindow.onload = post;
  }
}

if (typeof window != "undefined") {
  window.clientglue = exports;
}
