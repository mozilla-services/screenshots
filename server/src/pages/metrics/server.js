const express = require("express");
const reactrender = require("../../reactrender");
const { storeQueries } = require("./model");

const REFRESH_QUERY_TIME = 1000 * 60 * 60; // 1 hour

let app = exports.app = express();

app.get("/", function (req, res) {
  if (req.originalUrl == "/metrics") {
    // We want a trailing slash
    res.redirect("/metrics/");
    return;
  }
  const page = require("./page").page;
  reactrender.render(req, res, page);
});

function safeStoreQueries() {
  storeQueries().then(() => {
    console.info("Updated metrics");
  }).catch((error) => {
    console.error("Error running metrics queries:", error);
  });
}

setInterval(safeStoreQueries, REFRESH_QUERY_TIME);
// Also run immediately on startup:
setTimeout(safeStoreQueries, 1000);
