/** Makes a shot of a page.  Does all the fancy work.

    main.js sets up ShotContext() to do the work.  Shot() is the model object
    representing shots.
    */

const self = require("sdk/self");
const tabs = require("sdk/tabs");
const { captureTab } = require("./screenshot");
const { request, sendEvent } = require("./req");
const { callScript } = require("./framescripter");
const { defer } = require('sdk/core/promise');
const { Class } = require('sdk/core/heritage');
const { watchPromise, watchFunction, watchWorker } = require("./errors");
const clipboard = require("sdk/clipboard");
const { AbstractShot } = require("./shared/shot");
const { getDeviceInfo } = require("./user");
const { URL } = require("sdk/url");
const notifications = require("sdk/notifications");
const { randomString } = require("./randomstring");
const { setTimeout, clearTimeout } = require("sdk/timers");

let shouldShowTour = false;

exports.showTourOnNextLinkClick = function() {
  shouldShowTour = true;
};

// If a page is in history for less time than this, we ignore it
// (probably a redirect of some sort):
var MIN_PAGE_VISIT_TIME = 5000; // 5 seconds
const RANDOM_STRING_LENGTH = 16;

function escapeForHTML(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

/** Takes `tab.history` and returns a list suitable for uploading.  This removes
    duplicate items, culls pages that are too brief, and filters out some
    pages like about: pages that shouldn't show up. */
function processHistory(history, tab) {
  var seen = {};

  function addHistory(histList, previousTab) {
    if (! histList) {
      return;
    }
    for (var i=0; i<histList.length; i++) {
      var item = histList[i];
      var next = histList[i+1];
      if (previousTab) {
        item = {};
        for (var name in histList[i]) {
          item[name] = histList[i][name];
        }
        item.previousTab = true;
      }
      if (item.url.indexOf("about:") === 0) {
        continue;
      }
      if (item.url == tab.url) {
        continue;
      }
      if (next && next.opened - item.opened < MIN_PAGE_VISIT_TIME) {
        continue;
      }
      if (item.title == item.url) {
        // Probably an item without a title
        // often this is a redirect of some sort, not a real page
        continue;
      }
      if (seen[item.url]) {
        continue;
      }
      seen[item.url] = true;
      history.add(item);
    }
  }

  addHistory(tab.openedFromHistory, true);
  addHistory(tab.history, false);
}

/** Runs the extract worker on the given tab, and returns a promise that
    returns the extracted data */
function extractWorker(tab, timeLimit) {
  if (timeLimit === undefined) {
    timeLimit = 10000; // 10 second default
  }
  return new Promise((resolve, reject) => {
    let timeoutId;
    let timedOut = false;
    if (timeLimit) {
      timeoutId = setTimeout(function () {
        timedOut = true;
        reject(new Error("Extractor timed out"));
      }, timeLimit);
    }
    const worker = tab.attach({
      contentScriptFile: [self.data.url("error-utils.js"),
                          self.data.url("vendor/readability/Readability.js"),
                          self.data.url("vendor/microformat-shiv.js"),
                          self.data.url("extractor-worker.js")]
    });
    watchWorker(worker);
    worker.port.on("data", function (data) {
      worker.destroy();
      if (timedOut) {
        console.error("extractWorker resolved after timeout");
        return;
      }
      clearTimeout(timeoutId);
      resolve(data);
    });
    worker.port.on("alertError", function (error) {
      worker.destroy();
      if (timedOut) {
        console.error("extractWorker errored out after timeout", error);
        return;
      }
      clearTimeout(timeoutId);
      reject(error);
    });
  });
}

/** Represents one shot action */
const ShotContext = Class({
  _idGen: 0,
  initialize: function (panelContext, backend) {
    this.id = ++ShotContext._idGen;
    this.tab = tabs.activeTab;
    this.tabUrl = this.tab.url;
    let deviceInfo = getDeviceInfo();
    if (! deviceInfo) {
      throw new Error("Could not get device authentication information");
    }
    this.shot = new Shot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(this.tabUrl),
      {
        url: this.tabUrl,
        deviceId: deviceInfo.deviceId
      });
    this.activeClipName = null;
    this._deregisters = [];
    this.panelContext = panelContext;
    this._workerActive = false;
    this.watchTab("deactivate", function () {
      panelContext.hide(this);
    });
    this.watchTab("activate", function () {
      panelContext.show(this);
    });
    // FIXME: this is to work around a bug where deactivate sometimes isn't called
    this._activateWorkaround = (function (tab) {
      if (tab != this.tab && this.panelContext._activeContext == this) {
        panelContext.hide(this);
      }
    }).bind(this);
    tabs.on("activate", this._activateWorkaround);
    this.watchTab("pageshow", function (tab) {
      // We'll call any pageshow as a sign that at least we reloaded, and should
      // stop the pageshot
      this.destroy();
    });
    this.watchTab("close", function () {
      this.destroy();
    });
    this.collectInformation();
    this._activateWorker();
  },

  copyRichDataToClipboard: function (activeClipName, numberOfTries) {
    // Use "text" instead of "html" so that pasting into a text area or text editor
    // pastes the html instead of the plain text stripped out of the html.
    let clip = this.shot.getClip(activeClipName);
    if (clip === undefined) {
      let names = this.shot.clipNames();
      if (names.length === 0) {
        // Copy just the raw url in case for some reason no clips ever become available
        // But don't send a notification yet, otherwise the user will get two notifications
        // in a row if the rich shot data is successfully copied to the clipboard later.
        clipboard.set(this.shot.viewUrl, "text");
        if (numberOfTries === undefined) {
          numberOfTries = 1;
        }
        if (numberOfTries < 8) {
          setTimeout(() => {
            this.copyRichDataToClipboard(activeClipName, ++numberOfTries);
          }, 500);
        } else {
          console.error("Could not copy rich shot data -- no clip was added to the shot within 4 seconds");
          // If we failed to copy the rich shot data, just tell the user we copied the link
          notifications.notify({
            title: "Link Copied",
            text: "The link to your shot has been copied to the clipboard.",
            iconURL: self.data.url("../data/copy.png")
          });
        }
        return;
      }
      clip = this.shot.getClip(names[0]);
    }
    let url = this.shot.viewUrl;
    let img = clip.image.url;
    let title = this.shot.title;
    let origin = (new URL(this.shot.url).hostname) || "none";
    let html = (
`<div>
  <a href="${escapeForHTML(url)}">
    <div>${escapeForHTML(title)}</div>
    <img src="${escapeForHTML(img)}" />
  </a>
  <div>
    source: <a href="http://${escapeForHTML(origin)}">${escapeForHTML(origin)}</a>
  </div>
</div>`);
    require("./multiclip").copyMultiple({
      html,
      text: `${title} -- ${url}`
    });
    notifications.notify({
      title: "HTML Copied",
      text: "The link to your shot and an image have been copied to the clipboard.",
      iconURL: self.data.url("../data/copy.png")
    });
  },

  /** Activate the worker.  Note that on reload the same url may be active,
      but our worker will be gone. */
  _activateWorker: function () {
    // FIXME: do I need to do anything with old workers?
    this.interactiveWorker = watchWorker(this.tab.attach({
      contentScriptFile: [
        self.data.url("error-utils.js"),
        self.data.url("annotate-position.js"),
        self.data.url("capture-selection.js"),
        self.data.url("shooter-interactive-worker.js")],
      contentScriptOptions: {
        "inline-selection.css": self.data.url("inline-selection.css")
      }
    }));
    this.interactiveWorker.port.on("ready", watchFunction(function () {
      this.interactiveWorker.port.emit("setState", "initialAuto");
    }).bind(this));
    this.interactiveWorker.port.on("select", watchFunction(function (pos, shotText, captureType) {
      // FIXME: there shouldn't be this disconnect between arguments to captureTab
      var info = {
        x: pos.left,
        y: pos.top,
        h: pos.bottom - pos.top,
        w: pos.right - pos.left
      };
      watchPromise(captureTab(this.tab, info).then((function (imgUrl) {
        let clip = null;
        if (this.activeClipName) {
          clip = this.shot.getClip(this.activeClipName);
          if (clip && clip.text && captureType == "auto") {
            // Don't overwrite a text clip with an auto
            return;
          }
          if (clip && clip.text) {
            clip.text = null;
          }
        }
        let data = {
          createdDate: Date.now(),
          image: {
            url: imgUrl,
            captureType: captureType,
            text: shotText,
            location: pos,
            dimensions: {x: pos.right - pos.left, y: pos.bottom - pos.top}
          }
        };
        if (clip) {
          clip.image = data.image;
        } else {
          this.activeClipName = this.shot.addClip(data);
        }
        this.updateShot();
        this.panelContext.show(this);
      }).bind(this)));
    }, this));
    this.interactiveWorker.port.on("noAutoSelection", watchFunction(function () {
      this.interactiveWorker.port.emit("cancel");
      watchPromise(this.makeScreenshot().then((function (clipData) {
        if (this.activeClipName) {
          let clip = this.shot.getClip(this.activeClipName);
          clip.image = clipData.image;
        } else {
          this.activeClipName = this.shot.addClip(clipData);
        }
        this.updateShot();
        this.panelContext.show(this);
      }).bind(this)));
    }, this));
    function makeTextSelection(textSelection) {
      if (this.activeClipName){
        let c = this.shot.getClip(this.activeClipName);
        if (c.text === undefined) {
          this.activeClipName = this.shot.addClip({
            createdDate: Date.now(),
            text: textSelection
          });
        } else {
          c.text = textSelection;
        }
      } else {
        this.activeClipName = this.shot.addClip({
          createdDate: Date.now(),
          text: textSelection
        });
      }
      this.updateShot();
      this.panelContext.show(this);
    }
    function makeNewTextSelection(textSelection) {
      this.activeClipName = null;
      makeTextSelection.call(this, textSelection);
    }
    this.interactiveWorker.port.on("makeNewTextSelection", watchFunction(makeNewTextSelection, this));
    this.interactiveWorker.port.on("textSelection", watchFunction(makeTextSelection, this));
    this.interactiveWorker.port.on("visibleSelection", watchFunction(function() {
      this.panelHandlers.setCaptureType.call(this, "visible");
    }, this));
    this.interactiveWorker.port.on("popstate", watchFunction(function (newUrl) {
      this.destroy();
    }, this));
    this._pendingScreenPositions = [];
    this.interactiveWorker.port.on("screenPosition", watchFunction(function (pos) {
      for (let deferred of this._pendingScreenPositions) {
        deferred.resolve(pos);
      }
      this._pendingScreenPositions = [];
    }, this));
    this._workerActive = true;
  },

  /** Called by PanelContext.show() when this show is showing */
  isShowing: function () {
    if (! this._workerActive) {
      this._activateWorker();
    }
    this.interactiveWorker.port.emit("isShowing");
    if (this.activeClipName) {
      let clip = this.shot.getClip(this.activeClipName);
      if (clip.image) {
        this.interactiveWorker.port.emit("restore", clip.image.captureType, clip.image.location, false);
      }
    }
  },

  /** True if it would be reasonable to open this context's panel */
  couldBeActive: function () {
    if (tabs.activeTab == this.tab && this.tab.url == this.tabUrl) {
      return true;
    }
    return false;
  },

  /** These are methods that are called by the PanelContext based on messages from the panel */
  panelHandlers: {
    addComment: function (comment) {
      let clip;
      if (this.activeClipName) {
        clip = this.shot.getClip(this.activeClipName);
      }
      let commentObject = {
        // FIXME: proper user
        user: "unknown",
        createdDate: Date.now(),
        text: comment
      };
      if (clip) {
        if (clip.comments.length) {
          commentObject = clip.comments[0].asJson();
          commentObject.text = comment;
          clip.updateComment(0, commentObject);
        } else {
          clip.addComment(commentObject);
        }
      } else {
        if (this.shot.comments.length) {
          commentObject = this.shot.comments[0].asJson();
          commentObject.text = comment;
          this.shot.updateComment(0, commentObject);
        } else {
          this.shot.addComment(commentObject);
        }
      }
      this.updateShot();
      if (comment.length) {
        sendEvent("addon", "add-comment");
      } else {
        sendEvent("addon", "clear-comment");
      }
    },
    copyImage: function (activeClipName) {
      let clip = this.shot.getClip(activeClipName);
      clipboard.set(clip.image.url, "image");
      notifications.notify({
        title: "Image Copied",
        text: "Your shot has been copied to the clipboard.",
        iconURL: self.data.url("../data/copy.png")
      });
      sendEvent("addon", "click-copy-image");
    },
    copyRich: function (activeClipName) {
      this.copyRichDataToClipboard(activeClipName);
      sendEvent("addon", "click-copy-rich");
    },
    shareButton: function (whichButton, eventSource) {
      sendEvent("addon", `click-share-button-${whichButton}-${eventSource}`);
    },
    openLink: function (link, loadReason, eventSource) {
      if (loadReason === "install" || shouldShowTour) {
        shouldShowTour = false;
        link += "?showIntro=true";
      }
      tabs.open(link);
      sendEvent("addon", `click-open-link-${eventSource}`);
    },
    setEditing: function(editing) {
      this.panelContext.setEditing(editing);
    },
    setCaptureType: function (type) {
      if (type === "visible") {
        this.interactiveWorker.port.emit("setState", "visible");
        watchPromise(this.makeScreenshot().then((imgData) => {
          let clip;
          if (this.activeClipName) {
            clip = this.shot.getClip(this.activeClipName);
          }
          if (clip) {
            clip.image = imgData.image;
          } else {
            this.activeClipName = this.shot.addClip(imgData);
          }
          this.updateShot();
        }));
      } else if (type === "selection") {
        this.interactiveWorker.port.emit("setState", "selection");
        this.panelContext.hide(this);
      } else if (type === "auto") {
        this.interactiveWorker.port.emit("setState", "auto");
      } else if (type === "text") {
        this.interactiveWorker.port.emit("setState", "text");
        this.panelContext.hide(this);
      } else {
        throw new Error("UnexpectedType: " + type);
      }
    },
    addClip: function (type) {
      this.activeClipName = null;
      this.panelHandlers.setCaptureType.call(this, type);
      sendEvent("addon", `click-add-clip-${type}`);
    },
    deleteClip: function (clipId) {
      let ids = this.shot.clipNames();
      let index = ids.indexOf(clipId) - 1;
      this.shot.delClip(clipId);
      if (index < 0) {
        index = 0;
      }
      ids = this.shot.clipNames();
      if (! ids.length) {
        this.activeClipName = null;
      } else {
        this.activeClipName = ids[index];
      }
      this.panelHandlers.selectClip.call(this, this.activeClipName);
      sendEvent("addon", "click-delete-clip");
    },
    selectClip: function (clipId) {
      this.activeClipName = clipId;
      if (clipId) {
        let clip = this.shot.getClip(clipId);
        if (clip.image && clip.image.captureType !== "visible") {
          this.interactiveWorker.port.emit("restore", clip.image.captureType, clip.image.location, true);
        } else if (clip.text === undefined) {
          this.interactiveWorker.port.emit("setState", "cancel");
        } else {
          this.interactiveWorker.port.emit("setState", "cancelForText");
        }
      } else {
        this.interactiveWorker.port.emit("setState", "cancel");
      }
      this.updateShot();
      sendEvent("addon", "click-select-clip");
    },
    hide: function () {
      this.panelContext.hide(this);
    },
    stickyPanel: function () {
      this.panelContext.toggleStickyPanel();
    }
  },

  /** Called by PanelContext when the panel is hidden */
  isHidden: function () {
    this.interactiveWorker.port.emit("setState", "maybeCancel");
  },

  /** Collects/extracts information from the tab: the screenshot, readable and
      microformat stuff, the HTML, and other misc stuff.  Immediately updates the
      shot as that information comes in */
  collectInformation: function () {
    watchPromise(callScript(
      this.tab,
      self.data.url("framescripts/add-ids.js"),
      "pageshot@addIds",
      {}
    ).then((function (result) {
      if (result.isXul) {
        // Abandon hope all ye who enter!
        this.destroy();
        // FIXME: maybe pop up an explanation here?
        return;
      }
      this.copyRichDataToClipboard();
      var prefInlineCss = require("sdk/simple-prefs").prefs.inlineCss;
      var promises = [];
      // Note: removed until we have some need or use for history in our shot pages:
      /* processHistory(this.shot.history, this.tab); */
      // FIXME: we no longer have screenshots in our model, not sure if we want them back or not:
      /*promises.push(watchPromise(captureTab(this.tab, null, {h: 200, w: 350}).then((function (url) {
        this.updateShot({screenshot: url}, true);
      }.bind(this)))));*/
      promises.push(watchPromise(extractWorker(this.tab)).then(watchFunction(function (attrs) {
        let passwordFields = attrs.passwordFields;
        delete attrs.passwordFields;
        this.checkIfPublic({passwordFields});
        this.interactiveWorker.port.emit("extractedData", attrs);
        this.shot.update(attrs);
      }, this)));
      promises.push(watchPromise(this.makeFullScreenThumbnail().then((screenshot) => {
        this.shot.update({
          fullScreenThumbnail: screenshot
        });
      })));
      promises.push(watchPromise(callScript(
        this.tab,
        self.data.url("framescripts/make-static-html.js"),
        "pageshot@documentStaticData",
        {prefInlineCss})).then(watchFunction(function (attrs) {
          this.shot.update(attrs);
        }, this)));
      watchPromise(allPromisesComplete(promises).then((function () {
        return this.shot.save();
      }).bind(this)));
    }).bind(this)));
  },

  /** Sets attributes on the shot, saves it, and updates the panel */
  updateShot: function () {
    watchPromise(this.shot.save());
    this.panelContext.updateShot(this);
    require("./recall").addRecall(this.shot);
  },

  /** Watches for the given event on this context's tab.  The callback will be
      bound to `this` */
  watchTab: function (eventName, callback) {
    callback = watchFunction(callback.bind(this));
    this.tab.on(eventName, callback);
    this._deregisters.push(['tab', eventName, callback]);
  },

  makeScreenshot: function () {
    return captureTab(this.tab, null).then((imgUrl) => {
      return this.getScreenPosition().then(function (pos) {
        return {
          createdDate: Date.now(),
          image: {
            url: imgUrl,
            captureType: "visible",
            location: pos,
            dimensions: {x: pos.right - pos.left, y: pos.bottom - pos.top}
          }
        };
      });
    });
  },

  makeFullScreenThumbnail: function () {
    return captureTab(this.tab, {x: 0, y: 0, h: "full", w: "full"}, {h: null, w: 140});
  },

  getScreenPosition: function () {
    let deferred = defer();
    this._pendingScreenPositions.push(deferred);
    this.interactiveWorker.port.emit("getScreenPosition");
    return deferred.promise;
  },

  checkIfPublic: function (info) {
    watchPromise(
      require("./is-public").checkIfPublic(this.tabUrl, info)
      .then((isPublic) => {
        this.shot.isPublic = isPublic;
        this.updateShot();
      }));
  },

  /** Renders this object unusable, and unregisters any handlers */
  destroy: function () {
    for (let i=0; i<this._deregisters.length; i++) {
      let item = this._deregisters[i];
      this[item[0]].removeListener(item[1], item[2]);
    }
    this._deregisters = null;
    this.panelContext.removeContext(this);
    this.panelContext = null;
    try {
      this.interactiveWorker.port.emit("setState", "cancel");
    } catch (e) {
      // Ignore... it's just a best effort to cancel the state
    }
    this.interactiveWorker.destroy();
    this.interactiveWorker = null;
    tabs.removeListener("activate", this._activateWorkaround);
  }

});

exports.ShotContext = ShotContext;

ShotContext._idGen = 0;

class Shot extends AbstractShot {
  constructor(backend, id, attrs) {
    // ES6 requires super(), but Firefox doesn't allow it:
    super(backend, id, attrs);
    //AbstractShot.call(this, backend, id, attrs);
  }

  save() {
    // Until patching works:
    return this.create();
    /*
    let attrs = this.dirtyJson();
    return this._sendJson(attrs, "post");
    */
  }

  create() {
    let attrs = this.asJson();
    return this._sendJson(attrs, "put");
  }

  _sendJson(attrs, method) {
    if (! Object.keys(attrs).length) {
      return Promise.resolve(false);
    }
    let url = this.jsonUrl;
    let body = JSON.stringify(attrs);
    return request(url, {
      content: body,
      contentType: "application/json",
      method: method,
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        for (let update of response.json.updates) {
          if (update.clipId && update.url) {
            this.updateClipUrl(update.clipId, update.url);
          } else if (update.updateThumbnailUrl) {
            this.fullScreenThumbnail = update.updateThumbnailUrl;
          } else if (update.setHead) {
            this.head = update.setHead;
          } else if (update.setBody) {
            this.body = update.setBody;
          }
        }
        return true;
      } else {
        let message;
        if (response.status === 0) {
          message = "The request to " + url + " didn't complete due to the server being unavailable";
        } else {
          message = "The request to " + url + " (" + Math.floor(body.length / 1000) + "Kb) returned a response " + response.status;
        }
        let error = new Error(message);
        error.name = "REQUEST_ERROR";
        error.response = response;
        throw error;
      }
    });
  }

}

Shot.prototype.atob = require("sdk/base64").decode;
Shot.prototype.btoa = require("sdk/base64").encode;

/** Returns a promise that resolves when all the promises in the array are complete
    (regardless of success or failure of each promise!) */
function allPromisesComplete(promises) {
  var deferred = defer();
  var count = promises.length;
  function done() {
    count--;
    if (! count) {
      deferred.resolve();
    }
  }
  for (var i=0; i<promises.length; i++) {
    promises[i].then(done, done);
  }
  return deferred.promise;
}

/** Returns the domain of a URL, but safely and in ASCII; URLs without domains
    (such as about:blank) return the scheme, Unicode domains get stripped down
    to ASCII */
function urlDomainForId(urlString) {
  let urlObj = URL(urlString);
  let domain = urlObj.host;
  if (domain) {
    if (domain.indexOf(":") != -1) {
      domain = domain.replace(/:.*/, "");
    }
  } else {
    domain = urlString.split(":")[0];
    if (! domain) {
      domain = "unknown";
    }
  }
  if (domain.search(/^[a-z0-9.\-]+$/i) == -1) {
    // Probably a unicode domain; we could use punycode but it wouldn't decode
    // well in the URL anyway.  Instead we'll punt.
    domain = domain.replace(/[^a-z0-9.\-]/ig, "");
    if (! domain) {
      domain = "site";
    }
  }
  return domain;
}

exports.autoShot = function (tab, backend, backendUrl) {
  /* Runs the javascript cleanup utilities on the tab, takes a screenshot,
   * creates a shot instance, and pushes the data to the backend server without
   * asking anything via UI
   */

  watchPromise(callScript(
    tab,
    self.data.url("framescripts/add-ids.js"),
    "pageshot@addIds",
    {}
  ).then((function (result) {
    if (result.isXul) {
      // Abandon hope all ye who enter!
      // FIXME: maybe pop up an explanation here?
      console.log('Abandon hope all ye who enter!');
      return;
    }
    var prefInlineCss = require("sdk/simple-prefs").prefs.inlineCss;
    console.debug('CSS? PREF'.replace('PREF', prefInlineCss));
    let deviceInfo = getDeviceInfo();
    if (! deviceInfo) {
      throw new Error("Could not get device authentication information");
    }

    var shot = new Shot(
      backend,
      backendUrl,
      { "url": tab.url, "deviceId": deviceInfo.deviceId }
    );

    // Heavy lifting happens here
    var promises = [];
    promises.push(watchPromise(extractWorker(tab)).then(watchFunction(function (attrs) {
      shot.update(attrs);
    }, this)));
    promises.push(watchPromise(
      captureTab(tab, {x: 0, y: 0, h: "full", w: "full"}, {h: null, w: 140}).then((screenshot) => {
        shot.update({
          fullScreenThumbnail: screenshot
        });
      })
    ));
    promises.push(watchPromise(callScript(
      tab,
      self.data.url("framescripts/make-static-html.js"),
      "pageshot@documentStaticData",
      {prefInlineCss})).then(watchFunction(function (attrs) {
        shot.update(attrs);
      }, this)));

    watchPromise(allPromisesComplete(promises).then((function () {
      shot.save();
      tab.close();
    }).bind(this)));
  })));
};
exports.urlDomainForId = urlDomainForId;
exports.RANDOM_STRING_LENGTH = RANDOM_STRING_LENGTH;
