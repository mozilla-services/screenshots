exports.createModel = function (req) {
  let model = {
    title: "Welcome to Page Shot",
    showMyShots: !!req.deviceId
  };
  return model;
};
