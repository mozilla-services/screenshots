const config = require("./config").getProperties();

const pg = require("pg");
const mozlog = require("./logging").mozlog("db");

let user = encodeURIComponent(config.db.user);
let dbname = encodeURIComponent(config.db.dbname || config.db.user);
let credentials = config.db.password ? `${user}:${encodeURIComponent(config.db.password)}` : user;
let constr = `postgres://${credentials}@${config.db.host}/${dbname}`;

pg.on("error", function(error) {
  mozlog.error("db-error", {
    msg: "Error in database:",
    err: error
  });
});

function getConnection() {
  return new Promise(function(resolve, reject) {
    pg.connect(constr, function(err, client, done) {
      if (err) {
        reject(err);
      } else {
        resolve([client, done]);
      }
    });
  });
}

exports.queryWithClient = function(client, ...params) {
  return new Promise((resolve, reject) => {
    // Babel only supports spreads as the final element of a list; i.e.,
    // `[...params, value]` is invalid.
    params.push(function afterQuery(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
    client.query(...params);
  });
};

// FIXME: make these so they don't need to be exported
exports.getConnection = getConnection;
exports.constr = constr;

exports.select = function(sql, args) {
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(({rows}) => {
      done();
      return rows;
    }, (error) => {
      done();
      throw error;
    });
  });
};

exports.insert = function(sql, args) {
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(() => {
      done();
      return true;
    }).catch(err => {
      done();
      if (err.code == '23505') {
        // constraint error, duplicate key
        return false;
      }
      throw err;
    });
  });
};

exports.update = function(sql, args) {
  return exports.exec(sql, args).then((result) => {
    return result.rowCount;
  });
};

exports.upsertWithClient = function(client, insertSql, updateSql, params) {
  return exports.queryWithClient(
    client,
    `WITH upsert AS (${updateSql} RETURNING *)
      ${insertSql}
    WHERE NOT EXISTS (SELECT * FROM upsert)`,
    params
  );
};

exports.transaction = function(func) {
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, `BEGIN`).then(() => func(client)).then(result => {
      // Commit and return the original transaction result.
      return exports.queryWithClient(client, `COMMIT`).then(() => {
        done();
        return result;
      });
    }).catch(txnErr => {
      // Roll back the transaction and re-throw the original error.
      return exports.queryWithClient(client, `ROLLBACK`).then(() => {
        done();
        throw txnErr;
      }, err => {
        done(err);
        throw err;
      });
    });
  });
};

// These happen to have the same logic:
exports.del = exports.update;

exports.exec = function(sql, args) {
  return getConnection().then(function([client, done]) {
    return exports.queryWithClient(client, sql, args).then(result => {
      done();
      return result;
    }, err => {
      done();
      throw err;
    });
  });
};

exports.markersForArgs = function(starting, numberOfArgs) {
  let result = [];
  for (var i = starting; i < starting + numberOfArgs; i++) {
    result.push("$" + i);
  }
  return result.join(", ");
};
