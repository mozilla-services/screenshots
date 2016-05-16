/* globals util, window, document, console */
/* exported ui */

var isChrome = false;

const ui = (function () {
  let exports = {};

  // The <body> tag itself can have margins and offsets, which need to be used when
  // setting the position of the boxEl.
  // FIXME: I guess this is disabled because it doesn't work well?
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

  /** Represents the shadow overlay that covers the whole page */
  let WholePageOverlay = exports.WholePageOverlay = {

    display: function () {
      if (! this.overlayEl) {
        this.overlayEl = document.createElement("div");
        this.overlayEl.className = "pageshot-preview-overlay";
        document.body.appendChild(this.overlayEl);
      }
    },

    remove: function () {
      util.removeNode(this.overlayEl);
      this.overlayEl = null;
    },

    el: null
  };

  let movements = ["topLeft", "top", "topRight", "left", "right", "bottomLeft", "bottom", "bottomRight"];

  /** Creates the selection box */
  exports.Box = {

    display: function (pos) {
      this._createEl();
      let bodyRect = getBodyRect();
      // Note, document.documentElement.scrollHeight is zero on some strange pages (such as the page created when you load an image):
      let docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let docWidth = document.documentElement.scrollWidth;
      this.el.style.top = (pos.top - bodyRect.top) + "px";
      this.el.style.left = (pos.left - bodyRect.left) + "px";
      this.el.style.height = (pos.bottom - pos.top - bodyRect.top) + "px";
      this.el.style.width = (pos.right - pos.left - bodyRect.left) + "px";
      this.bgTop.style.top = "0px";
      this.bgTop.style.height = (pos.top - bodyRect.top) + "px";
      this.bgTop.style.left = "0px";
      this.bgTop.style.width = docWidth + "px";
      this.bgBottom.style.top = (pos.bottom - bodyRect.top) + "px";
      this.bgBottom.style.height = docHeight - (pos.bottom - bodyRect.top) + "px";
      this.bgBottom.style.left = "0px";
      this.bgBottom.style.width = docWidth + "px";
      this.bgLeft.style.top = (pos.top - bodyRect.top) + "px";
      this.bgLeft.style.height = pos.bottom - pos.top  + "px";
      this.bgLeft.style.left = "0px";
      this.bgLeft.style.width = (pos.left - bodyRect.left) + "px";
      this.bgRight.style.top = (pos.top - bodyRect.top) + "px";
      this.bgRight.style.height = pos.bottom - pos.top + "px";
      this.bgRight.style.left = (pos.right - bodyRect.left) + "px";
      this.bgRight.style.width = docWidth - (pos.right - bodyRect.left) + "px";
      WholePageOverlay.remove();
    },

    remove: function () {
      for (let name of ["el", "bgTop", "bgLeft", "bgRight", "bgBottom"]) {
        util.removeNode(this[name]);
        this[name] = null;
      }
    },

    _createEl: function () {
      let boxEl = this.el;
      if (boxEl) {
        return;
      }
      boxEl = document.createElement("div");
      boxEl.className = "pageshot-highlight";
      for (let name of movements) {
        let elTarget = document.createElement("div");
        let elMover = document.createElement("div");
        elTarget.className = "pageshot-mover-target pageshot-" + name;
        elMover.className = "pageshot-mover";
        elTarget.appendChild(elMover);
        boxEl.appendChild(elTarget);
      }
      this.bgTop = document.createElement("div");
      this.bgTop.className = "pageshot-bghighlight";
      document.body.appendChild(this.bgTop);
      this.bgLeft = document.createElement("div");
      this.bgLeft.className = "pageshot-bghighlight";
      document.body.appendChild(this.bgLeft);
      this.bgRight = document.createElement("div");
      this.bgRight.className = "pageshot-bghighlight";
      document.body.appendChild(this.bgRight);
      this.bgBottom = document.createElement("div");
      this.bgBottom.className = "pageshot-bghighlight";
      document.body.appendChild(this.bgBottom);
      document.body.appendChild(boxEl);
      this.el = boxEl;
    },

    draggerDirection: function (target) {
      while (target) {
        if (target.nodeType == document.ELEMENT_NODE) {
          if (target.classList.contains("pageshot-mover-target")) {
            for (let name of movements) {
              if (target.classList.contains("pageshot-" + name)) {
                return name;
              }
            }
            console.warn("Got pageshot-mover-target that wasn't a specific direction");
          }
        }
        target = target.parentNode;
      }
      return null;
    },

    isSelection: function (target) {
      while (target) {
        if (target.nodeType == document.ELEMENT_NODE && target.classList.contains("pageshot-highlight")) {
          return true;
        }
        target = target.parentNode;
      }
      return false;
    },

    el: null,
    boxTopEl: null,
    boxLeftEl: null,
    boxRightEl: null,
    boxBottomEl: null
  };

  /** Displays the crosshairs that suggest you can select something */
  exports.CrosshairPreview = {

    display: function () {
      if (this.pulseEl) {
        return;
      }
      this.pulseEl = document.createElement("div");
      this.pulseEl.className = "pageshot-crosshair-pulse";
      document.body.appendChild(this.pulseEl);
      this.innerPulseEl = document.createElement("div");
      this.innerPulseEl.className = "pageshot-crosshair-inner";
      document.body.appendChild(this.innerPulseEl);
      this.horizEl = document.createElement("div");
      this.horizEl.className = "pageshot-horizcross pageshot-crosshair-preview";
      document.body.appendChild(this.horizEl);
      this.vertEl = document.createElement("div");
      this.vertEl.className = "pageshot-vertcross pageshot-crosshair-preview";
      document.body.appendChild(this.vertEl);
    },

    remove: function () {
      util.removeNode(this.pulseEl);
      util.removeNode(this.innerPulseEl);
      util.removeNode(this.horizEl);
      util.removeNode(this.vertEl);
      this.pulseEl = this.innerPulseEl = this.horizEl = this.vertEl = null;
    },

    pulseEl: null,
    innerPulseEl: null,
    horizEl: null,
    vertEl: null
  };

  /** Displays the crosshairs that follow the mouse */
  exports.Crosshair = {

    display: function (x, y) {
      if (! this.vertEl) {
        this.vertEl = document.createElement("div");
        this.vertEl.className = "pageshot-vertcross";
        document.body.appendChild(this.vertEl);
      }
      if (! this.horizEl) {
        this.horizEl = document.createElement("div");
        this.horizEl.className = "pageshot-horizcross";
        document.body.appendChild(this.horizEl);
      }
      this.vertEl.style.left = (x - window.scrollX) + "px";
      this.horizEl.style.top = (y - window.scrollY) + "px";
    },

    remove: function () {
      util.removeNode(this.vertEl);
      util.removeNode(this.horizEl);
      this.vertEl = this.horizEl = null;
    },

    vertEl: null,
    horizEl: null
  };

  exports.MyShotsReminder = {

    display: function () {
      if (this.dialogEl) {
        return;
      }
      let div = document.createElement("div");
      div.className = "pageshot-myshots-reminder";
      if (isChrome) {
        div.className += " pageshot-myshots-reminder-chrome";
      }
      div.innerHTML = `
      <div class="pageshot-myshots-arrow"></div>
      Click this button to view all the shots you've taken
      `;
      document.body.appendChild(div);
      this.dialogEl = div;
    },

    remove: function () {
      util.removeNode(this.dialogEl);
      this.dialogEl = null;
    },

    dialogEl: null
  };

  /** Removes every UI this module creates */
  exports.remove = function () {
    for (let name in exports) {
      if (typeof exports[name] == "object" && exports[name].remove) {
        exports[name].remove();
      }
    }
  };

  exports.ChromeInterface = {

    onMyShots: null,
    onSave: null,
    onCancel: null,

    display: function () {
      if (! this.el) {
        this.el = document.createElement("div");
        this.el.className = "pageshot-saver";
        this.el.innerHTML = `
        <a class="pageshot-myshots" href="https://pageshot.dev.mozaws.net/shots" target="_blank">
          <span class="pageshot-center">
            <span class="pageshot-pre-myshots"></span>
            <span class="pageshot-myshots-text">My Shots</span>
            <span class="pageshot-post-myshots"></span>
          </span>
        </a>
        <!-- FIXME-chrome: this needs styling to work right: -->
        <!-- Select part of the page to save, or save full page without making a selection -->
        <button class="pageshot-cancel">Cancel</button>
        <button class="pageshot-save">Save</button>
        `;
        document.body.appendChild(this.el);
        let methods = {
          ".pageshot-myshots": "onMyShots",
          ".pageshot-save": "onSave",
          ".pageshot-cancel": "onCancel"
        };
        Object.keys(methods).forEach((selector) => {
          this.el.querySelector(selector).addEventListener("click", (event) => {
            let result;
            if (this[methods[selector]]) {
              let method = this[methods[selector]];
              result = method.call(this);
            }
            if (result === false) {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }
            return undefined;
          });
        });
        document.body.appendChild(this.el);
      }
    },

    isHeader: function (el) {
      if (! this.el) {
        // There is no header, so couldn't be us
        return false;
      }
      while (el) {
        if (el.className && el.className.indexOf("pageshot-saver") != -1) {
          return true;
        }
        el = el.parentNode;
      }
      return false;
    },

    remove: function () {
      util.removeNode(this.el);
      this.el = null;
    },

    el: null
  };

  return exports;
})();
