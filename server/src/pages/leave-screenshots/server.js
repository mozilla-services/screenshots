const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");

let app = express();

exports.app = app;

app.get("/", function (req, res) {
  if (! req.deviceId) {
    res.status(403).send("You must have the addon installed to delete your account");
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});

app.post("/leave", function (req, res) {
  if (! req.deviceId) {
    res.status(403).send("You must have the addon installed to leave");
  }
  Shot.deleteEverythingForDevice(req.backend, req.deviceId).then(() => {
    res.redirect("/leave-screenshots/?complete");
  }).catch((e) => {
    console.error("An error occurred trying to delete:", e);
    res.status(500).send("An error occurred");
  });
});
