const config = require("./config").getProperties();

const tenMinutesInSeconds = 10 * 60;
const aDayInSeconds = 24 * 60 * 60;
exports.cacheTime = 60 * 60 * 24 * 30; // 30 days

if (!config.setCache) {
  exports.cacheTime = 0;
}

function createCacheSetter(maxAge, flags) {
  return function(res, options) {
    if (config.setCache && maxAge) {
      let vals = [];
      options = options || {};

      let pub = options.private ? "private" : "public";
      vals.push(pub);
      vals.push(`max-age=${maxAge}`)

      if (flags) {
        vals = vals.concat(flags);
      }

      res.set("Cache-Control", vals.join(', '));
    } else {
      res.set("Cache-Control", "no-cache");
    }
  }
}

exports.setMonthlyCache = createCacheSetter(exports.cacheTime);
exports.setDailyCache = createCacheSetter(aDayInSeconds, `s-maxage=${tenMinutesInSeconds}`);
