/* globals FILENAME, exports */
/* exported unhandled, makeError, watchFunction, watchPromise */
/** Similar to lib/errors.js, some helpers to catch or handle errors */

/** Call with an error object (with .name, .message, .help, etc) */
function unhandled(error) {
  try {
    console.error("Internal error", location.href);
  } catch (e) {
    // Something location.href doesn't work
  }
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
      console.error("------Error in worker script:", e+"");
      console.error(e.stack);
      unhandled(makeError(e));
      throw e;
    }
    return result;
  };
}

function watchPromise(promise) {
  return promise.catch((e) => {
    console.error("------Error in promise:", e+"");
    console.error(e.stack);
    unhandled(makeError(e));
  });
}

if (typeof exports !== "undefined") {
  exports.unhandled = unhandled;
  exports.getFilename = getFilename;
  exports.makeError = makeError;
  exports.watchFunction = watchFunction;
}
