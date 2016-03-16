/* globals console, self, watchFunction, annotatePosition */


/**********************************************************
 * selection
 */


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
// These record where the mouse was clicked, before we know if it is a real drag:
var startX, startY;
// And these are the last known coordinates that the mouse moved to:
var cornerX, cornerY;
// The selection element:
var boxEl;
// Any text captured:
var selectedText;
// Number of pixels you have to move before we treat it as a selection
const MIN_MOVE = 40;

let lastCaptureState;
let currentState;

/** Given the mouse coordinates, guess the appropriate condition given snap points */
function getPos() {
  let result = {
    top: guessY(Math.min(mousedownY, cornerY)),
    left: guessX(Math.min(mousedownX, cornerX)),
    bottom: guessY(Math.max(mousedownY, cornerY)),
    right: guessX(Math.max(mousedownX, cornerX))
  };
  return result;
}

/** Adjusts mousedownX/Y or cornerX/Y given an attribute of left/right/etc
    (more complicated because you can drag from any corner to any other corner) */
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

function reportSelection(captureType) {
  var pos = getPos();
  captureEnclosedText(pos);
  if (typeof mousedownX != "number") {
    // Apparently no selection
    throw new Error("reportSelection() without any selection");
  }
  if (pos.top == pos.bottom || pos.right == pos.left) {
    console.info("Suppressing null selection");
    return;
  }
  annotatePosition(pos);
  self.port.emit("select", pos, selectedText, captureType);
}

self.port.on("getScreenPosition", watchFunction(function () {
  var pos = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    left: window.scrollX,
    right: window.scrollX + window.innerWidth
  };
  // FIXME: maybe annotating based on the corners is a bad idea,
  // should instead annotate based on an inner element, and not worry about
  // left and right
  annotatePosition(pos);
  self.port.emit("screenPosition", pos);
}));

function activate() {
  currentState = "selection";
  deleteSelection();
  document.body.classList.remove("pageshot-hide-selection");
  document.body.classList.remove("pageshot-hide-movers");
  addHandlers();
  addCrosshairs();
  addSelectionHelp();
  addSelectionPreview();
}

function deactivate() {
  currentState = "cancel";
  deleteSelection();
  document.body.classList.remove("pageshot-hide-selection");
  document.body.classList.remove("pageshot-hide-movers");
  removeHandlers();
  removeCrosshairs();
  removeSelectionPreview();
  removePreviewOverlay();
}

var mouseup;
var mousemove;
var mousedown = watchFunction(function (event) {
  if (event.button !== 0) {
    // Not a left click
    return;
  }
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    // Modified click
    return;
  }
  startX = truncateX(event.pageX);
  startY = truncateY(event.pageY);
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseup", mouseup, false);
  event.stopPropagation();
  event.preventDefault();
  removeCrosshairs();
  return false;
});

mouseup = watchFunction(function (event) {
  document.removeEventListener("mousemove", mousemove, false);
  document.removeEventListener("mouseup", mouseup, false);
  if (! startX) {
    // only do this if we moved enough...
    cornerX = truncateX(event.pageX);
    cornerY = truncateY(event.pageY);
    render();
    reportSelection("selection");
  } else {
    startX = startY = null;
  }
});

mousemove = watchFunction(function (event) {
  if (startX) {
    // Have to test if we've moved enough...
    if (Math.pow(startX - event.pageX, 2) + Math.pow(startY - event.pageY, 2) >
        MIN_MOVE*MIN_MOVE) {
      mousedownX = startX;
      mousedownY = startY;
      startX = startY = null;
    } else {
      return;
    }
  }
  cornerX = truncateX(event.pageX);
  cornerY = truncateY(event.pageY);
  render();
});

function truncateX(x) {
  if (x < 0) {
    return 0;
  } else if (x > document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
  } else {
    return x;
  }
}

function truncateY(y) {
  if (y < 0) {
    return 0;
  } else if (y > document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
  } else {
    return y;
  }
}

// The <body> tag itself can have margins and offsets, which need to be used when
// setting the position of the boxEl.
function getBodyRect() {
  if (getBodyRect.cached) {
    return getBodyRect.cached;
  }
  let rect = document.body.getBoundingClientRect();
  let cached = {
    top: rect.top + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX
  };
  // FIXME: I can't decide when this is necessary
  // *not* necessary on http://patriciogonzalezvivo.com/2015/thebookofshaders/
  // (actually causes mis-selection there)
  // *is* necessary on http://atirip.com/2015/03/17/sorry-sad-state-of-matrix-transforms-in-browsers/
  cached = {top: 0, bottom: 0, left: 0, right: 0};
  getBodyRect.cached = cached;
  return cached;
}


var boxTopEl, boxLeftEl, boxRightEl, boxBottomEl;

function render() {
  var name;
  var pos = getPos();
  if (! boxEl) {
    boxEl = document.createElement("div");
    boxEl.className = "pageshot-highlight";
    for (name in movements) {
      let elTarget = document.createElement("div");
      let elMover = document.createElement("div");
      elTarget.className = "pageshot-mover-target pageshot-" + name;
      elMover.className = "pageshot-mover";
      elTarget.appendChild(elMover);
      boxEl.appendChild(elTarget);
      elTarget.addEventListener(
        "mousedown", makeMousedown(elTarget, movements[name]), false);
    }
    boxTopEl = document.createElement("div");
    boxTopEl.className = "pageshot-bghighlight";
    document.body.appendChild(boxTopEl);
    boxLeftEl = document.createElement("div");
    boxLeftEl.className = "pageshot-bghighlight";
    document.body.appendChild(boxLeftEl);
    boxRightEl = document.createElement("div");
    boxRightEl.className = "pageshot-bghighlight";
    document.body.appendChild(boxRightEl);
    boxBottomEl = document.createElement("div");
    boxBottomEl.className = "pageshot-bghighlight";
    document.body.appendChild(boxBottomEl);
    document.body.appendChild(boxEl);
  }
  let bodyRect = getBodyRect();
  // Note, document.documentElement.scrollHeight is zero on some strange pages (such as the page created when you load an image):
  var docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  var docWidth = document.documentElement.scrollWidth;
  boxEl.style.top = (pos.top - bodyRect.top) + "px";
  boxEl.style.left = (pos.left - bodyRect.left) + "px";
  boxEl.style.height = (pos.bottom - pos.top - bodyRect.top) + "px";
  boxEl.style.width = (pos.right - pos.left - bodyRect.left) + "px";
  boxTopEl.style.top = "0px";
  boxTopEl.style.height = (pos.top - bodyRect.top) + "px";
  boxTopEl.style.left = "0px";
  boxTopEl.style.width = docWidth + "px";
  boxBottomEl.style.top = (pos.bottom - bodyRect.top) + "px";
  boxBottomEl.style.height = docHeight - (pos.bottom - bodyRect.top) + "px";
  boxBottomEl.style.left = "0px";
  boxBottomEl.style.width = docWidth + "px";
  boxLeftEl.style.top = (pos.top - bodyRect.top) + "px";
  boxLeftEl.style.height = pos.bottom - pos.top  + "px";
  boxLeftEl.style.left = "0px";
  boxLeftEl.style.width = (pos.left - bodyRect.left) + "px";
  boxRightEl.style.top = (pos.top - bodyRect.top) + "px";
  boxRightEl.style.height = pos.bottom - pos.top + "px";
  boxRightEl.style.left = (pos.right - bodyRect.left) + "px";
  boxRightEl.style.width = docWidth - (pos.right - bodyRect.left) + "px";
  removePreviewOverlay();
}

function deleteSelection() {
  function removeEl(el) {
    if (el) {
      el.parentNode.removeChild(el);
    }
  }
  removeEl(boxEl);
  boxEl = null;
  removeEl(boxTopEl);
  boxTopEl = null;
  removeEl(boxRightEl);
  boxRightEl = null;
  removeEl(boxLeftEl);
  boxLeftEl = null;
  removeEl(boxBottomEl);
  boxBottomEl = null;
}

/** mousedown event for the move handles */
function makeMousedown(el, movement) {
  return watchFunction(function (event) {
    event.stopPropagation();
    var mousedownX = truncateX(event.pageX);
    var mousedownY = truncateY(event.pageY);
    var start = getPos();
    function mousemove(moveEvent) {
      set(moveEvent);
    }
    function mouseup(upEvent) {
      document.removeEventListener("mousemove", mousemove, false);
      document.removeEventListener("mouseup", mouseup, false);
      set(upEvent);
      let captureType = currentState;
      if (currentState == "cancel") {
        // Happens because resizing can cause a cancel to happen
        captureType = lastCaptureState;
      }
      reportSelection(captureType);
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
}

function removeHandlers() {
  document.removeEventListener("mousedown", mousedown, false);
  document.removeEventListener("mouseup", mouseup, false);
  document.removeEventListener("mousemove", mousemove, false);
  // We'll rely on the selection movers being hidden so that the
  // event listeners go away there
}

let vertCross;
let horizCross;

function crosshairsMousemove(event) {
  removeSelectionPreview();
  if (! vertCross) {
    vertCross = document.createElement("div");
    vertCross.className = "pageshot-vertcross";
    //vertCross.style.height = document.body.clientHeight + "px";
    document.body.appendChild(vertCross);
    horizCross = document.createElement("div");
    horizCross.className = "pageshot-horizcross";
    document.body.appendChild(horizCross);
  }
  let x = guessX(event.pageX);
  let y = guessY(event.pageY);
  vertCross.style.left = (x - window.scrollX) + "px";
  horizCross.style.top = (y - window.scrollY) + "px";
}

function crosshairsKeyup(event) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    // Modified
    return;
  }
  if (event.key === "Escape") {
    deactivate();
    self.port.emit("deactivate");
  }
}

function addCrosshairs() {
  document.addEventListener("mousemove", crosshairsMousemove, false);
  document.addEventListener("keyup", crosshairsKeyup)
}

function addSelectionHelp() {
  //showHelpMessage("Click and drag anywhere to make a selection");
}

function addSelectionPreview() {
  let el = document.createElement("div");
  el.className = "pageshot-preview-overlay";
  document.body.appendChild(el);
  el = document.createElement("div");
  el.className = "pageshot-crosshair-pulse";
  let inner = document.createElement("div");
  inner.className = "pageshot-crosshair-inner";
  document.body.appendChild(el);
  document.body.appendChild(inner);
  el = document.createElement("div");
  el.className = "pageshot-horizcross pageshot-crosshair-preview";
  document.body.appendChild(el);
  el = document.createElement("div");
  el.className = "pageshot-vertcross pageshot-crosshair-preview";
  document.body.appendChild(el);
}

function removeSelectionPreview() {
  let els = document.querySelectorAll(`
    .pageshot-crosshair-pulse,
    .pageshot-crosshair-inner,
    .pageshot-horizcross.pageshot-crosshair-preview,
    .pageshot-vertcross.pageshot-crosshair-preview`);
  for (let el of els) {
    el.parentNode.removeChild(el);
  }
}

function removePreviewOverlay() {
  let el = document.querySelector(".pageshot-preview-overlay");
  if (el) {
    el.parentNode.removeChild(el);
  }
}

function removeCrosshairs() {
  document.removeEventListener("mousemove", crosshairsMousemove, false);
  if (vertCross) {
    vertCross.parentNode.removeChild(vertCross);
    vertCross = null;
  }
  if (horizCross) {
    horizCross.parentNode.removeChild(horizCross);
    horizCross = null;
  }
}

function addStylesheet() {
  let linkUrl = self.options["inline-selection.css"];
  var link = document.getElementById("pageshot-stylesheet");
  if (! link) {
    link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("id", "pageshot-stylesheet");
    link.setAttribute("href", linkUrl);
    document.head.appendChild(link);
  }
}

addStylesheet();

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
const ELEMENT_NODE = document.ELEMENT_NODE;

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
    selectedText = selectedText.replace(/^\s+/, "");
    selectedText = selectedText.replace(/\s+$/, "");
    selectedText = selectedText.replace(/[ \t]+\n/g, "\n");
  } else {
    selectedText = null;
  }
}

/**********************************************************
 * window.history catching
 */

var origUrl = location.href;
function checkUrl() {
  var curUrl = location.href;
  if (origUrl != curUrl) {
    console.info("got url change", origUrl, curUrl);
    self.port.emit("popstate", curUrl);
    deactivate();
  }
}

window.addEventListener("popstate", checkUrl, false);

self.port.on("isShowing", checkUrl);

self.port.on("cancel", deactivate);

self.port.emit("ready");

activate();
