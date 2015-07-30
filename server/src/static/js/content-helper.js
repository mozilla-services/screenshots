/*jslint browser: true */
/* global SITE_ORIGIN */

window.addEventListener(
  "load",
  function () {
    window.parent.postMessage(
      {type: "setHeight", height: document.documentElement.scrollHeight || document.body.scrollHeight},
      SITE_ORIGIN);
  },
  false);

window.addEventListener(
  "message",
  (m) => {
    if (m.origin !== SITE_ORIGIN) {
      console.warn("Content iframe received message from unexpected origin:", m.origin, "instead of", SITE_ORIGIN);
      return;
    }
    let message = m.data;
    let type = message.type;
    if (! type) {
      console.warn("Content iframe received message with no .type:", message);
      return;
    }
    if (type === "displayClip") {
      displayClip(message.clip);
    } else if (type === "removeDisplayClip") {
      removeDisplayClip();
    } else {
      console.warn("Content iframe received message with unknown .type:", message);
    }
  }
);

let highlightElement;

function displayClip(clip) {
  let topLeft = null;
  let bottomRight = null;
  let loc = null;
  let pos = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };

  if (clip.text) {
    topLeft = findElement("#" + clip.text.location.selectionStart);
    bottomRight = findElement("#" + clip.text.location.selectionEnd);
    loc = {
      topLeftOffset: {x: 0, y: 0},
      bottomRightOffset: {x: 0, y: 0}
    };
  } else {
    loc = clip.image.location;
    pos = {
      top: loc.top,
      bottom: loc.bottom,
      left: loc.left,
      right: loc.right
    };
    topLeft = findElement(loc.topLeftElement);
    bottomRight = findElement(loc.bottomLeftElement);
  }
  if (topLeft) {
    let rect = topLeft.getBoundingClientRect();
    // FIXME: adjust using height/width
    pos.top = rect.top + loc.topLeftOffset.y;
    pos.left = rect.left + loc.topLeftOffset.x;
  }
  if (bottomRight) {
    let rect = bottomRight.getBoundingClientRect();
    pos.bottom = rect.top + rect.height + loc.bottomRightOffset.y;
    pos.right = rect.left + rect.width + loc.bottomRightOffset.x;
  }
  let bodyRect = document.body.getBoundingClientRect();
  console.info("adjusting", pos, bodyRect);
  pos.top -= bodyRect.top;
  pos.bottom -= bodyRect.top;
  pos.left -= bodyRect.left;
  // FIXME: this doesn't seem to do the right thing, but I don't know why:
  //pos.right -= bodyRect.left;
  createHighlight(pos);
  window.parent.postMessage({
    type: "scrollToMiddle",
    position: pos
  }, SITE_ORIGIN);
}

function findElement(selector) {
  return document.querySelector(selector);
}

function createHighlight(pos) {
  removeDisplayClip();
  highlightElement = document.createElement("div");
  highlightElement.className = "pageshot-highlight";
  highlightElement.style.top = pos.top + "px";
  highlightElement.style.left = pos.left + "px";
  highlightElement.style.height = (pos.bottom - pos.top) + "px";
  highlightElement.style.width = (pos.right - pos.left) + "px";
  document.body.appendChild(highlightElement);
}

function removeDisplayClip() {
  if (highlightElement) {
    highlightElement.parentNode.removeChild(highlightElement);
    highlightElement = null;
  }
}
