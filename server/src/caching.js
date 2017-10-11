const config = require("./config").getProperties();

const aDayInSeconds = 24 * 60 * 60;
exports.cacheTime = 60 * 60 * 24 * 30; // 30 days

if (!config.setCache) {
  exports.cacheTime = 0;
}

function createCacheSetter(cacheLength) {
  return function(res, options) {
    if (config.setCache && cacheLength) {
      options = options || {};
      let pub = options.private ? "private" : "public";
      res.set("Cache-Control", `${pub}, max-age=${cacheLength}`);
    } else {
      res.set("Cache-Control", "no-cache");
    }
  }
}

exports.setMonthlyCache = createCacheSetter(exports.cacheTime);
exports.setDailyCache = createCacheSetter(aDayInSeconds);
