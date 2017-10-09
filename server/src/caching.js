const config = require("./config").getProperties();

exports.cacheTime = 60 * 60 * 24 * 30; // 30 days

if (!config.setCache) {
  exports.cacheTime = 0;
}

exports.setCache = function(res, options) {
  if (config.setCache) {
    options = options || {};
    let pub = options.private ? "private" : "public";
    res.set("Cache-Control", `${pub}, max-age=${exports.cacheTime}`);
  } else {
    res.set("Cache-Control", "no-cache");
  }
};
