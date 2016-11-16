const { sendTiming } = require("./req");

/** Times a function, from calling the function to completion
    If the function returns a promise, "completion" means when that promise resolves
    Arguments:

      timings:  an array; if given, the timings will be stored in the list, if not
                given, then the timings will be sent immediately
      func:     a function to call
      _this:    call the function bound to _this
      args:     an array of args
      variable: the GA timing variable
      category: GA timing category (default "addon")
      label:    GA timing label
*/
exports.timeFunction = function (options) {
  let timings = options.timings;
  let sendImmediately = timings === undefined;
  timings = timings || [];
  let func = options.func;
  let _this = options._this || null;
  let args = options.args;
  let startTime = Date.now();
  let result = func.apply(_this, args);
  function finish() {
    let time = Date.now() - startTime;
    timings.push({
      variable: options.variable,
      label: options.label,
      category: options.category,
      time
    });
    if (sendImmediately) {
      sendTiming(timings);
    }
  }
  if (result.then) {
    let timedResult = result.then((val) => {
      finish();
      return val;
    }, (error) => {
      finish();
      throw error;
    });
    return timedResult;
  } else {
    finish();
    return result;
  }
};

/** Creates a timer, which when called will complete a timing
    Arguments, as in timeFunction():

      timing, category, variable, label
*/
exports.startTimer = function (options) {
  let start = Date.now();
  let timings = options.timings;
  let sendImmediately = timings === undefined;
  timings = timings || [];
  function finish() {
    let time = Date.now() - start;
    if (finish.done) {
      throw new Error("Tried to call startTimer()() twice");
    }
    finish.done = true;
    timings.push({
      variable: options.variable,
      label: options.label,
      category: options.category,
      time
    });
    if (sendImmediately) {
      sendTiming(timings);
    }
  }
  finish.done = false;
  return finish;
};
