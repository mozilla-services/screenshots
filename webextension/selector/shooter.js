/* globals callBackground, documentMetadata, uicontrol, util, ui */
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

  function screenshotPage(selectedPos) {
    let height = selectedPos.bottom - selectedPos.top;
    let width = selectedPos.right - selectedPos.left;
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    let ctx = canvas.getContext('2d');
    if (! ctx.drawWindow) {
      return null;
    }
    if (window.devicePixelRatio !== 1) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    ui.iframe.hide();
    try {
      ctx.drawWindow(window, selectedPos.left, selectedPos.top, width, height, "#fff");
    } finally {
      ui.iframe.unhide();
    }
    return canvas.toDataURL();
  }

  exports.takeShot = function (captureType, selectedPos) {
    selectedPos = selectedPos.asJson();
    let captureText = util.captureEnclosedText(selectedPos);
    let dataUrl = screenshotPage(selectedPos);
    if (dataUrl) {
      shot.addClip({
        createdDate: Date.now(),
        image: {
          url: dataUrl,
          captureType,
          text: captureText,
          location: selectedPos,
          dimensions: {
            x: selectedPos.right - selectedPos.left,
            y: selectedPos.bottom - selectedPos.top
          }
        }
      });
    }
    callBackground("takeShot", {
      captureType,
      captureText,
      scroll: {
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth
      },
      selectedPos,
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
