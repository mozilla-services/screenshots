/* jslint browser:true */

const sendEvent = require("../../browser-send-event.js");
const page = require("./page").page;
const { AbstractShot } = require("../../../shared/shot");
const { createThumbnailUrl } = require("../../../shared/thumbnailGenerator");
const { shotGaFieldForValue } = require("../../ab-tests.js");

// This represents the model we are rendering:
let model;

const SURVEY_EXPIRATION = new Date("2018-01-15");

function shouldHighlightEditIcon(model) {
  if (!model.isOwner) {
    return false;
  }
  const hasSeen = localStorage.hasSeenEditButton;
  if (!hasSeen && model.enableAnnotations) {
    localStorage.hasSeenEditButton = "1";
  }
  return !hasSeen;
}

function shouldShowSurveyLink(model) {
  if ((new Date()) > SURVEY_EXPIRATION) {
    return false;
  }
  if (!model.isOwner) {
    return false;
  }
  let foundEnglish = false;
  // model.userLocales always contains some form of English because it's a server
  // fallback. But navigator.languages does not have a fallback (except what the
  // user indicates in their browser preferences)
  if (model.userLocales[0].startsWith("en")) {
    foundEnglish = true;
  }
  for (const locale of navigator.languages) {
    if (locale.startsWith("en")) {
      foundEnglish = true;
    }
  }
  if (!foundEnglish) {
    return false;
  }
  const hasSeen = localStorage.hasSeenSurveyLink;
  if (!hasSeen) {
    localStorage.hasSeenSurveyLink = "1";
  }
  return !hasSeen;
}

exports.closeSurveyLink = function() {
  model.showSurveyLink = false;
  render();
};

exports.launch = function(data) {
  const firstSet = !model;
  model = data;
  if (window.wantsauth) {
    if (window.wantsauth.getAuthData()) {
      Object.assign(model, window.wantsauth.getAuthData());
      model.isExtInstalled = true;
    } else {
      window.wantsauth.addAuthDataListener((data) => {
        Object.assign(model, data);
        model.isExtInstalled = true;
        render();
      });
    }
  }
  model.hasSavedShot = false;
  model.shot = new AbstractShot(data.backend, data.id, data.shot);
  model.shot.contentUrl = `//${model.contentOrigin}/content/${model.shot.id}`;
  model.shot.urlIfDeleted = model.urlIfDeleted;
  model.shot.expireTime = new Date(model.expireTime);
  model.shot.deleted = model.deleted;
  model.controller = exports;
  if (model.shot.abTests) {
    for (const testName in model.shot.abTests) {
      const testValue = model.shot.abTests[testName];
      if (testValue) {
        const shotFieldName = shotGaFieldForValue(testName, testValue);
        if (shotFieldName && window.abTests) {
          window.abTests[testName + "_shot"] = {
            gaField: shotFieldName,
            value: testValue
          };
        }
      }
    }
  }
  model.showSurveyLink = shouldShowSurveyLink(model);
  model.highlightEditButton = shouldHighlightEditIcon(model);
  if (firstSet) {
    refreshHash();
  }
  try {
    render();
  } catch (e) {
    window.Raven.captureException(e);
    throw e;
  }
  // FIXME: copied from frame.js
  const isExpired = model.expireTime !== null && Date.now() > model.expireTime;
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
  } else if (isExpired) {
      sendEvent("view-expired", "non-owner");
    } else {
      sendEvent("visit", "non-owner");
    }
};

exports.changeShotExpiration = function(shot, expiration) {
  const wasExpired = model.expireTime !== null && model.expireTime < Date.now();
  const url = model.backend + "/api/set-expiration";
  const req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function() {
    if (req.status >= 300) {
      const errorMessage = document.getElementById("shotPageAlertErrorUpdatingExpirationTime").textContent;
      window.alert(errorMessage);
      window.Raven.captureException(new Error(`Error calling /api/set-expiration: ${req.status} ${req.statusText}`));
    } else {
      if (expiration === 0) {
        model.shot.expireTime = model.expireTime = null;
      } else {
        model.shot.expireTime = model.expireTime = Date.now() + expiration;
      }
      render();
    }
  };
  if (wasExpired) {
    req.onload = function() {
      location.reload();
    };
  }
  req.send(`id=${encodeURIComponent(shot.id)}&expiration=${encodeURIComponent(expiration)}&_csrf=${encodeURIComponent(model.csrfToken)}`);
};

exports.deleteShot = function(shot) {
  const url = model.backend + "/api/delete-shot";
  const req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function() {
    if (req.status >= 300) {
      // FIXME: a lame way to do an error message
      const errorMessage = document.getElementById("shotPageAlertErrorDeletingShot").textContent;
      window.alert(errorMessage);
      window.Raven.captureException(new Error(`Error calling /api/delete-shot: ${req.status} ${req.statusText}`));
    } else {
      location.href = model.backend + "/shots";
    }
  };
  req.send(`id=${encodeURIComponent(shot.id)}&_csrf=${encodeURIComponent(model.csrfToken)}`);
};

exports.saveEdit = function(shot, shotUrl, dimensions) {
  const url = model.backend + "/api/save-edit";
  const payload = {
    shotId: shot.id,
    _csrf: model.csrfToken,
    url: shotUrl,
    x: dimensions.x,
    y: dimensions.y
  };

  const postWith = body => {
    const req = new Request(url, {
      method: "POST",
      credentials: "include",
      headers: new Headers({
        "content-type": "application/json"
      }),
      body
    });
    return fetch(req).then((resp) => {
      if (!resp.ok) {
        const errorMessage = "Error saving edited shot";
        window.alert(errorMessage);
        window.Raven.captureException(new Error(`Error calling /api/save-edit: ${req.status} ${req.statusText}`));
      } else {
        location.reload();
      }
    }).catch((error) => {
      const errorMessage = "Connection error";
      window.alert(errorMessage);
      window.Raven.captureException(error);
      throw error;
    });
  }

  const image = shot.getClip(shot.clipNames()[0]).image;

  image.url = shotUrl;
  image.dimensions.x = dimensions.x;
  image.dimensions.y = dimensions.y;

  createThumbnailUrl(shot).then(thumbnail => {
    payload.thumbnail = thumbnail;
    return postWith(JSON.stringify(payload));
  }).catch(() => {
    return postWith(JSON.stringify(payload));
  });
}

function refreshHash() {
  if (location.hash === "#fullpage") {
    const frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
    const toolbarHeight = document.getElementById("toolbar").clientHeight;
    const frameTop = frameOffset - (toolbarHeight * 2);
    window.scroll(0, frameTop);
    return;
  }
  let clipId = null;
  let match = (/clip=([^&]{1,255})/).exec(location.hash);
  if (match) {
    clipId = decodeURIComponent(match[1]);
  }
  let source = "change-clip"; // eslint-disable-line no-unused-vars
  match = (/source=([^&]{1,255})/).exec(location.hash);
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
  const frame = document.getElementById("frame");
  if (!frame) {
    return;
  }
  let postMessage;
  if (clipId) {
    const clip = model.shot.getClip(clipId);
    if (!clip) {
      throw new Error("Could not find clip with id " + clipId);
    }
    postMessage = {
      type: "displayClip",
      clip: clip.toJSON()
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

exports.setTitle = function(title) {
  title = title || null;
  const url = model.backend + "/api/set-title/" + model.shot.id;
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (req.status >= 300) {
      const errorMessage = document.getElementById("shotPageAlertErrorUpdatingTitle").textContent;
      window.alert(errorMessage);
      window.Raven.captureException(new Error(`Error calling /api/set-title: ${req.status} ${req.statusText}`));
      return;
    }
    model.shot.userTitle = title;
    render();
  };
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/json");
  req.send(JSON.stringify({ title, _csrf: model.csrfToken }));
};

function render() {
  page.render(model);
}

window.controller = exports;
