const express = require("express");
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const { addDeviceActivity } = require("../../users");

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

app.post("/delete", function (req, res) {
  if (! req.deviceId) {
    res.status(403).send("You must have the addon installed to delete your account");
  }
  // FIXME: this just gets deleted due to ON DELETE CASCADE
  // Maybe we should keep but anonymize device_activity on account deletion
  addDeviceActivity(req.deviceId, "delete-account");
  Shot.deleteEverythingForDevice(req.backend, req.deviceId).then(() => {
    res.redirect("/delete-account/?complete");
  }).catch((e) => {
    console.error("An error occurred trying to delete:", e);
    res.status(500).text("An error occurred");
  });
});
