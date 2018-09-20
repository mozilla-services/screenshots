const config = require("./config").getProperties();
const db = require("./db");
const Keygrip = require("keygrip");
const pgpatcher = require("pg-patcher");
const path = require("path");
const mozlog = require("./logging").mozlog("dbschema");

// When updating the database, please also run ./bin/dumpschema --record
// This updates schema.sql with the latest full database schema
const MAX_DB_LEVEL = exports.MAX_DB_LEVEL = 27;
// This is a list of all the Keygrip scopes we allow (and we make sure these exist):
const KEYGRIP_SCOPES = ["auth", "proxy-url", "download-url", "ga-user-nonce"];

exports.forceDbVersion = function(version) {
  mozlog.info("forcing-db-version", {db: db.constr, version});
  return db.getConnection().then(([conn, done]) => {
    const dirname = path.join(__dirname, "db-patches");
    mozlog.info("loading-patches-from", {dirname});
    return new Promise((resolve, reject) => {
      pgpatcher(conn, version, {dir: dirname}, function(err) {
        if (err) {
          mozlog.error("error-patching", {
            msg: `Error patching database to level ${version}!`,
            err,
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
    return getCurrentDbPatchLevel().then(currentDbPatchLevel => {
      if (currentDbPatchLevel >= MAX_DB_LEVEL
          && (process.env.NODE_ENV === "production" || config.db.disableDownPatches)) {
        mozlog.info("skip-db-down-patches",
          { msg: `Database patch level of ${currentDbPatchLevel} is greater than or equal to the hard coded level of ${MAX_DB_LEVEL}.` });
        return Promise.resolve();
      }

      const dirname = path.join(__dirname, "db-patches");
      mozlog.info("loading-patches-from", {dirname});
      return new Promise((resolve, reject) => {
        pgpatcher(conn, MAX_DB_LEVEL, {dir: dirname}, function(err) {
          if (err) {
            mozlog.error("error-patching", {
              msg: `Error patching database to level ${MAX_DB_LEVEL}!`,
              err,
            });
            done();
            reject(err);
          } else {
            mozlog.info("db-level", {msg: `Database is now at level ${MAX_DB_LEVEL}`});
            resolve();
          }
        });
      });
    });
  }).then(() => {
    const newId = "tmp" + Date.now();
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
        if (count !== 1) {
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
      err,
    });
  });
};

let keysByScope;
let textKeysByScope;

exports.getKeygrip = function(scope) {
  if (!scope || !KEYGRIP_SCOPES.includes(scope)) {
    throw new Error("You must give a valid scope");
  }
  return keysByScope[scope];
};

exports.getTextKeys = function(scope) {
  if (!scope || !KEYGRIP_SCOPES.includes(scope)) {
    throw new Error("You must give a valid scope");
  }
  return textKeysByScope[scope];
};

/** Loads the random signing key from the database, or generates a new key
    if none are found */
async function loadKeys() {
  const rows = await db.select(
    `SELECT key, scope FROM signing_keys ORDER BY CREATED`,
    []
  );
  const textKeysByScope = {};
  for (let i = 0; i < rows.length; i++) {
    const scope = rows[i].scope;
    if (scope === "legacy") {
      continue;
    }
    let textKeys = textKeysByScope[scope];
    if (!textKeys) {
      textKeys = textKeysByScope[scope] = [];
    }
    textKeys.push(rows[i].key);
  }
  for (const scope of KEYGRIP_SCOPES) {
    if (!textKeysByScope[scope]) {
      const key = await makeKey();
      const ok = await db.insert(
        `INSERT INTO signing_keys (created, key, scope)
         VALUES (NOW(), $1, $2)`,
        [key, scope]
      );
      if (!ok) {
        throw new Error("Could not insert key");
      }
      textKeysByScope[scope] = [key];
    }
  }
  for (let i = 0; i < rows.length; i++) {
    const scope = rows[i].scope;
    if (scope === "legacy") {
      for (const otherScope in textKeysByScope) {
        textKeysByScope[otherScope].push(rows[i].key);
      }
    }
  }
  return textKeysByScope;
}

exports.createKeygrip = async function() {
  try {
    const fetchedTextKeysByScope = await loadKeys();
    textKeysByScope = fetchedTextKeysByScope;
    keysByScope = {};
    for (const scope in textKeysByScope) {
      keysByScope[scope] = new Keygrip(textKeysByScope[scope]);
    }
  } catch (err) {
    mozlog.warn("error-creating-signing-keys", {
      msg: "Could not create signing keys:",
      err,
    });
    throw err;
  }
};

/** Returns a promise that generates a new largish ASCII random key */
function makeKey() {
  return new Promise(function(resolve, reject) {
    require("crypto").randomBytes(48, function(err, buf) {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf.toString("base64"));
    });
  });
}

function getCurrentDbPatchLevel() {
  return db.select(`SELECT value FROM property WHERE key = 'patch'`).then(rows => {
    return parseInt(rows[0].value, 10);
  }).catch(e => {
    return 0;
  });
}
exports.getCurrentDbPatchLevel = getCurrentDbPatchLevel;

exports.connectionOK = function() {
  if (!keysByScope) {
    return Promise.resolve(false);
  }
  return getCurrentDbPatchLevel().then(currentLevel => {
    return currentLevel >= MAX_DB_LEVEL;
  });
};
