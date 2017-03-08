/* jslint browser:true */

const sendEvent = require("../../browser-send-event.js");
const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");
const { shotGaFieldForValue } = require("../../ab-tests.js");

// This represents the model we are rendering:
let model;

exports.launch = function (data) {
  let firstSet = ! model;
  model = data;
  model.hasSavedShot = false;
  model.shot = new AbstractShot(data.backend, data.id, data.shot);
  model.shot.contentUrl = `//${model.contentOrigin}/content/${model.shot.id}`;
  model.shot.urlIfDeleted = model.urlIfDeleted;
  model.shot.expireTime = new Date(model.expireTime);
  model.shot.deleted = model.deleted;
  model.controller = exports;
  if (model.shot.abTests) {
    for (let testName in model.shot.abTests) {
      let testValue = model.shot.abTests[testName];
      if (testValue) {
        let shotFieldName = shotGaFieldForValue(testName, testValue);
        if (shotFieldName) {
          window.abTests[testName + "_shot"] = {
            gaField: shotFieldName,
            value: testValue
          };
        }
      }
    }
  }
  if (firstSet) {
    document.addEventListener("helper-ready", function onHelperReady(e) {
      document.removeEventListener("helper-ready", onHelperReady, false);
      let event = document.createEvent("CustomEvent");
      event.initCustomEvent("page-ready", true, true, null);
      document.dispatchEvent(event);
      //requestHasSavedShot(model.shot.id);
    }, false);
    /*
    document.addEventListener("has-saved-shot-result", function (event) {
      let result = JSON.parse(event.detail);
      model.hasSavedShot = result;
      render();
    }, false);
    document.addEventListener("saved-shot-data", function (event) {
      let result = JSON.parse(event.detail);
      addSavedShotData(result);
    }, false);
    */
    refreshHash();
  }
  try {
    render();
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
      render();
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

exports.setTitle = function (title) {
  title = title || null;
  let url = model.backend + "/api/set-title/" + model.shot.id;
  let req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status >= 300) {
      window.alert("Error saving title: " + req.status + " " + req.statusText);
      return;
    }
    model.shot.userTitle = title;
    render();
  };
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/json");
  req.send(JSON.stringify({ title }));
};

exports.sendRichCopy = function () {
  let event = document.createEvent("CustomEvent");
  function quote(s) {
    s = s+"";
    return s.replace(/"/g, '&quot;').replace(/</g, '&gt;').replace(/&/g, '&amp;');
  }
  let shot = model.shot;
  let clip = shot.getClip(shot.clipNames()[0]);
  let src = clip.image.url;
  let height = clip.image.dimensions.y;
  let width = clip.image.dimensions.x;
  let adjust = Math.min(500 / width, 350 / height);
  if (adjust < 1) {
    height = height * adjust;
    width = width * adjust;
  }
  let detail = {
    html: `<img src="${quote(src)}" height="${quote(height)}" width="${quote(width)}" /><br /><a href="${quote(shot.viewUrl)}">${quote(shot.title)}</a> (source: <a href="${quote(shot.url)}">${quote(shot.urlDisplay)}</a>)`,
    text: `${shot.title}: ${shot.viewUrl} (source: ${shot.url})`
  };
  event.initCustomEvent("sendRichCopy", true, true, detail);
  document.dispatchEvent(event);
};

function render() {
  page.render(model);
}

window.controller = exports;
