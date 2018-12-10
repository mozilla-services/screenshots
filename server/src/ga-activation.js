/* Code to create the Google Analytics code for a Firefox Screenshots page.
   Stubs out ga() if no gaId is configured
   Disables analytics if Do-Not-Track is set
   Hashes page names
   */

const React = require("react"); // eslint-disable-line no-unused-vars

const dntJs = `
// Copied from https://github.com/mozilla/bedrock/blob/22079855caeb660724319f735de51e3a7472a50f/media/js/base/dnt-helper.js
function _dntEnabled(dnt, ua) {

    'use strict';

    // Disable GA.
    return true;
}
`;

const stubGaJs = `
window.ga = function () {
  console.info.apply(console, ["stubbed ga("].concat(Array.from(arguments)).concat([")"]));
};

window.sendEvent = function () {
  console.info.apply(console, ["stubbed sendEvent("].concat(Array.from(arguments)).concat([")"]));
};

window.abTests = __ABTESTS__;
`;

const gaJs = `
(function () {

  ${dntJs}

  if (_dntEnabled()) {
    ${stubGaJs}
    return;
  }

  var gaScript = document.createElement('script');
  gaScript.src = "//www.google-analytics.com/analytics.js";
  document.head.appendChild(gaScript);

  window.abTests = __ABTESTS__;
  window.GoogleAnalyticsObject = "ga";
  window.ga = window.ga || function () {
    (window.ga.q = window.ga.q || []).push(arguments);
  };
  window.ga.l = 1 * new Date();
  var clientId = "__USER_ID__";
  var gaOptions = "auto";
  var gaLocation;
  if (clientId) {
    gaOptions = {clientId: clientId};
  }
  if (location.hostname === "localhost") {
    if (typeof gaOptions === "string") {
      gaOptions = {};
    }
    gaOptions.cookieDomain = "none";
  }
  if (__HASH_LOCATION__) {
    if (window.crypto) {
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
        gaLocation = "/a-shot/" + c.join("");
        finish();
      });
    } else {
      gaLocation = "/a-shot/unknown";
      finish();
    }
  } else {
    gaLocation = null;
    finish();
  }
  function finish() {
    ga("create", "__GA_ID__", gaOptions);
    if (gaLocation) {
      ga("set", "location", gaLocation);
    }
    if (window.URL && document.referrer) {
      ga("set", "referrer", (new URL(document.referrer)).origin);
    } else {
      ga("set", "referrer", "");
    }
    if (__HASH_LOCATION__) {
      ga("set", "title", "");
    }
    ga("send", "pageview", gaLocation || location.pathname);
  }
})();

window.sendEvent = function (action, label, options) {
  var event = "web";
  var loginType = "__LOGIN_TYPE__" || null;
  if (typeof label == "object") {
    if (options) {
      console.error("Error: got label and options");
    }
    options = label;
    label = undefined;
  }
  options = options || {};
  if (window.abTests) {
    for (var testName in window.abTests) {
      options[window.abTests[testName].gaField] = window.abTests[testName].value;
    }
  }
  options.cd9 = loginType;
  console.debug("sendEvent", event + "/" + action + (label ? "/" + label : "") || "none", options || "no-options");
  ga("send", "event", event, action, label, options);
};
`;

const idRegex = /^[a-zA-Z0-9_.,-]{1,1000}$/;

exports.makeGaActivationString = function({gaId, userId, abTests, hashLocation, loginType}) {
  if (gaId === "") {
    // Don't enable ga if no id was provided
    return stubGaJs.replace(/__ABTESTS__/g, JSON.stringify(abTests));
  }
  userId = userId || "";
  if (typeof userId !== "string") {
    throw new Error("Invalid user ID type: " + typeof userId);
  }
  if (gaId.search(idRegex) === -1) {
    throw new Error("Invalid gaId: " + JSON.stringify(gaId));
  }
  if (userId && userId.search(idRegex) === -1) {
    throw new Error("Invalid userId: " + JSON.stringify(userId));
  }
  let script = gaJs.replace(/__GA_ID__/g, gaId).replace(/__USER_ID__/g, userId);
  script = script.replace(/__HASH_LOCATION__/g, hashLocation ? "true" : "false");
  script = script.replace(/__ABTESTS__/g, JSON.stringify(abTests));
  script = script.replace(/__LOGIN_TYPE__/g, loginType || "");
  return script;
};
