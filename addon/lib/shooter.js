/** Makes a shot of a page.  Does all the fancy work.

    main.js sets up ShotContext() to do the work.  Shot() is the model object
    representing shots.
    */

const self = require("sdk/self");
const tabs = require("sdk/tabs");
const { getFavicon } = require("sdk/places/favicon");
const { prefs } = require('sdk/simple-prefs');
const { captureTab } = require("./screenshot");
const { request, sendEvent, sendTiming } = require("./req");
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
const shotstore = require("./shotstore");

let shouldShowTour = false; // eslint-disable-line no-unused-vars

exports.showTourOnNextLinkClick = function() {
  shouldShowTour = true;
};

const RANDOM_STRING_LENGTH = 16;

function escapeForHTML(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

/** Runs the extract worker on the given tab, and returns a promise that
    returns the extracted data */
function extractWorker(tab, options) {
  let timeLimit = options.timeLimit;
  let useReadability = options.useReadability;
  let timeStarted = new Date();
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
    let contentScriptFile = [
      self.data.url("error-utils.js"),
      self.data.url("extractor-worker.js")];
    if (useReadability) {
      contentScriptFile.unshift(self.data.url("vendor/readability/Readability.js"));
    }
    const worker = tab.attach({contentScriptFile});
    watchWorker(worker);
    worker.port.on("data", function (data) {
      let timeFinished = new Date();
      sendTiming("addon", "extract-data", timeFinished - timeStarted);
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
  initialize: function (backend) {
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
    this._deregisters = [];
    this._workerActive = false;
    this.watchTab("pageshow", function (tab) {
      // We'll call any pageshow as a sign that at least we reloaded, and should
      // stop the pageshot
      // FIXME: determine if the notification box is just automatically hidden in this case
      this.destroy();
    });
    this.watchTab("close", function () {
      // FIXME: determine if the notification box is just automatically hidden in this case
      this.destroy();
    });
    this._collectionCompletePromise = new Promise((resolve, reject) => {
      this._collectionCompleteDone = resolve;
    });
    this.collectInformation();
    this._activateWorker();
  },

  takeShot: function () {
    watchPromise(this.uploadShot().then(() => {
      this.openInNewTab();
      this.destroy();
    }));
    this._collectionCompletePromise.then(() => {
      this.copyRichDataToClipboard();
    });
  },

  uploadShot: function() {
    return this._collectionCompletePromise.then(() => {
      if (this.shot.clipNames().length) {
        shotstore.saveShot(this.shot);
        shotstore.clearSaved(this.shot);
      } else {
        this.shot.showPage = true;
      }
      return this.shot.save();
    });
  },

  copyRichDataToClipboard: function (activeClipName) {
    // Use "text" instead of "html" so that pasting into a text area or text editor
    // pastes the html instead of the plain text stripped out of the html.
    let clip = this.shot.getClip(activeClipName);
    if (clip === undefined) {
      let names = this.shot.clipNames();
      clip = this.shot.getClip(names[0]);
    }
    if (! clip) {
      clipboard.set(this.shot.viewUrl, "text");
      notifications.notify({
        title: "Link Copied",
        text: "The link to your shot has been copied to the clipboard.",
        iconURL: self.data.url("../data/copy.png")
      });
      return;
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

  /** Activate the worker that handles selection */
  _activateWorker: function () {
    this.interactiveWorker = watchWorker(this.tab.attach({
      contentScriptFile: [
        self.data.url("error-utils.js"),
        self.data.url("annotate-position.js"),
        self.data.url("selector-util.js"),
        self.data.url("selector-ui.js"),
        self.data.url("selector-snapping.js"),
        self.data.url("shooter-interactive-worker.js")],
      contentScriptOptions: {
        "inline-selection.css": self.data.url("inline-selection.css"),
        showMyShotsReminder: ! prefs.hasUsedMyShots
      }
    }));
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
      }).bind(this)));
    }, this));
    this.interactiveWorker.port.on("popstate", watchFunction(function (newUrl) {
      // Treat window.history popstate as a reload, and stop the shot
      this.destroy();
    }, this));
    this.interactiveWorker.port.on("deactivate", watchFunction(function (newUrl) {
      this.destroy();
    }, this));
    this.interactiveWorker.port.on("take-shot", watchFunction(function () {
      this.takeShot();
    }, this));
    this.interactiveWorker.port.on("showSaveFullPage", watchFunction(function () {
      require("./main").showSaveFullPage();
    }));
    this.interactiveWorker.port.on("showSave", watchFunction(function () {
      require("./main").showSave();
    }));

    this._pendingScreenPositions = [];
    this.interactiveWorker.port.on("screenPosition", watchFunction(function (pos) {
      for (let deferred of this._pendingScreenPositions) {
        deferred.resolve(pos);
      }
      this._pendingScreenPositions = [];
    }, this));
    this._workerActive = true;
  },

  openInNewTab: function() {
    tabs.open(this.shot.viewUrl);
    sendEvent("addon", `new-tab-after-save`);
  },

  /** Collects/extracts information from the tab: the screenshot, readable view,
      the HTML, and other misc stuff.  Immediately updates the
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
      var prefInlineCss = require("sdk/simple-prefs").prefs.inlineCss;
      var useReadability = require("sdk/simple-prefs").prefs.useReadability;
      var promises = [];
      promises.push(watchPromise(extractWorker(this.tab, {useReadability})).then(watchFunction(function (attrs) {
        let passwordFields = attrs.passwordFields;
        delete attrs.passwordFields;
        this.checkIfPublic({passwordFields});
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
        {prefInlineCss},
        15000)).then(watchFunction(function (attrs) {
          this.shot.update(attrs);
        }, this)));
      promises.push(watchPromise(getFavicon(this.tab).then((url) => {
        this.shot.update({
          favicon: url
        });
      })));
      watchPromise(allPromisesComplete(promises).then(this._collectionCompleteDone));
    }).bind(this)));
  },

  /** Called anytime the shot is updated; currently this has no side-effects so it does nothing */
  updateShot: function () {
    // Do nothing
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
    return captureTab(this.tab, {x: 0, y: 0, h: "full", w: "full"}, {h: null, w: 260});
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
    if (this.tab === tabs.activeTab) {
      require("./main").hideNotificationBar();
    }
    if (this._deregisters) {
      for (let i=0; i<this._deregisters.length; i++) {
        let item = this._deregisters[i];
        this[item[0]].removeListener(item[1], item[2]);
      }
    }
    this._deregisters = null;
    if (this.interactiveWorker) {
      try {
        this.interactiveWorker.port.emit("cancel");
      } catch (e) {
        // Ignore... it's just a best effort to cancel the state
      }
      this.interactiveWorker.destroy();
    }
    this.interactiveWorker = null;
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
          if (update.updateClipUrl && update.updateClipUrl.clipId && update.updateClipUrl.url) {
            this.updateClipUrl(update.updateClipUrl.clipId, update.updateClipUrl.url);
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

/** Runs the javascript cleanup utilities on the tab, takes a screenshot,
    creates a shot instance, and pushes the data to the backend server without
    asking anything via UI
 */
exports.autoShot = function (options) {
  let { tab, backend, backendUrl, save } = options;
  let prefs = require("sdk/simple-prefs").prefs;
  let inlineCss = options.inlineCss === undefined ? prefs.inlineCss : options.inlineCss;
  let useReadability = options.useReadability === undefined ? prefs.useReadability : options.useReadability;
  let allowUnknownAttributes = !! options.allowUnknownAttributes;
  let thumbnailWidth = options.thumbnailWidth !== undefined ? options.thumbnailWidth : 140;
  return watchPromise(callScript(
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
    let deviceInfo = getDeviceInfo();
    if (! deviceInfo) {
      throw new Error("Could not get device authentication information");
    }

    var shot = new Shot(backend, backendUrl, {
      url: tab.url,
      deviceId: deviceInfo.deviceId,
      showPage: true
    });

    // Heavy lifting happens here
    var promises = [];
    promises.push(watchPromise(extractWorker(tab, {useReadability})).then(watchFunction(function (attrs) {
      delete attrs.passwordFields;
      shot.update(attrs);
    }, this)));
    console.log("Capturing with thumbnail width", thumbnailWidth);
    if (thumbnailWidth) {
      promises.push(watchPromise(
        captureTab(tab, {x: 0, y: 0, h: "full", w: "full"}, {h: null, w: thumbnailWidth}).then((screenshot) => {
          shot.update({
            fullScreenThumbnail: screenshot
          });
        })
      ));
    }
    promises.push(watchPromise(callScript(
      tab,
      self.data.url("framescripts/make-static-html.js"),
      "pageshot@documentStaticData",
      {prefInlineCss: inlineCss, allowUnknownAttributes})).then(watchFunction(function (attrs) {
        shot.update(attrs);
      }, this)));

    return watchPromise(allPromisesComplete(promises).then((function () {
      tab.close();
      if (save) {
        return shot.save().then(() => {
          return shot;
        });
      } else {
        return shot;
      }
    }).bind(this)));
  })));
};
exports.urlDomainForId = urlDomainForId;
exports.RANDOM_STRING_LENGTH = RANDOM_STRING_LENGTH;
