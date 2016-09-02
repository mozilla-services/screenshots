/* globals console, self, watchFunction, annotatePosition, util, ui, snapping */
/* globals window, document, location, chromeShooter */

/**********************************************************
 * selection
 */

/* States:

"selectMode":
  Prompt the user to choose between selecting a region to screenshot and saving a full page archive.
"crosshairsPreview":
  FIXME DEPRECATE Nothing has happened, and the selection preview is still showing
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

*/

var isChrome = false;

let annotateForPage = false;
if (! isChrome && self.options.annotateForPage) {
  annotateForPage = true;
}

function sendEvent(event, action, label) {
  if (isChrome) {
    chromeShooter.sendAnalyticEvent(event, action, label);
  } else {
    self.port.emit("sendEvent", event, action, label);
  }
}

/***********************************************
 * State and stateHandlers infrastructure
 */

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

let standardDisplayCallbacks = {
  cancel: () => {
    sendEvent("cancel-shot", "overlay-cancel-button");
    deactivate();
    self.port.emit("deactivate");
  }, save: () => {
    sendEvent("save-shot", "overlay-save-button");
    self.port.emit("take-shot");
  }
};

let standardOverlayCallbacks = {
  onOpenMyShots: () => {
    deactivate();
    self.port.emit("deactivate");
    self.port.emit("openMyShots");
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

/** Represents a selection box: */
class Selection {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  /** Given the mouse coordinates, guess the appropriate condition given snap points */
  rect() {
    return {
      top: this.top, left: this.left,
      bottom: this.bottom, right: this.right
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

  checkBump(side) {
    if (side === "top") {
      if (this.height <= this.BUMP_LOWER) {
        this.bottom = snapping.guessY(util.truncateY(this.top + this.BUMP_EXPAND));
      }
    } else if (side === "bottom") {
      if (this.height <= this.BUMP_LOWER) {
        this.top = snapping.guessY(util.truncateY(this.bottom - this.BUMP_EXPAND));
      }
    } else if (side === "left") {
      if (this.width <= this.BUMP_LOWER) {
        this.right = snapping.guessX(util.truncateX(this.left + this.BUMP_EXPAND));
      }
    } else if (side === "right") {
      if (this.width <= this.BUMP_LOWER) {
        this.left = snapping.guessX(util.truncateX(this.right - this.BUMP_EXPAND));
      }
    } else {
      throw new Error("Unexpected direction: " + side);
    }
  }

  clone() {
    return new Selection(this.x1, this.y1, this.x2, this.y2);
  }
}

Selection.prototype.BUMP_LOWER = 3;
Selection.prototype.BUMP_EXPAND = 65;

/** Represents a single x/y point, typically for a mouse click that doesn't have a drag: */
class Pos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  elementFromPoint() {
    document.body.classList.add("pageshot-hide-selection");
    try {
      return document.elementFromPoint(
        this.x - window.pageXOffset,
        this.y - window.pageYOffset);
    } finally {
      document.body.classList.remove("pageshot-hide-selection");
    }
  }

  distanceTo(x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2), Math.pow(this.y - y));
  }
}

/***********************************************
 * all stateHandlers
 */

stateHandlers.selectMode = {
  start: function () {
    ui.SelectMode.display({
      onChooseRegionMode: this.onChooseRegionMode.bind(this),
      onChooseArchiveMode: this.onChooseArchiveMode.bind(this),
      onCancel: this.onCancel.bind(this),
      onOpenMyShots: this.onOpenMyShots.bind(this)
    });
  },

  onChooseRegionMode: function () {
    sendEvent("start-region-select", "mode-click");
    setState("crosshairs");
    // FIXME remove once the ui is fully settled
    //self.port.emit("showTopbar");
  },

  onChooseArchiveMode: function () {
    sendEvent("start-archive", "mode-click");
    setState("cancel");
    self.port.emit("take-shot");
  },

  onCancel: function () {
    sendEvent("cancel-shot", "mode-click");
    setState("cancel");
  },

  onOpenMyShots: function () {
    sendEvent("goto-myshots", "mode-click");
    self.port.emit("openMyShots");
  },

  end: function () {
    ui.SelectMode.remove();
  }
}

stateHandlers.crosshairsPreview = {

  start: function () {
    ui.CrosshairPreview.display();
    ui.WholePageOverlay.display(standardOverlayCallbacks);
    if (isChrome) {
      if (! chromeShooter.hasUsedMyShots) {
        ui.MyShotsReminder.display();
      }
      ui.ChromeInterface.showSaveFullPage();
    } else if (self.options.showMyShotsReminder) {
      ui.MyShotsReminder.display();
      // FIXME do we need to do anything here any more?
      //self.port.emit("showSave");
    }
  },

  mousemove: function () {
    setState("crosshairs");
  },

  end: function () {
    ui.CrosshairPreview.remove();
    ui.MyShotsReminder.remove();
  },
};

stateHandlers.crosshairs = {

  start: function () {
    selectedPos = mousedownPos = null;
    ui.Box.remove();
    ui.WholePageOverlay.display(standardOverlayCallbacks);
    if (isChrome) {
      ui.ChromeInterface.showSaveFullPage();
    } else {
      // FIXME do we need to do anything here any more?
      //self.port.emit("showSave");
    }
  },

  mousemove: function (event) {
    // FIXME remove this if we are sure we never want crosshairs
    /*
    if (ui.isHeader(event.target)) {
      ui.Crosshair.remove();
    } else {
      let x = snapping.guessX(event.pageX);
      let y = snapping.guessY(event.pageY);
      ui.Crosshair.display(x, y);
    }
    */
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
    ui.Crosshair.remove();
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
    let el = this.findGoodEl();
    if (el) {
      let rect = el.getBoundingClientRect();
      rect = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.left + window.scrollX + rect.width,
        bottom: rect.top + window.scrollY + rect.height
      };
      console.log("check down", rect.top, window.scrollY, rect.top < window.scrollY);
      if (rect.top < window.scrollY) {
        this.moveRectDown(rect, window.scrollY, el);
        console.log("rect.top", rect.top);
      }
      if (rect.bottom > window.scrollY + window.innerHeight) {
        this.moveRectUp(rect, window.scrollY + window.innerHeight, el);
      }
      selectedPos = new Selection(
        rect.left, rect.top, rect.right, rect.bottom
      );
      mousedownPos = null;
      ui.Box.display(selectedPos, standardDisplayCallbacks);
      sendEvent("make-selection", "selection-click");
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

  moveRectDown: function (rect, top, el) {
    let closest = null;
    function traverse(el) {
      let elRect = el.getBoundingClientRect();
      let elTop = elRect.top + window.scrollY;
      if (elTop > top) {
        if (closest === null || closest > elTop) {
          closest = elTop;
        }
      }
      if (closest === null || elTop < closest) {
        for (let i=0; i<el.childNodes.length; i++) {
          let child = el.childNodes[i];
          if (child && child.nodeType == document.ELEMENT_NODE) {
            traverse(child);
          }
        }
      }
    }
    traverse(el);
    if (closest !== null) {
      rect.top = closest;
    }
  },

  moveRectUp: function (rect, bottom, el) {
    let closest = null;
    function traverse(el) {
      let elRect = el.getBoundingClientRect();
      let elBottom = elRect.top + elRect.height + window.scrollY;
      if (elBottom < bottom) {
        if (closest === null || closest < elBottom) {
          closest = elBottom;
        }
      }
      if (closest === null || elBottom > closest) {
        for (let i=0; i<el.childNodes.length; i++) {
          let child = el.childNodes[i];
          if (child && child.nodeType == document.ELEMENT_NODE) {
            traverse(child);
          }
        }
      }
    }
    traverse(el);
    if (closest !== null) {
      rect.bottom = closest;
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
    ui.Box.display(selectedPos);
  },

  mouseup: function (event) {
    selectedPos.x2 = util.truncateX(event.pageX);
    selectedPos.y2 = util.truncateY(event.pageY);
    ui.Box.display(selectedPos, standardDisplayCallbacks);
    reportSelection("selection");
    sendEvent("make-selection", "selection-drag");
    setState("selected");
  }
};

stateHandlers.selected = {
  start: function () {
    ui.WholePageOverlay.remove();
    if (isChrome) {
      ui.ChromeInterface.showSave();
    } else {
      // FIXME remove once the ui has stopped changing so much
      //self.port.emit("showSave");
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
      event.preventDefault();
      return false;
    }
    if (! ui.Box.isSelection(target)) {
      sendEvent("cancel-selection", "selection-background-mousedown");
      setState("crosshairs");
    }
  }
};

stateHandlers.resizing = {
  start: function () {
    ui.WholePageOverlay.remove();
  },

  startResize: function (event, direction) {
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
      sendEvent("resize-selection", "mouseup");
    } else {
      sendEvent("keep-resize-selection", "mouseup");
    }
    setState("selected");
    reportSelection();
  },

  _resize: function (event) {
    let diffX = event.pageX - resizeStartPos.x;
    let diffY = event.pageY - resizeStartPos.y;
    let movement = movements[resizeDirection];
    if (movement[0]) {
      selectedPos[movement[0]] =  resizeStartSelected[movement[0]] + diffX;
      selectedPos.checkBump(movement[0]);
    }
    if (movement[1]) {
      selectedPos[movement[1]] = resizeStartSelected[movement[1]] + diffY;
      selectedPos.checkBump(movement[1]);
    }
    if (diffX || diffY) {
      resizeHasMoved = true;
    }
    ui.Box.display(selectedPos);
  },

  end: function () {
    resizeDirection = resizeStartPos = resizeStartSelected = null;
  }
};

stateHandlers.cancel = {
  start: function () {
    ui.WholePageOverlay.remove();
    ui.Box.remove();
  }
};

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
  document.body.classList.remove("pageshot-hide-selection");
  document.body.classList.remove("pageshot-hide-movers");
  addHandlers();
  setState("crosshairs");
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
  ui.Box.remove();
  document.body.classList.remove("pageshot-hide-selection");
  document.body.classList.remove("pageshot-hide-movers");
  ui.remove();
  removeHandlers();
  setState("cancel");
}

/***********************************************
 * Event handlers
 */

let registeredDocumentHandlers = {};

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
    document.addEventListener(eventName, fn, true);
    registeredDocumentHandlers[eventName] = fn;
  });
  document.addEventListener("keyup", keyupHandler, false);
  registeredDocumentHandlers.keyup = keyupHandler;
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
    if (getState.state === "selected" || getState.state === "selectMode") {
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
  for (let name in registeredDocumentHandlers) {
    document.removeEventListener(name, registeredDocumentHandlers[name], false);
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

if (! isChrome) {
  addStylesheet();
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

window.addEventListener("popstate", checkUrl, false);

if (! isChrome) {
  self.port.on("isShowing", checkUrl);

  self.port.on("destroy", () => {
    // If we do this in a setTimeout, we get sane error messages.
    // If we don't, we get inscruitable ones.
    setTimeout(() => {
      deactivate();
      self.port.emit("destroyed");
    }, 0);
  })

  self.port.emit("ready");
  activate();
}
