const { Ci, Cc } = require("chrome");
const { Services }  = require("resource://gre/modules/Services.jsm");
const { URL } = require("sdk/url");
const cookieService = Cc["@mozilla.org/cookieService;1"].getService(Ci.nsICookieService);
const { newURI } = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);

function getCookieObjects(host) {
  let result = [];
  let iter = Services.cookies.getCookiesFromHost(host);
  while (iter.hasMoreElements()) {
    var cookie = iter.getNext().QueryInterface(Ci.nsICookie2);
    result.push(cookie);
  }
  return result;
}

exports.hostFromUrl = function (url) {
  return URL(url).host;
};

exports.cookieSummary = function (host) {
  let result = [];
  for (let c of getCookieObjects(host)) {
    let parts = [c.name];
    if (c.value) {
      parts.push(`size=${c.value.length}`);
    } else {
      parts.push("empty");
    }
    parts.push(`host=${c.host}`);
    if (c.path != "/") {
      parts.push(`path=${c.path}`);
    }
    if (c.isDomain) {
      parts.push("isDomain");
    }
    if (c.isSecure) {
      parts.push("isSecure");
    }
    if (c.isHttpOnly) {
      parts.push("isHttpOnly");
    }
    result.push(parts.join(" "));
  }
  return result.join("\n");
};

exports.safeCookieSummary = function (host) {
  try {
    return exports.cookieSummary(host);
  } catch (e) {
    return `Could not capture cookies for ${host}: ${e}`;
  }
};

exports.hasCookieForBackend = function (backend) {
  let backendUrl = newURI(backend, null, null);
  let cookieString = cookieService.getCookieStringFromHttp(backendUrl, backendUrl, null);
  return cookieString.search(/user=/) != -1;
};
