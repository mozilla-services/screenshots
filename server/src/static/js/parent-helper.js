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
  } else if (e.data.clipWidth) {
    let frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY,
      toolbarHeight = document.getElementById("toolbar").clientHeight,
      scrollY = frameOffset + e.data.scrollY - toolbarHeight;

    let s = document.getElementById("selected-node-highlight");
    if (s) {
      s.parentNode.removeChild(s);
    }

    let d = document.createElement("div");
    d.id = "selected-node-highlight";
    d.style.position = "absolute";
    d.style.border = "3px dashed yellow";
    d.style.top = (e.data.scrollY + frameOffset) + "px";
    d.style.left = e.data.scrollX + "px";
    d.style.height = e.data.clipHeight + "px";
    d.style.width = e.data.clipWidth + "px";
    document.body.appendChild(d);

    window.scrollTo(0, scrollY);
  }
};

window.onload = function () {
  loaded = true;
  if (height) {
    doResize();
  }
};
