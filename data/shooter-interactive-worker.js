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
// Any text captured:
var selectedText;

function getPos() {
  return {
    top: guessY(Math.min(mousedownY, cornerY)),
    left: guessX(Math.min(mousedownX, cornerX)),
    bottom: guessY(Math.max(mousedownY, cornerY)),
    right: guessX(Math.max(mousedownX, cornerX))
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
  captureEnclosedText(getPos());
  if (typeof mousedownX != "number") {
    // Apparently no selection
    throw new Error("reportSelection() without any selection");
  }
  var pos = getPos();
  if (pos.top == pos.bottom || pos.right == pos.left) {
    console.log("Suppressing null selection");
    return;
  }
  self.port.emit("select", getPos());
  self.port.emit("selectText", selectedText);
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
  if (event.button !== 0) {
    // Not a left click
    return;
  }
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    // Modified click
    return;
  }
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

// The <body> tag itself can have margins and offsets, which need to be used when
// setting the position of the boxEl.
var bodyRect;

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
  if (! bodyRect) {
    bodyRect = document.body.getBoundingClientRect();
    bodyRect = {
      top: bodyRect.top + window.scrollY,
      bottom: bodyRect.bottom + window.scrollY,
      left: bodyRect.left + window.scrollX,
      right: bodyRect.right + window.scrollX
    };
  }
  boxEl.style.top = (pos.top - bodyRect.top) + "px";
  boxEl.style.left = (pos.left - bodyRect.left) + "px";
  boxEl.style.height = (pos.bottom - pos.top - bodyRect.left) + "px";
  boxEl.style.width = (pos.right - pos.left - bodyRect.left) + "px";
}

function makeMousedown(el, movement) {
  return watchFunction(function (event) {
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

var xSnaps = [];
var ySnaps = [];

// Calculate x/ySnaps:
(function () {
  var xFound = {};
  var yFound = {};
  var scrollX = window.scrollX;
  var scrollY = window.scrollY;
  var allTags = document.getElementsByTagName("*");
  var allTagsLength = allTags.length;

  for (var i=0; i<allTagsLength; i++) {
    var tag = allTags[i];
    var rect = tag.getBoundingClientRect();
    // FIXME: some objects aren't visible, and should be excluded
    var top = Math.floor(rect.top + scrollY);
    var bottom = Math.floor(rect.bottom + scrollY);
    var left = Math.floor(rect.left + scrollX);
    var right = Math.floor(rect.right + scrollX);
    if (! yFound[top]) {
      ySnaps.push(top);
      yFound[top] = true;
    }
    if (! yFound[bottom]) {
      ySnaps.push(bottom);
      yFound[bottom] = true;
    }
    if (! xFound[left]) {
      xSnaps.push(left);
      xFound[left] = true;
    }
    if (! xFound[right]) {
      xSnaps.push(right);
      xFound[right] = true;
    }
  }
  // FIXME: should probably make sure all page edges are in the list
  xSnaps.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    return -1;
  });
  ySnaps.sort(function (a, b) {
    if (a > b) {
      return 1;
    }
    return -1;
  });
})();

var _lastClosestX = {};
function guessX(x) {
  return _guess(x, findClosest(x, xSnaps, xSnaps.length, _lastClosestX));
}

var _lastClosestY = {};
function guessY(y) {
  return _guess(y, findClosest(y, ySnaps, ySnaps.length, _lastClosestY));
}

var MIN_SNAP = 15;

function _guess(pos, range) {
  if (pos-range[0] < range[1]-pos &&
      pos-range[0] < MIN_SNAP) {
    return range[0];
  } else if (range[1]-pos < MIN_SNAP) {
    return range[1];
  }
  return pos;
}

function findClosest(pos, snaps, snapsLength, memo) {
  if (memo.last && pos >= memo.last[0] && pos <= memo.last[1]) {
    return memo.last;
  }
  if (pos > snaps[snapsLength-1] || pos < snaps[0]) {
    console.warn("Got out of range position for snapping:", pos, snaps[0], snaps[snapsLength-1]);
    return pos;
  }
  var index = Math.floor(snapsLength/2);
  var less = 0;
  var more = snapsLength;
  while (true) {
    if (snaps[index] <= pos && snaps[index+1] >= pos) {
      break;
    }
    if (snaps[index] > pos) {
      more = index;
    } else {
      less = index;
    }
    index = Math.floor((less + more) / 2);
  }
  var result = [snaps[index], snaps[index+1]];
  //memo.last = result;
  return result;
}

// Pixels of wiggle the captured region gets in captureSelectedText:
var CAPTURE_WIGGLE = 10;

function captureEnclosedText(box) {
  var scrollX = window.scrollX;
  var scrollY = window.scrollY;
  var text = [];
  function traverse(el) {
    var elBox = el.getBoundingClientRect();
    elBox = {
      top: elBox.top + scrollY,
      bottom: elBox.bottom + scrollY,
      left: elBox.left + scrollX,
      right: elBox.right + scrollX
    };
    if (elBox.bottom < box.top ||
        elBox.top > box.bottom ||
        elBox.right < box.left ||
        elBox.left > box.right) {
      // Totally outside of the box
      return;
    }
    if (elBox.bottom > box.bottom + CAPTURE_WIGGLE ||
        elBox.top < box.top - CAPTURE_WIGGLE) {
      // Partially outside the box
      for (var i=0; i<el.childNodes.length; i++) {
        var child = el.childNodes[i];
        if (child.nodeType == ELEMENT_NODE) {
          traverse(child);
        }
      }
      return;
    }
    addText(el);
  }
  function addText(el) {
    // FIXME: should use alt in images, and maybe titles, and maybe
    // keep some markup, and other stuff
    text.push(el.textContent);
  }
  traverse(document.body);
  if (text.length) {
    selectedText = text.join("\n");
  } else {
    selectedText = null;
  }
  //console.log("Found text:", selectedText);
}

var ELEMENT_NODE = document.ELEMENT_NODE;

function autoSelect(ids) {
  var i, el;
  var els = [];
  if (ids) {
    for (i=0; i<ids.length; i++) {
      el = document.getElementById(ids[i]);
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.scrollY + window.innerHeight) {
        continue;
      }
      if (el) {
        els.push(el);
      } else {
        console.warn("Readable element not found: #" + ids[i]);
      }
    }
  }
  if (! els.length) {
    els.push(document.body);
  }
  var pos = {
    top: null,
    bottom: null,
    left: null,
    right: null
  };
  var screen = {
    top: window.scrollY,
    left: window.scrollX,
    bottom: window.scrollY + window.innerHeight,
    right: window.scrollX + window.innerWidth
  };
  function traverse(el) {
    var rect = el.getBoundingClientRect();
    rect = {
      top: rect.top + screen.top,
      bottom: rect.bottom + screen.top,
      left: rect.left + screen.left,
      right: rect.right + screen.left
    };
    if (rect.bottom < screen.top || rect.top > screen.bottom) {
      return;
    }
    for (var i=0; i<el.childNodes.length; i++) {
      var child = el.childNodes[i];
      if (child.nodeType == ELEMENT_NODE) {
        var display = window.getComputedStyle(child).display;
        if (display == "flex" || display == "block" ||
            display == "inline-block" || display.indexOf("table") === 0 ||
            display == "list-item") {
          traverse(child);
        }
      }
    }
    //var tag = el.tagName + "#" + el.id + " (" + rect.left + ", " + rect.top + ") - (" + rect.right + ", " + rect.bottom + ")";
    if (rect.top < screen.top ||
        rect.bottom > screen.bottom ||
        rect.left < screen.left-200 ||
        rect.right > screen.right+200) {
      //console.log("skip", tag, screen);
      return;
    }
    if (pos.top === null || rect.top < pos.top) {
      //console.log("move top", pos.top, tag);
      pos.top = rect.top;
    }
    if (pos.bottom === null || rect.bottom > pos.bottom) {
      //console.log("move bottom", pos.bottom, tag);
      pos.bottom = rect.bottom;
    }
    if (pos.left === null || rect.left < pos.left) {
      //console.log("move left", pos.left, tag);
      pos.left = rect.left;
    }
    if (pos.right === null || rect.right > pos.right) {
      //console.log("move right", pos.right, tag);
      pos.right = rect.right;
    }
  }
  for (i=0; i<els.length; i++) {
    el = els[i];
    traverse(el);
  }
  if (pos.top === null) {
    pos.top = screen.top;
  }
  if (pos.bottom === null) {
    pos.bottom = screen.bottom;
  }
  if (pos.left === null) {
    pos.left = screen.left;
  }
  if (pos.right === null) {
    pos.right = screen.right;
  }
  mousedownX = pos.left;
  mousedownY = pos.top;
  cornerX = pos.right;
  cornerY = pos.bottom;
  render();
  reportSelection();
}

var origUrl = location.href;
function checkUrl() {
  var curUrl = location.href;
  console.log("got url change", origUrl, curUrl);
  if (origUrl != curUrl) {
    self.port.emit("popstate", curUrl);
    setState("cancel");
  }
}

window.addEventListener("popstate", checkUrl, false);

self.port.on("isShowing", checkUrl);

self.port.on("extractedData", watchFunction(function (data) {
  var ids = null;
  if (data.readable) {
    ids = data.readable.readableIds;
    if (! ids.length) {
      ids = null;
    }
  }
  var now = Date.now();
  autoSelect(ids);
  console.log("autoSelect took:", Date.now() - now, "milliseconds");
}));

self.port.emit("ready");
