/* globals addIds, makeStaticHtml, extractorWorker, activate, chrome, AbstractShot, deactivate */
/* globals XMLHttpRequest, window, location, alert, console, urlDomainForId, randomString */
/* globals document, setTimeout, location */
/* exported chromeShooter */

const chromeShooter = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let registrationInfo;
  let shot;
  exports.hasUsedMyShots = false;

  let completeResolver;
  let collectionComplete = new Promise((resolve, reject) => {
    completeResolver = resolve;
  });
  let selection;

  exports.init = function () {
    let promises = [];
    addIds.setIds();
    promises.push(makeStaticHtml.documentStaticData().then((result) => {
      shot.update(result);
    }));
    let attrs = extractorWorker.extractData();
    // FIXME: check if page is private:
    delete attrs.passwordFields;
    shot.update(attrs);
    let promise = Promise.all(promises);
    promise = promise.then(activate);
    return promise;
  };

  exports.saveSelection = function (pos, selectedText, captureType) {
    selection = {
      pos,
      selectedText,
      captureType
    };
  };

  function screenshotSelection(pos, selectedText, captureType) {
    let iframe = document.getElementById("pageshot-iframe");
    if (iframe) {
      iframe.style.display = "none";
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let message = {
          type: "clipImage",
          pos,
          scrollY: window.scrollY,
          scrollX: window.scrollX,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        };
        chrome.runtime.sendMessage(message, (response) => {
          if (! response) {
            console.warn("Image failed to be captured");
            return;
          }
          let data = {
            createdDate: Date.now(),
            image: {
              url: response.imageUrl,
              captureType: captureType,
              text: selectedText,
              location: pos,
              dimensions: {x: pos.right - pos.left, y: pos.bottom - pos.top}
            }
          };
          if (shot.clipNames().length) {
            shot.getClip(shot.clipNames()[0]).image = data.image;
          } else {
            shot.addClip(data);
          }
          resolve();
        });
      }, 100);
    });
  }

  exports.deactivate = function () {
  };

  exports.takeShot = function () {
    collectionComplete.then(() => {
      if (selection) {
        return screenshotSelection(selection.pos, selection.selectedText, selection.captureType);
      }
      return true;
    }).then(() => {
      chrome.runtime.sendMessage({
        type: "notifyAndCopy",
        url: shot.viewUrl
      });
      let req = new XMLHttpRequest();
      req.open("PUT", shot.jsonUrl);
      req.setRequestHeader("content-type", "application/json");
      req.onload = () => {
        if (req.status >= 300) {
          alert("Error saving shot: " + req.status + " " + req.responseText);
          return;
        }
        exports.sendAnalyticEvent("addon", "new-tab-after-save");
        chrome.runtime.sendMessage({
          type: "openTab",
          url: shot.viewUrl
        });
        deactivate();
        exports.deactivate();
      };
      if (shot.clipNames().length) {
        // FIXME: should figure out a way to wait for saveShotFullPage to complete/succeed before continuing:
        saveShotFullPage(shot);
        clearShotFullPage(shot);
      } else {
        shot.showPage = true;
      }
      let data = shot.asJson();
      req.send(JSON.stringify(data));
    });
  };

  /** Happens when the URL changes via window.history */
  exports.popstate = function () {
    exports.deactivate();
  };

  function makeShot() {
    shot = new AbstractShot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(location),
      {
        url: location.href,
        deviceId: registrationInfo.deviceId
      }
    );
    exports.init().then(() => {
      completeResolver();
    });
  }

  function saveShotFullPage(shot) {
    chrome.runtime.sendMessage({type: "saveShotFullPage", id: shot.id, shot: shot.asJson()});
  }

  function clearShotFullPage(shot) {
    // Note: duplicate of shotstore.clearSaved()
    shot.body = null;
    shot.head = null;
    shot.bodyAttrs = null;
    shot.headAttrs = null;
    shot.htmlAttrs = null;
    shot.showPage = false;
    shot.readable = null;
    shot.resources = {};
  }

  chrome.runtime.sendMessage({type: "requestConfiguration"}, (response) => {
    backend = response.backend;
    exports.hasUsedMyShots = response.hasUsedMyShots;
    registrationInfo = {
      deviceId: response.deviceId,
      deviceInfo: response.deviceInfo,
      secret: response.secret
    };
    makeShot();
  });

  exports.setHasUsedMyShots = function (value) {
    chrome.runtime.sendMessage({
      type: "setHasUsedMyShots",
      value: true
    });
    exports.hasUsedMyShots = value;
  };

  exports.sendAnalyticEvent = function (eventName, action, label) {
    if (label === undefined) {
      action = eventName;
      label = action;
      eventName = "addon";
    }
    chrome.runtime.sendMessage({
      type: "sendAnalyticEvent",
      eventName,
      action,
      label
    });
  };

  return exports;
})();
