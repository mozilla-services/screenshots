exports.createModel = function (req) {
  let finishedUrl = `/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}`;
  let model = {
    noAnalytics: true,
    title: `Creating ${req.query.title}`,
    docTitle: req.query.title,
    docUrl: req.query.url,
    finishedUrl
  };
  return model;
};
