var ss = require("sdk/simple-storage");
var { on, once, off, emit } = require('sdk/event/core');

exports.getHashList = function () {
  var list = ss.storage.hashList;
  if (! list) {
    return [];
  }
  return list;
};

exports.getHashList.on = function (name, listener) {
  on(exports.getHashList, name, listener);
};

exports.getHashList.off = function (name, listener) {
  off(exports.getHashList, name, listener);
};

exports.getHashList.once = function (name, listener) {
  once(exports.getHashList, name, listener);
};

exports.addHash = function (item) {
  var list = exports.getHashList();
  if (list.indexOf(item) != -1) {
    list.splice(list.indexOf(item), 1);
  }
  list = [item].concat(list);
  ss.storage.hashList = list;
  emit(exports.getHashList, "add", list);
  return list;
};
