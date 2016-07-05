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

exports.retention = function () {
  return db.select(
    `SELECT
       date_trunc('day', MIN(created)) AS first_created,
       date_trunc('day', MAX(created)) AS last_created
     FROM data
     GROUP BY deviceid`,
    []
  ).then(function (rows) {
    let retentionBuckets = [0, 1, 2, 3, 5, 7, 14, 21, 30, 45, 60, 90, 120, 365, 3650];
    let retentionByWeek = {};
    let retentionByMonth = {};
    let totalRetention = {};
    function addToBucket(bucket, days) {
      for (let i=retentionBuckets.length; i>=0; i--) {
        let bucketDays = retentionBuckets[i];
        if (days >= bucketDays) {
          if (! bucket[bucketDays]) {
            bucket[bucketDays] = 1;
          } else {
            bucket[bucketDays]++;
          }
          break;
        }
      }
    }
    for (let row of rows) {
      let first = row.first_created;
      let last = row.last_created;
      let days = Math.floor((last - first) / (exports.secondsInDay * 1000));
      let week = formatDate(truncateDateToWeek(first));
      let weekBucket = retentionByWeek[week];
      if (! weekBucket) {
        weekBucket = retentionByWeek[week] = {};
      }
      let month = formatDate(truncateDateToMonth(first));
      let monthBucket = retentionByMonth[month];
      if (! monthBucket) {
        monthBucket = retentionByMonth[month] = {};
      }
      addToBucket(monthBucket, days);
      addToBucket(weekBucket, days);
      addToBucket(totalRetention, days);
    }
    return {
      byWeek: retentionByWeek,
      byMonth: retentionByMonth,
      total: totalRetention
    };
  });
};

function truncateDateToWeek(date) {
  let millisecondsInDay = exports.secondsInDay * 1000;
  let days = date.getDay();
  let millisecondValue = date.getTime();
  millisecondValue -= millisecondsInDay * days;
  return new Date(millisecondValue);
}

function truncateDateToMonth(date) {
  let newDate = new Date(date);
  newDate.setDate(1);
  return newDate;
}

function formatDate(date) {
  return date.toISOString().substr(0, 10);
}

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
    return exports.retention();
  }).then((retention) => {
    model.retention = retention;
    return model;
  });
};
