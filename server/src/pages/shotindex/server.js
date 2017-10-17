const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const mozlog = require("../../logging").mozlog("shotindex");

let app = express();

exports.app = app;

app.get("/", function(req, res) {
  if (!req.deviceId) {
    _render();
    return;
  }
  let pageNumber = req.query.p || 1;
  let query = req.query.q || null;
  let getShotsPage = Promise.resolve(Shot.emptyShotsPage);
  if (req.deviceId && req.query.withdata) {
    getShotsPage = Shot.getShotsForDevice(req.backend, req.deviceId, req.accountId, query, pageNumber);
  }
  getShotsPage.then(_render)
    .catch((err) => {
      res.type("txt").status(500).send(req.getText("shotIndexPageErrorRendering", {error: err}));
      mozlog.error("error-rendering", {msg: "Error rendering page", error: err, stack: err.stack});
    });

  function _render(shotsPage) {
    Object.assign(req, shotsPage);
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }
});
