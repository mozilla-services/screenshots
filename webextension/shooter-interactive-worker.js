/* globals console, self, watchFunction, watchPromise, annotatePosition, util, ui, snapping */
/* globals window, document, location, chromeShooter */

/**********************************************************
 * selection
 */

/* States:

"crosshairs":
  Nothing has happened, and the crosshairs will follow the movement of the mouse
"draggingReady":
  The user has pressed the mouse button, but hasn't moved enough to create a selection
"dragging":
  The user has pressed down a mouse button, and is dragging out an area far enough to show a selection
"selected":
  The user has selected an area
"resizing":
  The user is resizing the selection
"cancelled":
  Everything has been cancelled

A mousedown goes from crosshairs to dragging.
A mouseup goes from dragging to selected
A click outside of the selection goes from selected to crosshairs
A click on one of the draggers goes from selected to resizing

State variables:

state (string, one of the above)
mousedownPos (object with x/y during draggingReady, shows where the selection started)
selectedPos (object with x/y/h/w during selected or dragging, gives the entire selection)
resizeDirection (string: top, topLeft, etc, during resizing)
resizeStartPos (x/y position where resizing started)
mouseupNoAutoselect (true if a mouseup in draggingReady should not trigger autoselect)

*/

var isChrome = false;

const MAX_PAGE_HEIGHT = 5000;
const MAX_PAGE_WIDTH = 5000;
// An autoselection smaller than these will be ignored entirely:
const MIN_DETECT_ABSOLUTE_HEIGHT = 10;
const MIN_DETECT_ABSOLUTE_WIDTH = 30;
// An autoselection smaller than these will not be preferred:
const MIN_DETECT_HEIGHT = 30;
const MIN_DETECT_WIDTH = 100;
// An autoselection bigger than either of these will be ignored:
const MAX_DETECT_HEIGHT = Math.max(window.innerHeight + 100, 700);
const MAX_DETECT_WIDTH = Math.max(window.innerWidth + 100, 1000);
// This is how close (in pixels) you can get to the edge of the window and then
// it will scroll:
const SCROLL_BY_EDGE = 20;

let annotateForPage = false;
if (! isChrome && self.options.annotateForPage) {
  annotateForPage = true;
}

function sendEvent(action, label, options) {
  if (isChrome) {
    chromeShooter.sendAnalyticEvent("addon", action, label, options);
  } else {
    self.port.emit.apply(self.port, ["sendEvent"].concat(Array.from(arguments)));
  }
}

function round10(n) {
  return Math.floor(n / 10) * 10;
}

function eventOptionsForBox(box) {
  return {
    cd1: round10(Math.abs(box.bottom - box.top)),
    cd2: round10(Math.abs(box.right - box.left))
  };
}

function eventOptionsForResize(boxStart, boxEnd) {
  return {
    cd1: round10(
      (boxEnd.bottom - boxEnd.top)
      - (boxStart.bottom - boxStart.top)),
    cd2: round10(
      (boxEnd.right - boxEnd.left)
      - (boxStart.right - boxStart.left))
  };
}

function eventOptionsForMove(posStart, posEnd) {
  return {
    cd1: round10(posEnd.y - posStart.y),
    cd2: round10(posEnd.x - posStart.x)
  };
}

/***********************************************
 * State and stateHandlers infrastructure
 */

// This enumerates all the anchors on the selection, and what part of the
// selection they move:
const movements = {
  topLeft: ["x1", "y1"],
  top: [null, "y1"],
  topRight: ["x2", "y1"],
  left: ["x1", null],
  right: ["x2", null],
  bottomLeft: ["x1", "y2"],
  bottom: [null, "y2"],
  bottomRight: ["x2", "y2"],
  move: ["*", "*"]
};

const doNotAutoselectTags = {
  H1: true,
  H2: true,
  H3: true,
  H4: true,
  H5: true,
  H6: true
};

let standardDisplayCallbacks = {
  cancel: () => {
    sendEvent("cancel-shot", "overlay-cancel-button");
    deactivate();
    self.port.emit("deactivate");
  }, save: () => {
    sendEvent("save-shot", "overlay-save-button");
    self.port.emit("take-shot");
  }, download: () => {
    sendEvent("download-shot", "overlay-download-button");
    self.port.emit("requestDownload");
  }
};

let standardOverlayCallbacks = {
  onOpenMyShots: () => {
    sendEvent("goto-myshots", "selection-button");
    deactivate();
    self.port.emit("deactivate");
    self.port.emit("openMyShots");
  },
  onClickVisible: () => {
    sendEvent("capture-visible", "selection-button");
    selectedPos = new Selection(
      window.scrollX, window.scrollY,
      window.scrollX + window.innerWidth, window.scrollY + window.innerHeight);
    reportSelection("visible");
  },
  onClickFullPage: () => {
    sendEvent("capture-full-page", "selection-button");
    let width = Math.max(
      document.body.clientWidth,
      document.documentElement.clientWidth,
      document.body.scrollWidth,
      document.documentElement.scrollWidth);
    width = Math.min(width, MAX_PAGE_WIDTH);
    let height = Math.max(
      document.body.clientHeight,
      document.documentElement.clientHeight,
      document.body.scrollHeight,
      document.documentElement.scrollHeight);
    height = Math.min(height, MAX_PAGE_HEIGHT);
    selectedPos = new Selection(
      0, 0,
      width, height);
    reportSelection("fullPage");
  }
}

/** Holds all the objects that handle events for each state: */
let stateHandlers = {};

function getState() {
  return getState.state;
}
getState.state = "cancel";

function setState(s) {
  if (! stateHandlers[s]) {
    throw new Error("Unknown state: " + s);
  }
  let cur = getState.state;
  let handler = stateHandlers[cur];
  if (handler.end) {
    handler.end();
  }
  getState.state = s;
  if (stateHandlers[s].start) {
    stateHandlers[s].start();
  }
}

/** Various values that the states use: */
let mousedownPos;
let selectedPos;
let resizeDirection;
let resizeStartPos;
let resizeStartSelected;
let resizeHasMoved;
let mouseupNoAutoselect = false;
let autoDetectRect;

/** Represents a selection box: */
class Selection {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  rect() {
    return {
      top: Math.floor(this.top),
      left: Math.floor(this.left),
      bottom: Math.floor(this.bottom),
      right: Math.floor(this.right)
    };
  }

  get top() {
    return Math.min(this.y1, this.y2);
  }
  set top(val) {
    if (this.y1 < this.y2) {
      this.y1 = val;
    } else {
      this.y2 = val;
    }
  }

  get bottom() {
    return Math.max(this.y1, this.y2);
  }
  set bottom(val) {
    if (this.y1 > this.y2) {
      this.y1 = val;
    } else {
      this.y2 = val;
    }
  }

  get left() {
    return Math.min(this.x1, this.x2);
  }
  set left(val) {
    if (this.x1 < this.x2) {
      this.x1 = val;
    } else {
      this.x2 = val;
    }
  }

  get right() {
    return Math.max(this.x1, this.x2);
  }
  set right(val) {
    if (this.x1 > this.x2) {
      this.x1 = val;
    } else {
      this.x2 = val;
    }
  }

  get width() {
    return Math.abs(this.x1 - this.x2);
  }
  get height() {
    return Math.abs(this.y1 - this.y2);
  }

  /** Sort x1/x2 and y1/y2 so x1<x2, y1<y2 */
  sortCoords() {
    if (this.x1 > this.x2) {
      let tmp = this.x2;
      this.x2 = this.x1;
      this.x1 = tmp;
    }
    if (this.y1 > this.y2) {
      let tmp = this.y2;
      this.y2 = this.y1;
      this.y1 = tmp;
    }
  }

  union(other) {
    return new Selection(
      Math.min(this.left, other.left),
      Math.min(this.top, other.top),
      Math.max(this.right, other.right),
      Math.max(this.bottom, other.bottom)
    );
  }

  clone() {
    return new Selection(this.x1, this.y1, this.x2, this.y2);
  }
}

Selection.getBoundingClientRect = function (el) {
  if (! el.getBoundingClientRect) {
    // Typically the <html> element or somesuch
    return null;
  }
  let rect = el.getBoundingClientRect();
  if (! rect) {
    return null;
  }
  return new Selection(
    rect.left + window.scrollX,
    rect.top + window.scrollY,
    rect.right + window.scrollX,
    rect.bottom + window.scrollY
  );
};

/** Represents a single x/y point, typically for a mouse click that doesn't have a drag: */
class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  elementFromPoint() {
    document.body.classList.add("pageshot-no-pointer-events");
    try {
      return document.elementFromPoint(
        this.x - window.pageXOffset,
        this.y - window.pageYOffset);
    } finally {
      document.body.classList.remove("pageshot-no-pointer-events");
    }
  }

  distanceTo(x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2), Math.pow(this.y - y));
  }
}

/***********************************************
 * all stateHandlers
 */

stateHandlers.crosshairs = {

  cachedEl: null,

  start: function () {
    selectedPos = mousedownPos = null;
    this.cachedEl = null;
    ui.Box.remove();
    ui.WholePageOverlay.display(standardOverlayCallbacks);
    document.addEventListener("keyup", watchFunction(keyupHandler), false);
    registeredDocumentHandlers.push({name: "keyup", doc: document, handler: keyupHandler});
    if (isChrome) {
      ui.ChromeInterface.showSaveFullPage();
    }
  },

  mousemove: function (event) {
    ui.PixelDimensions.display(event.pageX, event.pageY, event.pageX, event.pageY);
    if (event.target.className &&
        event.target.className !== "pageshot-preview-overlay" &&
        event.target.className.startsWith("pageshot-")) {
      // User is hovering over a Page Shot button or control
      autoDetectRect = null;
      ui.HoverBox.hide();
      return;
    }
    let el;
    if (event.target.className === "pageshot-preview-overlay") {
      // The hover is on the overlay, so we need to figure out the real element
      el = ui.iframe.getElementFromPoint(
        event.pageX - window.pageXOffset,
        event.pageY - window.pageYOffset
      );
    } else {
      // The hover is on the element we care about, so we use that
      el = event.target;
    }
    if (this.cachedEl && this.cachedEl === el) {
      // Still hovering over the same element
      return;
    }
    this.cachedEl = el;
    this.setAutodetectBasedOnElement(el);
  },

  setAutodetectBasedOnElement: function (el) {
    let lastRect;
    let lastNode;
    let rect;
    let attemptExtend = false;
    let node = el;
    while (node) {
      rect = Selection.getBoundingClientRect(node);
      if (! rect) {
        rect = lastRect;
        break;
      }
      if (rect.width > MAX_DETECT_WIDTH || rect.height > MAX_DETECT_HEIGHT) {
        // Then the last rectangle is better
        rect = lastRect;
        attemptExtend = true;
        break;
      }
      if (rect.width >= MIN_DETECT_WIDTH && rect.height >= MIN_DETECT_HEIGHT) {
        if (! doNotAutoselectTags[node.tagName]) {
          break;
        }
      }
      lastRect = rect;
      lastNode = node;
      node = node.parentNode;
    }
    if (rect && node) {
      let evenBetter = this.evenBetterElement(node, rect);
      if (evenBetter) {
        node = lastNode = evenBetter;
        rect = Selection.getBoundingClientRect(evenBetter);
        attemptExtend = false;
      }
    }
    if (rect && attemptExtend) {
      let extendNode = lastNode.nextSibling;
      while (extendNode) {
        if (extendNode.nodeType === document.ELEMENT_NODE) {
          break;
        }
        extendNode = extendNode.nextSibling;
        if (! extendNode) {
          let parent = lastNode.parentNode;
          for (let i=0; i<parent.childNodes.length; i++) {
            if (parent.childNodes[i] === lastNode) {
              extendNode = parent.childNodes[i+1];
            }
          }
        }
      }
      if (extendNode) {
        let extendSelection = Selection.getBoundingClientRect(extendNode);
        let extendRect = rect.union(extendSelection);
        if (extendRect.width <= MAX_DETECT_WIDTH && extendRect.height <= MAX_DETECT_HEIGHT) {
          rect = extendRect;
        }
      }
    }

    if (rect && (rect.width < MIN_DETECT_ABSOLUTE_WIDTH || rect.height < MIN_DETECT_ABSOLUTE_HEIGHT)) {
      rect = null;
    }
    if (! rect) {
      ui.HoverBox.hide();
    } else {
      ui.HoverBox.display(rect);
    }
    autoDetectRect = rect;
  },

  /** When we find an element, maybe there's one that's just a little bit better... */
  evenBetterElement: function (node, origRect) {
    let el = node.parentNode;
    let ELEMENT_NODE = document.ELEMENT_NODE;
    while (el && el.nodeType == ELEMENT_NODE) {
      if (! el.getAttribute) {
        return null;
      }
      let role = el.getAttribute("role");
      if (role === "article" || (el.className && typeof el.className == "string" && el.className.search("tweet ") !== -1)) {
        let rect = Selection.getBoundingClientRect(el);
        if (! rect) {
          return null;
        }
        if (rect.width <= MAX_DETECT_WIDTH && rect.height <= MAX_DETECT_HEIGHT) {
          return el;
        } else {
          return null;
        }
      }
      el = el.parentNode;
    }
    return null;
  },

  mousedown: function (event) {
    if (ui.isHeader(event.target)) {
      return;
    }
    mousedownPos = new Pos(event.pageX, event.pageY);
    setState("draggingReady");
    event.stopPropagation();
    event.preventDefault();
    return false;
  },

  end: function () {
    ui.HoverBox.remove();
    ui.PixelDimensions.remove();
  }
};

stateHandlers.draggingReady = {
  minMove: 40, // px
  minAutoImageWidth: 40,
  minAutoImageHeight: 40,
  maxAutoElementWidth: 800,
  maxAutoElementHeight: 600,

  start: function () {
    ui.Box.remove();
    ui.WholePageOverlay.display(standardOverlayCallbacks);
  },

  mousemove: function (event) {
    if (mousedownPos.distanceTo(event.pageX, event.pageY) > this.minMove) {
      selectedPos = new Selection(
        mousedownPos.x,
        mousedownPos.y,
        event.pageX,
        event.pageY);
      mousedownPos = null;
      setState("dragging");
    }
  },

  mouseup: function (event) {
    // If we don't get into "dragging" then we attempt an autoselect
    if (mouseupNoAutoselect) {
      sendEvent("cancel-selection", "selection-background-mousedown");
      setState("crosshairs");
      return false;
    }
    if (autoDetectRect) {
      selectedPos = autoDetectRect;
      autoDetectRect = null;
      mousedownPos = null;
      ui.Box.display(selectedPos, standardDisplayCallbacks);
      sendEvent("make-selection", "selection-click", eventOptionsForBox(selectedPos));
      setState("selected");
      if (isChrome) {
        chromeShooter.sendAnalyticEvent("addon", "autoselect");
      }
      reportSelection();
    } else {
      sendEvent("no-selection", "no-element-found");
      setState("crosshairs");
    }
  },

  click: function (event) {
    this.mouseup(event);
  },

  findGoodEl: function () {
    let el = mousedownPos.elementFromPoint();
    if (! el) {
      return null;
    }
    let isGoodEl = (el) => {
      if (el.nodeType != document.ELEMENT_NODE) {
        return false;
      }
      if (el.tagName == "IMG") {
        let rect = el.getBoundingClientRect();
        return rect.width >= this.minAutoImageWidth && rect.height >= this.minAutoImageHeight;
      }
      let display = window.getComputedStyle(el).display;
      if (['block', 'inline-block', 'table'].indexOf(display) != -1) {
        return true;
        // FIXME: not sure if this is useful:
        //let rect = el.getBoundingClientRect();
        //return rect.width <= this.maxAutoElementWidth && rect.height <= this.maxAutoElementHeight;
      }
      return false;
    };
    while (el) {
      if (isGoodEl(el)) {
        return el;
      }
      el = el.parentNode;
    }
    return null;
  },

  end: function () {
    mouseupNoAutoselect = false;
  }

};

stateHandlers.dragging = {

  start: function () {
    ui.Box.display(selectedPos);
    ui.WholePageOverlay.remove();
  },

  mousemove: function (event) {
    selectedPos.x2 = util.truncateX(event.pageX);
    selectedPos.y2 = util.truncateY(event.pageY);
    scrollIfByEdge(event.pageX, event.pageY);
    ui.Box.display(selectedPos);
    ui.PixelDimensions.display(event.pageX, event.pageY, selectedPos.width, selectedPos.height);
  },

  mouseup: function (event) {
    selectedPos.x2 = util.truncateX(event.pageX);
    selectedPos.y2 = util.truncateY(event.pageY);
    ui.Box.display(selectedPos, standardDisplayCallbacks);
    reportSelection();
    sendEvent(
      "make-selection", "selection-drag",
      eventOptionsForBox({
        top: selectedPos.y1,
        bottom: selectedPos.y2,
        left: selectedPos.x1,
        right: selectedPos.x2
      }));
    setState("selected");
  },

  end: function () {
    ui.PixelDimensions.remove();
  }
};

stateHandlers.selected = {
  start: function () {
    ui.WholePageOverlay.remove();
    if (isChrome) {
      ui.ChromeInterface.showSave();
    }
  },

  mousedown: function (event) {
    let target = event.target;
    if (target.tagName == "HTML") {
      // This happens when you click on the scrollbar
      return;
    }
    let direction = ui.Box.draggerDirection(target);
    if (direction) {
      sendEvent("start-resize-selection", "handle");
      stateHandlers.resizing.startResize(event, direction);
    } else if (ui.Box.isSelection(target)) {
      sendEvent("start-move-selection", "selection");
      stateHandlers.resizing.startResize(event, "move");
    } else if (! ui.Box.isControl(target)) {
      mousedownPos = new Pos(event.pageX, event.pageY);
      mouseupNoAutoselect = true;
      setState("draggingReady");
    }
    event.preventDefault();
    return false;
  }
};

stateHandlers.resizing = {
  start: function () {
    ui.WholePageOverlay.remove();
    selectedPos.sortCoords();
  },

  startResize: function (event, direction) {
    selectedPos.sortCoords();
    resizeDirection = direction;
    resizeStartPos = new Pos(event.pageX, event.pageY);
    resizeStartSelected = selectedPos.clone();
    resizeHasMoved = false;
    setState("resizing");
  },

  mousemove: function (event) {
    this._resize(event);
    return false;
  },

  mouseup: function (event) {
    this._resize(event);
    if (isChrome) {
      chromeShooter.sendAnalyticEvent("addon", "selection-resized");
    }
    ui.Box.display(selectedPos, standardDisplayCallbacks);
    if (resizeHasMoved) {
      if (resizeDirection == "move") {
        let startPos = new Pos(resizeStartSelected.left, resizeStartSelected.top);
        let endPos = new Pos(selectedPos.left, selectedPos.top);
        sendEvent(
          "move-selection", "mouseup",
          eventOptionsForMove(startPos, endPos));
      } else {
        sendEvent(
          "resize-selection", "mouseup",
          eventOptionsForResize(resizeStartSelected, selectedPos));
      }
    } else {
      if (resizeDirection == "move") {
        sendEvent("keep-resize-selection", "mouseup");
      } else {
        sendEvent("keep-move-selection", "mouseup");
      }
    }
    setState("selected");
    reportSelection();
  },

  _resize: function (event) {
    let diffX = event.pageX - resizeStartPos.x;
    let diffY = event.pageY - resizeStartPos.y;
    let movement = movements[resizeDirection];
    if (movement[0]) {
      let moveX = movement[0];
      moveX = moveX == "*" ? ["x1", "x2"] : [moveX];
      for (let moveDir of moveX) {
        selectedPos[moveDir] =  util.truncateX(resizeStartSelected[moveDir] + diffX);
      }
    }
    if (movement[1]) {
      let moveY = movement[1];
      moveY = moveY == "*" ? ["y1", "y2"] : [moveY];
      for (let moveDir of moveY) {
        selectedPos[moveDir] = util.truncateY(resizeStartSelected[moveDir] + diffY);
      }
    }
    if (diffX || diffY) {
      resizeHasMoved = true;
    }
    scrollIfByEdge(event.pageX, event.pageY);
    ui.Box.display(selectedPos);
  },

  end: function () {
    resizeDirection = resizeStartPos = resizeStartSelected = null;
    selectedPos.sortCoords();
  }
};

stateHandlers.cancel = {
  start: function () {
    ui.WholePageOverlay.remove();
    ui.Box.remove();
  }
};

let documentWidth = Math.max(
  document.body.clientWidth,
  document.documentElement.clientWidth,
  document.body.scrollWidth,
  document.documentElement.scrollWidth);
let documentHeight = Math.max(
  document.body.clientHeight,
  document.documentElement.clientHeight,
  document.body.scrollHeight,
  document.documentElement.scrollHeight);

function scrollIfByEdge(pageX, pageY) {
  let top = window.scrollY;
  let bottom = top + window.innerHeight;
  let left = window.scrollX;
  let right = left + window.innerWidth;
  if (pageY + SCROLL_BY_EDGE >= bottom && bottom < documentHeight) {
    window.scrollBy(0, SCROLL_BY_EDGE);
  } else if (pageY - SCROLL_BY_EDGE <= top) {
    window.scrollBy(0, -SCROLL_BY_EDGE);
  }
  if (pageX + SCROLL_BY_EDGE >= right && right < documentWidth) {
    window.scrollBy(SCROLL_BY_EDGE, 0);
  } else if (pageX - SCROLL_BY_EDGE <= left) {
    window.scrollBy(-SCROLL_BY_EDGE, 0);
  }
}

/***********************************************
 * Selection communication
 */

function reportSelection(captureType) {
  var pos = selectedPos.rect();
  let selectedText = util.captureEnclosedText(pos);
  if (! selectedPos) {
    // Apparently no selection
    throw new Error("reportSelection() without any selection");
  }
  if (pos.top == pos.bottom || pos.right == pos.left) {
    console.info("Suppressing null selection");
    return;
  }
  if (annotateForPage) {
    annotatePosition(pos);
  }
  if (isChrome) {
    chromeShooter.sendAnalyticEvent("addon", "made-selection");
    chromeShooter.saveSelection(pos, selectedText, captureType);
  } else {
    self.port.emit("select", pos, selectedText, captureType);
  }
}

if (! isChrome) {
  self.port.on("getScreenPosition", watchFunction(function () {
    let pos = getScreenPosition();
    self.port.emit("screenPosition", pos);
  }));
}

function getScreenPosition() {
  var pos = {
    top: window.scrollY,
    bottom: window.scrollY + window.innerHeight,
    left: window.scrollX,
    right: window.scrollX + window.innerWidth
  };
  // FIXME: maybe annotating based on the corners is a bad idea,
  // should instead annotate based on an inner element, and not worry about
  // left and right
  if (annotateForPage) {
    annotatePosition(pos);
  }
  return pos;
}

function activate() {
  ui.Box.remove();
  addHandlers();
  if (self.options.styleMyShotsButton) {
    ui.iframe.addClassName = `styleMyShotsButton-${self.options.styleMyShotsButton.value}`;
  }
  watchPromise(ui.iframe.display(installHandlersOnDocument).then(() => {
    setState("crosshairs");
  }));
  if (isChrome) {
    ui.ChromeInterface.display();
    ui.ChromeInterface.onMyShots = function () {
      chromeShooter.sendAnalyticEvent("addon", "click-my-shots");
      deactivate();
      chromeShooter.setHasUsedMyShots(true);
      return true;
    };
    ui.ChromeInterface.onSave = function () {
      chromeShooter.sendAnalyticEvent("addon", "click-save");
      chromeShooter.takeShot();
      return false;
    };
    ui.ChromeInterface.onCancel = function () {
      chromeShooter.sendAnalyticEvent("addon", "click-cancel");
      deactivate();
      chromeShooter.deactivate();
      return false;
    };
  }
}

function deactivate() {
  try {
    ui.Box.remove();
    ui.remove();
    removeHandlers();
    setState("cancel");
  } catch (e) {
    // Sometimes this fires so late that the document isn't available
    // We don't care about the exception, so we swallow it here
  }
}

/***********************************************
 * Event handlers
 */

let primedDocumentHandlers = new Map();
let registeredDocumentHandlers = []

function addHandlers() {
  ["mouseup", "mousedown", "mousemove", "click"].forEach((eventName) => {
    let fn = watchFunction((function (eventName, event) {
      if (typeof event.button == "number" && event.button !== 0) {
        // Not a left click
        return;
      }
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
        // Modified click of key
        return;
      }
      let state = getState();
      let handler = stateHandlers[state];
      if (handler[eventName]) {
        return handler[eventName](event);
      }
    }).bind(null, eventName));
    primedDocumentHandlers.set(eventName, fn);
  });
  primedDocumentHandlers.set("keyup", keyupHandler);
}

function installHandlersOnDocument(docObj) {
  for (let [eventName, handler] of primedDocumentHandlers) {
    let watchHandler = watchFunction(handler);
    docObj.addEventListener(eventName, watchHandler, eventName !== "keyup");
    registeredDocumentHandlers.push({name: eventName, doc: docObj, watchHandler});
  }
}

function keyupHandler(event) {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    // Modified
    return;
  }
  if ((event.key || event.code) === "Escape") {
    deactivate();
    sendEvent("cancel-shot", "keyboard-escape");
    if (isChrome) {
      chromeShooter.deactivate();
    } else {
      self.port.emit("deactivate");
    }
  }
  if ((event.key || event.code) === "Enter") {
    if (getState.state === "selected") {
      sendEvent("save-shot", "keyboard-enter");
      if (isChrome) {
        chromeShooter.takeShot();
      } else {
        self.port.emit("take-shot");
      }
    }
  }
}

function removeHandlers() {
  for (let {name, doc, handler} of registeredDocumentHandlers) {
    doc.removeEventListener(name, handler, false);
  }
  registeredDocumentHandlers = [];
}

snapping.init();

/**********************************************************
 * window.history catching
 */

var origUrl = location.href;
function checkUrl() {
  var curUrl = location.href;
  if (origUrl != curUrl) {
    console.info("got url change", origUrl, curUrl);
    if (isChrome) {
      chromeShooter.popstate();
    } else {
      self.port.emit("popstate", curUrl);
    }
    sendEvent("cancel-shot", "url-changed");
    deactivate();
  }
}

window.addEventListener("popstate", watchFunction(checkUrl), false);

if (! isChrome) {
  self.port.on("isShowing", watchFunction(checkUrl));

  self.port.on("destroy", watchFunction(() => {
    // If we do this in a setTimeout, we get sane error messages.
    // If we don't, we get inscruitable ones.
    setTimeout(watchFunction(() => {
      deactivate();
      self.port.emit("destroyed");
    }), 0);
  }));

  self.port.on("triggerDownload", watchFunction((dataUrl, filename) => {
    ui.triggerDownload(dataUrl, filename);
    setTimeout(() => {
      deactivate();
      self.port.emit("deactivate");
    });
  }));

  // Happens if this worker is detached for some reason
  // (such as moving windows, add-on unloading)
  self.port.on("detach", watchFunction(() => {
    deactivate();
    console.info("detached worker");
  }));

  self.port.emit("ready");
  watchFunction(activate());
}
