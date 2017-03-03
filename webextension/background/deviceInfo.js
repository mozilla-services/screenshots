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

    return {
      addonVersion: manifest.version,
      platform: platformInfo.os,
      architecture: platformInfo.arch,
      version: chromeVersion,
      // These don't seem to apply to Chrome:
      //build: system.build,
      //platformVersion: system.platformVersion,
      userAgent: navigator.userAgent,
      appVendor: "chrome",
      appName: "chrome"
    };
  };

})();
