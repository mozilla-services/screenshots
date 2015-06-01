const boom = require('boom');

exports.create = function create(statusCode, errno, message, data) {
  let err = boom.create(statusCode, message, data);
  err.output.payload.errno = errno;
  err.isAppError = true;
  return err;
};

exports.dupeLogin = function dupeLogin() {
  return exports.create(409, 300, 'Login in progress');
};

exports.sessionRequired = function sessionRequired() {
  return exports.create(403, 301, 'Session required');
};

exports.paramsRequired = function paramsRequired() {
  return exports.create(400, 302, 'Missing request parameters');
};

exports.badToken = function badToken() {
  return exports.create(403, 303, 'Bad OAuth access token');
};

exports.badProfile = function badProfile() {
  return exports.create(500, 304, 'Error fetching profile');
};

exports.invalidState = function invalidState() {
  return exports.create(403, 305, 'Bad OAuth state');
};
