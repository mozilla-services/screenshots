/* globals console, self, watchFunction, extractSelection */


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
  pos.text = selectedText;
  self.port.emit("select", pos);
}

function reportNoSelection() {
  self.port.emit("noAutoSelection");
}

self.port.on("getScreenPosition", watchFunction(function () {
  self.port.emit("screenPosition", {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    left: window.scrollX,
    right: window.scrollX + window.innerWidth
  });
}));

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
  startX = event.pageX;
  startY = event.pageY;
  document.addEventListener("mousemove", mousemove, false);
  document.addEventListener("mouseup", mouseup, false);
  event.stopPropagation();
  event.preventDefault();
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
    reportSelection();
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
var bodyRect;

var boxTopEl, boxLeftEl, boxRightEl, boxBottomEl;

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
  }
  if (! bodyRect) {
    bodyRect = document.body.getBoundingClientRect();
    bodyRect = {
      top: bodyRect.top + window.scrollY,
      bottom: bodyRect.bottom + window.scrollY,
      left: bodyRect.left + window.scrollX,
      right: bodyRect.right + window.scrollX
    };
    // FIXME: I can't decide when this is necessary
    // *not* necessary on http://patriciogonzalezvivo.com/2015/thebookofshaders/
    // (actually causes mis-selection there)
    // *is* necessary on http://atirip.com/2015/03/17/sorry-sad-state-of-matrix-transforms-in-browsers/
    bodyRect = {top: 0, bottom: 0, left: 0, right: 0};
  }
  var docHeight = document.documentElement.scrollHeight;
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
  } else {
    selectedText = null;
  }
  //console.log("Found text:", selectedText);
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
      console.log("Readable portion of page is entirely off-screen, expanding search to entire document");
    }
    els.push(document.body);
  }
  console.log("Scanning elements:", els.map(function (e) {return e.tagName + "#" + e.id + (ids && ids.indexOf(e.id) != -1 ? "(readable)" : "");}).join(", "));
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
    console.log("No autoSelect elements found, doing no selection");
    reportNoSelection();
    return;
  } else if (pos.top === null || pos.bottom === null ||
             pos.left === null || pos.right === null) {
    console.log("Expanding autoSelect in directions:",
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
  console.log("autoSelect outer elements:",
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
  reportSelection();
}

/**********************************************************
 * text selection
 */

function captureSelection() {
  console.log("trying selection", window.getSelection().getRangeAt(0));
  var selection = extractSelection(window.getSelection().getRangeAt(0));
  console.log("got selection", selection);
  self.port.emit("textSelection", selection.outerHTML);
}

if (window.getSelection().rangeCount && ! window.getSelection().isCollapsed) {
  watchFunction(captureSelection)();
}

/**********************************************************
 * window.history catching
 */

var origUrl = location.href;
function checkUrl() {
  var curUrl = location.href;
  if (origUrl != curUrl) {
    console.log("got url change", origUrl, curUrl);
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
