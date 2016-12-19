const express = require("express");
const reactrender = require("../../reactrender");
const { checkLastStoreQueriesTime, storeQueries } = require("./model");
const config = require("../../config").getProperties();
const { captureRavenException } = require("../../ravenclient");

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
  checkLastStoreQueriesTime().then((time) => {
    if ((! time) || Date.now() - time.getTime() > config.refreshMetricsTime*1000) {
      return storeQueries().then(() => {
        console.info("Updated metrics");
      });
    }
  }).catch((error) => {
    console.error("Error running metrics queries:", error);
    captureRavenException(error);
  });
}

if (config.refreshMetricsTime && !config.disableControllerTasks) {
  // Randomize each worker +-30 seconds interval
  let interval = config.refreshMetricsTime * 1000 + Math.floor(Math.random()*60000 - 30000);
  if (interval < 10000) {
    interval = 60000;
  }
  setInterval(safeStoreQueries, interval);
} else {
  console.info("Not running periodic metrics updating");
}

if (!config.disableControllerTasks) {
  // Also run immediately on startup:
  setTimeout(safeStoreQueries, 1000);
}
