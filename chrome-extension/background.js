/* globals chrome, console, XMLHttpRequest, Image, document, setTimeout, makeUuid, navigator */
let hasUsedMyShots = false;
let manifest = chrome.runtime.getManifest();
let backend;
for (let permission of manifest.permissions) {
  if (permission.search(/^https?:\/\//i) != -1) {
    backend = permission;
    break;
  }
}
backend = backend.replace(/\/*$/, "");
let registrationInfo;
let initialized = false; // eslint-disable-line no-unused-vars
const STORAGE_LIMIT = 100;
const TIME_LIMIT = 1000 * 60 * 60 * 24 * 30; // 30 days

let platformInfo;
chrome.runtime.getPlatformInfo(function(info) {
  platformInfo = info;
});

chrome.runtime.onInstalled.addListener(function() {});

chrome.browserAction.onClicked.addListener(function(tab) {
  sendAnalyticEvent("addon", "click-shot-button");
  chrome.tabs.insertCSS({
    file: "css/inline-selection.css"
  });
  let scripts = [
    "error-utils.js",
    "uuid.js",
    "shared/shot.js",
    "randomstring.js",
    "url-domain.js",
    "add-ids.js",
    "make-static-html.js",
    "extractor-worker.js",
    "annotate-position.js",
    "selector-util.js",
    "selector-ui.js",
    "selector-snapping.js",
    "shooter-interactive-worker.js",
    "chrome-shooter.js"
  ];
  let lastPromise = Promise.resolve(null);
  scripts.forEach(script => {
    lastPromise = lastPromise.then(() => {
      return chrome.tabs.executeScript({
        file: script
      });
    });
  });
  lastPromise.then(() => {
    console.log("finished loading scripts:", scripts, chrome.runtime.lastError);
  });
});

chrome.storage.sync.get(["backend", "hasUsedMyShots", "registrationInfo"], result => {
  if (result.backend) {
    backend = result.backend;
  }
  if (result.hasUsedMyShots) {
    hasUsedMyShots = true;
  }
  if (result.registrationInfo) {
    registrationInfo = result.registrationInfo;
    login();
  } else {
    registrationInfo = generateRegistrationInfo();
    chrome.storage.sync.set(
      {
        registrationInfo: registrationInfo
      },
      () => {
        console.info("Device authentication saved");
      }
    );
    console.info("Generating new device authentication ID", registrationInfo);
    register();
  }
});

function generateRegistrationInfo() {
  let info = {
    deviceId: "anon" + makeUuid() + "",
    secret: makeUuid() + "",
    // FIXME-chrome: need to figure out the reason the extension was created
    // (i.e., startup or install)
    //reason,
    deviceInfo: JSON.stringify(deviceInfo())
  };
  return info;
}

function deviceInfo() {
  let match = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9\.]+)/);
  let chromeVersion = match ? match[1] : null;

  return {
    addonVersion: manifest.version,
    platform: platformInfo.os,
    architecture: platformInfo.arch,
    version: chromeVersion,
    // These don't seem to apply to Chrome:
    //build: system.build,
    //platformVersion: system.platformVersion,
    userAgent: navigator.userAgent,
    appVendor: "chrome",
    appName: "chrome"
  };
}

function login() {
  return new Promise((resolve, reject) => {
    let loginUrl = backend + "/api/login";
    let req = new XMLHttpRequest();
    req.open("POST", loginUrl);
    req.onload = () => {
      if (req.status == 404) {
        // No such user
        resolve(register());
      } else if (req.status >= 300) {
        console.warn("Error in response:", req.responseText);
        reject(new Error("Could not log in: " + req.status));
      } else if (req.status === 0) {
        let error = new Error("Could not log in, server unavailable");
        sendAnalyticEvent("addon", "login-failed");
        reject(error);
      } else {
        initialized = true;
        console.info("Page Shot logged in");
        sendAnalyticEvent("addon", "login");
        resolve();
      }
    };
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.send(
      uriEncode({
        deviceId: registrationInfo.deviceId,
        secret: registrationInfo.secret,
        // FIXME: give proper reason
        reason: "install",
        deviceInfo: JSON.stringify(deviceInfo())
      })
    );
  });
}

function register() {
  return new Promise((resolve, reject) => {
    let registerUrl = backend + "/api/register";
    let req = new XMLHttpRequest();
    req.open("POST", registerUrl);
    req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    req.onload = () => {
      if (req.status == 200) {
        console.info("Registered login");
        initialized = true;
        resolve();
        sendAnalyticEvent("addon", "registered");
      } else {
        console.warn("Error in response:", req.responseText);
        reject(new Error("Bad response: " + req.status));
      }
    };
    req.send(uriEncode(registrationInfo));
  });
}

function uriEncode(obj) {
  let s = [];
  for (let key in obj) {
    s.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  return s.join("&");
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.info("onMessage request:", req);
  if (req.type == "requestConfiguration") {
    sendResponse({
      backend,
      hasUsedMyShots,
      deviceId: registrationInfo.deviceId,
      deviceInfo: registrationInfo.deviceInfo,
      secret: registrationInfo.secret
    });
  } else if (req.type == "setHasUsedMyShots") {
    hasUsedMyShots = req.value;
    chrome.storage.sync.set({
      hasUsedMyShots: req.value
    });
    sendResponse(null);
  } else if (req.type == "clipImage") {
    screenshotPage(req.pos, {
      scrollX: req.scrollX,
      scrollY: req.scrollY,
      innerHeight: req.innerHeight,
      innerWidth: req.innerWidth
    }).then(imageUrl => {
      sendResponse({ imageUrl });
    });
    // Indicates async sendResponse:
    return true;
  } else if (req.type == "saveShotFullPage") {
    saveShotFullPage(req.id, req.shot);
    sendResponse(true);
  } else if (req.type == "has-saved-shot") {
    hasSavedShot(req.id).then(result => {
      sendResponse(result);
    });
    return true;
  } else if (req.type == "request-saved-shot") {
    getSavedShot(req.id).then(result => {
      sendResponse(result);
    });
    return true;
  } else if (req.type == "remove-saved-shot") {
    removeSavedShot(req.id).then(() => {
      sendResponse(null);
    });
    return true;
  } else if (req.type == "notifyAndCopy") {
    clipboardCopy(req.url);
    let id = makeUuid();
    chrome.notifications.create(id, {
      type: "basic",
      iconUrl: "img/clipboard-32.png",
      title: "Link Copied",
      message: "The link to your shot has been copied to the clipboard"
    });
    sendResponse(null);
  } else if (req.type == "sendAnalyticEvent") {
    sendAnalyticEvent(req.eventName, req.action, req.label);
    sendResponse(null);
  } else if (req.type == "openTab") {
    chrome.tabs.create({ url: req.url });
    sendResponse(null);
  } else {
    console.error("Message not understood:", req);
  }
  return undefined;
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
    return chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
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
          pos.left * xScale,
          pos.top * yScale,
          pos.width * xScale,
          pos.height * yScale,
          0,
          0,
          pos.width * xScale,
          pos.height * yScale
        );
        let result = canvas.toDataURL();
        resolve(result);
      };
    });
  });
}

function saveShotFullPage(id, shot) {
  // Note: duplicates/similar to shotstore.saveShot
  let name = "page-" + id;
  chrome.storage.local.get(name, result => {
    let data = result[name] || {};
    let newData = {
      body: shot.body || data.body,
      head: shot.head || data.head,
      bodyAttrs: shot.bodyAttrs || data.bodyAttrs,
      headAttrs: shot.headAttrs || data.headAttrs,
      htmlAttrs: shot.htmlAttrs || data.htmlAttrs,
      created: Date.now(),
      readable: shot.readable,
      resources: shot.resources
    };
    chrome.storage.local.set({ [name]: newData });
    setTimeout(cleanupShots, 0);
  });
}

function cleanupShots() {
  // Note: duplications/similar to shotstore.cleanupShots
  chrome.storage.local.get(null, storage => {
    let keyDates = [];
    let now = Date.now();
    let toDelete = [];
    for (let key in storage) {
      if (!key.startsWith("page-")) {
        continue;
      }
      let created = storage[key].created || 0;
      if (!created || created + TIME_LIMIT < now) {
        toDelete.push(key);
      } else {
        keyDates.push({ key, created });
      }
    }
    for (let key of toDelete) {
      console.info("delete by date", key);
    }
    console.info("checking items", keyDates.length, STORAGE_LIMIT);
    if (keyDates.length > STORAGE_LIMIT) {
      keyDates.sort(function(a, b) {
        return a.created < b.created ? -1 : 1;
      });
      while (keyDates.length > STORAGE_LIMIT) {
        let { key } = keyDates.shift();
        console.info("delete by limit", key);
        toDelete.push(key);
      }
    }
    if (toDelete.length) {
      chrome.storage.local.remove(toDelete);
      sendAnalyticEvent("addon", "old-saved-shots-deleted");
    }
  });
}

function getSavedShot(id) {
  return new Promise((resolve, reject) => {
    let name = "page-" + id;
    chrome.storage.local.get(name, result => {
      resolve(result[name]);
    });
  });
}

function hasSavedShot(id) {
  return getSavedShot(id).then(shot => {
    return !!shot;
  });
}

function removeSavedShot(id) {
  return new Promise((resolve, reject) => {
    let name = "page-" + id;
    chrome.storage.local.remove(name, () => {
      resolve();
    });
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

function sendAnalyticEvent(eventName, action, label) {
  let url = backend + "/event";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/json");
  req.onload = () => {
    if (req.status >= 300) {
      console.warn("Event gave non-2xx response:", req.status);
    }
  };
  req.send(
    JSON.stringify({
      event: eventName,
      action,
      label
    })
  );
}
