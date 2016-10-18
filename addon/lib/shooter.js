/** Makes a shot of a page.  Does all the fancy work.

    main.js sets up ShotContext() to do the work.  Shot() is the model object
    representing shots.
    */

const self = require("sdk/self");
const tabs = require("sdk/tabs");
const { getFavicon } = require("sdk/places/favicon");
const { prefs } = require('sdk/simple-prefs');
const { captureTab } = require("./screenshot");
const { request, sendEvent, sendTiming, retryPromise } = require("./req");
const { callScript } = require("./framescripter");
const { defer } = require('sdk/core/promise');
const { Class } = require('sdk/core/heritage');
const { watchPromise, watchFunction, watchWorker } = require("./errors");
const clipboard = require("sdk/clipboard");
const { AbstractShot } = require("./shared/shot");
const { getDeviceIdInfo } = require("./user");
const { URL } = require("sdk/url");
const notifications = require("sdk/notifications");
const { randomString } = require("./randomstring");
const { setTimeout, clearTimeout } = require("sdk/timers");
const shotstore = require("./shotstore");
const getCookies = require("./get-cookies");
const fixUrl = require("./fix-url");

let shouldShowTour = false; // eslint-disable-line no-unused-vars

exports.showTourOnNextLinkClick = function() {
  shouldShowTour = true;
};

let defaultAnnotateForPage = false;

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
      reject(error || "Unknown script error");
    });
  });
}

/** Represents one shot action */
const ShotContext = Class({
  _idGen: 0,
  initialize: function (backend, onDestroyed, annotateForPage) {
    this.annotateForPage = annotateForPage === undefined ? annotateForPage : defaultAnnotateForPage;
    this.id = ++ShotContext._idGen;
    this.tab = tabs.activeTab;
    this.tabUrl = fixUrl(this.tab.url);
    let deviceIdInfo = getDeviceIdInfo();
    if (! deviceIdInfo) {
      throw new Error("Could not get device authentication information");
    }
    this.onDestroyed = onDestroyed;
    this.shot = new Shot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(this.tabUrl),
      {
        url: this.tabUrl,
        deviceId: deviceIdInfo.deviceId
      });
    this._deregisters = [];
    this._workerActive = false;
    this.watchTab("pageshow", function (tab) {
      // We'll call any pageshow as a sign that at least we reloaded, and should
      // stop the pageshot
      sendEvent("cancel-shot", "tab-load");
      this.destroy();
    });
    this.watchTab("close", function () {
      sendEvent("cancel-shot", "tab-close");
      this.destroy();
    });
    this._collectionCompletePromise = new Promise((resolve, reject) => {
      this._collectionCompleteDone = resolve;
    });
    this.collectInformation();
    this._activateWorker();
  },

  takeShot: function () {
    let loadingTab;
    let doneSuperFast = false;
    this.copyUrlToClipboard();
    tabs.open({
      url: this.shot.creatingUrl,
      onOpen: (tab) => {
        loadingTab = tab;
        // In the unlikely case that the request finishes before the tab opens:
        if (doneSuperFast) {
          loadingTab.url = this.shot.viewUrl;
        }
      }
    });
    watchPromise(this.uploadShot().then(() => {
      doneSuperFast = true;
      if (loadingTab) {
        loadingTab.url = this.shot.viewUrl;
      }
      this.destroy();
    }).catch((error) => {
      this.destroy();
      throw error;
    }));
    this._collectionCompletePromise.then(() => {
      // FIXME remove when we are sure we don't want this feature
      //this.copyRichDataToClipboard();
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

  copyUrlToClipboard: function () {
    clipboard.set(this.shot.viewUrl, "text");
    notifications.notify({
      title: "Copied",
      text: "The link to your shot has been copied to the clipboard.",
      iconURL: self.data.url("copy.png")
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
        showMyShotsReminder: ! prefs.hasUsedMyShots,
        annotateForPage: this.annotateForPage
      }
    }));
    this.interactiveWorker.on("detach", () => {
      // Happens if the worker is detached for some reason, such as moving windows
      if (! this._destroying) {
        // Typically caused by a reload
        sendEvent("cancel-shot", "tab-reload");
      }
      this.destroy();
      console.log("the interactive worker was detached");
    });
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
        if (captureType == "visible" || captureType == "fullPage") {
          this.takeShot();
        }
      }).bind(this)));
    }, this));
    this.interactiveWorker.port.on("popstate", watchFunction(function (newUrl) {
      // Treat window.history popstate as a reload, and stop the shot
      this.destroy();
    }, this));
    this.interactiveWorker.port.on("deactivate", watchFunction(function (newUrl) {
      this.destroy();
    }, this));
    this.interactiveWorker.port.on("openMyShots", watchFunction(function () {
      this.openMyShots();
    }, this));
    this.interactiveWorker.port.on("take-shot", watchFunction(function () {
      this.takeShot();
    }, this));

    this._pendingScreenPositions = [];
    this.interactiveWorker.port.on("screenPosition", watchFunction(function (pos) {
      for (let deferred of this._pendingScreenPositions) {
        deferred.resolve(pos);
      }
      this._pendingScreenPositions = [];
    }, this));
    this.interactiveWorker.port.on("sendEvent", watchFunction(function () {
      sendEvent.apply(null, arguments);
    }, this));
    this._workerActive = true;
  },

  openInNewTab: function() {
    tabs.open(this.shot.viewUrl);
    sendEvent(`new-tab-after-save`);
  },

  /** Collects/extracts information from the tab: the screenshot, readable view,
      the HTML, and other misc stuff.  Immediately updates the
      shot as that information comes in */
  collectInformation: function () {
    if (this.tab.url.startsWith("about:")) {
      sendEvent("start-shot-about-page");
    } else if (this.tab.url.search(/^https?:/i) === -1) {
      let scheme = this.tab.url.replace(/:.*/, "");
      sendEvent("start-shot-non-http", scheme);
    }
    watchPromise(callScript(
      this.tab,
      self.data.url("framescripts/add-ids.js"),
      "pageshot@addIds",
      {annotateForPage: this.annotateForPage}
    ).then((function (result) {
      if (result.isXul) {
        // Abandon hope all ye who enter!
        sendEvent("abort-start-shot", "xul-page");
        this.destroy();
        let error = new Error("Sorry, this special page cannot be captured");
        error.popupMessage = "UNSHOOTABLE_PAGE";
        throw error;
      }
      if (result.isFrame) {
        sendEvent("abort-start-shot", "frame-page");
        this.destroy();
        let error = new Error("Sorry, this page that uses frames cannot be captured");
        error.popupMessage = "UNSHOOTABLE_PAGE";
        throw error;
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
      // FIXME We may want to parameterize this function so full screen thumbnails can be turned on
      /*
      promises.push(watchPromise(this.makeFullScreenThumbnail().then((screenshot) => {
        this.shot.update({
          fullScreenThumbnail: screenshot
        });
      })));
      */
      promises.push(watchPromise(callScript(
        this.tab,
        self.data.url("framescripts/make-static-html.js"),
        "pageshot@documentStaticData",
        {prefInlineCss, annotateForPage: this.annotateForPage},
        15000)).then((attrs) => {
          this.shot.update(attrs);
        })
      );
      promises.push(watchPromise(getFavicon(this.tab).then(
        (url) => {
          if (url.search(/^https?:\/\//i) !== -1) {
            // Some pages like about:home have non-http favicons, we ignore them
            this.shot.update({
              favicon: url
            });
          }
        },
        (error) => {
          // if there is no favicon, this is just null, which isn't an error
          if (! error) {
            return;
          }
          throw error;
        }
      )));
      watchPromise(allPromisesComplete(promises).then(this._collectionCompleteDone));
    }).bind(this)));
  },

  /** Called anytime the shot is updated; currently this has no side-effects so it does nothing */
  updateShot: function () {
    // Do nothing
  },

  openMyShots: function () {
    let main = require("./main");
    main.openMyShots();
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
    this._destroying = true;
    if (this._deregisters) {
      for (let i=0; i<this._deregisters.length; i++) {
        let item = this._deregisters[i];
        this[item[0]].removeListener(item[1], item[2]);
      }
    }
    this._deregisters = null;
    let finish = () => {
      if (this.onDestroyed !== undefined) {
        this.onDestroyed();
        this.onDestroyed = undefined;
      }
      if (this.interactiveWorker) {
        this.interactiveWorker.destroy();
        this.interactiveWorker = null;
      }
    };

    if (this.interactiveWorker) {
      this.interactiveWorker.port.on("destroyed", finish);
      try {
        this.interactiveWorker.port.emit("destroy");
      } catch (e) {
        console.warn("Too late to destroy interactiveWorker");
        finish();
      }
      // In case anything goes wrong, force a finish in
      // 500ms:
      setTimeout(finish, 500);
    } else {
      finish();
    }
  }
});

exports.ShotContext = ShotContext;

ShotContext._idGen = 0;

class Shot extends AbstractShot {
  constructor(backend, id, attrs) {
    super(backend, id, attrs);
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
    let times = 0;
    return retryPromise(() => {
      if (times) {
        sendEvent("upload", "upload-retry", {eventValue: times});
      }
      times++;
      return this._sendJson(attrs, "put");
    }, 3, 1000);
  }

  _sendJson(attrs, method) {
    if (! Object.keys(attrs).length) {
      return Promise.resolve(false);
    }
    let url = this.jsonUrl;
    let body = JSON.stringify(attrs);
    let kb = Math.floor(body.length / 1000);
    sendEvent("upload", "started", {eventValue: kb});
    console.info(`Uploading JSON blob size ${kb}kb`);
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
        sendEvent("upload", "success");
        return true;
      } else {
        let message;
        let popupMessage;
        let extra = {
          backend: this.backend,
          cookies: getCookies.safeCookieSummary(getCookies.hostFromUrl(this.backend))
        };
        if (response.status === 0) {
          sendEvent("upload", "failed-connection");
          message = `The request to send shot didn't complete due to the server being unavailable.`;
          popupMessage = "CONNECTION_ERROR";
        } else {
          sendEvent("upload", "failed-status", {eventValue: response.status});
          message = `The request to send shot returned a response ${response.status}`;
          extra.requestSizeKb = Math.floor(body.length / 1000);
          popupMessage = "REQUEST_ERROR";
        }
        let error = new Error(message);
        error.name = "REQUEST_ERROR";
        error.popupMessage = popupMessage;
        error.response = response;
        error.extra = extra;
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
  function swallowPromise(promise, index) {
    return promise.then(
      () => {},
      (error) => {
        console.error("Non-fatal error in promise " + index + ": " + error);
      }
    );
  }
  return Promise.all(promises.map(swallowPromise));
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
  let debugInlineCss = !! options.debugInlineCss;
  return watchPromise(callScript(
    tab,
    self.data.url("framescripts/add-ids.js"),
    "pageshot@addIds",
    {annotateForPage: true}
  ).then((result) => {
    if (result.isXul) {
      // Abandon hope all ye who enter!
      // FIXME: maybe pop up an explanation here?
      console.log('Abandon hope all ye who enter!');
      return;
    }
    let deviceIdInfo = getDeviceIdInfo();
    if (! deviceIdInfo) {
      throw new Error("Could not get device authentication information");
    }

    var shot = new Shot(backend, backendUrl, {
      url: tab.url,
      deviceId: deviceIdInfo.deviceId,
      showPage: true
    });

    // Heavy lifting happens here
    var promises = [];
    promises.push(watchPromise(extractWorker(tab, {useReadability, annotateForPage: true})).then(watchFunction(function (attrs) {
      delete attrs.passwordFields;
      shot.update(attrs);
    }, this)));
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
      {prefInlineCss: inlineCss, debugInlineCss, allowUnknownAttributes, annotateForPage: true})).then(watchFunction(function (attrs) {
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
  }));
};
exports.urlDomainForId = urlDomainForId;
exports.RANDOM_STRING_LENGTH = RANDOM_STRING_LENGTH;
