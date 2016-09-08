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
  // FIXME: this just gets deleted due to ON DELETE CASCADE
  // Maybe we should keep but anonymize device_activity on account deletion
  //require("../../users").addDeviceActivity(req.deviceId, "leave-page-shot");
  Shot.deleteEverythingForDevice(req.backend, req.deviceId).then(() => {
    res.redirect("/leave-page-shot/?complete");
  }).catch((e) => {
    console.error("An error occurred trying to delete:", e);
    res.status(500).send("An error occurred");
  });
});
