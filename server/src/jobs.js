/** Any reoccuring jobs we have to do */

const config = require("./config").root();
// Convert to milliseconds:
let keepTime = config.exportKeepTime * 60 * 1000;

exports.start = function () {

  setInterval(require("./exporter").cleanExports, keepTime / 10);

};
