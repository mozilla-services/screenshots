/*jslint browser: true */
/*global console */

let loaded = false,
  height = null;

function doResize() {
  document.getElementById("frame").height = height;
}

window.onmessage = function(m) {
  if (m.origin !== location.origin) {
    console.warn("Parent iframe received message from unexpected origin:", m.origin, "instead of", location.origin);
    return;
  }
  let message = m.data;
  let type = message.type;
  if (! type) {
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
  let frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
  let toolbarHeight = document.getElementById("toolbar").clientHeight;
  let visibleHeight = window.innerHeight - toolbarHeight;
  let frameTop = frameOffset - toolbarHeight;
  let scrollY = frameTop + (pos.top + pos.bottom) / 2 - (visibleHeight / 2);
  window.scroll(0, scrollY);
}

window.onload = function () {
  loaded = true;
  if (height) {
    doResize();
  }
};
