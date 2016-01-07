const db = require("../../db");

exports.lastShotCount = function (seconds) {
  return db.select(
    `SELECT COUNT(DISTINCT deviceid) AS shotcount
     FROM data
     WHERE created >= NOW() - ($1 || ' SECONDS')::INTERVAL`,
    [seconds]
  ).then(function (rows) {
    return rows[0].shotcount;
  });
};

exports.secondsInDay = 60*60*24;

exports.createModel = function (req) {
  let model = {
    title: "Admin",
    lastShotTimeDays: 7
  };
  let secs = model.lastShotTimeDays * exports.secondsInDay;
  return exports.lastShotCount(secs).then((lastShotCount) => {
    model.lastShotCount = lastShotCount;
    return model;
  });
};
