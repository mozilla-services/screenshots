const express = require("express");
const reactrender = require("../../reactrender");

let app = express();

exports.app = app;

app.get("/", function (req, res) {
  const page = require("./page").page;
  const base = req.baseUrl;
  // just dump query strings or any other weirdness back to the shots page
  if (base !== "/terms") {
    res.redirect("/shots");
  }
  reactrender.render(req, res, page);
});
