exports.createModel = function(req) {
  // FIXME: update title for export:
  const title = req.getText("exportTitle");
  const serverModel = {
    title,
  };
  serverModel.shotsPerPage = req.shotsPerPage;
  serverModel.pageNumber = req.pageNumber;
  serverModel.totalShots = req.totalShots;
  serverModel.shots = req.shots;
  serverModel.isRtl = req.isRtl;
  let shots = req.shots;
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
