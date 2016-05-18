/* globals console, self, watchFunction, annotatePosition, util, ui, snapping */
/* globals window, document, location, chromeShooter */

/**********************************************************
 * selection
 */

/* States:

"crosshairsPreview":
  Nothing has happened, and the selection preview is still showing
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

  clone() {
    return new Selection(this.x1, this.y1, this.x2, this.y2);
  }
}

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

stateHandlers.crosshairsPreview = {

  start: function () {
    ui.CrosshairPreview.display();
    ui.WholePageOverlay.display();
    if (isChrome) {
      if (! chromeShooter.hasUsedMyShots) {
        ui.MyShotsReminder.display();
      }
    } else if (self.options.showMyShotsReminder) {
      ui.MyShotsReminder.display();
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
    ui.WholePageOverlay.display();
  },

  mousemove: function (event) {
    let x = snapping.guessX(event.pageX);
    let y = snapping.guessY(event.pageY);
    ui.Crosshair.display(x, y);
  },

  mousedown: function (event) {
    if (ui.ChromeInterface.isHeader(event.target)) {
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
      selectedPos = new Selection(
        rect.left + window.scrollX,
        rect.top + window.scrollY,
        rect.left + window.scrollX + rect.width,
        rect.top + window.scrollY + rect.height
      );
      mousedownPos = null;
      ui.Box.display(selectedPos);
      setState("selected");
      if (isChrome) {
        chromeShooter.sendAnalyticEvent("addon", "autoselect");
      }
      reportSelection();
    } else {
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
    ui.Box.display(selectedPos);
    reportSelection("selection");
    if (isChrome) {
      chromeShooter.sendAnalyticEvent("addon", "drag-finished");
    }
    setState("selected");
  }
};

stateHandlers.selected = {
  start: function () {
    ui.WholePageOverlay.remove();
  },

  mousedown: function (event) {
    let target = event.target;
    let direction = ui.Box.draggerDirection(target);
    if (direction) {
      stateHandlers.resizing.startResize(event, direction);
      event.preventDefault();
      return false;
    }
    if (! ui.Box.isSelection(target)) {
      if (isChrome) {
        chromeShooter.sendAnalyticEvent("addon", "reset-selection");
      }
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
    setState("selected");
    reportSelection();
  },

  _resize: function (event) {
    let diffX = event.pageX - resizeStartPos.x;
    let diffY = event.pageY - resizeStartPos.y;
    let movement = movements[resizeDirection];
    if (movement[0]) {
      selectedPos[movement[0]] =  resizeStartSelected[movement[0]] + diffX;
    }
    if (movement[1]) {
      selectedPos[movement[1]] = resizeStartSelected[movement[1]] + diffY;
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
  annotatePosition(pos);
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
  annotatePosition(pos);
  return pos;
}

function activate() {
  ui.Box.remove();
  document.body.classList.remove("pageshot-hide-selection");
  document.body.classList.remove("pageshot-hide-movers");
  addHandlers();
  setState("crosshairsPreview");
  if (isChrome) {
    ui.ChromeInterface.display();
    ui.ChromeInterface.onMyShots = function () {
      chromeShooter.sendAnalyticEvent("addon", "click-my-shots");
      deactivate();
      chromeShooter.setHasusedMyShots(true);
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
    document.addEventListener(eventName, fn, false);
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
    if (isChrome) {
      chromeShooter.sendAnalyticEvent("addon", "cancel-escape");
      chromeShooter.deactivate();
    } else {
      self.port.emit("deactivate");
    }
  }
  if ((event.key || event.code) === "Enter") {
    if (isChrome) {
      chromeShooter.sendAnalyticEvent("addon", "save-enter");
      chromeShooter.takeShot();
    } else {
      self.port.emit("take-shot");
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
    deactivate();
  }
}

window.addEventListener("popstate", checkUrl, false);

if (! isChrome) {
  self.port.on("isShowing", checkUrl);

  self.port.on("cancel", deactivate);

  self.port.emit("ready");
  activate();
}
