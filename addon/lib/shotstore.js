// FIXME: need to keep creation time, and eventually expire values out of this
const ss = require("sdk/simple-storage");

exports.hasShot = function (id) {
  return !! ss.storage["page-" + id];
};

exports.saveShot = function (shot) {
  let data = exports.getShot(shot.id) || {};
  let newData = {
    body: shot.body || data.body,
    head: shot.head || data.head,
    bodyAttrs: shot.bodyAttrs || data.bodyAttrs,
    headAttrs: shot.headAttrs || data.headAttrs,
    htmlAttrs: shot.htmlAttrs || data.htmlAttrs
  };
  ss.storage["page-" + shot.id] = newData;
};

exports.clearSaved = function (shot) {
  shot.body = null;
  shot.head = null;
  shot.bodyAttrs = null;
  shot.headAttrs = null;
  shot.htmlAttrs = null;
  shot.showPage = false;
};

exports.getShot = function (id) {
  return ss.storage["page-" + id];
};

exports.removeSaved = function (id) {
  delete ss.storage["page-" + id];
};
