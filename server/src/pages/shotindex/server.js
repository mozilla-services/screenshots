const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");

let app = express();

exports.app = app;

app.get("/", function(req, res) {
  if (!req.deviceId) {
    _render();
    return;
  }
  let query = req.query.q || null;
  let getShots = Promise.resolve([]);
  if (req.deviceId) {
    getShots = Shot.getShotsForDevice(req.backend, req.deviceId, query);
  }
  getShots.then(_render)
    .catch((err) => {
      res.type("txt").status(500).send("Error rendering page: " + err);
      console.error("Error rendering page:", err);
    });

  function _render(shots) {
    req.shots = shots || [];
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }
});
