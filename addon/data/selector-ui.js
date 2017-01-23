/* globals util, window, document, console, watchFunction */
/* exported ui */

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

  function htmlQuote(s) {
    s = s + "";
    return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function makeEl(tagName, className) {
    let el = iframe.document.createElement(tagName);
    if (className) {
      el.className = className;
    }
    return el;
  }

  let iframe = exports.iframe = {
    element: null,
    addClassName: "",
    sizeTracking: {
      timer: null,
      windowDelayer: null,
      resizeBound: null,
      lastHeight: null,
      lastWidth: null
    },
    document: null,
    display: function (installHandlerOnDocument) {
      return new Promise((resolve, reject) => {
        if (! this.element) {
          this.element = document.createElement("iframe");
          this.element.id = "pageshot-iframe";
          this.element.style.zIndex = "99999999999";
          this.element.style.border = "none";
          this.element.style.position = "absolute";
          this.element.style.top = "0";
          this.element.style.left = "0";
          this.element.style.margin = "0";
          this.element.scrolling = "no";
          this.updateElementSize();
          this.element.onload = () => {
            let linkUrl = self.options["inline-selection.css"];
            var parsedDom = (new DOMParser()).parseFromString(`
              <html>
               <head>
                <link rel="stylesheet" id="pageshot-stylesheet" href="${htmlQuote(linkUrl)}">
                <title></title>
               </head>
               <body></body>
              </html>`,
              "text/html"
            );
            this.document = this.element.contentDocument;
            this.document.replaceChild(
              this.document.adoptNode(parsedDom.documentElement),
              this.document.documentElement
            );
            installHandlerOnDocument(this.document);
            if (this.addClassName) {
              this.document.body.className = this.addClassName;
            }
            resolve();
          };
          document.body.appendChild(this.element);
        } else {
          resolve();
        }
        this.initSizeWatch();
      });
    },

    updateElementSize: function (force) {
      // Note: if someone sizes down the page, then the iframe will keep the
      // document from naturally shrinking.  We use force to temporarily hide
      // the element so that we can tell if the document shrinks
      if (force) {
        this.element.style.display = "none";
      }
      let height = Math.max(
        document.documentElement.clientHeight,
        document.body.clientHeight,
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight);
      if (height !== this.sizeTracking.lastHeight) {
        this.sizeTracking.lastHeight = height;
        this.element.style.height = height + "px";
      }
      let width = Math.max(
        document.documentElement.clientWidth,
        document.body.clientWidth,
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
        window.innerWidth);
      if (width !== this.sizeTracking.lastWidth) {
        this.sizeTracking.lastWidth = width;
        this.element.style.width = width + "px";
      }
      if (force) {
        this.element.style.display = "";
      }
      WholePageOverlay.resetPosition();
    },

    initSizeWatch: function () {
      this.stopSizeWatch();
      this.sizeTracking.timer = setInterval(watchFunction(this.updateElementSize.bind(this)), 2000);
      window.addEventListener("resize", this.onResize, true);
    },

    stopSizeWatch: function () {
      if (this.sizeTracking.timer) {
        clearTimeout(this.sizeTracking.timer);
        this.sizeTracking.timer = null;
      }
      if (this.sizeTracking.windowDelayer) {
        clearTimeout(this.sizeTracking.windowDelayer);
        this.sizeTracking.windowDelayer = null;
      }
      this.sizeTracking.lastHeight = this.sizeTracking.lastWidth = null;
      window.removeEventListener("resize", this.onResize, true);
    },

    onResize: function () {
      if (this.sizeTracking.windowDelayer) {
        clearTimeout(this.sizeTracking.windowDelayer);
      }
      this.sizeTracking.windowDelayer = setTimeout(watchFunction(() => {
        this.updateElementSize(true);
      }), 100);
    },

    getElementFromPoint: function (x, y) {
      this.element.style.pointerEvents = "none";
      let el;
      try {
        el = document.elementFromPoint(x, y);
      } finally {
        this.element.style.pointerEvents = "";
      }
      return el;
    },

    remove: function () {
      this.stopSizeWatch();
      util.removeNode(this.element);
      this.element = this.document = null;
    }
  };

  iframe.onResize = watchFunction(iframe.onResize.bind(iframe));

  /** Represents the shadow overlay that covers the whole page */
  let WholePageOverlay = exports.WholePageOverlay = {

    el: null,
    movingEl: null,
    isScrollTracking: false,

    display: function (callbacks) {
      this.remove();
      this.el = makeEl("div", "pageshot-preview-overlay");
      this.el.innerHTML = `
      <div class="pageshot-moving-element" style="position: absolute; pointer-events: none; display: flex">
        <div class="pageshot-preview-instructions">
          Drag or click on the page to select a region. Press ESC to cancel.
        </div>
        <div class="pageshot-myshots pageshot-myshots-button">
          <div class="pageshot-pre-myshots"></div>
          <div class="pageshot-myshots-text">My Shots</div>
          <div class="pageshot-post-myshots"></div>
        </div>
        <div class="pageshot-overlay-button pageshot-visible">
          Save visible
        </div>
        <div class="pageshot-overlay-button pageshot-full-page">
          Save full page
        </div>
      `;
      this.el.querySelector(".pageshot-myshots").addEventListener(
        "click", watchFunction(callbacks.onOpenMyShots), false);
      this.el.querySelector(".pageshot-visible").addEventListener(
        "click", watchFunction(callbacks.onClickVisible), false);
      this.el.querySelector(".pageshot-full-page").addEventListener(
        "click", watchFunction(callbacks.onClickFullPage), false);
      this.movingEl = this.el.querySelector(".pageshot-moving-element");
      iframe.document.body.appendChild(this.el);
      this.resetPosition();
      window.addEventListener("scroll", this.onScroll, false);
    },

    resetPosition: function () {
      if (! this.movingEl) {
        return;
      }
      let scrollX = window.scrollX;
      let scrollY = window.scrollY;
      this.movingEl.style.top = scrollY + "px";
      this.movingEl.style.left = scrollX + "px";
      this.movingEl.style.width = window.innerWidth + "px";
      this.movingEl.style.height = window.innerHeight + "px";
    },

    onScroll: function () {
      this.resetPosition();
      /* Note, if we used requestAnimationFrame we'd improve the performance
         some, but this creates very visible lag in the positioning: */
      /*
      if (! this.isScrollTracking) {
        window.requestAnimationFrame(() => {
          this.resetPosition();
          this.isScrollTracking = false;
        });
        this.isScrollTracking = true;
      }
      */
    },

    remove: function () {
      util.removeNode(this.el);
      this.el = null;
      this.movingEl = null;
      window.removeEventListener("scroll", this.onScroll, false);
    }

  };

  WholePageOverlay.onScroll = watchFunction(WholePageOverlay.onScroll.bind(WholePageOverlay));

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
      if (callbacks !== undefined && callbacks.download) {
        this.download.removeAttribute("disabled");
        this.download.onclick = (e) => {
          this.download.setAttribute("disabled", true);
          callbacks.download(e);
          e.preventDefault();
          e.stopPropagation();
          return false;
        };
        this.download.style.display = "";
      } else {
        this.download.style.display = "none";
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
      cancel.title = "Cancel";
      buttons.appendChild(cancel);
      let download = makeEl("button", "pageshot-highlight-button-download");
      download.title="Download";
      buttons.appendChild(download);
      let save = makeEl("button", "pageshot-highlight-button-save");
      save.textContent = "Save";
      save.title = "Save"
      buttons.appendChild(save);
      this.cancel = cancel;
      this.download = download;
      this.save = save;
      boxEl.appendChild(buttons);
      for (let name of movements) {
        let elTarget = makeEl("div", "pageshot-mover-target pageshot-" + name);
        let elMover = makeEl("div", "pageshot-mover");
        elTarget.appendChild(elMover);
        boxEl.appendChild(elTarget);
      }
      this.bgTop = makeEl("div", "pageshot-bghighlight");
      iframe.document.body.appendChild(this.bgTop);
      this.bgLeft = makeEl("div", "pageshot-bghighlight");
      iframe.document.body.appendChild(this.bgLeft);
      this.bgRight = makeEl("div", "pageshot-bghighlight");
      iframe.document.body.appendChild(this.bgRight);
      this.bgBottom = makeEl("div", "pageshot-bghighlight");
      iframe.document.body.appendChild(this.bgBottom);
      iframe.document.body.appendChild(boxEl);
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
        if (target.tagName === "BUTTON") {
          return false;
        }
        if (target.nodeType == document.ELEMENT_NODE && target.classList.contains("pageshot-highlight")) {
          return true;
        }
        target = target.parentNode;
      }
      return false;
    },

    isControl: function (target) {
      while (target) {
        if (target.nodeType === document.ELEMENT_NODE && target.classList.contains("pageshot-highlight-buttons")) {
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

  exports.HoverBox = {

    el: null,

    display: function (rect) {
      if (! this.el) {
        this.el = makeEl("div", "pageshot-hover-highlight");
        iframe.document.body.appendChild(this.el);
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

  exports.PixelDimensions = {
    el: null,
    xEl: null,
    yEl: null,
    display: function (xPos, yPos, x, y) {
      if (! this.el) {
        this.el = makeEl("div", "pageshot-pixel-dimensions");
        this.xEl = makeEl("div");
        this.el.appendChild(this.xEl);
        this.yEl = makeEl("div");
        this.el.appendChild(this.yEl);
        iframe.document.body.appendChild(this.el);
      }
      this.xEl.textContent = x;
      this.yEl.textContent = y;
      this.el.style.top = (yPos + 12) + "px";
      this.el.style.left = (xPos + 12) + "px";
    },
    remove: function () {
      util.removeNode(this.el);
      this.el = this.xEl = this.yEl = null;
    }
  };

  /** Removes every UI this module creates */
  exports.remove = function () {
    for (let name in exports) {
      if (name == "iframe") {
        continue;
      }
      if (typeof exports[name] == "object" && exports[name].remove) {
        exports[name].remove();
      }
    }
    exports.iframe.remove();
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
        iframe.document.body.appendChild(this.el);
        let methods = {
          ".pageshot-myshots": "onMyShots",
          ".pageshot-save": "onSave",
          ".pageshot-cancel": "onCancel"
        };
        Object.keys(methods).forEach((selector) => {
          this.el.querySelector(selector).addEventListener("click", watchFunction((event) => {
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
          }));
        });
        iframe.document.body.appendChild(this.el);
      }
    },

    remove: function () {
      util.removeNode(this.el);
      this.el = null;
    },

    el: null
  };

  exports.triggerDownload = function (dataUrl, filename) {
    // We add this to the document and clean up internally so that deactivating the
    // worker and removing the iframe doesn't affect this download
    let a = document.createElement("a");
    a.href = dataUrl;
    a.setAttribute("download", filename);
    document.body.appendChild(a);
    a.click();
    setTimeout(watchFunction(() => {
      document.body.removeChild(a);
    }), 10000);
  };

  return exports;
})();
