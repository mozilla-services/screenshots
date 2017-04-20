const { createProxyUrl } = require("../../proxy-url");

exports.createModel = function(req) {
  let query = req.query.q;
  let title = "My Shots"; // todo l10n: gMyShots
  if (query) {
    title = `My Shots: search for ${query}`; // todo l10n: shotIndexPageSearchResultsTitle
  }
  let serverModel = {
    title,
    hasDeviceId: req.deviceId || null,
    defaultSearch: query || null
  };
  serverModel.shots = req.shots;
  for (let shot of req.shots) {
    if (shot.favicon) {
      shot.favicon = createProxyUrl(req, shot.favicon);
    }
    for (let image of (shot.images || [])) {
      image.url = createProxyUrl(req, image.url);
    }
  }
  let jsonModel = Object.assign(
    {},
    serverModel,
    {shots: req.shots.map((shot) => ({id: shot.id, json: shot.asRecallJson()}))}
  );
  return Promise.resolve({serverModel, jsonModel});
};
