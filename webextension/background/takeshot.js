/* globals communication, shot, main, chrome, auth, catcher, analytics */

window.takeshot = (function () {
  let exports = {};
  const Shot = shot.AbstractShot;
  const { sendEvent } = analytics; 

  communication.register("takeShot", (options) => {
    let { captureType, captureText, scroll, selectedPos, shotId, shot } = options;
    shot = new Shot(main.getBackend(), shotId, shot);
    shot.deviceId = auth.getDeviceId();
    let capturePromise = Promise.resolve();
    if (! shot.clipNames().length) {
      // canvas.drawWindow isn't available, so we fall back to captureVisibleTab
      capturePromise = screenshotPage(selectedPos, scroll).then((dataUrl) => {
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
      });
    }
    return catcher.watchPromise(capturePromise.then(() => {
      return uploadShot(shot);
    }).then(() => {
      return shot.viewUrl;
    }));
  });

  communication.register("screenshotPage", (selectedPos, scroll) => {
    return screenshotPage(selectedPos, scroll);
  });

  function screenshotPage(pos, scroll) {
    pos = {
      top: pos.top - scroll.scrollY,
      left: pos.left - scroll.scrollX,
      bottom: pos.bottom - scroll.scrollY,
      right: pos.right - scroll.scrollX
    };
    pos.width = pos.right - pos.left;
    pos.height = pos.bottom - pos.top;
    return new Promise((resolve, reject) => {
      return chrome.tabs.captureVisibleTab(
        null,
        {format: "png"},
        function (dataUrl) {
          if (chrome.runtime.lastError) {
            catcher.unhandled(new Error(chrome.runtime.lastError.message));
          }
          let image = new Image();
          image.src = dataUrl;
          image.onload = catcher.watchFunction(() => {
            let xScale = image.width / scroll.innerWidth;
            let yScale = image.height / scroll.innerHeight;
            let canvas = document.createElement("canvas");
            canvas.height = pos.height * yScale;
            canvas.width = pos.width * xScale;
            let context = canvas.getContext("2d");
            context.drawImage(
              image,
              pos.left * xScale, pos.top * yScale,
              pos.width * xScale, pos.height * yScale,
              0, 0,
              pos.width * xScale, pos.height * yScale
            );
            let result = canvas.toDataURL();
            resolve(result);
          });
        }
      );
    });
  }

  function uploadShot(shot) {
    return auth.authHeaders().then((headers) => {
      headers["content-type"] = "application/json";
      let body = JSON.stringify(shot.asJson());
      let req = new Request(shot.jsonUrl, {
        method: "PUT",
        mode: "cors",
        headers,
        body
      });
      sendEvent("upload", "started", {eventValue: Math.floor(body.length / 1000)});
      return fetch(req);
    }).then((resp) => {
      if (! resp.ok) {
        sendEvent("upload-failed", `status-${resp.status}`);
        throw new Error("Error: response failed");
      } else {
        sendEvent("upload", "success");
      }
    }, (error) => {
      // FIXME: I'm not sure what exceptions we can expect
      sendEvent("upload-failed", "connection");
      throw error;
    });
  }

  return exports;
})();
