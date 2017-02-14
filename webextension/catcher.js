/* globals callBackground */

window.catcher = (function () {
  let exports = {};

  /** Call with an error object (with .name, .message, .help, etc) */
  exports.unhandled = function unhandled(error, info) {
    callBackground("reportError", makeError(error, info));
  };

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
  exports.watchFunction = function watchFunction(func) {
    return function () {
      var result;
      try {
        result = func.apply(this, arguments);
      } catch (e) {
        exports.unhandled(e);
        throw e;
      }
      return result;
    };
  };

  exports.watchPromise = function watchPromise(promise) {
    return promise.catch((e) => {
      console.error("------Error in promise:", e+"");
      console.error(e.stack);
      exports.unhandled(makeError(e));
    });
  };

  return exports;
})();
null;
