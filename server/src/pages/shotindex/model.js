const { createProxyUrl, createDownloadUrl } = require("../../proxy-url");

exports.createModel = function(req) {
  let query = req.query.q;
  let title = req.getText("gMyShots");
  if (query) {
    title = req.getText("shotIndexPageSearchResultsTitle", {searchTerm: query});
  }
  let serverModel = {
    title,
    hasDeviceId: req.deviceId || null,
    defaultSearch: query || null
  };
  serverModel.shots = req.shots;
  serverModel.downloadUrls = {};
  serverModel.disableSearch = req.config.disableSearch;
  serverModel.enableUserSettings = req.config.enableUserSettings;
  let shots = req.shots;
  for (let shot of shots || []) {
    if (shot.favicon) {
      shot.favicon = createProxyUrl(req, shot.favicon);
    }
    let clip = shot.getClip(shot.clipNames()[0]);
    if (clip) {
      serverModel.downloadUrls[shot.id] = createDownloadUrl(clip.image.url, shot.filename);
    }
    for (let image of (shot.images || [])) {
      image.url = createProxyUrl(req, image.url);
    }
  }
  if (shots !== null) {
    shots = shots.map((shot) => ({id: shot.id, json: shot.asRecallJson()}));
  }
  let jsonModel = Object.assign(
    {},
    serverModel,
    {
      shots,
      downloadUrls: serverModel.downloadUrls
    }
  );
  return Promise.resolve({serverModel, jsonModel});
};
