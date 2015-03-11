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
const { watchPromise, watchFunction, watchWorker } = require("errors");
const clipboard = require("sdk/clipboard");

// If a page is in history for less time than this, we ignore it
// (probably a redirect of some sort):
var MIN_PAGE_VISIT_TIME = 5000; // 5 seconds

/** Takes `tab.history` and returns a list suitable for uploading.  This removes
    duplicate items, culls pages that are too brief, and filters out some
    pages like about: pages that shouldn't show up. */
function processHistory(tab) {
  var seen = {};
  var history = [];

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
      if (next && next.time - item.time < MIN_PAGE_VISIT_TIME) {
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
      history.push(item);
    }
  }

  addHistory(tab.openedFromHistory, true);
  addHistory(tab.history, false);
  return history;
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
  worker.port.on("extractedData", function (data) {
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
    this.shot = Shot(backend, Math.floor(Date.now()) + "/xxx");
    clipboard.set(this.shot.viewUrl, "text");
    this._deregisters = [];
    this.tab = tabs.activeTab;
    this.tabUrl = this.tab.url;
    this.panelContext = panelContext;
    this.watchTab("deactivate", function () {
      panelContext.hide(this);
    });
    this.watchTab("activate", function () {
      panelContext.show(this);
    });
    this.watchTab("pageshow", function (tab) {
      if (tab.url != this.tabUrl) {
        this.destroy();
      }
    });
    this.collectInformation();
    this.interactiveWorker = watchWorker(this.tab.attach({
      contentScriptFile: [
        self.data.url("error-utils.js"),
        self.data.url("shooter-interactive-worker.js")]
    }));
    this.interactiveWorker.port.on("ready", watchFunction(function () {
      this.interactiveWorker.port.emit("linkLocation", self.data.url("inline-selection.css"));
      this.interactiveWorker.port.emit("setState", "select");
    }).bind(this));
    this.interactiveWorker.port.on("select", watchFunction(function (pos) {
      // FIXME: there shouldn't be this disconnect between arguments
      var info = {
        x: pos.left,
        y: pos.top,
        h: pos.bottom - pos.top,
        w: pos.right - pos.left
      };
      watchPromise(captureTab(this.tab, info).then((function (imgUrl) {
        this.updateShot({snippet: imgUrl});
        panelContext.show(this);
      }).bind(this)));
    }, this));
  },

  /** True if it would be reasonable to open this context's panel */
  couldBeActive: function () {
    if (tabs.activeTab == this.tab && this.tab.url == this.tabUrl) {
      return true;
    }
    return false;
  },

  /** These are methods that are called by the PanelContext */
  panelHandlers: {
    addComment: function (comment) {
      let existing = this.shot.comment;
      if (existing) {
        comment = existing + "\n" + comment;
      }
      this.updateShot({comment: comment});
    },
    copyLink: function () {
      clipboard.set(this.shot.viewUrl, "text");
    },
    openLink: function (link) {
      tabs.open(link);
    }
  },

  /** Collects/extracts information from the tab: the screenshot, readable and
      microformat stuff, the HTML, and other misc stuff.  Immediately updates the
      shot as that information comes in */
  collectInformation: function () {
    this.shot.history = processHistory(this.tab);
    watchPromise(captureTab(this.tab, null, {h: 200, w: 350}).then((function (url) {
      this.updateShot({screenshot: url});
    }.bind(this))));
    watchPromise(extractWorker(this.tab)).then(watchFunction(function (attrs) {
      console.log("got extraction", this.id, Object.keys(attrs));
      this.updateShot(attrs);
    }, this));
    watchPromise(callScript(
      this.tab,
      self.data.url("framescripts/make-static-html.js"),
      "pageshot@documentStaticData",
      {})).then(watchFunction(function (attrs) {
        this.updateShot(attrs);
      }, this));
  },

  /** Sets attributes on the shot, saves it, and updates the panel */
  updateShot: function (attrs) {
    this.shot.set(attrs);
    this.shot.save();
    this.panelContext.updateShot(this);
  },

  /** Watches for the given event on this context's tab.  The callback will be
      bound to `this` */
  watchTab: function (eventName, callback) {
    callback = watchFunction(callback.bind(this));
    this.tab.on(eventName, callback);
    this._deregisters.push(['tab', eventName, callback]);
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
    this.interactiveWorker.destroy();
    this.interactiveWorker = null;
  }

});

exports.ShotContext = ShotContext;

/** Represents a shot that has been uploaded.  Can be incrementally added to.
    You must call .save() to upload any changes */
const Shot = Class({
  // Since things are split between data and meta, we have to same some
  // in some places, others in other places, we just keep track of it here:
  // These attributes are saved to /data/{id}
  DATA_ATTRS: [
    "title", "location", "origin", "initialScroll", "favicon", "screenshot", "readable", "images",
    "microdata", "bodyAttrs", "headAttrs", "htmlAttrs", "head", "body",
    "captured", "history"
  ],
  // These attributes are saved to /meta/{id}
  META_ATTRS: [
    "framehead", "snippet", "selections", "comment", "activeImage", "head",
    "body", "userTitle"
  ],
  // These attributes are derived, but we include them in the JSON anyway
  EXTRA_ATTRS: [
    "id", "viewUrl"
  ],
  // No point saving the article until these attributes have
  // been created:
  SERVER_REQUIRED_ATTRS: [
    "head", "body", "location"
  ],

  initialize: function (backend, id) {
    id = id.replace(/^\/+/, "");
    backend = backend.replace(/\/+$/, "");
    this.backend = backend;
    this.id = id;
    this.resourceLocks = {};
    this.dirtyData = [];
    this.dirtyMeta = [];
    this.created = false;
    this.viewUrl = backend + "/" + id;
    this.dataUrl = backend + "/data/" + id;
    this.metaUrl = backend + "/meta/" + id;
  },

  /** Set attributes in the passed-in `attrs` object. Will mark attributes as
      dirty so they will be saved on Shot.save() */
  set: function (attrs) {
    for (let attr in attrs) {
      if (this.DATA_ATTRS.indexOf(attr) != -1) {
        this.dirtyData.push(attr);
      } else if (this.META_ATTRS.indexOf(attr) != -1) {
        this.dirtyMeta.push(attr);
      } else {
        throw new Error("Unknown attribute: " + attr);
      }
      this[attr] = attrs[attr];
    }
  },

  /** Saves any dirty attributes from .set(), to one or both of `/data/{id}` and
      `/meta/{id}` - returns a promise that resolves when save is complete */
  save: function () {
    let deferred = defer();
    for (let i=0; i<this.SERVER_REQUIRED_ATTRS.length; i++) {
      let attr = this.SERVER_REQUIRED_ATTRS[i];
      if (! this[attr]) {
        // Skip saving for now, we'll assume the rest of
        // the attributes are picked up later
        deferred.resolve();
        return deferred.promise;
      }
    }
    let metaDone = ! this.dirtyMeta.length;
    let dataDone = ! (this.dirtyData.length || ! this.created);
    if (! dataDone) {
      // FIXME: we should also refresh any data when we have the opporunity here:
      let dirtyData = this._collectAttrs(this.dirtyData);
      watchPromise(this._updateInPlace(this.dataUrl, dirtyData))
          .then(watchFunction(function () {
            dataDone = true;
            this.dirtyData = [];
            if (metaDone) {
              deferred.resolve();
            }
          }, this), function (error) {
            deferred.reject(error);
          });
    }
    if (! metaDone) {
      let dirtyMeta = this._collectAttrs(this.dirtyMeta);
      watchPromise(this._updateInPlace(this.metaUrl, dirtyMeta))
        .then(watchFunction(function () {
          metaDone = true;
          this.dirtyMeta = [];
          if (dataDone) {
            deferred.resolve();
          }
        }, this), function (error) {
          deferred.reject(error);
        });
    }
    if (dataDone && metaDone) {
      // No work to do
      deferred.resolve();
    }
    return deferred.promise;
  },

  /** Returns a JSON object appropriate to sending elsewhere. */
  allData: function () {
    let result = {};
    for (let attr in this) {
      if ((this.DATA_ATTRS.indexOf(attr) != -1) ||
          (this.META_ATTRS.indexOf(attr) != -1) ||
          (this.EXTRA_ATTRS.indexOf(attr) != -1)) {
        result[attr] = this[attr];
      }
    }
    return result;
  },

  /** Take a list of attribute names, and return an object with those attributes
      copied from this object */
  _collectAttrs: function (attrs) {
    let collected = {};
    for (let i=0; i<attrs.length; i++) {
      collected[attrs[i]] = this[attrs[i]];
    }
    return collected;
  },

  /** GETs the JSON object at `url` and overwrites all the given `attrs` (an
      object), then PUTs the new object.  If a 404, then make a new object at
      the url. Returns a promise that resolves when the save is done. */
  _updateInPlace: function (url, attrs) {
    if (this.resourceLocks[url]) {
      // An update is already happening
      console.log("Deferring save to", url, "due to lock");
      watchPromise(this.resourceLocks[url].then((function () {
        this._updateInPlace(url, attrs);
      }).bind(this), (function () {
        this._updateInPlace(url, attrs);
      }).bind(this)));
      return;
    }
    let promise = this._doUpdateInPlace(url, attrs);
    this.resourceLocks[url] = promise;
    promise.then((function () {
      delete this.resourceLocks[url];
    }).bind(this), (function () {
      delete this.resourceLocks[url];
    }).bind(this));
    return promise;
  },

  _doUpdateInPlace: function (url, attrs) {
    var deferred = defer();
    console.log("GET", url);
    Request({
      url: url,
      onComplete: function (response) {
        let body = {};
        if (response.status != 404) {
          if (response.status != 200) {
            deferred.reject({
              name: "REQUEST_ERROR",
              message: "The request to " + url + " returned a response " + response.status,
              response: response
            });
            return;
          }
          body = response.json;
        }
        for (let attr in attrs) {
          body[attr] = attrs[attr];
        }
        console.log("PUT", url);
        Request({
          url: url,
          content: JSON.stringify(body),
          contentType: "application/json",
          onComplete: function (response) {
            if (response.status >= 200 && response.status < 300) {
              deferred.resolve();
            } else {
              deferred.reject({
                name: "REQUEST_ERROR",
                message: "The saving request to " + url + " returned a response: " + response.status,
                response: response
              });
            }
          }
        }).put();
      }
    }).get();
    return deferred.promise;
  }

});
