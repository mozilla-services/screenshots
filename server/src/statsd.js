const config = require("./config").getProperties();

let StatsD = null;
let client = null;
let prefix = config.statsdPrefix;

if (prefix) {
  StatsD = require("node-statsd");
  client = new StatsD({prefix});
}

exports.increment = function(name) {
  if (client) {
    client.increment(name);
  }
};
