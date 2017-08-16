const db = require("./db");
const Keygrip = require('keygrip');
const pgpatcher = require("pg-patcher");
const path = require("path");
const mozlog = require("./logging").mozlog("dbschema");

// When updating the database, please also run ./bin/dumpschema --record
// This updates schema.sql with the latest full database schema
const MAX_DB_LEVEL = exports.MAX_DB_LEVEL = 20;

exports.forceDbVersion = function(version) {
  mozlog.info("forcing-db-version", {db: db.constr, version});
  return db.getConnection().then(([conn, done]) => {
    let dirname = path.join(__dirname, "db-patches");
    mozlog.info("loading-patches-from", {dirname});
    return new Promise((resolve, reject) => {
      pgpatcher(conn, version, {dir: dirname}, function(err) {
        if (err) {
          mozlog.error("error-patching", {
            msg: `Error patching database to level ${version}!`,
            err
          });
          done();
          reject(err);
        } else {
          mozlog.info("db-level", {msg: `Database is now at level ${version}`});
          resolve();
        }
      });
    });
  });
};

/** Create all the tables */
exports.createTables = function() {
  mozlog.info("setting-up-tables-on", {db: db.constr});
  return db.getConnection().then(([conn, done]) => {
    let dirname = path.join(__dirname, "db-patches");
    mozlog.info("loading-patches-from", {dirname});
    return new Promise((resolve, reject) => {
      pgpatcher(conn, MAX_DB_LEVEL, {dir: dirname}, function(err) {
        if (err) {
          mozlog.error("error-patching", {
            msg: `Error patching database to level ${MAX_DB_LEVEL}!`,
            err
          });
          done();
          reject(err);
        } else {
          mozlog.info("db-level", {msg: `Database is now at level ${MAX_DB_LEVEL}`});
          resolve();
        }
      });
    });
  }).then(() => {
    let newId = "tmp" + Date.now();
    return db.insert(
      `INSERT INTO data (id, deviceid, value, url)
       VALUES ($1, NULL, $2, $3)`,
      [newId, "test value", ""]
    ).then((inserted) => {
      if (!inserted) {
        throw new Error("Could not insert");
      }
      return db.del(
        `DELETE FROM data
         WHERE id = $1`,
        [newId]
      ).then((count) => {
        if (count != 1) {
          throw new Error("Should have deleted one row");
        }
      });
    });
  }).catch((err) => {
    if (err.code === "ECONNREFUSED") {
      mozlog.warn("connection-refused", {msg: `Could not connect to database on ${db.constr}`});
    }
    mozlog.warn("error-creating-tables", {
      msg: "Got error creating and testing tables:",
      err
    });
  });
};

let keys;
let textKeys;

exports.getKeygrip = function() {
  return keys;
};

exports.getTextKeys = function() {
  return textKeys;
};

/** Loads the random signing key from the database, or generates a new key
    if none are found */
function loadKeys() {
  return db.select(
    `SELECT key FROM signing_keys ORDER BY CREATED`,
    []
  ).then((rows) => {
    if (rows.length) {
      let textKeys = [];
      for (let i = 0; i < rows.length; i++) {
        textKeys.push(rows[i].key);
      }
      return textKeys;
    }
    return makeKey().then((key) => {
      return db.insert(
        `INSERT INTO signing_keys (created, key)
         VALUES (NOW(), $1)`,
        [key]
      ).then((ok) => {
        if (!ok) {
          throw new Error("Could not insert key");
        }
        return [key];
      });
    });
  });
}

exports.createKeygrip = function() {
  return loadKeys().then((fetchedTextKeys) => {
    textKeys = fetchedTextKeys;
    keys = new Keygrip(textKeys);
  }).catch((err) => {
    mozlog.warn("error-creating-signing-keys", {
      msg: "Could not create signing keys:",
      err
    });
    throw err;
  });
};



/** Returns a promise that generates a new largish ASCII random key */
function makeKey() {
  return new Promise(function(resolve, reject) {
    require('crypto').randomBytes(48, function(err, buf) {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf.toString('base64'));
    });
  });
}

exports.connectionOK = function() {
  if (!keys) {
    return Promise.resolve(false);
  }
  return db.select(`SELECT value FROM property WHERE key = 'patch'`).then((rows) => {
    return rows[0].value == MAX_DB_LEVEL;
  });
};
