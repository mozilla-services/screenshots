const express = require("express");
const csrf = require("csurf");
const csrfProtection = csrf({cookie: {httpOnly: true, secure: true, sameSite: 'lax', key: '__Host-csrf'}});
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
