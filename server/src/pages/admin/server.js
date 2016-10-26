const express = require("express");
const users = require("../../users");
const reactrender = require("../../reactrender");

let app = express();

exports.app = app;

// FIXME: this should be an FxA id, but due to a bug we're using device IDs
let authorizedAccountIds = [];

app.use(function (req, res, next) {
  if (! req.deviceId) {
    res.status(403).send(`
      <html>
        <head>
          <title>Must login</title>
        </head>
        <body>
          You must be using the add-on
        </body>
      </html>
    `);
    return;
  }
  users.accountIdForDeviceId(req.deviceId).then((accountId) => {
    // FIXME: terrible workaround for fxa account not being stored:
    accountId = req.deviceId;
    if (! accountId) {
      res.status(403).send(`
        <html>
          <head><title>Login already</title></head>
          <body>
            You must login with a Firefox Account.  Try from the <a href="/shots">shots page</a>.
          </body>
        </html>
      `);
      return;
    }
    if (authorizedAccountIds.indexOf(accountId) === -1) {
      res.type("txt").status(403).send(
        `Go away ${req.deviceId}`);
      return;
    }
    next();
  }).catch((err) => {
    req.type("txt").status(500).send(`Error:\n${err}\n${err.stack}`);
  });
});

app.get("/", function (req, res) {
  if (req.originalUrl == "/admin") {
    // We want a trailing slash
    res.redirect("/admin/");
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});

app.get("/api/recent/lastShotCount", function (req, res) {
  let days = parseFloat(req.query.lastShotTimeDays);
  const model = require("./model");
  model.lastShotCount(days * model.secondsInDay).then((count) => {
    res.send({count: count});
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err);
  });
});

app.get("/api/recent/numberOfShots", function (req, res) {
  let days = parseFloat(req.query.lastShotTimeDays);
  if (days <= 0 || isNaN(days)) {
    res.type("txt").status(400).send("Error: bad lastShotTimeDays");
    return;
  }
  const model = require("./model");
  model.numberOfShots(days * model.secondsInDay).then((buckets) => {
    res.send({buckets});
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err);
  });
});
