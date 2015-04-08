/* globals FILENAME */
/* exported unhandled, makeError, watchFunction */
/** Similar to lib/errors.js, some helpers to catch or handle errors */

/** Call with an error object (with .name, .message, .help, etc) */
function unhandled(error) {
  console.log("Internal error", location.href);
  self.port.emit("alertError", error);
}

/** Try to get the worker script filename */
function getFilename() {
  try {
    return FILENAME;
  } catch (e) {
  }
  return "unknown";
}

/** Turn an exception into an error object */
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

/** Wrap the function, and if it raises any exceptions then call unhandled() */
function watchFunction(func) {
  return function () {
    var result;
    try {
      result = func.apply(this, arguments);
    } catch (e) {
      console.log("------Error in worker script", getFilename(), ":", e+"");
      console.trace();
      console.log("------------------------------------------------------------");
      unhandled(makeError(e));
      throw e;
    }
    return result;
  };
}
