exports.createModel = function(req) {
  let model = {
    title: "Firefox Screenshots",
    showMyShots: !!req.deviceId
  };
  return model;
};
