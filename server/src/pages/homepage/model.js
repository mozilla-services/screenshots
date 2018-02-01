exports.createModel = function(req) {
  const isMobile = exports.isMobile(req.headers['user-agent']);
  const firefoxVersion = exports.getFirefoxVersion(req.headers['user-agent']);
  const model = {
    title: "Firefox Screenshots",
    showMyShots: !!req.deviceId,
    isFirefox: !!firefoxVersion && !isMobile,
    firefoxVersion
  };
  return model;
};

// Helper functions exported for unit testing

exports.getFirefoxVersion = (userAgent) => {
  // https://mdn.io/UserAgent/Firefox suggests filtering on "rv:" and "Gecko".
  // Return null or the major part of the Firefox version (for 57+ check, #3444).
  const results = /rv:.*Gecko.*Firefox\/([0-9]+)/.exec(userAgent);
  return results && results[1];
};

exports.isMobile = (userAgent) => {
  // https://mdn.io/UserAgent/Firefox suggests filtering on "Mobi" and "Tablet".
  return /Mobi|Tablet/.test(userAgent);
};
