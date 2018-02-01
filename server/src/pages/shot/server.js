const express = require("express");
const { Shot } = require("../../servershot");
const { notFound } = require("../../pages/not-found/server");
const reactrender = require("../../reactrender");
const mozlog = require("../../logging").mozlog("shot");

const app = express();

exports.app = app;

app.get("/:id/:domain", function(req, res) {
  const shotId = `${req.params.id}/${req.params.domain}`;
  Shot.get(req.backend, shotId).then((shot) => {
    const noSuchShot = !shot;
    const nonOwnerAndBlocked = shot && shot.blockType !== 'none' && req.deviceId !== shot.ownerId;
    if (noSuchShot || nonOwnerAndBlocked || shot.deleted) {
      mozlog.info("shot-404", {shotId, ip: req.ip});
      notFound(req, res);
      return;
    }
    req.shot = shot;
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }).catch(function(err) {
    require("../../responses").errorResponse(res, req.getText("shotIndexPageErrorRendering", {error: err}), err);
  });
});
