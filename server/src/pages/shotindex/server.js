const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const mozlog = require("../../logging").mozlog("shotindex");

const app = express();

exports.app = app;

app.get("/", function(req, res) {
  console.log("getting shots for", req.deviceId, req.accountId);
  if (!req.deviceId && !req.accountId) {
    _render();
    return;
  }
  const pageNumber = req.query.p || 1;
  const query = req.query.q || null;
  let getShotsPage = Promise.resolve(Shot.emptyShotsPage);
  if ((req.deviceId || req.accountId) && req.query.withdata) {
    getShotsPage = Shot.getShotsForDevice(req.backend, req.deviceId, req.accountId, query, pageNumber);
  }
  getShotsPage.then(_render)
    .catch((err) => {
      res.type("txt").status(500).send(req.getText("shotIndexPageErrorRendering", {error: err}));
      mozlog.error("error-rendering", {msg: "Error rendering page", error: err, stack: err.stack});
    });

  function _render(shotsPage) {
    console.log("local render stuff", shotsPage);
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
