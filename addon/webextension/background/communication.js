/* globals chrome, catcher */
window.communication = (function () {
  let exports = {};

  let registeredFunctions = {};

  chrome.runtime.onMessage.addListener(catcher.watchFunction((req, sender, sendResponse) => {
    if (! (req.funcName in registeredFunctions)) {
      console.error(`Received unknown internal message type ${req.funcName}`);
      sendResponse({type: "error", name: "Unknown message type"});
      return;
    }
    if (! Array.isArray(req.args)) {
      console.error("Received message with no .args list");
      sendResponse({type: "error", name: "No .args"});
      return;
    }
    let func = registeredFunctions[req.funcName];
    let result;
    try {
      result = func.apply(null, req.args);
    } catch (e) {
      console.error(`Error in ${req.funcName}:`, e);
      sendResponse({type: "error", name: e+""});
      return;
    }
    if (result && result.then) {
      result.then((concreteResult) => {
        sendResponse({type: "success", value: concreteResult});
      }, (errorResult) => {
        sendResponse({type: "error", name: errorResult+""});
      });
      return true;
    } else {
      sendResponse({type: "success", value: result});
    }
  }));

  exports.register = function (name, func) {
    registeredFunctions[name] = func;
  };

  return exports;
})();
