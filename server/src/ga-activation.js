/* Code to create the Google Analytics code for a PageShot page.
   Stubs out ga() if no gaId is configured
   Disables analytics if Do-Not-Track is set
   Hashes page names
   */

const React = require("react");

const dntJs = `
// Copied from https://github.com/mozilla/bedrock/blob/22079855caeb660724319f735de51e3a7472a50f/media/js/base/dnt-helper.js
function _dntEnabled(dnt, ua) {

    'use strict';

    // for old version of IE we need to use the msDoNotTrack property of navigator
    // on newer versions, and newer platforms, this is doNotTrack but, on the window object
    // Safari also exposes the property on the window object.
    var dntStatus = dnt || navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
    var ua = ua || navigator.userAgent;

    // List of Windows versions known to not implement DNT according to the standard.
    var anomalousWinVersions = ['Windows NT 6.1', 'Windows NT 6.2', 'Windows NT 6.3'];

    var fxMatch = ua.match(/Firefox\\/(\\d+)/);
    var ieRegEx = /MSIE|Trident/i;
    var isIE = ieRegEx.test(ua);
    // Matches from Windows up to the first occurance of ; un-greedily
    // http://www.regexr.com/3c2el
    var platform = ua.match(/Windows.+?(?=;)/g);

    // With old versions of IE, DNT did not exist so we simply return false;
    if (isIE && typeof Array.prototype.indexOf !== 'function') {
        return false;
    } else if (fxMatch && parseInt(fxMatch[1], 10) < 32) {
        // Can't say for sure if it is 1 or 0, due to Fx bug 887703
        dntStatus = 'Unspecified';
    } else if (isIE && platform && anomalousWinVersions.indexOf(platform.toString()) !== -1) {
        // default is on, which does not honor the specification
        dntStatus = 'Unspecified';
    } else {
        // sets dntStatus to Disabled or Enabled based on the value returned by the browser.
        // If dntStatus is undefined, it will be set to Unspecified
        dntStatus = { '0': 'Disabled', '1': 'Enabled' }[dntStatus] || 'Unspecified';
    }

    return dntStatus === 'Enabled' ? true : false;
}
`;

const stubGaJs = `
window.ga = function () {
  console.info.apply(console, ["stubbed ga("].concat(arguments).concat([")"]));
};
`;

const gaJs = `
(function () {

  ${dntJs}

  if (_dntEnabled()) {
    ${stubGaJs}
    return;
  }
  window.GoogleAnalyticsObject = "ga";
  window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
  };
  window.ga.l = 1 * new Date();
  var userId = "__USER_ID__";
  var gaOptions = "auto";
  if (userId) {
    gaOptions = {userId: userId};
  }
  if (location.hostname === "localhost") {
    if (typeof gaOptions === "string") {
      gaOptions = {};
    }
    gaOptions.cookieDomain = "none";
  }
  if (__HASH_LOCATION__ && window.crypto) {
    var bytes = [];
    for (var i=0; i<location.pathname.length; i++) {
      bytes.push(location.pathname.charAt(i));
    }
    window.crypto.subtle.digest("sha-256", new Uint8Array(bytes)).then(function (result) {
      result = new Uint8Array(result);
      var c = [];
      for (var i=0; i<10; i++) {
        c.push(result[i].toString(16));
      }
      gaOptions.location = "/a-shot/" + c.join("");
      finish();
    });
  } else {
    gaOptions.location = "/a-shot/unknown";
    finish();
  }
  function finish() {
    ga("create", "__GA_ID__", gaOptions);
    ga("send", "pageview", gaOptions.location || location.href);
  }
})();
`;

const gaScript = <script src="//www.google-analytics.com/analytics.js" async key="gaScript"></script>;

const idRegex = /^[a-zA-Z0-9_.,-]+$/;

exports.gaActivation = function (gaId, userId, hashLocation) {
  userId = userId || "";
  if (typeof userId != "string") {
    throw new Error("Invalid user ID type: " + typeof userId);
  }
  if (gaId.search(idRegex) === -1) {
    throw new Error("Invalid gaId: " + JSON.stringify(gaId));
  }
  if (userId && userId.search(idRegex) === -1) {
    throw new Error("Invalid userId: " + JSON.stringify(userId));
  }
  if (! gaId) {
    return [stubGa()];
  }
  let script = gaJs.replace(/__GA_ID__/g, gaId).replace(/__USER_ID__/g, userId);
  script = script.replace(/__HASH_LOCATION__/g, hashLocation ? "true" : "false");
  let scriptTag = <script dangerouslySetInnerHTML={{__html: script}} key="ga-activation"></script>;
  return [scriptTag, gaScript];
};

function stubGa() {
  return <script dangerouslySetInnerHTML={{__html: stubGaJs}} key="stub-gajs"></script>;
}
