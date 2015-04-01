/*jslint browser: true */


let loaded = false,
  height = null;

function doResize() {
  document.getElementById("frame").height = height;
}

window.onmessage = function(e) {
  height = e.data.height;
  if (loaded) {
    doResize();
  }
}

window.onload = function () {
  loaded = true;
  if (height) {
    doResize();
  }
}


