/* globals FILENAME, exports */
/* exported unhandled, makeError, watchFunction */
/** Similar to lib/errors.js, some helpers to catch or handle errors */

/** Call with an error object (with .name, .message, .help, etc) */
function unhandled(error) {
  console.error("Internal error", location.href);
  self.port.emit("alertError", error);
}

/** Try to get the worker script filename */
function getFilename() {
  try {
    return FILENAME;
  } catch (e) { // eslint-disable-line no-empty
  }
  return "unknown";
}

/** Turn an exception into an error object */
function makeError(exc, info) {
  var result = {
    name: exc.name || "ERROR",
    message: exc+"",
    stack: exc.stack
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
      console.error("------Error in worker script", getFilename(), ":", String(e));
      console.error(e.stack);
      console.error("Called from:");
      console.trace();
      console.error("------------------------------------------------------------");
      unhandled(makeError(e));
      throw e;
    }
    return result;
  };
}

if (typeof exports !== "undefined") {
  exports.unhandled = unhandled;
  exports.getFilename = getFilename;
  exports.makeError = makeError;
  exports.watchFunction = watchFunction;
}
