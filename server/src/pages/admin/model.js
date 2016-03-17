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

exports.numberOfShots = function (seconds) {
  return db.select(
    `SELECT COUNT(data.id) AS shotcount
     FROM data
     WHERE created >= NOW() - ($1 || ' SECONDS')::INTERVAL
     GROUP BY deviceid`,
    [seconds]
  ).then(function (rows) {
    let buckets = {
      1: 0,
      2: 0,
      5: 0,
      10: 0,
      20: 0,
      50: 0,
      100: 0,
      300: 0,
      1000: 0
    };
    for (let row of rows) {
      let c = row.shotcount;
      if (c >= 1000) {
        buckets[1000]++;
      } else if (c >= 300) {
        buckets[300]++;
      } else if (c >= 100) {
        buckets[100]++;
      } else if (c >= 50) {
        buckets[50]++;
      } else if (c >= 20) {
        buckets[20]++;
      } else if (c >= 10) {
        buckets[10]++;
      } else if (c >= 5) {
        buckets[5]++;
      } else if (c >= 2) {
        buckets[2]++;
      } else if (c >= 1) {
        buckets[1]++;
      }
    }
    return buckets;
  });
};

exports.secondsInDay = 60*60*24;

exports.createModel = function (req) {
  let model = {
    title: "Admin",
    lastShotTimeDays: 7,
    numberOfShotsTime: 30,
  };
  let secs = model.lastShotTimeDays * exports.secondsInDay;
  return exports.lastShotCount(secs).then((lastShotCount) => {
    model.lastShotCount = lastShotCount;
    return exports.numberOfShots(model.numberOfShotsTime * exports.secondsInDay);
  }).then((buckets) => {
    model.numberOfShotsBuckets = buckets;
    return model;
  });
};
