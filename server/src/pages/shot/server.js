const express = require("express");
const { Shot } = require("../../servershot");
const { notFound } = require("../../pages/not-found/server");
const reactrender = require("../../reactrender");

let app = express();

exports.app = app;

app.get("/:id/:domain", function (req, res) {
  let shotId = `${req.params.id}/${req.params.domain}`;
  Shot.get(req.backend, shotId).then((shot) => {
    let noSuchShot = false;
    if (! shot) {
      noSuchShot = true;
    } else if (shot.clipNames().length === 0 && ! shot.deleted) {
      // Deleted shots always appear to have no clips
    }
    if (noSuchShot) {
      notFound(req, res);
      return;
    }
    req.shot = shot;
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }).catch(function (err) {
    require("../../server").errorResponse(res, "Error rendering page:", err);
  });
});
