const express = require("express");
const csrf = require('csurf');
const reactrender = require("../../reactrender");
const { Shot } = require("../../servershot");
const mozlog = require("../../logging").mozlog("leave-screenshots");

const csrfProtection = csrf({cookie: {httpOnly: true, secure: true, sameSite: 'lax', key: '__Host-csrf'}});
let app = express();

exports.app = app;

app.get("/", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    res.status(403).send(req.getText("leavePageErrorAddonRequired"));
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});

app.post("/leave", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    res.status(403).send(req.getText("leavePageErrorAddonRequired"));
  }
  Shot.deleteEverythingForDevice(req.backend, req.deviceId).then(() => {
    res.redirect("/leave-screenshots/?complete");
  }).catch((e) => {
    mozlog.error("delete-account-error", {msg: "An error occurred trying to delete account", error: e});
    res.status(500).send(req.getText("leavePageErrorGeneric"));
  });
});
