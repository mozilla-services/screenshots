/* globals communication, shot, main, chrome, makeUuid, clipboard, auth */

window.takeshot = (function () {
  let exports = {};
  const Shot = shot.AbstractShot;

  communication.register("takeShot", (options) => {
    let { captureType, captureText, scroll, selectedPos, shotId, shot } = options;
    shot = new Shot(main.getBackend(), shotId, shot);
    shot.deviceId = auth.getDeviceId();
    screenshotPage(selectedPos, scroll).then((dataUrl) => {
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
      return uploadShot(shot);
    }).then(() => {
      let id = makeUuid();
      clipboard.copy(shot.viewUrl);
      chrome.notifications.create(id, {
        type: "basic",
        iconUrl: "img/clipboard-32.png",
        title: "Link Copied",
        message: "The link to your shot has been copied to the clipboard"
      });
      chrome.tabs.create({url: shot.viewUrl});
      console.log("Accomplished my goal", JSON.stringify(shot.asJson()).length);
    }).catch((e) => {
      // FIXME: report
      console.error("Error uploading shot:", e);
    });
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
          let image = new Image();
          image.src = dataUrl;
          image.onload = () => {
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
          };
        }
      );
    });
  }

  function uploadShot(shot) {
    let req = new Request(shot.jsonUrl, {
      method: "PUT",
      mode: "cors",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(shot.asJson())
    });
    return fetch(req).then((resp) => {
      if (! resp.ok) {
        console.error("Failed response:", resp);
        throw new Error("Error: response failed");
      }
    });
  }

  return exports;
})();
