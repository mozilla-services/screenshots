/* global console,CONTENT_HOSTING_ORIGIN */

let loaded = false;
let height = null;

function sendToChild(message) {
  if (!sendToChild.childReference) {
    sendToChild.queue.push(message);
    return;
  }
  sendToChild.childReference.postMessage(message, CONTENT_HOSTING_ORIGIN);
}

sendToChild.queue = [];

function doResize() {
  document.getElementById("frame").height = height;
}

window.onmessage = function(m) {
  if (m.origin !== CONTENT_HOSTING_ORIGIN) {
    console.warn("Parent iframe received message from unexpected origin:", m.origin, "instead of", CONTENT_HOSTING_ORIGIN);
    return;
  }
  if (!sendToChild.childReference) {
    sendToChild.childReference = m.source;
    while (sendToChild.queue.length) {
      const msg = sendToChild.queue.shift();
      sendToChild(msg);
    }
  }
  const message = m.data;
  const type = message.type;
  if (!type) {
    console.warn("Parent iframe received message with no type:", message);
    return;
  }
  if (type === "setHeight") {
    setHeight(message.height);
  } else if (type === "scrollToMiddle") {
    scrollPageToMiddle(message.position);
  } else {
    console.warn("Parent iframe received message with unknown .type:", message);
  }
};

function setHeight(h) {
  height = h;
  if (loaded) {
    doResize();
  }
}

function scrollPageToMiddle(pos) {
  const frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
  const toolbarHeight = document.getElementById("toolbar").clientHeight;
  const visibleHeight = window.innerHeight - toolbarHeight;
  const frameTop = frameOffset - toolbarHeight;
  const scrollY = frameTop + (pos.top + pos.bottom) / 2 - (visibleHeight / 2);
  window.scroll(0, scrollY);
}

window.addEventListener("load", function() {
  loaded = true;
  if (height) {
    doResize();
  }
});
