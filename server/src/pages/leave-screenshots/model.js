exports.createModel = function(req) {
  const complete = "complete" in req.query;
  return {
    title: req.getText("leavePageRemoveAllData"),
    complete,
  };
};
