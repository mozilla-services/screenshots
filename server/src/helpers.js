const crypto = require("crypto");

exports.randomBytes = function randomBytes(size) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, function afterRand(err, bytes) {
      if (err) {
        reject(err);
        return;
      }
      resolve(bytes);
    });
  });
};
