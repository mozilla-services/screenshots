/* globals global, documentMetadata, util, uicontrol, ui, catcher */
/* globals buildSettings, domainFromUrl, randomString, shot, blobConverters */

"use strict";

this.shooter = (function() { // eslint-disable-line no-unused-vars
  let exports = {};
  const { AbstractShot } = shot;

  const RANDOM_STRING_LENGTH = 16;
  let backend;
  let shotObject;
  let supportsDrawWindow;
  const callBackground = global.callBackground;
  const clipboard = global.clipboard;

  function regexpEscape(str) {
    // http://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

  function sanitizeError(data) {
    const href = new RegExp(regexpEscape(window.location.href), 'g');
    const origin = new RegExp(`${regexpEscape(window.location.origin)}[^ \t\n\r",>]*`, 'g');
    const json = JSON.stringify(data)
      .replace(href, 'REDACTED_HREF')
      .replace(origin, 'REDACTED_URL');
    const result = JSON.parse(json);
    return result;
  }

  catcher.registerHandler((errorObj) => {
    callBackground("reportError", sanitizeError(errorObj));
  });

  catcher.watchFunction(() => {
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    let ctx = canvas.getContext('2d');
    supportsDrawWindow = !!ctx.drawWindow;
  })();

  let screenshotPage = exports.screenshotPage = function(selectedPos, captureType) {
    if (!supportsDrawWindow) {
      return null;
    }
    let height = selectedPos.bottom - selectedPos.top;
    let width = selectedPos.right - selectedPos.left;
    let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    let ctx = canvas.getContext('2d');
    if (captureType == 'fullPage') {
      canvas.width = width;
      canvas.height = height;
    } else {
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
    }
    if (window.devicePixelRatio !== 1 && captureType != 'fullPage') {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    ui.iframe.hide();
    try {
      ctx.drawWindow(window, selectedPos.left, selectedPos.top, width, height, "#fff");
    } finally {
      ui.iframe.unhide();
    }
    let limit = buildSettings.pngToJpegCutoff;
    return canvasToBlob(canvas, "image/png").then((pngBlob) => {
      if (limit && pngBlob.size > limit) {
        return canvasToBlob(canvas, "image/jpeg").then((jpegBlob) => {
          if (jpegBlob.size < pngBlob.size) {
            return jpegBlob;
          }
          return pngBlob;
        });
      }
      return pngBlob;
    });
  };

  /** Promise-based version of the method: */
  function canvasToBlob(canvas, mimeType) {
    return new Promise((resolve) => {
      canvas.toBlob(resolve, mimeType);
    });
  }

  let isSaving = null;

  exports.takeShot = function(captureType, selectedPos, previewBlob) {
    // isSaving indicates we're aleady in the middle of saving
    // we use a timeout so in the case of a failure the button will
    // still start working again
    if (Math.floor(selectedPos.left) == Math.floor(selectedPos.right) ||
        Math.floor(selectedPos.top) == Math.floor(selectedPos.bottom)) {
        let exc = new Error("Empty selection");
        exc.popupMessage = "EMPTY_SELECTION";
        exc.noReport = true;
        catcher.unhandled(exc);
        return;
    }
    let imageBlob;
    const uicontrol = global.uicontrol;
    let deactivateAfterFinish = true;
    if (isSaving) {
      return;
    }
    isSaving = setTimeout(() => {
      if (typeof ui !== "undefined") {
        // ui might disappear while the timer is running because the save succeeded
        ui.Box.clearSaveDisabled();
      }
      isSaving = null;
    }, 1000);
    selectedPos = selectedPos.asJson();
    let captureText = "";
    if (buildSettings.captureText) {
      captureText = util.captureEnclosedText(selectedPos);
    }
    let blobPromise;
    if (previewBlob) {
      blobPromise = Promise.resolve(previewBlob);
    } else {
      blobPromise = screenshotPage(selectedPos, captureType);
    }
    catcher.watchPromise(blobPromise.then((blob) => {
      imageBlob = blob;
      let type = blob.type;
      type = type ? type.split("/")[1] : null;
      shotObject.delAllClips();
      shotObject.addClip({
        createdDate: Date.now(),
        image: {
          url: "data:",
          type,
          captureType,
          text: captureText,
          location: selectedPos,
          dimensions: {
            x: selectedPos.right - selectedPos.left,
            y: selectedPos.bottom - selectedPos.top
          }
        }
      });
    }).then(() => {
      return callBackground("takeShot", {
        captureType,
        captureText,
        scroll: {
          scrollX: window.scrollX,
          scrollY: window.scrollY,
          innerHeight: window.innerHeight,
          innerWidth: window.innerWidth
        },
        selectedPos,
        shotId: shotObject.id,
        shot: shotObject.asJson(),
        imageBlob
      });
    }).then((url) => {
      return clipboard.copy(url).then((copied) => {
        return callBackground("openShot", { url, copied });
      });
    }, (error) => {
      if ('popupMessage' in error && (error.popupMessage == "REQUEST_ERROR" || error.popupMessage == 'CONNECTION_ERROR')) {
        // The error has been signaled to the user, but unlike other errors (or
        // success) we should not abort the selection
        deactivateAfterFinish = false;
        return;
      }
      if (error.name != "BackgroundError") {
        // BackgroundError errors are reported in the Background page
        throw error;
      }
    }).then(() => {
      if (deactivateAfterFinish) {
        uicontrol.deactivate();
      }
    }));
  };

  exports.downloadShot = function(selectedPos) {
    catcher.watchPromise(screenshotPage(selectedPos).then((blob) => {
      if (!blob) {
        return callBackground(
          "screenshotPage",
          selectedPos.asJson(),
          {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth
          }
        ).then((dataUrl) => {
          return blobConverters.dataUrlToBlob(dataUrl);
        });
      }
      return blob;
    }).then((blob) => {
      ui.triggerDownload(blob, shotObject.filename);
      uicontrol.deactivate();
    }));
  };

  exports.sendEvent = function(...args) {
    callBackground("sendEvent", ...args);
  };

  catcher.watchFunction(() => {
    shotObject = new AbstractShot(
      backend,
      randomString(RANDOM_STRING_LENGTH) + "/" + domainFromUrl(location),
      {
        origin: shot.originFromUrl(location.href)
      }
    );
    shotObject.update(documentMetadata());
  })();

  return exports;
})();
null;
