const db = require("../../db");

exports.createModel = function(req) {
  let title = "Settings";
  let model = {
    title,
    docTitle: title,
  };
  return db.select(`
    SELECT accounts.avatarurl, accounts.nickname, accounts.email FROM accounts, devices
    WHERE accounts.id = devices.accountid
          AND devices.id = $1
    `,
    [req.deviceId]
  ).then((rows) => {
    if (rows.length) {
      model.accountInfo = {
        avatarUrl: rows[0].avatarurl,
        nickname: rows[0].nickname,
        email: rows[0].email
      };
    }
    return model;
  });
};
