/** Any reoccuring jobs we have to do */

const config = require("./config").getProperties();
const mozlog = require("./logging").mozlog("jobs");
const ua = require("universal-analytics");

// Convert to milliseconds:
let checkDeletedInterval = config.checkDeletedInterval * 1000;

exports.start = function() {
  if (config.disableControllerTasks) {
    mozlog.info("no-periodic-tasks", {msg: "Note: not performing periodic tasks in this server"});
    return;
  }

  setInterval(function() {
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
