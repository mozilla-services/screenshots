//const { window: { document } } = require('sdk/addon/window');
const { data } = require("sdk/self");
const { getTabContentWindow, getActiveTab, getOwnerWindow, getBrowserForTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var { viewFor } = require("sdk/view/core");
const { defer } = require('sdk/core/promise');

//const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
//document.documentElement.appendChild(canvas);

exports.captureTab = function (tab, pos, maxSize, backgroundColor) {
  var deferred = defer();
  if (! tab) {
    tab = getActiveTab(getMostRecentBrowserWindow());
  }
  if (tab && tab.attach) {
    console.log("shooting tab", tab.url);
    tab = viewFor(tab);
  }
  var ownerWindow = getBrowserForTab(tab);
  let contentWindow = getTabContentWindow(tab);
  // FIXME: this is a hack to take a shot of the iframe in the viewer
  // instead of the container
  // FIXME: is this e10s OK?
  if (contentWindow.document.getElementById("frame")) {
    contentWindow = contentWindow.document.getElementById("frame").contentWindow;
  }

  if (! pos) {
    pos = {};
    pos.w = contentWindow.innerWidth;
    pos.h = contentWindow.innerHeight;
    pos.x = contentWindow.scrollX;
    pos.y = contentWindow.scrollY;
  }

  if (maxSize && (pos.w > maxSize.w || pos.h > maxSize.h)) {
    if ((pos.w / pos.h) > (maxSize.w / maxSize.h)) {
      // Wider than tall
      maxSize.w = (maxSize.h / pos.h) * pos.w;
    } else {
      // Taller than wide
      maxSize.h = (maxSize.w / pos.w) * pos.h;
    }
  } else {
    maxSize = null;
  }

  var browserMM = ownerWindow.messageManager;
  if (! browserMM) {
    console.error("Could not get messageManager from " + ownerWindow);
    throw new Error();
  }

  // FIXME: until https://bugzilla.mozilla.org/show_bug.cgi?id=1051238
  // is fixed we should be generating this script name with a random
  // element to avoid caching on update
  browserMM.loadFrameScript(data.url("screenshot-framescript.js"), false);

  browserMM.addMessageListener("pageshot@pageshot:get-screenshot", function (event) {
    if (event.data.imageUrl) {
      deferred.resolve(event.data.imageUrl);
    } else if (event.data.error) {
      deferred.reject(event.data.error);
    } else {
      deferred.reject({name: "INVALID_MESSAGE", message: event});
    }
  });

  browserMM.sendAsyncMessage("pageshot@pageshot:request-screenshot", {
    pos: pos,
    maxSize: maxSize,
    backgroundColor: backgroundColor
  });

  return deferred.promise;
};
