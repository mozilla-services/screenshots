/*jslint browser: true */


let loaded = false,
  height = null;

function doResize() {
  document.getElementById("frame").height = height;
}

window.onmessage = function(e) {
  if (e.origin !== location.origin) {
    return;
  }
  if (e.data.height) {
    height = e.data.height;
    if (loaded) {
      doResize();
    }
  } else if (e.data.scrollX) {
    let frameOffset = document.getElementById("frame").getBoundingClientRect().top;
    let toolbarHeight = document.getElementById("toolbar").clientHeight;
    window.scrollTo(0, frameOffset + e.data.scrollY - toolbarHeight);
  }
};

window.onload = function () {
  loaded = true;
  if (height) {
    doResize();
  }
};


