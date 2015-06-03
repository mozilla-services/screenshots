/** Makes a shot of a page.  Does all the fancy work.

    main.js sets up ShotContext() to do the work.  Shot() is the model object
    representing shots.
    */

var self = require("sdk/self");
var tabs = require("sdk/tabs");
var { captureTab } = require("./screenshot");
var Request = require("sdk/request").Request;
const { callScript } = require("./framescripter");
const { defer } = require('sdk/core/promise');
const { Class } = require('sdk/core/heritage');
const { watchPromise, watchFunction, watchWorker } = require("./errors");
const clipboard = require("sdk/clipboard");
const { AbstractShot } = require("./shared/shot");
const { getUserInfo } = require("./user");
const { URL } = require("sdk/url");
const notifications = require("sdk/notifications");

// If a page is in history for less time than this, we ignore it
// (probably a redirect of some sort):
var MIN_PAGE_VISIT_TIME = 5000; // 5 seconds

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
function extractWorker(tab) {
  const deferred = defer();
  const worker = tab.attach({
    contentScriptFile: [self.data.url("error-utils.js"),
                        self.data.url("vendor/Readability.js"),
                        self.data.url("vendor/microformat-shiv.js"),
                        self.data.url("extractor-worker.js")]
  });
  watchWorker(worker);
  worker.port.on("data", function (data) {
    worker.destroy();
    deferred.resolve(data);
  });
  worker.port.on("alertError", function (error) {
    worker.destroy();
    deferred.reject(error);
  });
  return deferred.promise;
}

/** Represents one shot action */
const ShotContext = Class({
  _idGen: 0,
  initialize: function (panelContext, backend) {
    this.id = ++this._idGen;
    this.tab = tabs.activeTab;
    this.tabUrl = this.tab.url;
    let userInfo = getUserInfo();
    if (! userInfo) {
      throw new Error("Could not get device authentication information");
    }
    this.shot = new Shot(
      backend,
      randomString(8) + "/" + urlDomain(this.tabUrl),
      {
        url: this.tabUrl,
        userId: userInfo.userId
      });
    this.activeClipName = null;
    clipboard.set(this.shot.viewUrl, "text");
    this._deregisters = [];
    this.panelContext = panelContext;
    this._workerActive = false;
    this.watchTab("deactivate", function () {
      panelContext.hide(this);
    });
    this.watchTab("activate", function () {
      panelContext.show(this);
    });
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

  /** Activate the worker.  Note that on reload the same url may be active,
      but our worker will be gone. */
  _activateWorker: function () {
    // FIXME: do I need to do anything with old workers?
    this.interactiveWorker = watchWorker(this.tab.attach({
      contentScriptFile: [
        self.data.url("error-utils.js"),
        self.data.url("annotate-position.js"),
        self.data.url("capture-selection.js"),
        self.data.url("shooter-interactive-worker.js")]
    }));
    this.interactiveWorker.port.on("ready", watchFunction(function () {
      this.interactiveWorker.port.emit("linkLocation", self.data.url("inline-selection.css"));
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
    this.interactiveWorker.port.on("textSelection", watchFunction(function (textSelection) {
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
      if (clip.image && clip.image.captureType !== "visible") {
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
    },
    copyLink: function () {
      clipboard.set(this.shot.viewUrl, "text");
      notifications.notify({
        title: "Link Copied",
        text: "Link to the shot detail copied to the clipboard.",
        data: "",
        onClick: function (data) {
        }
      });
    },
    openLink: function (link) {
      tabs.open(link);
    },
    setSize: function(size) {
      this.panelContext.setSize(size);
    },
    setCaptureType: function (type) {
      let clip;
      if (this.activeClipName) {
        clip = this.shot.getClip(this.activeClipName);
      }
      if (type === "visible") {
        this.interactiveWorker.port.emit("setState", "cancel");
        watchPromise(this.makeScreenshot().then((imgData) => {
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
    },
    hide: function () {
      this.panelContext.hide(this);
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
    var promises = [];
    processHistory(this.shot.history, this.tab);
    // FIXME: we no longer have screenshots in our model, not sure if we want them back or not:
    /*promises.push(watchPromise(captureTab(this.tab, null, {h: 200, w: 350}).then((function (url) {
      this.updateShot({screenshot: url}, true);
    }.bind(this)))));*/
    promises.push(watchPromise(extractWorker(this.tab)).then(watchFunction(function (attrs) {
      this.interactiveWorker.port.emit("extractedData", attrs);
      this.shot.update(attrs);
      this.updateShot();
    }, this)));
    promises.push(watchPromise(callScript(
      this.tab,
      self.data.url("framescripts/make-static-html.js"),
      "pageshot@documentStaticData",
      {})).then(watchFunction(function (attrs) {
        this.shot.update(attrs);
        this.updateShot();
      }, this)));
    watchPromise(allPromisesComplete(promises).then((function () {
      return this.shot.save();
    }).bind(this)));
  },

  /** Sets attributes on the shot, saves it, and updates the panel */
  updateShot: function () {
    watchPromise(this.shot.save());
    this.panelContext.updateShot(this);
    require("recall").addRecall(this.shot);
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

  getScreenPosition: function () {
    let deferred = defer();
    this._pendingScreenPositions.push(deferred);
    this.interactiveWorker.port.emit("getScreenPosition");
    return deferred.promise;
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
  }

});

exports.ShotContext = ShotContext;

class Shot extends AbstractShot {
  constructor(backend, id, attrs) {
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
    let deferred = defer();
    if (! Object.keys(attrs).length) {
      deferred.resolve(false);
      return deferred.promise;
    }
    let url = this.jsonUrl;
    Request({
      url: url,
      content: JSON.stringify(attrs),
      contentType: "application/json",
      onComplete: watchFunction(function (response) {
        if (response.status >= 200 && response.status < 300) {
          deferred.resolve(true);
        } else {
          let message;
          if (response.status === 0) {
            message = "The request to " + url + " didn't complete due to the server being unavailable";
          } else {
            message = "The request to " + url + " returned a response " + response.status;
          }
          deferred.reject({
            name: "REQUEST_ERROR",
            message: message,
            response: response
          });
        }
      })
    })[method]();
    return deferred.promise;
  }

}

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

function urlDomain(urlString) {
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
  return domain;
}

function randomString(length) {
  // FIXME: would like to get better random numbers than this
  let s = "";
  for (var i=0; i<length; i++) {
    s += Math.floor(Math.random()*36).toString(36);
  }
  return s;
}
