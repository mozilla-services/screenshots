exports.createModel = function(req) {
  let isFirefox = (/firefox\/\d{1,255}/i).test(req.headers['user-agent']);
  let model = {
    title: "Firefox Screenshots",
    showMyShots: !!req.deviceId,
    isFirefox
  };
  return model;
};
