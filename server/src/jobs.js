/** Any reoccuring jobs we have to do */

const config = require("./config").getProperties();
const mozlog = require("./logging").mozlog("jobs");
const ua = require("universal-analytics");

// Convert to milliseconds:
const checkDeletedInterval = config.checkDeletedInterval * 1000;

exports.start = function() {
  if (config.disableControllerTasks) {
    mozlog.info("no-periodic-tasks", {msg: "Note: not performing periodic tasks in this server"});
    return;
  }

  setInterval(function() {
    require("./servershot").Shot.cleanDeletedShots()
      .then((status) => {
        if (status.shotsDeleted || status.imagesDeleted || status.imagesFailed) {
          mozlog.info("cleaning-expired-shots", status);
          if (status.shotsDeleted && config.gaId) {
            const analytics = ua(config.gaId);
            analytics.event({
              ec: "server",
              ea: "clean-deleted-shot",
              ev: status.shotsDeleted,
              ni: true
            }).send();
          }
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
