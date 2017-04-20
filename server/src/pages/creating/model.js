exports.createModel = function(req) {
  let finishedUrl = `/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}`;
  let title = req.query.title || "page"; // todo l10n: creatingPageTitleDefault
  let model = {
    noAnalytics: true,
    title: `Creating ${title}`, // todo l10n: creatingPageTitle
    docTitle: title,
    docUrl: req.query.url,
    finishedUrl
  };
  return model;
};
