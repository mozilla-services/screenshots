exports.createModel = function (req) {
  let complete = "complete" in req.query;
  return {
    title: "Confirm account deletion",
    complete
  };
};
