exports.createModel = function(req) {
  let finishedUrl = `/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}`;
  let title = req.query.title ? req.getText("creatingPageTitle", {title: req.query.title}) : req.getText("creatingPageTitleDefault");
  let model = {
    noAnalytics: true,
    title,
    docTitle: title,
    docUrl: req.query.url,
    getText: req.getText,
    finishedUrl
  };
  return model;
};
