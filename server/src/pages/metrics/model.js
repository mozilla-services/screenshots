const db = require("../../db");

const queries = {
  shotsCreatedByDay: {
    title: "Shots By Day",
    description: "Number of shots created each day (for the last 30 days)",
    sql: `
    SELECT COUNT(data.id)::INTEGER AS number_of_shots, day
    FROM data,
        date_trunc('day', data.created) AS day
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
        AND NOT data.deleted
        AND data.expire_time < CURRENT_TIMESTAMP
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
    SELECT COUNT(DISTINCT data.deviceid)::INTEGER AS number_of_users, day
    FROM data,
        date_trunc('day', data.created) AS day
    WHERE data.created + INTERVAL '30 days' >= CURRENT_TIMESTAMP
        AND NOT data.deleted
        AND data.expire_time < CURRENT_TIMESTAMP
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

  retention: {
    title: "Retention",
    description: "Length of time users have been creating shots, grouped by week",
    sql: `
    SELECT COUNT(age.days)::INTEGER AS user_count, age.days, age.first_created_week
    FROM
        (SELECT
          EXTRACT(EPOCH FROM AGE(span.last_created, span.first_created)) / 3600 AS days,
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
      {title: "Number of users", name: "user_count"},
      {title: "Days the user has been creating shots", name: "days"},
      {title: "Week the user started using Page Shot", type: "date", name: "first_created_week"}
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

exports.storeQueries = function () {
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

function getQueries() {
  return db.select(`
    SELECT data FROM metrics_cache ORDER BY created DESC LIMIT 1
  `).then((rows) => {
    return rows[0].data;
  });
}

exports.createModel = function (req) {
  return getQueries().then((data) => {
    data = JSON.parse(data);
    let model = {
      title: "Page Shot Metrics",
      data: data
    };
    return {serverModel: model, jsonModel: model};
  });
};
