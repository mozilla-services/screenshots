/* globals util, window, document, console */
/* exported ui */

var isChrome = false;

const ui = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

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

  function isHeader(el) {
    while (el) {
      if (el.className &&
          (el.className.indexOf("pageshot-saver") !== -1 ||
           el.className.indexOf("pageshot-myshots") !== -1 ||
           el.className.indexOf("pageshot-visible") !== -1 ||
           el.className.indexOf("pageshot-full-page") !== -1)) {
        return true;
      }
      el = el.parentNode;
    }
    return false;
  }
  exports.isHeader = isHeader;

  function makeEl(tagName, className) {
    let el = document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    return el;
  }

  /** Represents the shadow overlay that covers the whole page */
  let WholePageOverlay = exports.WholePageOverlay = {

    display: function (callbacks, installHandlersOnDocument) {

      if (! this.overlayFrame) {
        let bodyRect = document.body.getBoundingClientRect();

        this.overlayFrame = document.createElement("iframe");
        //this.overlayFrame.style.pointerEvents = "none";
        this.overlayFrame.style.zIndex = "99999999999";
        this.overlayFrame.style.border = "none";
        this.overlayFrame.style.position = "absolute";
        this.overlayFrame.style.top = "0";
        this.overlayFrame.style.left = "0";
        this.overlayFrame.style.height = "100%";
        this.overlayFrame.style.width = "100%";

        document.body.appendChild(this.overlayFrame);

        this.overlayFrame.onload = () => {
          var parsedDom = (new DOMParser()).parseFromString(
            "<html><head><title></title></head><body></body>",
            "text/html"
          );
          let frameDoc = this.overlayFrame.contentDocument;

          frameDoc.replaceChild(
              frameDoc.adoptNode(parsedDom.documentElement),
              frameDoc.documentElement
          );

          let overlayEl = makeEl("div", "pageshot-preview-overlay");
          let instructions = makeEl("div", "pageshot-preview-instructions");
          instructions.textContent = "Drag or click on the page to select a region. Press ESC to cancel.";
          overlayEl.appendChild(instructions);
          let button = makeEl("div", "pageshot-myshots");
          button.addEventListener("click", callbacks.onOpenMyShots, false);
          let myShotsPre = makeEl("div", "pageshot-pre-myshots");
          button.appendChild(myShotsPre);
          let text = makeEl("div", "pageshot-myshots-text");
          text.textContent = "My Shots";
          button.appendChild(text);
          let myShotsPost = makeEl("div", "pageshot-post-myshots");
          button.appendChild(myShotsPost);
          overlayEl.appendChild(button);
          let visibleButton = makeEl("div", "pageshot-overlay-button pageshot-visible");
          visibleButton.textContent = "Save visible";
          visibleButton.addEventListener("click", callbacks.onClickVisible, false);
          overlayEl.appendChild(visibleButton);
          let fullPageButton = makeEl("div", "pageshot-overlay-button pageshot-full-page");
          fullPageButton.textContent = "Save full page";
          fullPageButton.addEventListener("click", callbacks.onClickFullPage, false);
          overlayEl.appendChild(fullPageButton);
          frameDoc.body.appendChild(overlayEl);
          let linkUrl = self.options["inline-selection.css"];
          var link = frameDoc.getElementById("pageshot-stylesheet");
          if (! link) {
            link = frameDoc.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute("id", "pageshot-stylesheet");
            link.setAttribute("href", linkUrl);
            frameDoc.head.appendChild(link);
          }
          installHandlersOnDocument(frameDoc);
        };
      }
    },

    remove: function () {
      util.removeNode(this.overlayFrame);
      this.overlayFrame = null;
    },

    el: null
  };

  let movements = ["topLeft", "top", "topRight", "left", "right", "bottomLeft", "bottom", "bottomRight"];

  /** Creates the selection box */
  exports.Box = {

    display: function (pos, callbacks) {
      this._createEl();
      if (callbacks !== undefined && callbacks.cancel) {
        // We use onclick here because we don't want addEventListener
        // to add multiple event handlers to the same button
        this.cancel.onclick = callbacks.cancel;
        this.cancel.style.display = "";
      } else {
        this.cancel.style.display = "none";
      }
      if (callbacks !== undefined && callbacks.save) {
        // We use onclick here because we don't want addEventListener
        // to add multiple event handlers to the same button
        this.save.removeAttribute("disabled");
        this.save.onclick = (e) => {
          this.save.setAttribute("disabled", "true");
          callbacks.save(e);
        };
        this.save.style.display = "";
      } else {
        this.save.style.display = "none";
      }
      let bodyRect = getBodyRect();
      // Note, document.documentElement.scrollHeight is zero on some strange pages (such as the page created when you load an image):
      let docHeight = Math.max(document.documentElement.scrollHeight || 0, document.body.scrollHeight);
      let docWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
      if ((pos.right - pos.left) < 78 || (pos.bottom - pos.top) < 78) {
        this.el.classList.add("pageshot-small-selection");
      } else {
        this.el.classList.remove("pageshot-small-selection");
      }
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
      boxEl = makeEl("div", "pageshot-highlight");
      let buttons = makeEl("div", "pageshot-highlight-buttons");
      let cancel = makeEl("button", "pageshot-highlight-button-cancel");
      cancel.textContent = "Cancel";
      buttons.appendChild(cancel);
      let save = makeEl("button", "pageshot-highlight-button-save");
      save.textContent = "Save";
      buttons.appendChild(save);
      this.cancel = cancel;
      this.save = save;
      boxEl.appendChild(buttons);
      for (let name of movements) {
        let elTarget = makeEl("div", "pageshot-mover-target pageshot-" + name);
        let elMover = makeEl("div", "pageshot-mover");
        elTarget.appendChild(elMover);
        boxEl.appendChild(elTarget);
      }
      this.bgTop = makeEl("div", "pageshot-bghighlight");
      document.body.appendChild(this.bgTop);
      this.bgLeft = makeEl("div", "pageshot-bghighlight");
      document.body.appendChild(this.bgLeft);
      this.bgRight = makeEl("div", "pageshot-bghighlight");
      document.body.appendChild(this.bgRight);
      this.bgBottom = makeEl("div", "pageshot-bghighlight");
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

  exports.MyShotsReminder = {

    display: function () {
      if (this.dialogEl) {
        return;
      }
      let div = makeEl("div", "pageshot-myshots-reminder");
      if (isChrome) {
        div.className += " pageshot-myshots-reminder-chrome";
      }
      div.innerHTML = `
      <div class="pageshot-panel">
        <div class="pageshot-panel-arrowUp"></div>
        <div class="pageshot-panel-section pageshot-panel-section-header">
          <div class="pageshot-text-section-list">
            Click this button to view all the shots you've taken
          </div>
        </div>
      </div>
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

  exports.HoverBox = {

    el: null,

    display: function (rect) {
      if (! this.el) {
        this.el = makeEl("div", "pageshot-hover-highlight");
        document.body.appendChild(this.el);
      }
      this.el.style.display = "";
      this.el.style.top = (rect.top - 1) + "px";
      this.el.style.left = (rect.left - 1) + "px";
      this.el.style.width = (rect.right - rect.left + 2) + "px";
      this.el.style.height = (rect.bottom - rect.top + 2) + "px";
    },

    hide: function () {
      if (this.el) {
        this.el.style.display = "none";
      }
    },

    remove: function () {
      util.removeNode(this.el);
      this.el = null;
    }
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
        this.el = makeEl("div", "pageshot-saver");
        this.el.innerHTML = `
        <a class="pageshot-myshots" href="https://pageshot.dev.mozaws.net/shots" target="_blank">
          <span class="pageshot-center">
            <span class="pageshot-pre-myshots"></span>
            <span class="pageshot-myshots-text">My Shots</span>
            <span class="pageshot-post-myshots"></span>
          </span>
        </a>
        <span class="pageshot-save-help">
          Select part of the page to save, or save full page without making a selection
        </span>
        <button class="pageshot-cancel">Cancel</button>
        <button class="pageshot-save">Save Full Page</button>
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

    remove: function () {
      util.removeNode(this.el);
      this.el = null;
    },

    el: null
  };

  return exports;
})();
