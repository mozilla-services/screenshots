/* globals chrome, catcher */

window.deviceInfo = (function () {
  let manifest = chrome.runtime.getManifest();

  let platformInfo = {};
  chrome.runtime.getPlatformInfo(function(info) {
    if (chrome.runtime.lastError) {
      catcher.unhandled(new Error(chrome.runtime.lastError.message), {context: "getPlatformInfo"});
    }
    platformInfo = info;
  });

  return function deviceInfo() {
    let match = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9\.]+)/);
    let chromeVersion = match ? match[1] : null;
    match = navigator.userAgent.match(/Firefox\/([0-9\.]+)/);
    let firefoxVersion = match ? match[1] : null;
    let appName = chromeVersion ? "chrome" : "firefox";

    return {
      addonVersion: manifest.version,
      platform: platformInfo.os,
      architecture: platformInfo.arch,
      version: firefoxVersion || chromeVersion,
      // These don't seem to apply to Chrome:
      //build: system.build,
      //platformVersion: system.platformVersion,
      userAgent: navigator.userAgent,
      appVendor: appName,
      appName
    };
  };

})();
