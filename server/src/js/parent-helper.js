

let loaded = false,
  height = null;

function do_resize() {
  document.getElementById("frame").height = height;
}

window.onmessage = function(e) {
  height = e.data.height;
  if (loaded) {
    do_resize();
  }
}

window.onload = function () {
  loaded = true;
  if (height) {
    do_resize();
  }
}


