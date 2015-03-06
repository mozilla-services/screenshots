/* globals FILENAME */
/* exported unhandled, makeError, watchFunction */
/** Similar to lib/errors.js, some helpers to catch or handle errors */

function unhandled(error) {
  console.log("Internal error", location.href);
  self.port.emit("alertError", error);
}

function getErrorName() {
  try {
    return FILENAME;
  } catch (e) {
  }
  return "unknown";
}

function makeError(exc, info) {
  var result = {
    name: exc.name || "ERROR",
    message: exc+""
  };
  if (info) {
    for (var attr in info) {
      result[attr] = info[attr];
    }
  }
  return result;
}

function watchFunction(func) {
  return function () {
    var result;
    try {
      result = func.apply(this, arguments);
    } catch (e) {
      console.log("------Error in worker script", getErrorName(), ":", e+"");
      console.trace();
      console.log("------------------------------------------------------------");
      unhandled(makeError(e));
      throw e;
    }
    return result;
  };
}
