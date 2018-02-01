const crypto = require("crypto");
const wreck = require("wreck");

exports.request = function request(method, uri, options) {
  return new Promise((resolve, reject) => {
    wreck.request(method, uri, options, function afterWreck(err, res) {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  }).then(res => {
    return exports.readBody(res, options).then(body => [res, body]);
  });
};

// Collects an incoming message body into a buffer.
exports.readBody = function readBody(req, options) {
  return new Promise((resolve, reject) => {
    return wreck.read(req, options, function afterRead(err, body) {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    });
  });
};

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
