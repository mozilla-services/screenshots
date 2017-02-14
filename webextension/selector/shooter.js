/* globals deactivate, callBackground, documentMetadata */
/* globals XMLHttpRequest, window, location, alert, console, urlDomainForId, randomString */
/* globals document, setTimeout, location */

window.shooter = (function () { // eslint-disable-line no-unused-vars
  let exports = {};
  const { AbstractShot } = window.shot;

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let registrationInfo;
  let shot;
  let selection;

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
      return exports.promiseTimeout(100).then(() => {
        let options = {
          scrollY: window.scrollY,
          scrollX: window.scrollX,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        };
        return window.callBackground("clipImage", pos, options);
      }).then((imageUrl) => {
        let data = {
          createdDate: Date.now(),
          image: {
            url: imageUrl,
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
    });
  }

  exports.deactivate = function () {
  };

  exports.takeShot = function () {
    Promise.resolve().then(() => {
      if (selection) {
        return screenshotSelection(selection.pos, selection.selectedText, selection.captureType);
      }
      return true;
    }).then(() => {
      callBackground("notifyAndCopy", shot.viewUrl);
      let req = new XMLHttpRequest();
      req.open("PUT", shot.jsonUrl);
      req.setRequestHeader("content-type", "application/json");
      req.onload = () => {
        if (req.status >= 300) {
          alert("Error saving shot: " + req.status + " " + req.responseText);
          return;
        }
        exports.sendEvent("new-tab-after-save");
        callBackground("openTab", shot.viewUrl);
        deactivate();
        exports.deactivate();
      };
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
    shot.update(documentMetadata());
  }

  exports.sendEvent = function (...args) {
    callBackground("sendEvent", ...args);
  };

  exports.promiseTimeout = function (time) {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve();
      }, time);
    });
  };

  return exports;
})();
null;
