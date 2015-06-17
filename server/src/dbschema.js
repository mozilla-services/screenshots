const db = require("./db");
const Keygrip = require('keygrip');

const createSQL = `
CREATE TABLE IF NOT EXISTS accounts (
  id VARCHAR(200) PRIMARY KEY,
  token TEXT
);

CREATE TABLE IF NOT EXISTS devices (
  id varchar(200) PRIMARY KEY,
  secret varchar(200) NOT NULL,
  nickname TEXT,
  avatarurl TEXT,
  accountid VARCHAR(200) REFERENCES accounts(id) ON DELETE SET NULL
);

-- This is a very long-winded way to create an index only if it doesn't exist:
DO $$
BEGIN
IF NOT EXISTS (
    SELECT 1
    FROM   pg_class c
    JOIN   pg_namespace n ON n.oid = c.relnamespace
    WHERE  c.relname = 'device_accountid_idx'
    AND    n.nspname = 'public'
    ) THEN
    CREATE INDEX device_accountid_idx ON devices(accountid);
END IF;
END$$;

CREATE TABLE IF NOT EXISTS data (
  id varchar(120) PRIMARY KEY,
  deviceid varchar(200) REFERENCES devices (id),
  created TIMESTAMP DEFAULT NOW(),
  value text
);

CREATE TABLE IF NOT EXISTS signing_keys (
  created TIMESTAMP DEFAULT NOW(),
  key TEXT
);

CREATE TABLE IF NOT EXISTS states (
  state VARCHAR(64) PRIMARY KEY,
  deviceid VARCHAR(200) REFERENCES devices(id) ON DELETE CASCADE
);

DO $$
BEGIN
IF NOT EXISTS (
    SELECT 1
    FROM   pg_class c
    JOIN   pg_namespace n ON n.oid = c.relnamespace
    WHERE  c.relname = 'state_deviceid_idx'
    AND    n.nspname = 'public'
    ) THEN
    CREATE INDEX state_deviceid_idx ON states(deviceid);
END IF;
END$$;
`;

/** Create all the tables */
exports.createTables = function () {
  return db.exec(
    createSQL, []
  ).then((result) => {
    console.info("Created tables on", db.constr);
    let newId = "tmp" + Date.now();
    return db.insert(
      `INSERT INTO data (id, deviceid, value)
       VALUES ($1, NULL, $2)`,
      [newId, "test value"]
    ).then((inserted) => {
      if (! inserted) {
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
      console.warn(`Could not connect to database on ${db.constr}`);
    }
    console.warn("Got error creating and testing tables:", err);
  });
};

let keys;

exports.getKeygrip = function () {
  return keys;
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
      for (let i=0; i<rows.length; i++) {
        textKeys.push(rows[i].key);
      }
      return textKeys;
    } else {
      return makeKey().then((key) => {
        return db.insert(
          `INSERT INTO signing_keys (created, key)
           VALUES (NOW(), $1)`,
          [key]
        ).then((ok) => {
          if (! ok) {
            throw new Error("Could not insert key");
          }
          return [key];
        });
      });
    }
  });
}

exports.createKeygrip = function () {
  loadKeys().then((textKeys) => {
    keys = new Keygrip(textKeys);
  }).catch((err) => {
    console.warn("Could not create signing keys:", err);
  });
};

/** Returns a promise that generates a new largish ASCII random key */
function makeKey() {
  return new Promise(function (resolve, reject) {
    require('crypto').randomBytes(48, function(err, buf) {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf.toString('base64'));
    });
  });
}
