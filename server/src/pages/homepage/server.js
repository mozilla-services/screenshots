const express = require("express");
const reactrender = require("../../reactrender");

const app = express();

exports.app = app;

app.get("/robots.txt", function(req, res) {
  res.send('');
});

app.get("/", function(req, res) {
  const page = require("./page").page;
  reactrender.render(req, res, page);
});
