exports.createModel = function (req) {
  let finishedUrl = `/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}`;
  let title = req.query.title || "page";
  let model = {
    noAnalytics: true,
    title: `Creating ${title}`,
    docTitle: title,
    docUrl: req.query.url,
    finishedUrl
  };
  return model;
};
