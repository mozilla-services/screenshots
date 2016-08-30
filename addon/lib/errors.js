/** Error handling support

    This takes any unexpected exceptions and surfaces them as errors for
    the user.  This is described in error-handling.md

    Also includes helpers/wrappers to catch unexpected exceptions
    */
const panels = require("sdk/panel");
const self = require("sdk/self");
const tabs = require("sdk/tabs");
const req = require("./req");
const main = require("./main");
const user = require("./user");

const panel = panels.Panel({
  contentURL: self.data.url("error-panel.html"),
  contentScriptFile: self.data.url("error-panel.js"),
  height: 300,
  width: 400
});

panel.port.on("close", function () {
  panel.hide();
});

panel.port.on("my-shots", function () {
  panel.hide();
  tabs.open(main.getBackend() + "/shots");
});

/** Should be called when any unexpected error happens */
exports.unhandled = function (error) {
  // TODO: remove this circular dependency
  panel.show({position: require("./main").shootButton});
  let errorObj = error;
  if (error && (error.help || error.message || error.name)) {
    errorObj = error;
  } else {
    errorObj = JSON.stringify(error);
    if (errorObj == "{}") {
      errorObj = error + "";
    }
    errorObj = {message: errorObj};
  }
  errorObj.sentryPublicDSN = user.getSentryPublicDSN();

  panel.port.emit("showError", errorObj);
  if (typeof errorObj === "string") {
    errorObj = {name: errorObj};
  }
  errorObj.version = self.version;
  req.request(`${main.getBackend()}/error`, {
    method: "POST",
    content: JSON.stringify(errorObj),
    contentType: "application/json",
    ignoreLogin: true
  });
};

/** Turns an exception object (likely Error) into what might be a kind of
    useful error message (as should be passed to unhandled) */
exports.makeError = function (error) {
  if (error && (error instanceof Error || (error.name && error.message))) {
    let obj = {
      name: error.name,
      message: error.message,
      help: "Page Shot may not be able to work on this page. You could try again, or try a different page."
    };
    if (error.stack) {
      let stackLines = [];
      for (let line of error.stack.split(/\n/g)) {
        let match = (/resource:\/\/[a-zA-Z0-9-]*-at-jetpack\/(.*):(\d+):(\d+)/).exec(line);
        if (match) {
          stackLines.push(`${match[1]}:${match[2]}`);
        }
      }
      if (stackLines.length) {
        obj.stack = stackLines.join(" | ");
      }
    }
    return obj;
  }
  return error;
};

/** Adds something to the promise to catch and display exceptions

    Use like:

        watchPromise(asyncFunction().then(function () {
          ... code ...
        }));

    This should catch a rejection of the promise, or an exception of
    the .then() handler.
    */
exports.watchPromise = function (promise) {
  return promise.catch(function (error) {
    let exc = exports.makeError(error);
    console.error("Promise rejected with error:", exc || error);
    exports.unhandled(exc);
    throw error;
  });
};

/** Wrap the given function so any exceptions raised will end up going to
    unhandled().

    Also takes an optional context argument, just a convenience instead of
    calling `func.bind(context)` yourself.

    Also watches any promise returned by the function
    */
exports.watchFunction = function (func, context) {
  if (context) {
    func = func.bind(context);
  }
  return function () {
    let result;
    try {
      result = func.apply(this, arguments);
    } catch (e) {
      console.warn("Error in", func.name, ":", e+"");
      exports.unhandled(exports.makeError(e));
      throw e;
    }
    if (result && typeof result == "object" && result.then) {
      exports.watchPromise(result);
    }
    return result;
  };
};

/** Watches a worker.  This just means it listens for the `alertError` message
    on the worker's port. */
exports.watchWorker = function (worker) {
  worker.port.on("alertError", function (error) {
    console.error("Error from worker:", worker.url.replace(/.*\//, ""), ":", JSON.stringify(error));
    exports.unhandled(error);
  });
  // Workers also automatically emit an error message:
  worker.port.on("error", function (exc) {
    console.error("Uncaught error from worker (" + worker.url.replace(/.*\//, "") + "):", exc+"");
    if (exc.stack) {
      console.error("Stack:", exc.stack);
    }
    exports.unhandled(exports.makeError(exc));
  });
  return worker;
};

/** Immediately runs a function and catches any errors, an alternative
    to try/catch */
exports.watchRun = function (func, context) {
  try {
    func.run(context || this);
  } catch (e) {
    exports.unhandled(exports.makeError(e));
    throw e;
  }
};
