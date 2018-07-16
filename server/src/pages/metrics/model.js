const db = require("../../db");

const queries = {
  totals: {
    title: "Totals",
    description: "Various totals from the database",
    sql: `
    SELECT
        (SELECT COUNT(devices.id) FROM devices) AS total_devices,
        (SELECT COUNT(data.id) FROM data WHERE NOT deleted AND expire_time < CURRENT_TIMESTAMP) AS active_shots,
        (SELECT COUNT(data.id) FROM data WHERE NOT deleted AND expire_time >= CURRENT_TIMESTAMP) AS expired_recoverable_shots,
        (SELECT COUNT(data.id) FROM data WHERE deleted) AS expired_deleted_shots;
    `,
    columns: [
      {title: "Total devices registered", name: "total_devices"},
      {title: "Active shots", name: "active_shots"},
      {title: "Expired (recoverable)", name: "expired_recoverable_shots"},
      {title: "... (deleted)", name: "expired_deleted_shots"}
    ]
  },

  shotsCreatedByDay: {
    title: "Shots By Day",
    description: "Number of shots created each day (for the last 30 days)",
    sql: `
    SELECT COUNT(data.id)::INTEGER AS number_of_shots, date_trunc('day', data.created) AS day
    FROM data
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
    GROUP BY day
    ORDER BY day DESC;
    `,
    columns: [
      {title: "Number of shots", name: "number_of_shots"},
      {title: "Day", type: "date", name: "day"}
    ]
  },

  usersByDay: {
    title: "Users By Day",
    description: "Number of users who created at least one shot, by day (last 30 days)",
    sql: `
    SELECT COUNT(DISTINCT data.deviceid)::INTEGER AS number_of_users, date_trunc('day', data.created) AS day
    FROM data
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
    GROUP BY day
    ORDER BY day DESC;
    `,
    columns: [
      {title: "Number of users", name: "number_of_users"},
      {title: "Day", type: "date", name: "day"}
    ]
  },

  shotsByUserHistogram: {
    title: "Number of Shots per User",
    description: "The number of users who have about N total shots",
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
      {title: "Number of users", name: "count"},
      {title: "~Number of shots", name: "number_of_shots"}
    ]
  },

};

function executeQuery(query) {
  const start = Date.now();
  return db.select(query.sql).then((rows) => {
    const result = Object.assign({rows: [], created: Date.now()}, query);
    for (const row of rows) {
      const l = [];
      for (const meta of query.columns) {
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
  const allQueries = {};
  const promises = [];
  for (const name in queries) {
    promises.push(executeQuery(queries[name]).then((result) => {
      allQueries[name] = result;
    }));
  }
  return Promise.all(promises).then(() => {
    const body = JSON.stringify(allQueries);
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
    const model = {
      title: "Firefox Screenshots Metrics",
      data
    };
    return {serverModel: model, jsonModel: model};
  });
};
