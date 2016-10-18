const { Cc, Ci } = require("chrome");
const newURI = Cc["@mozilla.org/network/io-service;1"]
  .getService(Ci.nsIIOService)
  .newURI;
const uriFixup = Cc["@mozilla.org/docshell/urifixup;1"]
               .createInstance(Ci.nsIURIFixup);

module.exports = function (url) {
  let uri = newURI(url, null, null);
  try {
    let cleaned = uriFixup.createExposableURI(uri);
    return cleaned.spec;
  } catch (e) {
    e.extra = {originalURL: url};
    require("./errors").unhandled(e);
    console.warn("Could not convert URL:", url);
    return url;
  }
};
