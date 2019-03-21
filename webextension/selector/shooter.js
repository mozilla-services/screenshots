/* globals global, documentMetadata, util, uicontrol, ui, catcher */
/* globals buildSettings, domainFromUrl, randomString, shot, blobConverters */

"use strict";

this.shooter = (function() { // eslint-disable-line no-unused-vars
  const exports = {};
  const { AbstractShot } = shot;

  const RANDOM_STRING_LENGTH = 16;
  const MAX_CANVAS_DIMENSION = 32767;
  let backend;
  let shotObject;
  let supportsDrawWindow;
  const callBackground = global.callBackground;

  function regexpEscape(str) {
    // http://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  function sanitizeError(data) {
    const href = new RegExp(regexpEscape(window.location.href), "g");
    const origin = new RegExp(`${regexpEscape(window.location.origin)}[^ \t\n\r",>]*`, "g");
    const json = JSON.stringify(data)
      .replace(href, "REDACTED_HREF")
      .replace(origin, "REDACTED_URL");
    const result = JSON.parse(json);
    return result;
  }

  catcher.registerHandler((errorObj) => {
    callBackground("reportError", sanitizeError(errorObj));
  });

  catcher.watchFunction(() => {
    const canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    const ctx = canvas.getContext("2d");
    supportsDrawWindow = !!ctx.drawWindow;
  })();

  function captureToCanvas(selectedPos, captureType) {
    let height = selectedPos.bottom - selectedPos.top;
    let width = selectedPos.right - selectedPos.left;
    const canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    const ctx = canvas.getContext("2d");

    // Scale the canvas for high-density displays, except for full-page shots.
    let expand = window.devicePixelRatio !== 1;
    if (captureType === "fullPage" || captureType === "fullPageTruncated") {
      expand = false;
      canvas.width = width;
      canvas.height = height;
    } else {
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    }
    if (expand) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Double-check canvas width and height are within the canvas pixel limit.
    // If the canvas dimensions are too great, crop the canvas and also crop
    // the selection by a devicePixelRatio-scaled amount.
    if (canvas.width > MAX_CANVAS_DIMENSION) {
      canvas.width = MAX_CANVAS_DIMENSION;
      width = expand ? Math.floor(canvas.width / window.devicePixelRatio) : canvas.width;
    }
    if (canvas.height > MAX_CANVAS_DIMENSION) {
      canvas.height = MAX_CANVAS_DIMENSION;
      height = expand ? Math.floor(canvas.height / window.devicePixelRatio) : canvas.height;
    }

    ui.iframe.hide();
    ctx.drawWindow(window, selectedPos.left, selectedPos.top, width, height, "#fff");
    return canvas;
  }

  const screenshotPage = exports.screenshotPage = function(selectedPos, captureType) {
    if (!supportsDrawWindow) {
      return null;
    }
    const canvas = captureToCanvas(selectedPos, captureType);
    const limit = buildSettings.pngToJpegCutoff;
    let dataUrl = canvas.toDataURL();
    if (limit && dataUrl.length > limit) {
      const jpegDataUrl = canvas.toDataURL("image/jpeg");
      if (jpegDataUrl.length < dataUrl.length) {
        // Only use the JPEG if it is actually smaller
        dataUrl = jpegDataUrl;
      }
    }
    return dataUrl;
  };

  function screenshotPageAsync(selectedPos, captureType) {
    if (!supportsDrawWindow) {
      return Promise.resolve(null);
    }
    const canvas = captureToCanvas(selectedPos, captureType);
    ui.iframe.showLoader();
    const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
    return callBackground("canvasToDataURL", imageData);
  }

  exports.downloadShot = function(selectedPos, previewDataUrl, type) {
    const shotPromise = previewDataUrl ? Promise.resolve(previewDataUrl) : screenshotPageAsync(selectedPos, type);
    catcher.watchPromise(shotPromise.then(dataUrl => {
      let promise = Promise.resolve(dataUrl);
      if (!dataUrl) {
        promise = callBackground(
          "screenshotPage",
          selectedPos.toJSON(),
          {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
          });
      }
      catcher.watchPromise(promise.then((dataUrl) => {
        let type = blobConverters.getTypeFromDataUrl(dataUrl);
        type = type ? type.split("/", 2)[1] : null;
        shotObject.delAllClips();
        shotObject.addClip({
          createdDate: Date.now(),
          image: {
            url: dataUrl,
            type,
            location: selectedPos,
          },
        });
        ui.triggerDownload(dataUrl, shotObject.filename);
        uicontrol.deactivate();
      }));
    }));
  };

  let copyInProgress = null;
  exports.copyShot = function(selectedPos, previewDataUrl, type) {
    // This is pretty slow. We'll ignore additional user triggered copy events
    // while it is in progress.
    if (copyInProgress) {
      return;
    }
    // A max of five seconds in case some error occurs.
    copyInProgress = setTimeout(() => {
      copyInProgress = null;
    }, 5000);

    const unsetCopyInProgress = () => {
      if (copyInProgress) {
        clearTimeout(copyInProgress);
        copyInProgress = null;
      }
    };
    const shotPromise = previewDataUrl ? Promise.resolve(previewDataUrl) : screenshotPageAsync(selectedPos, type);
    catcher.watchPromise(shotPromise.then(dataUrl => {
      const blob = blobConverters.dataUrlToBlob(dataUrl);
      catcher.watchPromise(callBackground("copyShotToClipboard", blob).then(() => {
        uicontrol.deactivate();
        unsetCopyInProgress();
      }, unsetCopyInProgress));
    }));
  };

  exports.sendEvent = function(...args) {
    const maybeOptions = args[args.length - 1];

    if (typeof maybeOptions === "object") {
      maybeOptions.incognito = browser.extension.inIncognitoContext;
    } else {
      args.push({incognito: browser.extension.inIncognitoContext});
    }

    callBackground("sendEvent", ...args);
  };

  catcher.watchFunction(() => {
    shotObject = new AbstractShot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + domainFromUrl(location),
      {
        origin: shot.originFromUrl(location.href),
      }
    );
    shotObject.update(documentMetadata());
  })();

  return exports;
})();
null;
