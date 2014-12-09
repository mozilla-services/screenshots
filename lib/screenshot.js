const { window: { document } } = require('sdk/addon/window');
const { getTabContentWindow, getActiveTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var { viewFor } = require("sdk/view/core");

const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
document.documentElement.appendChild(canvas);

exports.captureTab = function (tab, pos, backgroundColor) {
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

  canvas.width = pos.w;
  canvas.height = pos.h;

  let ctx = canvas.getContext('2d');

  backgroundColor = backgroundColor || "#000";

  try {
    ctx.drawWindow(contentWindow, pos.x, pos.y, pos.w, pos.h, backgroundColor);
  } catch (e) {
    console.warn("Error in making screenshot: do you have e10s enabled?  This addon is not compatible with that.");
    throw e;
  }
  return canvas.toDataURL();
};
