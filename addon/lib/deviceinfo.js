const self = require("sdk/self");
const system = require("sdk/system");

exports.deviceInfo = function () {
  return {
    addonVersion: self.version,
    platform: system.platform,
    architecture: system.architecture,
    version: system.version,
    build: system.build,
    appName: system.name,
    platformVersion: system.platformVersion,
    appVendor: system.vendor    
  };
};
