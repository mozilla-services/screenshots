const express = require("express");
const reactrender = require("../../reactrender");

const app = express();

exports.app = app;

app.get("/:id/:domain", function(req, res) {
  const page = require("./page").page;
  reactrender.render(req, res, page);
});
