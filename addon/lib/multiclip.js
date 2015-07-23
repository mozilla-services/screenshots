/* globals Services */

const chrome = require("chrome");
//const Constructor = chrome.components.Constructor;
const Constructor = chrome.CC;
const {Ci, Cu} = chrome;

//***************************************************************************
// Boilerplate from https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Using_the_clipboard

// Import the Services module for future use, if we're not in
// a browser window where it's already loaded.
Cu.import('resource://gre/modules/Services.jsm');

// Create a constructor for the built-in supports-string class.
const nsSupportsString = Constructor("@mozilla.org/supports-string;1", "nsISupportsString");
function SupportsString(str) {
  // Create an instance of the supports-string class
  var res = nsSupportsString();
  // Store the JavaScript string that we want to wrap in the new nsISupportsString object
  res.data = str;
  return res;
}

// Create a constructor for the built-in transferable class
const nsTransferable = Constructor("@mozilla.org/widget/transferable;1", "nsITransferable");

// Create a wrapper to construct an nsITransferable instance and set its source to the given window, when necessary
function Transferable(source) {
  var res = nsTransferable();
  if ('init' in res) {
    // When passed a Window object, find a suitable privacy context for it.
    if (source instanceof Ci.nsIDOMWindow) {
      // Note: in Gecko versions >16, you can import the PrivateBrowsingUtils.jsm module
      // and use PrivateBrowsingUtils.privacyContextFromWindow(sourceWindow) instead
      source = source.QueryInterface(Ci.nsIInterfaceRequestor)
                     .getInterface(Ci.nsIWebNavigation);
    }
    res.init(source);
  }
  return res;
}

// End Boilerplate
//***************************************************************************


exports.copyMultiple = function (options) {
  // FIXME: we are using null instead of a sourceWindow.  Not sure how to handle
  // sourceWindow with e10s, also not sure if we really have a source window
  let trans = Transferable(null);
  if (options.text) {
    trans.addDataFlavor("text/unicode");
    // length * 2 because we're treating it as UTF-16
    trans.setTransferData("text/unicode", SupportsString(options.text), options.text.length * 2);
  }
  if (options.html) {
    trans.addDataFlavor("text/html");
    trans.setTransferData("text/html", SupportsString(options.html), options.html.length * 2);
  }
  // FIXME: figure out images
  // To copy images, look at what the SDK module does:
  //  https://github.com/mozilla/gecko-dev/blob/8c3ee8ea35717aabfce820875145f0204617bf9b/addon-sdk/source/lib/sdk/clipboard.js
  Services.clipboard.setData(trans, null, Services.clipboard.kGlobalClipboard);
};
