/** Any reoccuring jobs we have to do */

const config = require("./config").root();
const mozlog = require("mozlog")("jobs");

// Convert to milliseconds:
let keepTime = config.exportKeepTime * 60 * 1000;
let checkDeletedInterval = config.checkDeletedInterval * 1000;

exports.start = function () {

  setInterval(require("./exporter").cleanExports, keepTime / 10);

  setInterval(function () {
    require("./servershot").Shot.cleanDeletedShots()
      .then((rowCount) => {
        if (rowCount) {
          mozlog.info("cleaning-expired-shots", {rowCount});
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
