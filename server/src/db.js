let user = process.env.DB_USER || process.env.USER;
let pass = process.env.DB_PASS;
let host = process.env.DB_HOST || "localhost:5432";

pass = pass ? ":" + pass : "";

let pg = require("pg");
let constr = `postgres://${user}${pass}@${host}/${user}`;

function getConnection() {
  return new Promise(function (resolve, reject) {
    pg.connect(constr, function (err, client, done) {
      if (err) {
        reject(err);
      } else {
        resolve([client, done]);
      }
    });
  });
}

// FIXME: make these so they don't need to be exported
exports.getConnection = getConnection;
exports.constr = constr;

exports.select = function (sql, args) {
  return getConnection().then(function ([client, done]) {
    return new Promise((resolve, reject) => {
      client.query(sql, args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
        done();
      });
    });
  });
};

exports.insert = function (sql, args) {
  return getConnection().then(function ([client, done]) {
    return new Promise((resolve, reject) => {
      client.query(sql, args, function (err, result) {
        if (err && err.code == '23505') {
          // constraint error, duplicate key
          resolve(false);
        } else if (err) {
          reject(err);
        } else {
          resolve(true);
        }
        done();
      });
    });
  });
};

exports.update = function (sql, args) {
  return getConnection().then(function ([client, done]) {
    return new Promise((resolve, reject) => {
      client.query(sql, args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.rowCount);
        }
        done();
      });
    });
  });
};
