/* globals addIds, makeStaticHtml, extractorWorker, activate, chrome, AbstractShot, deactivate */
/* globals XMLHttpRequest, window, location, alert, console, urlDomainForId, randomString */
/* globals document, setTimeout, location */
/* exported chromeShooter */

const chromeShooter = (function () {
  let exports = {};

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let hasUsedMyShots;
  let registrationInfo;
  let shot;

  let completeResolver;
  let collectionComplete = new Promise((resolve, reject) => {
    completeResolver = resolve;
  });

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
    document.body.classList.add("pageshot-hide-selection");
    // Note: for some dumb reason Chrome doesn't apply the pageshot-hide-selection
    // right away, or even with requestAnimationFrame.  With setTimeout(..., 0)
    // it sometimes is enough, but not always.
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
        document.body.classList.remove("pageshot-hide-selection");
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
      });
    }, 100);
  };

  exports.deactivate = function () {
  };

  exports.takeShot = function () {
    console.log("doing takeShot");
    collectionComplete.then(() => {
      let req = new XMLHttpRequest();
      req.open("PUT", shot.jsonUrl);
      req.setRequestHeader("content-type", "application/json");
      req.onload = () => {
        if (req.status >= 300) {
          alert("Error saving shot: " + req.status + " " + req.responseText);
          return;
        }
        window.open(shot.viewUrl, "_blank");
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
      console.log("extracted data:", data);
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
      console.log("got all init done");
    });
    console.log("makeshot inner done", shot);
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

  console.log("sending request");
  chrome.runtime.sendMessage({type: "requestConfiguration"}, (response) => {
    console.log("got configuration", response);
    backend = response.backend;
    hasUsedMyShots = response.hasUsedMyShots;
    registrationInfo = {
      deviceId: response.deviceId,
      deviceInfo: response.deviceInfo,
      secret: response.secret
    };
    makeShot();
    console.log("makeshot done");
  });

  return exports;
})();

console.log("done loading");
