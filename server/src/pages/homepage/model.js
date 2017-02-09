exports.createModel = function(req) {
  let model = {
    title: "Page Shot, a screenshot tool for Firefox",
    showMyShots: !!req.deviceId
  };
  return model;
};
