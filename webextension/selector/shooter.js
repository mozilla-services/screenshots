/* globals callBackground, documentMetadata, uicontrol, util, ui, catcher */
/* globals XMLHttpRequest, window, location, alert, console, domainFromUrl, randomString */
/* globals document, setTimeout, location */

window.shooter = (function () { // eslint-disable-line no-unused-vars
  let exports = {};
  const { AbstractShot } = window.shot;

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let shot;
  let supportsDrawWindow;

  catcher.registerHandler((errorObj) => {
    callBackground("reportError", errorObj);
  });

  exports.deactivate = function () {
    uicontrol.deactivate();
  };

  (function () {
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    let ctx = canvas.getContext('2d');
    supportsDrawWindow = !! ctx.drawWindow;
  })();

  function screenshotPage(selectedPos) {
    if (! supportsDrawWindow) {
      return null;
    }
    let height = selectedPos.bottom - selectedPos.top;
    let width = selectedPos.right - selectedPos.left;
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    let ctx = canvas.getContext('2d');
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
    catcher.watchPromise(callBackground("takeShot", {
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
    }).then((url) => {
      const copied = window.clipboard.copy(url);
      return callBackground("openShot", { url, copied });
    }));
    exports.deactivate();
  };

  exports.downloadShot = function (selectedPos) {
    let dataUrl = screenshotPage(selectedPos);
    let promise = Promise.resolve(dataUrl);
    if (! dataUrl) {
      promise = callBackground(
        "screenshotPage",
        selectedPos.asJson(),
        {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        });
    }
    catcher.watchPromise(promise.then((dataUrl) => {
      ui.triggerDownload(dataUrl, shot.filename);
    }));
  };

  /** Happens when the URL changes via window.history */
  exports.popstate = catcher.watchFunction(function () {
    exports.deactivate();
  });

  exports.sendEvent = function (...args) {
    callBackground("sendEvent", ...args);
  };

  shot = new AbstractShot(
    backend,
    randomString(RANDOM_STRING_LENGTH) + "/" + domainFromUrl(location),
    {
      url: location.href
    }
  );
  shot.update(documentMetadata());

  return exports;
})();
null;
