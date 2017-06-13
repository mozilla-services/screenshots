const config = require("./config").getProperties();
const db = require("./db");
const errors = require("./errors");
const { request } = require("./helpers");
const crypto = require("crypto");
const mozlog = require("./logging").mozlog("users");
const abTests = require("./ab-tests");

function hashMatches(hash, secret) {
  let parts = hash.split(/:/g);
  if (parts[0] !== "shaHmac") {
    throw new Error("Unknown type of hash");
  }
  if (parts.length != 3) {
    throw new Error("Bad hash format, should be type:nonce:data");
  }
  let expected = createHash(secret, parts[1]);
  return expected == hash;
}

function createHash(secret, nonce) {
  if (!nonce) {
    nonce = createNonce();
  }
  if (nonce.search(/^[0-9a-zA-Z]+$/) == -1) {
    throw new Error("Bad nonce");
  }
  let hmac = crypto.createHmac("sha256", nonce);
  hmac.update(secret);
  let digest = hmac.digest("hex");
  return `shaHmac:${nonce}:${digest}`;
}

function createNonce() {
  return crypto.randomBytes(10).toString("hex");
}

/** Parses the FORCE_AB_TESTS config */
function getForceAbTests() {
  let val = config.forceAbTests || "";
  if (!val) {
    return null;
  }
  let parts = val.split(/\s/g);
  let result = {};
  for (let part of parts) {
    let equals = part.split("=");
    result[equals[0]] = equals[1];
  }
  return result;
}

exports.checkLogin = function(deviceId, secret, addonVersion) {
  return db.select(
    `SELECT secret_hashed, ab_tests FROM devices WHERE id = $1`,
    [deviceId]
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    let userAbTests = {};
    if (rows[0].ab_tests) {
      userAbTests = JSON.parse(rows[0].ab_tests);
    }
    userAbTests = abTests.updateAbTests(userAbTests, getForceAbTests());
    if (hashMatches(rows[0].secret_hashed, secret)) {
      db.update(
        `UPDATE devices
         SET last_login = NOW(),
             session_count = session_count + 1,
             last_addon_version = $1,
             ab_tests = $2
         WHERE id = $3
        `,
        [addonVersion, JSON.stringify(userAbTests), deviceId]
      ).catch((error) => {
        mozlog.error("error-updating-devices-table", {err: error});
      });
      return userAbTests;
    }
    return false;
  });
};

exports.registerLogin = function(deviceId, data, canUpdate) {
  if (!deviceId) {
    throw new Error("No deviceId given");
  }
  let secretHashed = createHash(data.secret);
  return db.insert(
    `INSERT INTO devices (id, secret_hashed, nickname, avatarurl)
     VALUES ($1, $2, $3, $4)`,
    [deviceId, createHash(data.secret), data.nickname || null, data.avatarurl || null]
  ).then((inserted) => {
    let userAbTests = abTests.updateAbTests({}, getForceAbTests());
    if (inserted) {
      return userAbTests;
    }
    if (canUpdate) {
      if (!data.secret) {
        throw new Error("Must have secret if updating");
      }
      return db.update(
        `UPDATE devices
         SET secret_hashed = $1, nickname = $2, avatarurl = $3
         WHERE id = $4`,
        [secretHashed, data.nickname || null, data.avatarurl || null, deviceId]
      ).then((rowCount) => {
        if (rowCount) {
          return userAbTests;
        }
        return false;
      });
    }
    return false;
  });
};

exports.updateLogin = function(deviceId, data) {
  if (!deviceId) {
    throw new Error("No deviceId given");
  }
  return db.update(
    `UPDATE devices
     SET nickname = $1, avatarurl = $2
     WHERE id = $3`,
    [data.nickname || null, data.avatarurl || null, deviceId]
  ).then(rowCount => !!rowCount);
};

exports.accountIdForDeviceId = function(deviceId) {
  if (!deviceId) {
    throw new Error("No deviceId given");
  }
  return db.select(
    `SELECT accountid FROM devices WHERE id = $1`,
    [deviceId]
  ).then((rows) => {
    if (!rows.length) {
      return null;
    }
    return rows[0].accountid;
  });
};

exports.setState = function(deviceId, state) {
  return db.insert(
    `INSERT INTO states (state, deviceid)
    VALUES ($1, $2)`,
    [state, deviceId]
  );
};

exports.checkState = function(deviceId, state) {
  return db.del(
    `DELETE FROM states WHERE state = $1 AND deviceid = $2`,
    [state, deviceId]
  ).then(rowCount => !!rowCount);
};

exports.tradeCode = function(code) {
  let oAuthURI = `${config.oAuth.oAuthServer}/token`;
  return request('POST', oAuthURI, {
    payload: JSON.stringify({
      code,
      client_id: config.oAuth.clientId,
      client_secret: config.oAuth.clientSecret
    }),
    headers: {
      'content-type': 'application/json'
    },
    json: true
  }).then(([res, body]) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return body;
    }
    throw errors.badToken();
  });
};

exports.getAccountId = function(accessToken) {
  let profileURI = `${config.oAuth.profileServer}/uid`;
  return request('GET', profileURI, {
    headers: {
      authorization: `Bearer ${accessToken}`
    },
    json: true
  }).then(([res, body]) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return body;
    }
    throw errors.badProfile();
  });
};

exports.registerAccount = function(deviceId, accountId, accessToken) {
  return db.transaction(client => {
    return db.upsertWithClient(
      client,
      `INSERT INTO accounts (id, token) SELECT $1, $2`,
      `UPDATE accounts SET token = $2 WHERE id = $1`,
      [accountId, accessToken]
    ).then(() => {
      return db.queryWithClient(
        client,
        `UPDATE devices SET accountid = $2 WHERE id = $1`,
        [deviceId, accountId]
      );
    });
  });
};
