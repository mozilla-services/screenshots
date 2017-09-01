const express = require("express");
const { csrfProtection } = require("../../middleware/csrf");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const mozlog = require("../../logging").mozlog("shotindex");

let app = express();

exports.app = app;

app.get("/", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    _render();
    return;
  }
  let query = req.query.q || null;
  let getShots = Promise.resolve(null);
  if (req.deviceId && req.query.withdata) {
    getShots = Shot.getShotsForDevice(req.backend, req.deviceId, req.accountId, query);
  }
  getShots.then(_render)
    .catch((err) => {
      res.type("txt").status(500).send(req.getText("shotIndexPageErrorRendering", {error: err}));
      mozlog.error("error-rendering", {msg: "Error rendering page", error: err, stack: err.stack});
    });

  function _render(shots) {
    req.shots = shots;
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }
});
