/* globals chrome, console, XMLHttpRequest, Image, document, setTimeout, makeUuid, navigator */
/* globals loadSelector, analytics, communication */
window.main = (function () {
  let exports = {};

  const { sendEvent } = analytics;

  let manifest = chrome.runtime.getManifest();
  let backend;

  exports.setBackend = function (newBackend) {
    backend = newBackend;
    backend = backend.replace(/\/*$/, "");
  };

  exports.getBackend = function () {
    return backend;
  };

  for (let permission of manifest.permissions) {
    if (permission.search(/^https?:\/\//i) != -1) {
      exports.setBackend(permission);
      break;
    }
  }

  chrome.runtime.onInstalled.addListener(function () {
  });

  chrome.browserAction.onClicked.addListener(function(tab) {
    sendEvent("addon", "click-shot-button");
    loadSelector().catch((e) => {
      console.error("Error loading scripts:", e);
    });
  });

  communication.register("clipImage", (pos, options) => {
    // options should contain scrollX, scrollY, innerHeight, innerWeight
    return screenshotPage(pos, options);
  });

  communication.register("notifyAndCopy", (url) => {
    clipboardCopy(url);
    let id = makeUuid();
    chrome.notifications.create(id, {
      type: "basic",
      iconUrl: "img/clipboard-32.png",
      title: "Link Copied",
      message: "The link to your shot has been copied to the clipboard"
    });
  });

  communication.register("sendEvent", (...args) => {
    sendEvent(...args);
    // We don't wait for it to complete:
    return null;
  });

  communication.register("openTab", (url) => {
    chrome.tabs.create({url});
    return null;
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

  function clipboardCopy(text) {
    let el = document.createElement("textarea");
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  return exports;
})();
