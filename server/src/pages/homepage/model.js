exports.createModel = function(req) {
  let model = {
    title: "Firefox Screenshots", // Note: we do not localize the product name
    showMyShots: !!req.deviceId
  };
  return model;
};
