const { window: { document } } = require('sdk/addon/window');
const { getTabContentWindow, getActiveTab } = require('sdk/tabs/utils');
const { getMostRecentBrowserWindow } = require('sdk/window/utils');
var { viewFor } = require("sdk/view/core");

const canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
document.documentElement.appendChild(canvas);

var MAX_WIDTH = 350;
var MAX_HEIGHT = 200;

exports.captureTab = function (tab, pos, maxSize, backgroundColor) {
  if (! tab) {
    tab = getActiveTab(getMostRecentBrowserWindow());
  }
  if (tab && tab.attach) {
    tab = viewFor(tab);
  }
  if (! maxSize) {
    maxSize = {h: MAX_HEIGHT, w: MAX_WIDTH};
  }
  let contentWindow = getTabContentWindow(tab);

  if (! pos) {
    pos = {};
    pos.w = contentWindow.innerWidth;
    pos.h = contentWindow.innerHeight;
    pos.x = contentWindow.scrollX;
    pos.y = contentWindow.scrollY;
  }

  if (pos.w > maxSize.w || pos.h > maxSize.h) {
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

  if (maxSize) {
    canvas.width = maxSize.w;
    canvas.height = maxSize.h;
  } else {
    canvas.width = pos.w;
    canvas.height = pos.h;
  }

  let ctx = canvas.getContext('2d');

  if (maxSize) {
    ctx.scale(pos.w / maxSize.w, pos.h / maxSize.h);
  }
  backgroundColor = backgroundColor || "#000";

  try {
    ctx.drawWindow(contentWindow, pos.x, pos.y, pos.w, pos.h, backgroundColor);
  } catch (e) {
    console.warn("Error in making screenshot: do you have e10s enabled?  This addon is not compatible with that.");
    throw e;
  }
  return canvas.toDataURL();
};
