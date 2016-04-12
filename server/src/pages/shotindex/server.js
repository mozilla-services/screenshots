const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");

let app = express();

exports.app = app;

app.get("/", function (req, res) {
  if (! req.deviceId) {
    res.status(403).send(`
      <html>
        <head><title>Forbidden</title></head>
        <body>
          You must have the addon installed to see your shot index
        </body>
      </html>
    `);
    return;
  }
  let query = req.query.q || null;
  Shot.getShotsForDevice(req.backend, req.deviceId, query).then((shots) => {
    req.shots = shots;
    const page = require("./page").page;
    reactrender.render(req, res, page);
  }).catch((err) => {
    res.type("txt").status(500).send("Error rendering page: " + err);
  });
});
