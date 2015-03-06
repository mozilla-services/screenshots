const panels = require("sdk/panel");
const self = require("sdk/self");

const panel = panels.Panel({
  contentURL: self.data.url("errors.html"),
  contentScriptFile: self.data.url("errors.js"),
  height: 200,
  width: 350
});

panel.port.on("close", function () {
  panel.hide();
});

exports.unhandled = function (error) {
  panel.show({position: require("main").shootButton});
  panel.port.emit("showError", error);
};

exports.makeError = function (error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      help: "An unexpected error occurred"
    };
  }
  return error;
};

exports.watchPromise = function (promise) {
  return promise.catch(function (error) {
    let exc = exports.makeError(error);
    console.log("Promise rejected with error:", exc);
    exports.unhandled(exc);
    return error;
  });
};

exports.watchFunction = function (func, context) {
  if (context) {
    func = func.bind(context);
  }
  return function () {
    let result;
    try {
      result = func.apply(this, arguments);
    } catch (e) {
      console.error("Error in", func.name, ":", e+"");
      exports.unhandled(exports.makeError(e));
      throw e;
    }
    if (result && typeof result == "object" && result.then) {
      exports.watchPromise(result);
    }
    return result;
  };
};

exports.watchWorker = function (worker) {
  worker.port.on("alertError", function (error) {
    console.log("Error from worker:", worker.url.replace(/.*\//, ""), ":", JSON.stringify(error));
    exports.unhandled(error);
  });
  return worker;
};

exports.watchRun = function (func, context) {
  try {
    func.run(context || this);
  } catch (e) {
    exports.unhandled(exports.makeError(e));
    throw e;
  }
};
