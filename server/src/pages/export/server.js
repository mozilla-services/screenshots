const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const mozlog = require("../../logging").mozlog("shotindex");

const SHOTS_PER_PAGE = 100;

const app = express();

exports.app = app;

app.get("/", function(req, res) {
  if (!(req.deviceId || req.accountId)) {
    res.redirect("/");
    return;
  }
  const pageNumber = req.query.p || 1;
  const getShotsPage = Shot.getShotsForDevice(req.backend, req.deviceId, req.accountId, null, pageNumber, SHOTS_PER_PAGE);
  getShotsPage.then(_render)
    .catch((err) => {
      res.type("txt").status(500).send(req.getText("shotIndexPageErrorRendering", {error: err}));
      mozlog.error("error-rendering", {msg: "Error rendering page", error: err, stack: err.stack});
    });

  function _render(shotsPage) {
    if (shotsPage) {
      ["shots", "totalShots", "pageNumber", "shotsPerPage"].forEach(x => {
        if (shotsPage[x] !== undefined) {
          req[x] = shotsPage[x];
        }
      });
    }
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }
});
