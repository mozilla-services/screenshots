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
