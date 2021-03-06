const db = require("../../db");

exports.createModel = function(req) {
  const title = "Settings";
  const model = {
    title,
    docTitle: title,
  };

  return db.select(`
    SELECT accounts.avatarurl, accounts.nickname, accounts.email FROM accounts
    WHERE accounts.id = $1
    `,
    [req.accountId]
  ).then((rows) => {
    if (rows.length) {
      model.accountInfo = {
        avatarUrl: rows[0].avatarurl,
        nickname: rows[0].nickname,
        email: rows[0].email,
      };
    }
    return model;
  });
};
