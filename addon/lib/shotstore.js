// FIXME: need to keep creation time, and eventually expire values out of this
const ss = require("sdk/simple-storage");
const { setTimeout } = require("sdk/timers");
const STORAGE_LIMIT = 100;
const TIME_LIMIT = 1000 * 60 * 60 * 24 * 30; // 30 days

exports.hasShot = function (id) {
  return !! ss.storage["page-" + id];
};

exports.saveShot = function (shot) {
  setTimeout(cleanupShots, 0);
  let data = exports.getShot(shot.id) || {};
  let newData = {
    body: shot.body || data.body,
    head: shot.head || data.head,
    bodyAttrs: shot.bodyAttrs || data.bodyAttrs,
    headAttrs: shot.headAttrs || data.headAttrs,
    htmlAttrs: shot.htmlAttrs || data.htmlAttrs,
    created: Date.now()
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

function cleanupShots() {
  let keyDates = [];
  let now = Date.now();
  let toDelete = [];
  for (let key in ss.storage) {
    if (! key.startsWith("page-")) {
      continue;
    }
    let created = ss.storage[key].created || 0;
    if (! created || created + TIME_LIMIT < now) {
      toDelete.push(key);
    } else {
      keyDates.push({key, created});
    }
  }
  for (let key of toDelete) {
    console.log("delete by date", key);
    delete ss.storage[key];
  }
  console.log("checking items", keyDates.length, STORAGE_LIMIT);
  if (keyDates.length > STORAGE_LIMIT) {
    keyDates.sort(function (a, b) {
      return a.created < b.created ? -1 : 1;
    });
    while (keyDates.length > STORAGE_LIMIT) {
      let {key} = keyDates.shift();
      console.log("delete by limit", key);
      delete ss.storage[key];
    }
  }
}
