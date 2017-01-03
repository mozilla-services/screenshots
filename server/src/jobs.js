/** Any reoccuring jobs we have to do */

const config = require("./config").getProperties();
const mozlog = require("mozlog")("jobs");
const ua = require("universal-analytics");

// Convert to milliseconds:
//let keepTime = config.exportKeepTime * 60 * 1000;
let checkDeletedInterval = config.checkDeletedInterval * 1000;

exports.start = function () {
  if (config.disableControllerTasks) {
    console.info("Note: not performing periodic tasks in this server");
    return;
  }

  //setInterval(require("./exporter").cleanExports, keepTime / 10);

  setInterval(function () {
    require("./servershot").Shot.cleanDeletedShots()
      .then((rowCount) => {
        if (rowCount) {
          mozlog.info("cleaning-expired-shots", {rowCount});
        }
        if (config.gaId) {
          let analytics = ua(config.gaId);
          analytics.event({
            ec: "server",
            ea: "clean-deleted-shot",
            ev: rowCount
          }).send();
        }
      })
      .catch((e) => {
        mozlog.error("error-cleaning-shots", {
          msg: "" + e,
          err: e
        });
      });
  }, checkDeletedInterval);

};
