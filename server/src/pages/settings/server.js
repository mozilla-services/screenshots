const express = require("express");
const { csrfProtection } = require("../../middleware/csrf");
const reactrender = require("../../reactrender");

let app = express();

exports.app = app;

app.get("/", csrfProtection, function(req, res) {
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
