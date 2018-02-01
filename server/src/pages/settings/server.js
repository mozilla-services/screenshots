const express = require("express");
const reactrender = require("../../reactrender");

const app = express();

exports.app = app;

app.get("/", function(req, res) {
  if (!req.deviceId) {
    res.status(403).send("You must have Screenshots installed");
    return;
  }
  if (req.originalUrl == "/settings/") {
    // We don't want a trailing /
    res.redirect("/settings");
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});
