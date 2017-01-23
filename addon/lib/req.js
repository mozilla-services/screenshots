const { Request } = require("sdk/request");
const user = require("./user");
const self = require("sdk/self");

exports.request = function (url, options) {
  options = options || {};
  options.method = options.method || "get";
  options.method = options.method.toLowerCase();
  if (typeof options.expectedStatus === "string") {
    options.expectedStatus = [options.expectedStatus];
  }
  return requestMaybeInit(url, options);
};

function requestMaybeInit(url, options) {
  if ((! options.ignoreLogin) && (! user.isInitialized())) {
    return user.initialize().then(() => {
      return simpleRequest(url, options);
    });
  }
  return simpleRequest(url, options);
}

function simpleRequest(url, options) {
  return new Promise((resolve, reject) => {
    let requester = Request({
      url: url,
      content: options.content,
      contentType: options.contentType,
      onComplete: function (response) {
        if (options.expectedStatus && options.expectedStatus.indexOf(response.status) === -1) {
          reject(response);
        } else {
          resolve(response);
        }
      }
    });
    requester[options.method]();
  });
}

// The only options we allow for sendEvent, see also:
//   https://github.com/peaksandpies/universal-analytics/blob/master/AcceptableParams.md
const eventOptions = {
  eventValue: true,
  // Note each custom dimension must be configured in Google Analytics before use:
  cd1: true,  // Image height
  cd2: true,  // Image width
  ni: true    // Non-interactive
};

exports.sendEvent = function (action, label, options) {
  let event = "addon";
  if (typeof label == "object") {
    if (options) {
      throw new Error("Got both an object label and options to sendEvent()");
    }
    options = label;
    label = null;
  }
  let main = require("./main");
  if (options) {
    for (let key in options) {
      if (! eventOptions[key]) {
        throw new Error("Unexpected attribute to sendEvent(options): " + key);
      }
    }
  }
  options = options || {};
  options.applicationName = "firefox";
  options.applicationVersion = self.version;
  let abTests = user.getAbTests();
  for (let testName in abTests) {
    options[abTests[testName].gaField] = abTests[testName].value;
  }
  let showOptions = Object.keys(options).length > 2;
  console.info(`sendEvent ${event}/${action}/${label || 'none'} ${showOptions ? JSON.stringify(options) : ""}`);
  exports.request(`${main.getBackend()}/event`, {
    method: "POST",
    content: JSON.stringify({event, action, label, options}),
    contentType: "application/json",
    ignoreLogin: true
  });
};

exports.sendTiming = function(timings) {
  if (! Array.isArray(timings)) {
    timings = [timings];
  }
  for (let timing of timings) {
    if (! timing.category) {
      timing.category = "addon";
    }
    for (let prop in timing) {
      if (['category', 'variable', 'time', 'label'].indexOf(prop) === -1) {
        throw new Error(`Unexpected timing property: ${prop}`);
      }
    }
    if (timing.category === undefined || timing.variable === undefined || timing.time === undefined) {
      throw new Error("Timing missing required property");
    }
  }
  let main = require("./main");
  exports.request(`${main.getBackend()}/timing`, {
    method: "POST",
    content: JSON.stringify({timings}),
    contentType: "application/json"
  });
};

function timeout(time) {
  return new Promise((resolve, reject) => {
    require("sdk/timers").setTimeout(function () {
      resolve();
    }, time);
  });
}

function retryPromise(callback, times, retryTime) {
  if (retryTime === undefined || retryTime === null) {
    retryTime = 1000;
  }
  return callback().then(
    (result) => {
      return result;
    },
    (error) => {
      if (times <= 0) {
        throw error;
      } else {
        return timeout(retryTime).then(() => {
          return retryPromise(callback, times-1);
        });
      }
    }
  );
}

exports.retryPromise = retryPromise;
