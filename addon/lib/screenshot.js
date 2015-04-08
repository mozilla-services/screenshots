/** Makes screenshots, exporting only captureTab */
const { data } = require("sdk/self");
const { getTabContentWindow, getActiveTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
const { viewFor } = require("sdk/view/core");
const { callScript } = require("./framescripter");

/** Captures a screenshot from the given tab.  pos is like:

        {x, y, h, w}

    And maxSize is:

        {h, w}

    These give the position of the screenshot, and maxSize will cause the
    shot to be sized down before returning.

    Returns a promise that resolves with a data: URL */
exports.captureTab = function (tab, pos, maxSize, backgroundColor) {
  if (! tab) {
    tab = getActiveTab(getMostRecentBrowserWindow());
  }
  if (tab && tab.attach) {
    tab = viewFor(tab);
  }
  let contentWindow = getTabContentWindow(tab);

  if (! pos) {
    pos = {};
    pos.w = contentWindow.innerWidth;
    pos.h = contentWindow.innerHeight;
    pos.x = contentWindow.scrollX;
    pos.y = contentWindow.scrollY;
  }

  if (maxSize && (pos.w > maxSize.w || pos.h > maxSize.h)) {
    if (pos.w / pos.h > maxSize.w / maxSize.h) {
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
    data.url("framescripts/screenshot.js"),
    "pageshot@screenshot",
    {pos: pos, maxSize: maxSize, backgroundColor: backgroundColor}
  );

  return promise.then(function (result) {
    return result.imageUrl;
  });
};
