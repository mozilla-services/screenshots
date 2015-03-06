/* global require, exports, console */
/** Manages framescripts and communication with those scripts

    Likely the only function you'll use is `callScript()`
    */
const { getBrowserForTab } = require('sdk/tabs/utils');
const { defer } = require('sdk/core/promise');
const { viewFor } = require("sdk/view/core");

let DEBUG = false;

/** call setDebug(true) to get debug information on the console */
exports.setDebug = function (val) {
  DEBUG = val;
};

function logDebug() {
  if (! DEBUG) {
    return;
  }
  let args = [];
  for (var i=0; i<arguments.length; i++) {
    if (typeof arguments[i] == "object" &&
      JSON.stringify(arguments[i]).length > 100) {
        args.push("[Object keys: " + JSON.stringify(Object.keys(arguments[i])) + "]");
    } else {
      args.push(arguments[i]);
    }
  }
  console.log.apply(console, args);
}

/** Gets the XUL browser object for a given tab (XUL tab or SDK tab) */
function getBrowser(tab) {
  if (tab && tab.attach) {
    // Convert from SDK tab to XUL tab
    tab = viewFor(tab);
  }
  return getBrowserForTab(tab);
}

/** Ensures a script is attached to a given tab

    Framescripts are long-lived, and live longer than any one page that is
    loaded.  This attaches tracking attributes to the browser to see which
    scripts have been attached. */
exports.addScript = function (tab, script) {
  let browser = getBrowser(tab);
  let scripts = browser.framescripterEnabledScripts;
  if (! scripts) {
    scripts = browser.framescripterEnabledScripts = {};
  }
  if (! scripts[script]) {
    logDebug("Adding script:", script);
    let browserMM = browser.messageManager;
    if (! browserMM) {
      console.error("Could not get messageManager from " + browser);
      throw new Error("Could not get messageManager");
    }
    browserMM.loadFrameScript(script, false);
    scripts[script] = {};
  } else {
    logDebug("Script already loaded:", script);
  }
};

// Used to match up incoming with outgoing messages
let idCounter = 1;

function makeId() {
  return idCounter++;
}

const pendingDeferreds = {};

/** Adds the script to the given tab

    Adds listeners to handle the two messages: a message with the name
    `message + ":call"` is sent to the framescript, and we expect a message
    with the name `message + ":return"`.  Each will include `callId` in the
    payload, to match up a call with a return.

    The payload includes any arguments to send to the framescript.

    Returns a promise that resolves when the return message is sent.
    */
exports.callScript = function (tab, script, message, payload) {
  exports.addScript(tab, script);
  let browser = getBrowser(tab);
  let messages = browser.framescripterEnabledScripts[script];
  let browserMM = browser.messageManager;
  if (! messages[message]) {
    browserMM.addMessageListener(message + ":return", callScriptReturner);
    messages[message] = true;
    logDebug("Adding frame listener for:", message + ":return");
  }
  let deferred = defer();
  let id = makeId();
  pendingDeferreds[id] = deferred;
  payload.callId = id;
  logDebug("Sending [" + message + ":call]/" + id + " with payload:", payload);
  browserMM.sendAsyncMessage(message + ":call", payload);
  return deferred.promise;
};

// Handler for a specific event type, used to resolve promises:
function callScriptReturner(event) {
  let deferred = pendingDeferreds[event.data.callId];
  if (! deferred) {
    console.error("Got deferred that has expired:", event.data.callId);
    throw new Error("Expired deferred");
  }
  delete pendingDeferreds[event.data.callId];
  logDebug("Received /" + event.data.callId + " with payload:", event.data);
  if (event.data.error) {
    deferred.reject(event.data.error);
  } else {
    delete event.data.callId;
    deferred.resolve(event.data);
  }
}
