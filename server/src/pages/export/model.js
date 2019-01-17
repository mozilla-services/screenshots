exports.createModel = function(req) {
  // We don't localize this title to make the instructions more consistent,
  // since the page title will be part of the saved filename/folder:
  const title = "Export";
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
