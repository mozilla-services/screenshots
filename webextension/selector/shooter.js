/* globals callBackground, documentMetadata, uicontrol, util */
/* globals XMLHttpRequest, window, location, alert, console, domainFromUrl, randomString */
/* globals document, setTimeout, location */

window.shooter = (function () { // eslint-disable-line no-unused-vars
  let exports = {};
  const { AbstractShot } = window.shot;

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let shot;

  exports.deactivate = function () {
    uicontrol.deactivate();
  };

  exports.takeShot = function (captureType, selectedPos) {
    let captureText = util.captureEnclosedText(selectedPos);
    callBackground("takeShot", {
      captureType,
      captureText,
      scroll: {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      },
      selectedPos: selectedPos.asJson(),
      shotId: shot.id,
      shot: shot.asJson()
    });
    exports.deactivate();
  };

  /** Happens when the URL changes via window.history */
  exports.popstate = function () {
    exports.deactivate();
  };

  function makeShot() {
    shot = new AbstractShot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + domainFromUrl(location),
      {
        url: location.href
      }
    );
    shot.update(documentMetadata());
    return Promise.resolve();
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

  makeShot();

  return exports;
})();
null;
