const db = require("./db");

exports.checkLogin = function (userId, secret) {
  return db.select(
    `SELECT secret FROM devices WHERE id = $1`,
    [userId]
  ).then((rows) => {
    if (! rows.length) {
      throw new Error("No such user: " + userId);
    }
    return rows[0].secret == secret;
  });
};

exports.registerLogin = function (userId, data, canUpdate) {
  if (! userId) {
    throw new Error("No userId given");
  }
  return db.insert(
    `INSERT INTO devices (id, secret, nickname, avatarurl)
     VALUES ($1, $2, $3, $4)`,
    [userId, data.secret, data.nickname || null, data.avatarurl || null]
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
        [data.secret || null, data.nickname || null, data.avatarurl || null, userId]
      ).then((rowCount) => {
        return !! rowCount;
      });
    } else {
      return false;
    }
  });
};
