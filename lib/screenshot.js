//const { window: { document } } = require('sdk/addon/window');
const { data } = require("sdk/self");
const { getTabContentWindow, getActiveTab, getOwnerWindow, getBrowserForTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var { viewFor } = require("sdk/view/core");
const { defer } = require('sdk/core/promise');
const { callScript } = require("./framescripter");

exports.captureTab = function (tab, pos, maxSize, backgroundColor) {
  if (! tab) {
    tab = getActiveTab(getMostRecentBrowserWindow());
  }
  if (tab && tab.attach) {
    console.log("shooting tab", tab.url);
    tab = viewFor(tab);
  }
  var ownerWindow = getBrowserForTab(tab);
  let contentWindow = getTabContentWindow(tab);

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

  var promise = callScript(
    tab,
    data.url("screenshot-framescript.js"),
    "pageshot@screenshot",
    {pos: pos, maxSize: maxSize, backgroundColor: backgroundColor}
  );

  return promise.then(function (result) {
    return result.imageUrl;
  });
};
