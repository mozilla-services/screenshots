exports.create = function create(status, errno, message, data) {
  const err = message ? new Error(message) : new Error();
  const statusCode = +status;
  if (!isFinite(statusCode)) {
    throw new Error("Invalid error status code");
  }
  err.isAppError = true;
  err.output = {
    statusCode,
    payload: {
      statusCode,
      errno,
      message: statusCode === 500 ? "Internal server error" : err.message,
    },
    headers: {},
  };
  return err;
};

exports.missingParams = function missingParams() {
  return exports.create(400, 201, "Missing request parameters");
};

exports.badParams = function badParams() {
  return exports.create(400, 202, "Invalid request parameters");
};

exports.dupeLogin = function dupeLogin() {
  return exports.create(409, 301, "Login in progress");
};

exports.missingSession = function missingSession() {
  return exports.create(403, 302, "Session required");
};

exports.badToken = function badToken() {
  return exports.create(403, 304, "Error fetching access token");
};

exports.badProfile = function badProfile() {
  return exports.create(500, 305, "Error fetching profile");
};

exports.badState = function badState() {
  return exports.create(403, 306, "Bad OAuth state");
};

exports.badSession = function badSession() {
  return exports.create(403, 307, "Invalid session");
};

exports.unsupported = function unsupported() {
  return exports.create(501, 401, "Operation not supported");
};

exports.extTimeout = function extTimeout(cause) {
  const err = exports.create(503, 1101, "Timed out waiting for extension");
  if (cause) {
    err.output.payload.cause = cause;
  }
  return err;
};

exports.extAlreadySignedIn = function extAlreadySignedIn() {
  return exports.create(409, 1102, "User already signed in");
};

exports.extBadUpdate = function extBadUpdate(response) {
  const err = exports.create(500, 1103, "Error updating device info");
  if (response) {
    err.output.payload.response = response;
  }
  return err;
};

exports.extInternalError = function extInternalError() {
  return exports.create(500, 1999, "Internal extension error");
};
