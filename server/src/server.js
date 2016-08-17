const config = require("./config").getProperties();

require("mozlog").config({
  app: "pageshot-server",
  fmt: "pretty",
  level: config.log.level,
  debug: config.log.lint
});

const console_mozlog = require("mozlog")("console");
// We can't prevent any third party libraries from writing to the console,
// so monkey patch it so they play nice with mozlog.
function logFactory(level) {
  let logger = console_mozlog[level].bind(console_mozlog);
  return function () {
    let msg = "";
    let stack = undefined;
    for (var i = 0; i < arguments.length; i++) {
      let arg = arguments[i];
      if (msg) {
        msg += " ";
      }
      if (typeof arg === "string") {
        msg += arg;
      } else {
        if (arg && arg.stack) {
          if (stack) {
            stack = stack + "\n\n" + arg.stack;
          } else {
            stack = arg.stack;
          }
        }
        msg += JSON.stringify(arg);
      }
    }
    logger(level, {msg, stack});
  }
}

console.debug = logFactory("debug");
console.info = logFactory("info");
console.warn = logFactory("warn");
console.error = logFactory("error");

const path = require('path');
const Cookies = require("cookies");

const { Shot } = require("./servershot");
const {
  checkLogin,
  registerLogin,
  updateLogin,
  setState,
  checkState,
  tradeCode,
  getAccountId,
  registerAccount,
  addDeviceActivity
} = require("./users");
const dbschema = require("./dbschema");
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const linker = require("./linker");
const { randomBytes } = require("./helpers");
const errors = require("../shared/errors");
const { checkContent, checkAttributes } = require("./contentcheck");
const buildTime = require("./build-time").string;
const ua = require("universal-analytics");
const urlParse = require("url").parse;
const http = require("http");
const https = require("https");
const gaActivation = require("./ga-activation");
const genUuid = require("nodify-uuid");
const AWS = require("aws-sdk");
const vhost = require("vhost");
const raven = require("raven");
const escapeHtml = require("escape-html");
const validUrl = require("valid-url");
const { createProxyUrl } = require("./proxy-url");

const PROXY_HEADER_WHITELIST = {
  "content-type": true,
  "content-encoding": true,
  "content-length": true,
  "last-modified": true,
  "etag": true,
  "date": true,
  "accept-ranges": true,
  "content-range": true,
  "retry-after": true,
  "via": true
};

if (config.useS3) {
  // Test a PUT to s3 because configuring this requires using the aws web interface
  // If the permissions are not set up correctly, then we want to know that asap
  var s3bucket = new AWS.S3({params: {Bucket: config.s3BucketName}});
  console.info(new Date(), `creating ${config.s3BucketName}`);

  // createBucket is a horribly named api; it creates a local object to access
  // an existing bucket
  s3bucket.createBucket(function() {
    var params = {Key: 'test', Body: 'Hello!'};
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.warn("Error uploading data during test: ", err);
      } else {
        console.info(`Successfully uploaded data to ${config.s3BucketName}/test`);
      }
    });
  });
}

let ravenClient = null;

if (config.sentryDSN) {
  ravenClient = new raven.Client(config.sentryDSN);
  ravenClient.patchGlobal();
}

function initDatabase() {
  dbschema.createTables().then(() => {
    return dbschema.createKeygrip();
  }).then(() => {
    return Shot.upgradeSearch();
  }).catch((e) => {
    console.error("Error initializing database:", e, e.stack);
    console.warn("Trying again in 60 seconds");
    setTimeout(initDatabase, 60000);
  });
}

initDatabase();

const app = express();

app.set('trust proxy', true);

const CONTENT_NAME = config.contentOrigin;

app.use((req, res, next) => {
  genUuid.generate(genUuid.V_RANDOM, function (err, uuid) {
    if (!err) {
      req.cspNonce = uuid;
      res.header(
        "Content-Security-Policy",
        `default-src 'self'; img-src 'self' ${CONTENT_NAME} data:; script-src 'self' www.google-analytics.com 'nonce-${uuid}'; style-src 'self' 'unsafe-inline' https://code.cdn.mozilla.net`);
        next();
    } else {
      errorResponse(res, "Error creating nonce:", err);
    }
  });
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '100mb'}));

app.use("/static", express.static(path.join(__dirname, "static"), {
  index: false
}));

let xpidir = path.join(__dirname, "..", "xpi");
app.use("/xpi", express.static(xpidir, {index: false}));

app.use("/homepage", express.static(path.join(__dirname, "static/homepage"), {
  index: false
}));

app.use(morgan("combined"));

app.use(function (req, res, next) {
  let cookies = new Cookies(req, res, {keys: dbschema.getKeygrip()});
  req.deviceId = cookies.get("user", {signed: true});
  if (req.deviceId) {
    req.userAnalytics = ua(config.gaId, req.deviceId, {strictCidFormat: false});
  }
  req.backend = req.protocol + "://" + req.headers.host;
  req.config = config;
  next();
});

app.use(function (req, res, next) {
  let magicAuth = req.headers['x-magic-auth'];
  if (magicAuth && dbschema.getTextKeys().indexOf(magicAuth) != -1) {
    req.deviceId = req.headers['x-device-id'];
  }
  next();
});

app.use(function (req, res, next) {
  req.staticLink = linker.staticLink;
  req.staticLinkWithHost = linker.staticLinkWithHost.bind(null, req);
  let base = req.protocol + "://" + req.headers.host;
  linker.imageLinkWithHost = linker.imageLink.bind(null, base);
  next();
});

app.get("/ga-activation.js", function (req, res) {
  let script = gaActivation.makeGaActivationString(config.gaId, req.deviceId, false);
  jsResponse(res, script);
});

app.get("/trigger-error", function (req, res) {
  throw new Error("test error");
});

app.post("/error", function (req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error("Got unexpected req.body type: " + typeof bodyObj);
  }
  let userAnalytics = ua(config.gaId);
  let desc = bodyObj.name;
  let attrs = [];
  for (let attr in bodyObj) {
    if (attr == "name" || attr == "help" || attr == "version") {
      continue;
    }
    let value = "" + bodyObj[attr];
    // FIXME: maybe a crude attempt to ensure some santization of parameters:
    value = value.replace(/\n/g, " / ");
    value = value.replace(/[\t\r]/g, " ");
    value = value.replace(/\s+/g, " ");
    value = value.replace(/[^a-z0-9_\-=+\{\}\(\).,/\?:\[\]\| ]/gi, "?");
    value = value.substr(0, 100);
    attrs.push(attr + ": " + value);
  }
  if (attrs.length) {
    desc += " - " + attrs.join("; ");
  }
  userAnalytics.exception({
    hitType: "exception",
    userAgentOverride: req.headers['user-agent'],
    applicationName: "addon",
    applicationVersion: bodyObj.version,
    exceptionDescription: desc
  }).send();
  console.info("Error received:", desc);
  simpleResponse(res, "OK", 200);
});

function hashUserId(deviceId) {
  return new Promise((resolve, reject) => {
    let userKey = dbschema.getTextKeys()[0] + deviceId;
    genUuid.generate(genUuid.V_SHA1, genUuid.nil, userKey, function (err, userUuid) {
      if (err) {
        reject(err);
      } else {
        resolve(userUuid);
      }
    });
  });
}

app.post("/event", function (req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error("Got unexpected req.body type: " + typeof bodyObj);
  }
  hashUserId(req.deviceId).then((userUuid) => {
    let userAnalytics = ua(config.gaId, userUuid.toString());
    userAnalytics.event(
      bodyObj.event,
      bodyObj.action,
      bodyObj.label
    ).send();
    simpleResponse(res, "OK", 200);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
});

app.post("/timing", function (req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error("Got unexpected req.body type: " + typeof bodyObj);
  }
  hashUserId(req.deviceId).then((userUuid) => {
    let userAnalytics = ua(config.gaId, userUuid.toString());
    userAnalytics.timing(
      bodyObj.event,
      bodyObj.action,
      bodyObj.timing
    ).send();
    simpleResponse(res, "OK", 200);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
});

app.get("/redirect", function (req, res) {
  if (req.query.to) {
    let from = req.query.from;
    if (!from) {
      from = "shot-detail";
    }
    res.header("Content-type", "text/html");
    res.status(200);
    let redirectUrl = req.query.to;
    if (! validUrl.isUri(redirectUrl)) {
      console_mozlog.warn("redirect-bad-url", {msg: "Redirect attempted to invalid URL", url: redirectUrl});
      simpleResponse(res, "Bad Request", 400);
      return;
    }
    let redirectUrlJs = JSON.stringify(redirectUrl).replace(/[<>]/g, "");
    let output = `<html>
  <head>
    <title>Redirect</title>
  </head>
  <body>
    <a href="${escapeHtml(redirectUrl)}">If you are not automatically redirected, click here.</a>
    <script nonce="${req.cspNonce}">
window.location = ${redirectUrlJs};
    </script>
  </body>
</html>`;
    res.send(output);
    let userAnalytics = ua(config.gaId, req.deviceId, {strictCidFormat: false});
    userAnalytics.event(
      "click",
      `original-link-${from}`
    ).send();
  } else {
    console_mozlog.warn("no-redirect-to", {"msg": "Bad Request, no ?to parameter"});
    simpleResponse(res, "Bad Request", 400);
  }
});

app.post("/api/register", function (req, res) {
  let vars = req.body;
  let canUpdate = vars.deviceId === req.deviceId;
  if (! vars.deviceId) {
    console.error("Bad register request:", JSON.stringify(vars, null, "  "));
    simpleResponse(res, "Bad request, no deviceId", 400);
    return;
  }
  return registerLogin(vars.deviceId, {
    secret: vars.secret,
    nickname: vars.nickname || null,
    avatarurl: vars.avatarurl || null
  }, canUpdate).then(function (ok) {
    if (ok) {
      let cookies = new Cookies(req, res, dbschema.getKeygrip());
      cookies.set("user", vars.deviceId, {signed: true});
      simpleResponse(res, "Created", 200);
    } else {
      addDeviceActivity(vars.deviceId, "invalid-register", {
        hasSecret: !!vars.secret,
        hasNickname: !!vars.nickname,
        hasAvatarurl: !!vars.avatarurl
      });
      simpleResponse(res, "User exists", 401);
    }
  }).catch(function (err) {
    // FIXME: can't add this, because vars.deviceId probably isn't a valid
    // deviceId, because registration failed
    /* addDeviceActivity(vars.deviceId, "error-register", {
      error: err+""
    }); */
    errorResponse(res, "Error registering:", err);
  });
});

app.post("/api/update", function (req, res, next) {
  if (! req.deviceId) {
    next(errors.missingSession());
    return;
  }
  if (! req.body) {
    res.sendStatus(204);
    return;
  }
  let { nickname, avatarurl } = req.body;
  updateLogin(req.deviceId, { nickname, avatarurl }).then(ok => {
    if (! ok) {
      throw errors.badSession();
    }
    addDeviceActivity(req.deviceId, "update-profile", {
      hasNickname: !!nickname,
      hasAvatarurl: !!avatarurl
    });
    res.sendStatus(204);
  }, err => {
    console.warn("Error updating device info", err);
    throw errors.badParams();
  }).catch(next);
});

app.post("/api/login", function (req, res) {
  let vars = req.body;
  checkLogin(vars.deviceId, vars.secret, vars.deviceInfo.addonVersion).then((ok) => {
    if (ok) {
      let cookies = new Cookies(req, res, dbschema.getKeygrip());
      cookies.set("user", vars.deviceId, {signed: true});
      let userAnalytics = ua(config.gaId, req.deviceId, {strictCidFormat: false});
      userAnalytics.pageview("/api/login").send();
      simpleResponse(res, JSON.stringify({"ok": "User logged in", "sentryPublicDSN": config.sentryPublicDSN}), 200);
      addDeviceActivity(vars.deviceId, "login", {
        deviceInfo: vars.deviceInfo
      });
    } else if (ok === null) {
      simpleResponse(res, '{"error": "No such user"}', 404);
    } else {
      addDeviceActivity(vars.deviceId, "invalid-login", {
        hasSecret: !!vars.secret,
        deviceInfo: vars.deviceInfo
      });
      simpleResponse(res, '{"error": "Invalid login"}', 401);
    }
  }).catch(function (err) {
    errorResponse(res, JSON.stringify({"error": `Error in login: ${err}`}));
  });
});

app.post("/api/unload", function (req, res) {
  let reason = req.body.reason;
  reason = reason.replace(/[^a-zA-Z0-9]/g, "");
  console.info("Device", req.deviceId, "unloaded for reason:", reason);
  let cookies = new Cookies(req, res, dbschema.getKeygrip());
  // This erases the session cookie:
  cookies.set("user");
  cookies.set("user.sig");
  if (req.userAnalytics) {
    req.userAnalytics.pageview("/api/unload").send();
  }
  addDeviceActivity(req.deviceId, "unload", {
    reason: reason,
    deviceInfo: req.body.deviceInfo
  });
  simpleResponse(res, "Noted", 200);
});

app.put("/data/:id/:domain", function (req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj != "object") {
    throw new Error("Got unexpected req.body type: " + typeof bodyObj);
  }
  let shotId = req.params.id + "/" + req.params.domain;

  if (! bodyObj.deviceId) {
    console.warn("No deviceId in request body", req.url);
    simpleResponse(res, "No deviceId in body", 400);
    return;
  }
  if (! req.deviceId) {
    console.warn("Attempted to PUT without logging in", req.url);
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  if (req.deviceId != bodyObj.deviceId) {
    // FIXME: this doesn't make sense for comments or other stuff, see https://github.com/mozilla-services/pageshot/issues/245
    console.warn("Attempted to PUT a page with a different deviceId than the login deviceId");
    simpleResponse(res, "Cannot save a page on behalf of another user", 403);
    return;
  }
  let errors = checkContent(bodyObj.head)
    .concat(checkContent(bodyObj.body))
    .concat(checkAttributes(bodyObj.headAttrs, "head"))
    .concat(checkAttributes(bodyObj.bodyAttrs, "body"))
    .concat(checkAttributes(bodyObj.htmlAttrs, "html"));
  if (errors.length) {
    console.warn("Attempted to submit page with invalid HTML:", errors.join("; ").substr(0, 60));
    simpleResponse(res, "Errors in submission", 400);
    return;
  }
  let shot = new Shot(req.deviceId, req.backend, shotId, bodyObj);
  shot.insert().then((inserted) => {
    if (! inserted) {
      return shot.update();
    }
    return inserted;
  }).then((commands) => {
    commands = commands || [];
    simpleResponse(res, JSON.stringify({updates: commands.filter((x) => !!x)}), 200);
  }).catch((err) => {
    errorResponse(res, "Error saving Object:", err);
  });
});

app.get("/data/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.getRawValue(shotId).then((data) => {
    if (! data) {
      simpleResponse(res, "No such shot", 404);
    } else {
      let value = data.value;
      if ('format' in req.query) {
        value = JSON.stringify(JSON.parse(value), null, '  ');
      }
      res.header("Content-Type", "application/json");
      res.send(value);
    }
  }).catch(function (err) {
    errorResponse(res, "Error serving data:", err);
  });
});

app.post("/api/delete-shot", function (req, res) {
  if (! req.deviceId) {
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  Shot.deleteShot(req.backend, req.body.id, req.deviceId).then((result) => {
    if (result) {
      simpleResponse(res, "ok", 200);
    } else {
      simpleResponse(res, "No such shot", 404);
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not delete shot", err);
  });
});

app.post("/api/add-saved-shot-data/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  let bodyObj = req.body;
  Shot.get(req.backend, shotId).then((shot) => {
    if (! shot) {
      simpleResponse(res, "No such shot", 404);
      return;
    }
    let errors = checkContent(bodyObj.head)
      .concat(checkContent(bodyObj.body))
      .concat(checkAttributes(bodyObj.headAttrs, "head"))
      .concat(checkAttributes(bodyObj.bodyAttrs, "body"))
      .concat(checkAttributes(bodyObj.htmlAttrs, "html"));
    if (errors.length) {
      console.warn("Attempted to submit page with invalid HTML:", errors.join("; ").substr(0, 60));
      simpleResponse(res, "Errors in submission", 400);
      return;
    }
    for (let attr in bodyObj) {
      if (! ["body", "head", "headAttrs", "bodyAttrs", "htmlAttrs", "showPage", "readable", "resources"].includes(attr)) {
        console.warn("Unexpected attribute in update:", attr);
        simpleResponse(res, "Unexpected attribute in submission", 400);
        return;
      }
      shot[attr] = bodyObj[attr];
    }
    return shot.update().then(() => {
      simpleResponse(res, "ok", 200);
    });
  }).catch((err) => {
    errorResponse(res, "Error serving data:", err);
  });

});

app.get("/shot-deleted", function (req, res) {
  require("./views/shot-deleted").render(req, res);
});

app.post("/api/set-expiration", function (req, res) {
  if (! req.deviceId) {
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  let shotId = req.body.id;
  let expiration = parseInt(req.body.expiration, 10);
  if (expiration < 0) {
    errorResponse(res, "Error: negative expiration", 400);
    return;
  }
  if (isNaN(expiration)) {
    errorResponse(res, "Error: bad expiration (" + req.body.expiration + ")", 400);
    return;
  }
  Shot.setExpiration(req.backend, shotId, req.deviceId, expiration).then((result) => {
    if (result) {
      simpleResponse(res, "ok", 200);
    } else {
      simpleResponse(res, "No such shot", 404);
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not set expiration on shot", err);
  });
});

app.get("/images/:imageid", function (req, res) {
  Shot.getRawBytesForClip(
    req.params.imageid
  ).then((obj) => {
    if (obj === null) {
      simpleResponse(res, "Not Found", 404);
    } else {
      let hasher = require("crypto").createHash("sha1");
      hasher.update(req.params.imageid);
      let hashedId = hasher.digest("hex").substr(0, 15);
      let analyticsUrl = `/images/hash${encodeURIComponent(hashedId)}`;
      if (req.userAnalytics) {
        req.userAnalytics.pageview(analyticsUrl).send();
      } else {
        let anonAnalytics = ua(config.gaId);
        anonAnalytics.pageview(analyticsUrl).send();
      }
      res.header("Content-Type", obj.contentType);
      res.status(200);
      res.send(obj.data);
    }
  });
});

app.get("/", function (req, res) {
  let page = path.join(__dirname, "static/homepage/index.html");
  require("fs").readFile(page, function (err, data) {
    if (err) {
      errorResponse(res, "Error", err);
      return;
    }
    res.header("Content-Type", "text/html");
    res.send(data);
  });
});

app.get("/__version__", function (req, res) {
  let response = {
    source: "https://github.com/mozilla-services/pageshot/",
    version: buildTime,
    commit: linker.getGitRevision()
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(JSON.stringify(response));
});

// FIXME: this can't the right way to do this...
require("./exporter").setup(app);

app.get("/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    let notFound = false;
    if (! shot) {
      notFound = true;
    } else if (shot.clipNames().length === 0 && ! shot.deleted) {
      // Deleted shots always appear to have no clips
    }
    if (notFound) {
      simpleResponse(res, "Not found", 404);
      return;
    }
    req.shot = shot;
    if (shouldRenderSimple(req)) {
      return require("./views/frame").renderSimple(req, res);
    } else {
      return require("./views/frame").render(req, res);
    }
  }).catch(function (err) {
    errorResponse(res, "Error rendering page:", err);
  });
});

app.get("/oembed", function (req, res) {
  let url = req.query.url;
  let format = req.query.format || "json";
  if (format !== "json") {
    return simpleResponse(res, "Only JSON OEmbed is supported", 501);
  }
  let maxwidth = req.query.maxwidth || null;
  if (maxwidth) {
    maxwidth = parseInt(maxwidth, 10);
  }
  let maxheight = req.query.maxheight || null;
  if (maxheight) {
    maxheight = parseInt(maxheight, 10);
  }
  url = url.replace(/^http:\/\//i, "https://");
  let backend = req.backend.replace(/^http:\/\//i, "https://");
  if (! url.startsWith(backend)) {
    return simpleResponse(res, "Error: URL is not hosted here (" + req.backend + ")", 501);
  }
  url = url.substr(backend.length);
  let match = /^\/*([^\/]+)\/([^\/]+)/.exec(url);
  if (! match) {
    return simpleResponse(res, "Error: not a Shot url", 404);
  }
  let shotId = match[1] + "/" + match[2];
  Shot.get(req.backend, shotId).then((shot) => {
    if (! shot) {
      return simpleResponse(res, "No such shot", 404);
    }
    let body = shot.oembedJson({maxheight, maxwidth});
    res.header("Content-Type", "application/json");
    res.send(body);
  });
});

// Get OAuth client params for the client-side authorization flow.
app.get('/api/fxa-oauth/params', function (req, res, next) {
  if (! req.deviceId) {
    next(errors.missingSession());
    return;
  }
  randomBytes(32).then(stateBytes => {
    let state = stateBytes.toString('hex');
    return setState(req.deviceId, state).then(inserted => {
      if (!inserted) {
        throw errors.dupeLogin();
      }
      return state;
    });
  }).then(state => {
    res.send({
      // FxA profile server URL.
      profile_uri: config.oAuth.profileServer,
      // FxA OAuth server URL.
      oauth_uri: config.oAuth.oAuthServer,
      redirect_uri: 'urn:ietf:wg:oauth:2.0:fx:webchannel',
      client_id: config.oAuth.clientId,
      // FxA content server URL.
      content_uri: config.oAuth.contentServer,
      state,
      scope: 'profile'
    });
  }).catch(next);
});

// Exchange an OAuth authorization code for an access token.
app.post('/api/fxa-oauth/token', function (req, res, next) {
  if (! req.deviceId) {
    next(errors.missingSession());
    return;
  }
  if (! req.body) {
    next(errors.missingParams());
    return;
  }
  let { code, state } = req.body;
  checkState(req.deviceId, state).then(isValid => {
    if (!isValid) {
      throw errors.badState();
    }
    return tradeCode(code);
  }).then(({ access_token: accessToken }) => {
    return getAccountId(accessToken).then(({ uid: accountId }) => {
      return registerAccount(req.deviceId, accountId, accessToken);
    }).then(() => {
      addDeviceActivity(req.deviceId, "fxa-login");
      res.send({
        access_token: accessToken
      });
    }).catch(next);
  }).catch(next);
});

app.use(function (err, req, res, next) {
  console.error("Error:", err);
  console.error(err.stack);
  if (ravenClient) {
    ravenClient.captureException(err);
  }
  if (err.isAppError) {
    let { statusCode, headers, payload } = err.output;
    res.status(statusCode);
    res.header(headers);
    res.send(payload);
    return;
  }
  errorResponse(res, "General error:", err);
});

/*
    FIXME we need ldap authentication and for this to only be accessible
    from the vpn before we can turn the metrics interface back on

app.use("/admin", require("./pages/admin/server").app);
*/

app.use("/shots", require("./pages/shotindex/server").app);

app.use("/delete-account", require("./pages/delete-account/server").app);

const contentApp = express();

if (config.useVirtualHosts) {
  contentApp.use((req, res, next) => {
    res.header("Content-Security-Policy", "default-src 'self'");
    next();
  });
}

contentApp.set('trust proxy', true);

contentApp.use("/static", express.static(path.join(__dirname, "static"), {
  index: false
}));

contentApp.use(function (req, res, next) {
  req.staticLink = linker.staticLink;
  req.staticLinkWithHost = linker.staticLinkWithHost.bind(null, req);
  let base = req.protocol + "://" + req.headers.host;
  linker.imageLinkWithHost = linker.imageLink.bind(null, base);
  next();
});

contentApp.get("/content/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.getFullShot(req.backend, shotId).then((shot) => {
    if (! shot) {
      simpleResponse(res, "Not found", 404);
      return;
    }
    res.send(shot.staticHtml({
      addHead: `
      <meta name="referrer" content="origin" />
      <base href="${shot.url}" target="_blank" />
      <script nonce="${req.cspNonce}">var SITE_ORIGIN = "${req.protocol}://${config.siteOrigin}";</script>
      <script src="${req.staticLinkWithHost("js/content-helper.js")}"></script>
      <link rel="stylesheet" href="${req.staticLinkWithHost("css/content.css")}">
      `,
      rewriteLinks: (key, data) => {
        if (! data) {
          console.warn("Missing link for", JSON.stringify(key));
          return key;
        }
        return createProxyUrl(req, data.url, data.hash);
      }
    }));
  }).catch(function (e) {
    errorResponse(res, "Failed to load shot", e);
  });
});

contentApp.get("/proxy", function (req, res) {
  let url = req.query.url;
  let sig = req.query.sig;
  let isValid = dbschema.getKeygrip().verify(new Buffer(url, 'utf8'), sig);
  if (! isValid) {
    return simpleResponse(res, "Bad signature", 403);
  }
  url = urlParse(url);
  let httpModule = http;
  if (url.protocol == "https:") {
    httpModule = https;
  }
  let headers = {};
  for (let passthrough of ["user-agent", "if-modified-since", "if-none-match"]) {
    if (req.headers[passthrough]) {
      headers[passthrough] = req.headers[passthrough];
    }
  }
  let host = url.host.split(":")[0];
  let subreq = httpModule.request({
    protocol: url.protocol,
    host: host,
    port: url.port,
    method: "GET",
    path: url.path,
    headers: headers
  });
  subreq.on("response", function (subres) {
    let headers = {};
    for (let h in subres.headers) {
      if (PROXY_HEADER_WHITELIST[h]) {
        headers[h] = subres.headers[h];
      }
    }
    // Cache for 30 days
    headers["cache-control"] = "public, max-age=2592000";
    headers["expires"] = new Date(Date.now() + 2592000000).toUTCString();
    res.writeHead(subres.statusCode, subres.statusMessage, headers);

    subres.on("data", function (chunk) {
      res.write(chunk);
    });
    subres.on("end", function () {
      res.end();
    });
    subres.on("error", function (err) {
      errorResponse(res, "Error getting response:", err);
    });
  });
  subreq.on("error", function (err) {
    errorResponse(res, "Error fetching:", err);
  });
  subreq.end();
});

function shouldRenderSimple(req) {
  if ('simple' in req.query) {
    return true;
  }
  if (req.headers["x-simple"]) {
    return true;
  }
  return false;
}

function simpleResponse(res, message, status) {
  status = status || 200;
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.status(status);
  res.send(message);
}

function jsResponse(res, jsstring) {
  res.header("Content-Type", "application/javascript; charset=utf-8")
  res.send(jsstring);
}

function errorResponse(res, message, err) {
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.status(500);
  if (config.showStackTraces) {
    if (err) {
      message += "\n" + err;
      if (err.stack) {
        message += "\n\n" + err.stack;
      }
    }
    res.send(message);
  } else {
    res.send("Server error");
  }
  console.error("Error: " + message, err+"", err);
}

exports.simpleResponse = simpleResponse;
exports.errorResponse = errorResponse;

linker.init().then(() => {
  if (config.useVirtualHosts) {
    const mainapp = express();
    const siteName = config.siteOrigin.split(":")[0];
    const contentName = config.contentOrigin.split(":")[0];
    mainapp.use(vhost(siteName, app));
    mainapp.use(vhost(contentName, contentApp));
    mainapp.listen(config.port);
    mainapp.get("/", function (req, res) {
      res.send("ok");
    });
    console.info(`virtual host server listening on http://localhost:${config.port}`);
    console.info(`  siteName="${siteName}"; contentName="${contentName}"`);
  } else {
    app.listen(config.port);
    console.info(`server listening on http://localhost:${config.port}/`);
    contentApp.listen(config.contentPort);
    console.info(`content server listening on http://localhost:${config.contentPort}/`);
  }
}).catch((err) => {
  console.error("Error getting revision:", err, err.stack);
});

require("./jobs").start();
