const config = require("./config").getProperties();
const Raven = require("raven");


let useRaven = false;

if (config.sentryDSN) {
  Raven.config(config.sentryDSN).install();
  useRaven = true;
}

exports.sendRavenMessage = function(req, message, options) {
  if (!useRaven) {
    return;
  }
  options = options || {};
  options.extra = options.extra || {};
  options.extra.path = req.originalUrl;
  options.extra.method = req.method;
  options.extra.userAgent = req.headers['user-agent'];
  options.extra.referrer = req.headers['referer'];
  options.extra.authenticated = !!req.deviceId;
  Raven.captureMessage(message, options);
};

exports.captureRavenException = function() {
  if (useRaven) {
    return Raven.captureException.apply(Raven, arguments);
  }
  return null;
};

exports.addRavenRequestHandler = function(app) {
  if (useRaven) {
    app.use(Raven.requestHandler());
  }
};

exports.addRavenErrorHandler = function(app) {
  if (useRaven) {
    app.use(Raven.errorHandler());
  }
};
