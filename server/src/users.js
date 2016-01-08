const config = require("./config").root();
const db = require("./db");
const errors = require("../shared/errors");
const { request } = require("./helpers");

exports.checkLogin = function (deviceId, secret, addonVersion) {
  return db.select(
    `SELECT secret FROM devices WHERE id = $1`,
    [deviceId]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    if (rows[0].secret == secret) {
      db.update(
        `UPDATE devices
         SET last_login = NOW(),
             session_count = session_count + 1,
             last_addon_version = $1
         WHERE id = $2
        `,
        [addonVersion, deviceId]
      ).catch((error) => {
        console.error("Error updating devices table:", error);
      });
      return true;
    } else {
      return false;
    }
  });
};

exports.registerLogin = function (deviceId, data, canUpdate) {
  if (! deviceId) {
    throw new Error("No deviceId given");
  }
  return db.insert(
    `INSERT INTO devices (id, secret, nickname, avatarurl)
     VALUES ($1, $2, $3, $4)`,
    [deviceId, data.secret, data.nickname || null, data.avatarurl || null]
  ).then((inserted) => {
    if (inserted) {
      return true;
    }
    if (canUpdate) {
      if (! data.secret) {
        throw new Error("Must have secret if updating");
      }
      return db.update(
        `UPDATE devices
         SET secret = $1, nickname = $2, avatarurl = $3
         WHERE id = $4`,
        [data.secret || null, data.nickname || null, data.avatarurl || null, deviceId]
      ).then((rowCount) => {
        return !! rowCount;
      });
    } else {
      return false;
    }
  });
};

exports.updateLogin = function (deviceId, data) {
  if (! deviceId) {
    throw new Error("No deviceId given");
  }
  return db.update(
    `UPDATE devices
     SET nickname = $1, avatarurl = $2
     WHERE id = $3`,
    [data.nickname || null, data.avatarurl || null, deviceId]
  ).then(rowCount => !! rowCount);
};

exports.accountIdForDeviceId = function (deviceId) {
  if (! deviceId) {
    throw new Error("No deviceId given");
  }
  return db.select(
    `SELECT accountid FROM devices WHERE id = $1`,
    [deviceId]
  ).then((rows) => {
    if (! rows.length) {
      return null;
    }
    return rows[0].accountid;
  });
};

exports.setState = function (deviceId, state) {
  return db.insert(
    `INSERT INTO states (state, deviceid)
    VALUES ($1, $2)`,
    [state, deviceId]
  );
};

exports.checkState = function (deviceId, state) {
  return db.del(
    `DELETE FROM states WHERE state = $1 AND deviceid = $2`,
    [state, deviceId]
  ).then(rowCount => !! rowCount);
};

exports.tradeCode = function (code) {
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

exports.getAccountId = function (accessToken) {
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

exports.registerAccount = function (deviceId, accountId, accessToken) {
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

exports.addDeviceActivity = function (deviceId, eventType, eventInfo) {
  // Note we don't care when the database request completes
  if (typeof eventType != "string" || ! eventType) {
    throw new Error("Missing, empty, or invalid eventType");
  }
  if (typeof deviceId != "string" || ! deviceId) {
    throw new Error("Missing, empty, or invalid deviceId");
  }
  if (eventInfo && typeof eventInfo != "string") {
    eventInfo = JSON.stringify(eventInfo);
  }
  if (! eventInfo) {
    eventInfo = null;
  }
  db.insert(
    `INSERT INTO device_activity (deviceid, event_type, event_info)
     VALUES ($1, $2, $3)`,
    [deviceId, eventType, eventInfo]
  ).catch((error) => {
    console.error("Error inserting into device_activity:", error);
  });
};
