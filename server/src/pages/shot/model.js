const { getGitRevision } = require("../../linker");

exports.createModel = function (req) {
  let buildTime = require("../../build-time").string;
  let serverPayload = {
    allowExport: req.config.allowExport,
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    isOwner: req.deviceId == req.shot.ownerId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    authenticated: !!req.deviceId,
    buildTime: buildTime,
    simple: false,
    shotDomain: req.url, // FIXME: should be a property of the shot
    expireTime: req.shot.expireTime === null ? null: req.shot.expireTime.getTime(),
    retentionTime: req.config.expiredRetentionTime*1000,
    defaultExpiration: req.config.defaultExpiration*1000,
    sentryPublicDSN: req.config.sentryPublicDSN,
    cspNonce: req.cspNonce,
  };
  let clientPayload = {
    allowExport: req.config.allowExport,
    gitRevision: getGitRevision(),
    backend: req.backend,
    shot: req.shot.asJson(),
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    isOwner: req.deviceId == req.shot.ownerId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    authenticated: !!req.deviceId,
    shotDomain: req.url,
    urlIfDeleted: req.shot.urlIfDeleted,
    expireTime: req.shot.expireTime === null ? null : req.shot.expireTime.getTime(),
    deleted: req.shot.deleted,
    buildTime: buildTime,
    simple: false,
    retentionTime: req.config.expiredRetentionTime*1000,
    defaultExpiration: req.config.defaultExpiration*1000
  };
  if (serverPayload.expireTime !== null && Date.now() > serverPayload.expireTime) {
    serverPayload.shot = clientPayload.shot = {
      url: req.shot.url,
      docTitle: req.shot.title
    };
  }
  return Promise.resolve({serverModel: serverPayload, jsonModel: clientPayload});
};
