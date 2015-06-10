const config = require("./config").root();

let pg = require("pg");
let credentials = config.db.password ? `${config.db.user}:${config.db.password}` : config.db.user;
let constr = `postgres://${credentials}@${config.db.host}/${config.db.user}`;

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
  return exports.exec(sql, args).then((result) => {
    return result.rowCount;
  });
};

// These happen to have the same logic:
exports.del = exports.update;

exports.exec = function (sql, args) {
  return getConnection().then(function ([client, done]) {
    return new Promise((resolve, reject) => {
      client.query(sql, args, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        done();
      });
    });
  });
};
