const { createProxyUrl, createDownloadUrl } = require("../../proxy-url");

exports.createModel = function(req) {
  const query = req.query.q;
  let title = req.getText("gMyShots");
  if (query) {
    title = req.getText("shotIndexPageSearchResultsTitle", {searchTerm: query});
  }
  const serverModel = {
    title,
    hasDeviceId: req.deviceId !== undefined,
    defaultSearch: query || null,
  };
  serverModel.shotsPerPage = req.shotsPerPage;
  serverModel.pageNumber = req.pageNumber;
  serverModel.totalShots = req.totalShots;
  serverModel.shots = req.shots;
  serverModel.downloadUrls = {};
  serverModel.disableSearch = req.config.disableSearch;
  serverModel.enableUserSettings = req.config.enableUserSettings;
  let shots = req.shots;
  for (const shot of shots || []) {
    const clip = shot.getClip(shot.clipNames()[0]);
    if (clip) {
      serverModel.downloadUrls[shot.id] = createDownloadUrl(clip.image.url, shot.filename);
    }
    for (const image of (shot.images || [])) {
      image.url = createProxyUrl(req, image.url);
    }
  }
  if (shots && shots.length) {
    shots = shots.map(
      shot => ({
        id: shot.id,
        json: shot.asRecallJson(),
        expireTime: shot.expireTime,
        isSynced: shot.isSynced,
      }));
  }
  const jsonModel = Object.assign(
    {},
    serverModel,
    {
      shots,
      downloadUrls: serverModel.downloadUrls,
    }
  );
  return Promise.resolve({serverModel, jsonModel});
};
