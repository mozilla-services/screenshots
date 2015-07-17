/* globals console, self, watchFunction, extractSelection, annotatePosition */


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

// Set this to true to get have this set styles for more info:
var DEBUG_AUTOSELECT = false;

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
// Minimum width and height of the autoselect selection:
const MIN_AUTOSELECT_HEIGHT = 100;
const MIN_AUTOSELECT_WIDTH = 200;

// The ids of elements we should use for autoselecting
let autoIds = null;
// True if there was a text selection right when this is activated
let initialSelection = false;

let lastCaptureState;
let currentState;

function debugAnnotate(el, text, backgroundColor, borderColor) {
  if (text) {
    var cur = el.getAttribute("title");
    if (cur) {
      text = cur + " | " + text;
    }
    el.setAttribute("title", text);
  }
  if (backgroundColor) {
    el.style.backgroundColor = backgroundColor;
  }
  if (borderColor) {
    if ((/^#[a-f0-9]+$/i).test(borderColor)) {
      borderColor += " 2px dotted";
    }
    el.style.outline = borderColor;
  }
}

function getPos() {
  let result = {
    top: guessY(Math.min(mousedownY, cornerY)),
    left: guessX(Math.min(mousedownX, cornerX)),
    bottom: guessY(Math.max(mousedownY, cornerY)),
    right: guessX(Math.max(mousedownX, cornerX))
  };
  if (currentState == "auto") {
    result.left = Math.max(result.left - 4, 0);
    result.top = Math.max(result.top - 1, 0);
  }
  return result;
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

self.port.on("restore", watchFunction(function (state, pos, scrollIntoView) {
  restore(state, pos, scrollIntoView);
}));

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

function reportNoSelection() {
  self.port.emit("noAutoSelection");
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

function setState(state) {
  // state can be one of:
  //   "cancel": do nothing, hide anything showing
  //   "selection": make a selection with crosshairs (erase any previous selection)
  //   "madeSelection": after a selection has been made
  //   "auto": make an autoselection
  //   "text": make a text selection
  //   "hide": keep the selection, but make it hidden
  //   "show": show the selection, but don't let it be recreated
  //   "maybeCancel": set to cancel *if* the mode is not selection
  //   "initialAuto": set to auto, *if* there isn't a text selection
  if (state === "maybeCancel") {
    if (currentState === "selection" || currentState === "text" || currentState === "cancelForText") {
      // Do nothing in this case
      return;
    }
    state = "cancel";
  }
  if (state === "initialAuto") {
    if (initialSelection) {
      return;
    }
    state = "auto";
  }
  if (state === "auto" || state === "selection") {
    lastCaptureState = state;
  }
  currentState = state;
  if (state === "cancel") {
    deleteSelection();
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    removeHandlers();
  } else if (state === "cancelForText") {
    deleteSelection();
    document.body.classList.add("pageshot-hide-selection");
    document.body.classList.add("pageshot-hide-movers");
    removeHandlers();
    currentState = "text";
  } else if (state === "_restore") {
    deleteSelection();
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    removeHandlers();
  } else if (state === "selection") {
    deleteSelection();
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    addHandlers();
    addCrosshairs();
    // FIXME: do crosshairs
  } else if (state === "madeSelection") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    removeHandlers();
  } else if (state === "auto") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    addHandlers();
    if (!autoSelect()) {
      self.port.emit("visibleSelection");
    }
  } else if (state === "text") {
    document.body.classList.add("pageshot-hide-selection");
    document.body.classList.add("pageshot-hide-movers");
  } else if (state === "show") {
    document.body.classList.remove("pageshot-hide-selection");
    document.body.classList.add("pageshot-hide-movers");
    removeHandlers();
  } else if (state === "hide") {
    document.body.classList.add("pageshot-hide-selection");
    document.body.classList.remove("pageshot-hide-movers");
    removeHandlers();
  } else {
    throw new Error("Unknown state: " + state);
  }
}

/** Restores a selection that was hidden for some reason */
function restore(state, pos, scrollIntoView) {
  setState("_restore");
  lastCaptureState = state;
  if (state == "selection") {
    state = "madeSelection";
  }
  currentState = state;
  mousedownX = pos.left;
  mousedownY = pos.top;
  cornerX = pos.right;
  cornerY = pos.bottom;
  render();
  if (scrollIntoView) {
    var windowTop = window.scrollY;
    var windowBottom = window.scrollY + window.innerHeight;
    if (pos.top > windowBottom || pos.bottom < windowTop) {
      var newScroll = (pos.top + pos.bottom) / 2 - (window.innerHeight / 2);
      window.scrollTo(0, newScroll);
    }
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
  startX = event.pageX;
  startY = event.pageY;
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseup", mouseup, false);
  event.stopPropagation();
  event.preventDefault();
  removeCrosshairs();
  return false;
});

var mouseup = watchFunction(function (event) {
  document.removeEventListener("mousemove", mousemove, false);
  document.removeEventListener("mouseup", mouseup, false);
  if (! startX) {
    // only do this if we moved enough...
    cornerX = event.pageX;
    cornerY = event.pageY;
    render();
    reportSelection("selection");
    setState("madeSelection");
  } else {
    startX = startY = null;
  }
});

var mousemove = watchFunction(function (event) {
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
  cornerX = event.pageX;
  cornerY = event.pageY;
  render();
});

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
  vertCross.style.left = x + "px";
  horizCross.style.top = y + "px";
}

function addCrosshairs() {
  document.addEventListener("mousemove", crosshairsMousemove, false);
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
 * autoSelect handling
 */


/** Returns true if the element should be ignored, typically for
    heuristic reasons (ignoring for positions is handled in autoSelect
    itself) */
function ignoreElementForAutoSelect(el) {
  var className = el.className || "";
  if (className) {
    // navbar and top-bar are typically for navigation
    // banner is probably bannerish!
    if ((/navbar|top-bar|banner/).test(className)) {
      return true;
    }
  }
  return false;
}

function autoSelect(ids) {
  var startTime = Date.now();
  ids = ids || autoIds;
  var i, el;
  var outerElements = {
    top: null,
    bottom: null,
    left: null,
    right: null
  };
  var els = [];
  if (ids) {
    for (i=0; i<ids.length; i++) {
      el = document.getElementById(ids[i]);
      var rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.scrollY + window.innerHeight ||
          (rect.height === 0 && rect.width === 0)) {
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
    if (ids) {
      console.info("Readable portion of page is entirely off-screen, expanding search to entire document");
    }
    els.push(document.body);
  }
  console.info("Scanning elements:", els.map(function (e) {return e.tagName + "#" + e.id + (ids && ids.indexOf(e.id) != -1 ? "(readable)" : "");}).join(", "));
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
    if (ignoreElementForAutoSelect(el)) {
      if (DEBUG_AUTOSELECT) {
        debugAnnotate(el, "Explicit ignore", "rgba(255, 0, 9, 0.5)");
      }
      return;
    }
    var rect = el.getBoundingClientRect();
    rect = {
      top: rect.top + screen.top,
      bottom: rect.bottom + screen.top,
      left: rect.left + screen.left,
      right: rect.right + screen.left
    };
    if (rect.bottom != rect.top &&
        rect.bottom < screen.top || rect.top > screen.bottom) {
      if (DEBUG_AUTOSELECT) {
        debugAnnotate(el, rect.bottom < screen.top ? "Above screen" : "Below screen",
                      "rgba(255, 255, 100, 0.5)");
      }
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
        } else if (DEBUG_AUTOSELECT) {
          debugAnnotate(child, "Display: " + display, null, "#aff");
        }
      }
    }
    if (rect.top < screen.top ||
        rect.bottom > screen.bottom ||
        rect.left < screen.left-200 ||
        rect.right > screen.right+200) {
      if (DEBUG_AUTOSELECT) {
        var text = "";
        if (rect.top < screen.top) {
          text += "extends above screen ";
        }
        if (rect.bottom > screen.bottom) {
          text += "extends below screen ";
        }
        if (rect.left < screen.left-200) {
          text += "extends to left of screen ";
        }
        if (rect.right > screen.right + 200) {
          text += "extends to right of screen ";
        }
        debugAnnotate(el, text, "rgba(255, 230, 90, 0.5)");
      }
      return;
    }
    if ((rect.left <= 0 || rect.left <= screen.left) &&
        (rect.right >= document.body.clientWidth - 10 || rect.right >= screen.right - 10)) {
      // It's a full-width element, so we shouldn't use it to expand
      if (DEBUG_AUTOSELECT) {
        debugAnnotate(el, "Ignoring full width element", null, "dotted 1px #00f");
      }
      return;
    }
    if (rect.top == rect.bottom) {
      // It's a zero-height element, probably not really visible
      return;
    }
    if (DEBUG_AUTOSELECT) {
      debugAnnotate(el, null, "rgba(200, 255, 200, 0.5)");
    }
    if (rect.top > 0 && pos.top === null || rect.top < pos.top) {
      pos.top = rect.top;
      outerElements.top = el;
    }
    if (pos.bottom === null || rect.bottom > pos.bottom) {
      pos.bottom = rect.bottom;
      outerElements.bottom = el;
    }
    if (rect.left > 0 && pos.left === null || rect.left < pos.left) {
      pos.left = rect.left;
      outerElements.left = el;
    }
    if (rect.right < screen.right && pos.right === null || rect.right > pos.right) {
      pos.right = rect.right;
      outerElements.right = el;
    }
  }
  for (i=0; i<els.length; i++) {
    el = els[i];
    traverse(el);
  }
  if (pos.top === null && pos.bottom === null &&
      pos.left === null && pos.right === null) {
    console.info("No autoSelect elements found, doing no selection");
    reportNoSelection();
    return false;
  } else if (pos.top === null || pos.bottom === null ||
             pos.left === null || pos.right === null) {
    console.info("Expanding autoSelect in directions:",
                pos.top === null ? "top" : "",
                pos.bottom === null ? "bottom" : "",
                pos.left === null ? "left" : "",
                pos.right === null ? "right" : "");
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
  if (pos.bottom - pos.top < MIN_AUTOSELECT_HEIGHT) {
    // Expand down to see if we get enough selection...
    pos.bottom = Math.min(pos.top + MIN_AUTOSELECT_HEIGHT, screen.bottom);
    if (pos.bottom - pos.top < MIN_AUTOSELECT_HEIGHT) {
      // If not, expand up...
      pos.bottom = Math.max(pos.bottom - MIN_AUTOSELECT_HEIGHT, screen.top);
    }
  }
  if (pos.right - pos.left < MIN_AUTOSELECT_WIDTH) {
    // Expand right to see if we get enough selection...
    pos.right = Math.min(pos.left + MIN_AUTOSELECT_WIDTH, screen.right);
    if (pos.right - pos.left < MIN_AUTOSELECT_WIDTH) {
      // If not, expand left...
      pos.left = Math.max(pos.right - MIN_AUTOSELECT_WIDTH, screen.left);
    }
  }
  console.info("autoSelect outer elements:",
              Object.keys(outerElements).map(function (attr) {
                return attr + ": " +
                  (outerElements[attr] ? outerElements[attr].id : "none");
              }).join(", "));
  if (DEBUG_AUTOSELECT) {
    Object.keys(outerElements).forEach(function (attr) {
      if (outerElements[attr]) {
        debugAnnotate(outerElements[attr], "Represents " + attr, null, "#f00 dotted 3px");
      }
    });
  }
  mousedownX = pos.left;
  mousedownY = pos.top;
  cornerX = pos.right;
  cornerY = pos.bottom;
  render();
  console.info("total autoSelect time:", Date.now() - startTime, "ms");
  reportSelection("auto");
  return true;
}

/**********************************************************
 * text selection
 */

function captureSelection(makeNewSelection) {
  let range = window.getSelection().getRangeAt(0);
  var selection = extractSelection(range);
  selection.html = selection.node.outerHTML;
  delete selection.node;
  if (makeNewSelection) {
    self.port.emit("makeNewTextSelection", selection);
  } else {
    self.port.emit("textSelection", selection);
  }
}

// The following code which checks for an initial text selection
// is commented out due to issue #515
/*
if (window.getSelection().rangeCount && ! window.getSelection().isCollapsed) {
  initialSelection = true;
  watchFunction(captureSelection)(false);
}
*/

let textSelectButton;

window.addEventListener("mouseup", watchFunction(function (event) {
  if (textSelectButton) {
    textSelectButton.parentNode.removeChild(textSelectButton);
    textSelectButton = null;
  }

  if (event.target.className === "pageshot-textbutton" && currentState !== "text") {
    return;
  }

  if ((! window.getSelection()) || (! window.getSelection().rangeCount) ||
      window.getSelection().isCollapsed) {
    return;
  }
  let range = window.getSelection().getRangeAt(0);
  if (! range) {
    return;
  }
  let rects = range.getClientRects();
  let rect = rects[0];
  if (! rect) {
    // FIXME: haven't figured out when this happens, seems to be related to a
    // selection that doesn't cover any clear area
    console.warn("No rects in range.getClientRects()");
    return;
  }
  if (currentState === "text") {
    captureSelection(false);
    return;
  }

  // The following code for creating the + button when text is selected
  // is commented out due to issue #515
/*
  let button = document.createElement("div");
  button.className = "pageshot-textbutton";
  button.setAttribute("title", "Add this selection as a clip");
  button.textContent = "+";
  // the button click can ruin the range we had, so we keep a copy:
  let buttonRange = range.cloneRange();
  button.addEventListener("mouseup", function (clickEvent) {
    clickEvent.stopPropagation();
    clickEvent.preventDefault();
    let existing = window.getSelection().getRangeAt(0);
    existing.setStart(buttonRange.startContainer, buttonRange.startOffset);
    existing.setEnd(buttonRange.endContainer, buttonRange.endOffset);
    textSelectButton.parentNode.removeChild(textSelectButton);
    textSelectButton = null;
    captureSelection(true);
    return false;
  }, false);
  let bodyRect = getBodyRect();
  button.style.top = rect.top + document.documentElement.scrollTop - bodyRect.top - 21 + "px";
  button.style.left = rect.left + document.documentElement.scrollLeft - bodyRect.left + "px";
  document.body.appendChild(button);
  textSelectButton = button;
*/

}), false);


/**********************************************************
 * window.history catching
 */

var origUrl = location.href;
function checkUrl() {
  var curUrl = location.href;
  if (origUrl != curUrl) {
    console.info("got url change", origUrl, curUrl);
    self.port.emit("popstate", curUrl);
    setState("cancel");
  }
}

window.addEventListener("popstate", checkUrl, false);

self.port.on("isShowing", checkUrl);

let loadTime = Date.now();
self.port.on("extractedData", watchFunction(function (data) {
  if (data.readable) {
    autoIds = data.readable.readableIds;
    if (! autoIds.length) {
      autoIds = null;
    }
  }
  console.info("getting extractedData:", Date.now() - loadTime, "ms");
}));

self.port.emit("ready");
