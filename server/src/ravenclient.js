const config = require("./config").getProperties();
const raven = require("raven");


let ravenClient = null;

if (config.sentryDSN) {
  ravenClient = new raven.Client(config.sentryDSN);
  ravenClient.install();
}

exports.sendRavenMessage = function(req, message, options) {
  if (!ravenClient) {
    return;
  }
  options = options || {};
  options.extra = options.extra || {};
  options.extra.path = req.originalUrl;
  options.extra.method = req.method;
  options.extra.userAgent = req.headers['user-agent'];
  options.extra.referrer = req.headers['referer'];
  options.extra.authenticated = !!req.deviceId;
  ravenClient.captureMessage(message, options);
};

exports.captureRavenException = function() {
  if (ravenClient) {
    return ravenClient.captureException.apply(ravenClient, arguments);
  }
  return null;
};

exports.addRavenRequestHandler = function(app) {
  if (ravenClient) {
    app.use(raven.requestHandler());
  }
};

exports.addRavenErrorHandler = function(app) {
  if (ravenClient) {
    app.use(raven.errorHandler());
  }
};
