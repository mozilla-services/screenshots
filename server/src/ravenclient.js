const config = require("./config").getProperties();
const Raven = require("raven");
const urlParse = require("url").parse;


let useRaven = false;

if (config.sentryDSN) {
  Raven.config(config.sentryDSN).install();
  useRaven = true;
}

/** Returns true if the path looks like '/some-id/some-domain' */
function isShotLikePath(path) {
  return /^\/[^/]+\/[^/]+\/?$/.test(path);
}

function makeOptionsFromRequest(req, options) {
  let referrer = null;
  let path = req.originalUrl;
  if (req.headers.referer) {
    referrer = req.headers.referer;
    if (referrer.startsWith(req.backend)) {
      let parsed = urlParse(referrer);
      let pathname = parsed.pathname;
      if (isShotLikePath(pathname)) {
        pathname = "/a-shot/redacted";
      }
      referrer = `${parsed.protocol}//${parsed.host}${pathname}`;
    }
  }
  if (isShotLikePath(path)) {
    path = "/a-shot/redacted";
  }
  options = options || {};
  options.extra = options.extra || {};
  options.extra.path = path;
  options.extra.method = req.method;
  options.extra.userAgent = req.headers['user-agent'];
  options.extra.referrer = referrer;
  options.extra.authenticated = !!req.deviceId;
  return options;
}

exports.sendRavenMessage = function(req, message, options) {
  if (!useRaven) {
    return;
  }
  options = makeOptionsFromRequest(req, options);
  Raven.captureMessage(message, options);
};

exports.captureRavenException = function(exc, req, options) {
  if (req) {
    options = makeOptionsFromRequest(req, options);
  }
  if (useRaven) {
    return Raven.captureException(exc, options);
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
