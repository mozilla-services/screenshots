exports.createModel = function(req) {
  const finishedUrl = `/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}`;
  const title = req.query.title ? req.getText("creatingPageTitle", {title: req.query.title}) : req.getText("creatingPageTitleDefault");
  const model = {
    noAnalytics: true,
    title,
    docTitle: title,
    docUrl: req.query.url,
    getText: req.getText,
    finishedUrl
  };
  return model;
};
