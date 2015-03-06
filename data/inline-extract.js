// FIXME: this is not used currently, but has some useful functionality that 
// needs to be copied elsewhere

// FIXME: this contains all sorts of duplicated (mostly
// copy-and-pasted) functionality from inject.js (the ID stuff) and
// interface.js (the snippet stuff).
//
// Though unlike interface.js we are in a worker, not an inline
// script, and so we can use self.port.  But we also don't have jQuery
// (maybe we could?), and we use the plain DOM routines (which isn't so bad).
// Also we aren't saving meta.head (yet).

var RANDOM_CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_";

function makeRandom(length) {
  length = length || 10;
  var s = "";
  for (var i=0; i<length; i++) {
    s += RANDOM_CHARS.charAt(Math.floor(Math.random() * RANDOM_CHARS.length));
  }
  return s;
}

function domain(url) {
  url = url.replace(/.*\/\//, "");
  url = url.replace(/\/.*/, "");
  url = url.replace(/:.*/, "");
  return url;
}

var data = documentStaticData();
data.id = makeRandom();
data.domain = domain(data.location);

self.port.on("config", function (config) {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", config.css);
  document.head.appendChild(link);
  var meta = document.createElement("div");
  meta.id = "pageshot-meta";
  document.body.appendChild(meta);
  document.body.classList.add("pageshot-selecting");
  activateHighlight();
});

var deactivateHandler;

function activateHighlight() {

  var mousedownX, mousedownY;
  var cornerX, cornerY;
  var boxEl, oldBoxEl;

  function mousemove(event) {
    cornerX = event.pageX;
    cornerY = event.pageY;
    if (oldBoxEl) {
      oldBoxEl.parentNode.removeChild(oldBoxEl);
      oldBoxEl = null;
    }
    render();
  }

  function mouseup(event) {
    cornerX = event.pageX;
    cornerY = event.pageY;
    if (boxEl) {
      render();
    }
    document.removeEventListener("mousemove", mousemove, false);
    document.removeEventListener("mouseup", mouseup, false);
    document.removeEventListener("selectstart", selectoff, false);
    var hasBox = !! boxEl;
    boxEl = oldBoxEl = null;
    requestShot();
    //saveMeta();
    if (hasBox) {
      return false;
    }
    return undefined;
  }

  function selectoff(event) {
    return false;
  }

  function render() {
    // FIXME: might actually make sense to oversize the box a little
    var top = Math.min(mousedownY, cornerY);
    var height = Math.abs(mousedownY - cornerY);
    var left = Math.min(mousedownX, cornerX);
    var width = Math.abs(mousedownX - cornerX);
    if (! boxEl) {
      boxEl = document.createElement("div");
      boxEl.className = "pageshot-highlight";
      document.getElementById("pageshot-meta").appendChild(boxEl);
    }
    boxEl.style.top = top + "px";
    boxEl.style.left = left + "px";
    boxEl.style.height = height + "px";
    boxEl.style.width = width + "px";
  }

  deactivateHandler = function (event) {
    mousedownX = event.pageX;
    mousedownY = event.pageY;
    document.addEventListener("mousemove", mousemove, false);
    document.addEventListener("mouseup", mouseup, false);
    document.addEventListener("selectstart", selectoff, false);
    var oldBoxEl = document.querySelector("#pageshot-meta .pageshot-highlight");
    event.stopPropagation();
    event.preventDefault();
    return false;
  };

  document.addEventListener("mousedown", deactivateHandler, false);
}

function deactivateHighlight() {
  document.removeEventListener("mousedown", deactivateHandler, false);
  deactivateHandler = null;
}

function requestShot() {
  document.body.classList.add("prepare-screenshot");
  var event = document.createEvent('CustomEvent');
  var el = document.querySelector(".pageshot-highlight");
  self.port.emit("requestSnippet", {
    x: parseInt(el.style.left),
    y: parseInt(el.style.top),
    h: parseInt(el.style.height),
    w: parseInt(el.style.width)
  });
}

self.port.on("snippetCaptured", function () {
  document.body.classList.remove("prepare-screenshot");
  document.body.classList.remove("pageshot-selecting");
  self.port.emit("data", data);
  deactivateHighlight();
});

self.port.emit("hello");
