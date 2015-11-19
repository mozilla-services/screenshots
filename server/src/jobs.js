/** Any reoccuring jobs we have to do */

const config = require("./config").root();
// Convert to milliseconds:
let keepTime = config.exportKeepTime * 60 * 1000;
let checkDeletedInterval = config.checkDeletedInterval * 1000;

exports.start = function () {

  setInterval(require("./exporter").cleanExports, keepTime / 10);

  setInterval(function () {
    require("./servershot").Shot.cleanDeletedShots()
      .then((rowCount) => {
        if (rowCount) {
          console.info("Cleaning expired shots:", rowCount, "shots purged");
        }
      })
      .catch((e) => {
        console.error("Error cleaning shots: " + e, "(", e, ")");
      });
  }, checkDeletedInterval);

};
