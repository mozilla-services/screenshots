exports.createModel = function(req) {
  let complete = "complete" in req.query;
  return {
    title: req.getText("leavePageRemoveAllData"),
    complete
  };
};
