const express = require("express");
const reactrender = require("../../reactrender");

const app = express();

exports.app = app;

app.get("/", function(req, res) {
  if (!req.accountId) {
    res.redirect("/");
    return;
  }
  if (req.originalUrl === "/settings/") {
    // We don't want a trailing /
    res.redirect("/settings");
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});
