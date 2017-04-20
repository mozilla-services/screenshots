const db = require("../../db");

const queries = {
  totals: {
    title: "Totals", // todo l10n: metricsPageTotalsQueryTitle
    description: "Various totals from the database", // todo l10n: metricsPageTotalsQueryDescription
    sql: `
    SELECT
        (SELECT COUNT(devices.id) FROM devices) AS total_devices,
        (SELECT COUNT(data.id) FROM data WHERE NOT deleted AND expire_time < CURRENT_TIMESTAMP) AS active_shots,
        (SELECT COUNT(data.id) FROM data WHERE NOT deleted AND expire_time >= CURRENT_TIMESTAMP) AS expired_recoverable_shots,
        (SELECT COUNT(data.id) FROM data WHERE deleted) AS expired_deleted_shots;
    `,
    columns: [
      {title: "Total devices registered", name: "total_devices"}, // todo l10n: metricsPageTotalsQueryDevices
      {title: "Active shots", name: "active_shots"}, // todo l10n: metricsPageTotalsQueryActiveShots
      {title: "Expired (recoverable)", name: "expired_recoverable_shots"}, // todo l10n: metricsPageTotalsQueryExpiredShots
      {title: "... (deleted)", name: "expired_deleted_shots"} // todo l10n: metricsPageTotalsQueryExpiredDeletedShots
    ]
  },

  shotsCreatedByDay: {
    title: "Shots By Day", // todo l10n: metricsPageShotsQueryTitle
    description: "Number of shots created each day (for the last 30 days)", // todo l10n: metricsPageShotsQueryDescription
    sql: `
    SELECT COUNT(data.id)::INTEGER AS number_of_shots, date_trunc('day', data.created) AS day
    FROM data
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
    GROUP BY day
    ORDER BY day DESC;
    `,
    columns: [
      {title: "Number of shots", name: "number_of_shots"}, // todo l10n: metricsPageShotsQueryCount
      {title: "Day", type: "date", name: "day"} // todo l10n: metricsPageShotsQueryDay
    ]
  },

  usersByDay: {
    title: "Users By Day", // todo l10n: metricsPageUsersQueryTitle
    description: "Number of users who created at least one shot, by day (last 30 days)", // todo l10n: metricsPageUsersQueryDescription
    sql: `
    SELECT COUNT(DISTINCT data.deviceid)::INTEGER AS number_of_users, date_trunc('day', data.created) AS day
    FROM data
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
    GROUP BY day
    ORDER BY day DESC;
    `,
    columns: [
      {title: "Number of users", name: "number_of_users"}, // todo l10n: metricsPageUsersQueryCount
      {title: "Day", type: "date", name: "day"} // todo l10n: metricsPageUsersQueryDay
    ]
  },

  shotsByUserHistogram: {
    title: "Number of Shots per User", // todo l10n: metricsPageUserShotsQueryTitle
    description: "The number of users who have about N total shots", // todo l10n: metricsPageUserShotsQueryDescription
    sql: `
    SELECT COUNT(counters.number_of_shots) AS count, counters.number_of_shots AS number_of_shots
    FROM
        (SELECT FLOOR(POWER(2, FLOOR(LOG(2, COUNT(data.id))))) AS number_of_shots
         FROM data
         WHERE NOT data.deleted AND data.expire_time < CURRENT_TIMESTAMP
         GROUP BY data.deviceid) AS counters
    GROUP BY counters.number_of_shots
    ORDER BY counters.number_of_shots;
    `,
    columns: [
      {title: "Number of users", name: "count"}, // todo l10n: metricsPageUserShotsQueryCount
      {title: "~Number of shots", name: "number_of_shots"} // todo l10n: metricsPageUserShotsQueryShots
    ]
  },

  retention: {
    title: "Retention By Week", // todo l10n: metricsPageRetentionQueryTitle
    description: "Length of time users have been creating shots, grouped by week", // todo l10n: metricsPageRetentionQueryDescription
    sql: `
    SELECT COUNT(age.days)::INTEGER AS user_count, (age.days + 1) AS days_plus_1, age.first_created_week
    FROM
        (SELECT
          EXTRACT(EPOCH FROM AGE(span.last_created, span.first_created)) / 86400 AS days,
          span.first_created_week
         FROM
             (SELECT
                  date_trunc('week', MIN(created)) AS first_created_week,
                  date_trunc('day', MIN(created)) AS first_created,
                  date_trunc('day', MAX(created)) AS last_created
              FROM data
              GROUP BY deviceid) AS span) AS age
    GROUP BY age.days, age.first_created_week
    ORDER BY age.first_created_week DESC, age.days;
    `,
    columns: [
      {title: "Number of users", name: "user_count"}, // todo l10n: metricsPageRetentionQueryUsers
      {title: "Days the user has been creating shots", name: "days_plus_1"}, // todo l10n: metricsPageRetentionQueryDays
      {title: "Week the user started using Screenshots", type: "date", name: "first_created_week"} // todo l10n: metricsPageRetentionQueryFirstWeek
    ]
  },

  retentionTotal: {
    title: "Total Retention", // todo l10n: metricsPageTotalRetentionQueryTitle
    description: "Length of time users have been creating shots, grouped by week", // todo l10n: metricsPageTotalRetentionQueryDescription
    sql: `
    SELECT COUNT(age.days)::INTEGER AS user_count, (age.days + 1) AS days_plus_1
    FROM
        (SELECT
          EXTRACT(EPOCH FROM AGE(span.last_created, span.first_created)) / 86400 AS days
         FROM
             (SELECT
                  date_trunc('day', MIN(created)) AS first_created,
                  date_trunc('day', MAX(created)) AS last_created
              FROM data
              GROUP BY deviceid) AS span) AS age
    GROUP BY age.days
    ORDER BY age.days;
    `,
    columns: [
      {title: "Number of users", name: "user_count"}, // todo l10n: metricsPageTotalRetentionQueryUsers 
      {title: "Days the user has been creating shots", name: "days_plus_1"} // todo l10n: metricsPageTotalRetentionQueryDays
    ]
  },

  addonVersion: {
    title: "Add-on Version", // todo l10n: metricsPageVersionQueryTitle
    description: "The version of the add-on used during login, in the last 14 days", // todo l10n: metricsPageVersionQueryDescription
    sql: `
    SELECT COUNT(DISTINCT devices.id) AS count, devices.last_addon_version, last_login_day
    FROM devices, date_trunc('day', last_login) AS last_login_day
    WHERE CURRENT_TIMESTAMP - devices.last_login < INTERVAL '14 days'
    GROUP BY devices.last_addon_version, last_login_day
    ORDER BY devices.last_addon_version DESC, last_login_day DESC;
    `,
    columns: [
      {title: "Number of users logging in", name: "count"}, // todo l10n: metricsPageVersionQueryUsers
      {title: "Add-on version", name: "last_addon_version"}, // todo l10n: metricsPageVersionQueryVersion
      {title: "Day", type: "date", name: "last_login_day"} // todo l10n: metricsPageVersionQueryLastSeen 
    ]
  }

};

function executeQuery(query) {
  let start = Date.now();
  return db.select(query.sql).then((rows) => {
    let result = Object.assign({rows: [], created: Date.now()}, query);
    for (let row of rows) {
      let l = [];
      for (let meta of query.columns) {
        let value = row[meta.name];
        if (value instanceof Date) {
          value = value.getTime();
        }
        l.push(value);
      }
      result.rows.push(l);
    }
    result.timeToExecute = Date.now() - start;
    return result;
  });
}

exports.storeQueries = function() {
  let allQueries = {};
  let promises = [];
  for (let name in queries) {
    promises.push(executeQuery(queries[name]).then((result) => {
      allQueries[name] = result;
    }));
  }
  return Promise.all(promises).then(() => {
    let body = JSON.stringify(allQueries);
    return db.transaction((client) => {
      return db.queryWithClient(client, `
        DELETE FROM metrics_cache
      `).then(() => {
        return db.queryWithClient(client, `
          INSERT INTO metrics_cache (data) VALUES ($1)
        `, [body]);
      });
    });
  });
};

exports.checkLastStoreQueriesTime = function() {
  return db.select(
    `SELECT created FROM metrics_cache`
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    return rows[0].created;
  });
};

function getQueries() {
  return db.select(`
    SELECT data FROM metrics_cache ORDER BY created DESC LIMIT 1
  `).then((rows) => {
    return rows[0].data;
  });
}

exports.createModel = function(req) {
  return getQueries().then((data) => {
    data = JSON.parse(data);
    let model = {
      title: "Firefox Screenshots Metrics", // todo l10n: metricsPageTitle
      data
    };
    return {serverModel: model, jsonModel: model};
  });
};
