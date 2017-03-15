window.catcher = (function () {
  let exports = {};

  let handler;

  let queue = [];

  exports.unhandled = function (error, info) {
    console.error("Unhandled error:", error, info);
    let e = makeError(error, info);
    if (! handler) {
      queue.push(e);
    } else {
      handler(e);
    }
  };

  /** Turn an exception into an error object */
  function makeError(exc, info) {
    let result;
    if (exc.fromMakeError) {
      result = exc;
    } else {
      result = {
        fromMakeError: true,
        name: exc.name || "ERROR",
        message: exc+"",
        stack: exc.stack
      };
      for (let attr in exc) {
        result[attr] = exc[attr];
      }
    }
    if (info) {
      for (let attr in info) {
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

  exports.registerHandler = function (h) {
    handler = h;
    for (let error of queue) {
      handler(error);
    }
    queue = [];
  };

  return exports;
})();
null;
