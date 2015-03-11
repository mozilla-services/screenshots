/* globals console, self, watchFunction */
// FIXME: need to emit "select" when the user selects something
/** Worker used to handle the selection on a page after the shot was made
    Obviously needs some implementin' */

// This enumerates all the anchors on the selection, and what part of the
// selection they move:
var movements = {
  topLeft: ["left", "top"],
  top: [null, "top"],
  topRight: ["right", "top"],
  left: ["left", null],
  right: ["right", null],
  bottomLeft: ["left", "bottom"],
  bottom: [null, "bottom"],
  bottomRight: ["right", "bottom"],
};

// These record the coordinates where the mouse was clicked:
var mousedownX, mousedownY;
// And these are the last known coordinates that the mouse moved to:
var cornerX, cornerY;
// The selection element:
var boxEl;

function getPos() {
  return {
    top: Math.min(mousedownY, cornerY),
    left: Math.min(mousedownX, cornerX),
    bottom: Math.max(mousedownY, cornerY),
    right: Math.max(mousedownX, cornerX)
  };
}

function setPos(attr, val) {
  if (attr == "top") {
    if (mousedownY < cornerY) {
      mousedownY = val;
    } else {
      cornerY = val;
    }
  } else if (attr == "bottom") {
    if (mousedownY > cornerY) {
      mousedownY = val;
    } else {
      cornerY = val;
    }
  } else if (attr == "left" ) {
    if (mousedownX < cornerX) {
      mousedownX = val;
    } else {
      cornerX = val;
    }
  } else if (attr == "right") {
    if (mousedownX > cornerX) {
      mousedownX = val;
    } else {
      cornerX = val;
    }
  } else {
    throw new Error("Unknown attr " + attr);
  }
}

self.port.on("setState", watchFunction(function (state) {
  setState(state);
  self.port.emit("stateSet", state);
}));

function reportSelection() {
  if (! mousedownX) {
    // Apparently no selection
    throw new Error("reportSelection() without any selection");
  }
  self.port.emit("select", getPos());
}

function setState(state) {
  // state can be one of:
  //   "cancel": do nothing
  //   "select": make a selection, or adjust the selection
  //   "hide": keep the selection, but make it hidden
  //   "show": show the selection, but don't let it be recreated
  if (state == "cancel") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-highlight-activated");
    document.body.classList.remove("pageshot-hide-movers");
    if (boxEl) {
      boxEl.parentNode.removeChild(boxEl);
      boxEl = null;
    }
    removeHandlers();
  } else if (state == "select") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    addHandlers();
  } else if (state == "show") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-highlight-activated");
    document.body.classList.add("pageshot-hide-movers");
    removeHandlers();
  } else if (state == "hide") {
    document.body.classList.add("pageshot-hide-selection");
    document.body.classList.remove("pageshot-highlight-activated");
    document.body.classList.remove("pageshot-hide-movers");
    removeHandlers();
  } else {
    throw new Error("Unknown state: " + state);
  }
}

var mousedown = watchFunction(function (event) {
  document.body.classList.remove("pageshot-highlight-activated");
  mousedownX = event.pageX;
  mousedownY = event.pageY;
  cornerX = mousedownX;
  cornerY = mousedownY;
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseup", mouseup, false);
  event.stopPropagation();
  event.preventDefault();
  return false;
});

var mouseup = watchFunction(function (event) {
  cornerX = event.pageX;
  cornerY = event.pageY;
  render();
  document.removeEventListener("mousemove", mousemove, false);
  document.removeEventListener("mouseup", mouseup, false);
  reportSelection();
});

var mousemove = watchFunction(function (event) {
  cornerX = event.pageX;
  cornerY = event.pageY;
  render();
});

function render() {
  var name;
  var pos = getPos();
  if (! boxEl) {
    boxEl = document.createElement("div");
    boxEl.className = "pageshot-highlight";
    boxEl.innerHTML = '<div class="pageshot-bottomright"></div>';
    for (name in movements) {
      var el = document.createElement("div");
      el.className = "pageshot-mover pageshot-" + name;
      boxEl.appendChild(el);
      el.addEventListener(
        "mousedown", makeMousedown(el, movements[name]), false);
    }
    document.body.appendChild(boxEl);
  }
  boxEl.style.top = pos.top + "px";
  boxEl.style.left = pos.left + "px";
  boxEl.style.height = (pos.bottom - pos.top) + "px";
  boxEl.style.width = (pos.right - pos.left) + "px";
}

function makeMousedown(el, movement) {
  return watchFunction(function (event) {
    console.log("down", movement);
    event.stopPropagation();
    var mousedownX = event.pageX;
    var mousedownY = event.pageY;
    var start = getPos();
    function mousemove(moveEvent) {
      set(moveEvent);
    }
    function mouseup(upEvent) {
      document.removeEventListener("mousemove", mousemove, false);
      document.removeEventListener("mouseup", mouseup, false);
      set(upEvent);
      reportSelection();
    }
    document.addEventListener("mousemove", mousemove, false);
    document.addEventListener("mouseup", mouseup, false);
    function set(setEvent) {
      var diffX = setEvent.pageX - mousedownX;
      var diffY = setEvent.pageY - mousedownY;
      if (movement[0]) {
        console.log("set", movement[0], start[movement[0]], diffX, setEvent.pageX, mousedownX);
        setPos(movement[0], start[movement[0]] + diffX);
      }
      if (movement[1]) {
        setPos(movement[1], start[movement[1]] + diffY);
      }
      render();
    }
    event.stopPropagation();
    event.preventDefault();
    return false;
  });
}

function addHandlers() {
  document.addEventListener("mousedown", mousedown, false);
  if (! boxEl) {
    document.body.classList.add("pageshot-highlight-activated");
  }
}

function removeHandlers() {
  document.removeEventListener("mousedown", mousedown, false);
  document.removeEventListener("mouseup", mouseup, false);
  document.removeEventListener("mousemove", mousemove, false);
  // We'll rely on the selection movers being hidden so that the
  // event listeners go away there
}

self.port.on("linkLocation", watchFunction(function (linkUrl) {
  var link = document.getElementById("pageshot-stylesheet");
  if (! link) {
    link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("id", "pageshot-stylesheet");
    link.setAttribute("href", linkUrl);
    document.head.appendChild(link);
  }
}));

self.port.emit("ready");
