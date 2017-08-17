const config = require("./config").getProperties();
require("./logging").installConsoleHandler();
const mozlog = require("./logging").mozlog("server");
const path = require('path');
const { readFileSync, existsSync } = require('fs');
const Cookies = require("cookies");

const { Shot } = require("./servershot");
const {
  checkLogin,
  registerLogin,
  setState,
  checkState,
  tradeCode,
  getAccountId,
  registerAccount,
  fetchProfileData,
  saveProfileData,
  disconnectDevice,
  retrieveAccount
} = require("./users");
const dbschema = require("./dbschema");
const express = require("express");
const bodyParser = require('body-parser');
const contentDisposition = require("content-disposition");
const csrf = require("csurf");
const morgan = require("morgan");
const linker = require("./linker");
const { randomBytes } = require("./helpers");
const errors = require("./errors");
const buildTime = require("./build-time").string;
const ua = require("universal-analytics");
const urlParse = require("url").parse;
const urlResolve = require("url").resolve;
const http = require("http");
const https = require("https");
const gaActivation = require("./ga-activation");
const genUuid = require("nodify-uuid");
const statsd = require("./statsd");
const { notFound } = require("./pages/not-found/server");
const { cacheTime, setCache } = require("./caching");
const { captureRavenException, sendRavenMessage,
        addRavenRequestHandler, addRavenErrorHandler } = require("./ravenclient");
const { errorResponse, simpleResponse, jsResponse } = require("./responses");
const selfPackage = require("./package.json");
const { b64EncodeJson, b64DecodeJson } = require("./b64");
const { l10n } = require("./middleware/l10n");

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

const COOKIE_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days

function initDatabase() {
  let forceDbVersion = config.db.forceDbVersion;
  if (forceDbVersion) {
    let hadError = false;
    // eslint-disable-next-line promise/catch-or-return
    dbschema.forceDbVersion(forceDbVersion).then(() => {
    },
    (e) => {
      hadError = true;
      mozlog.error("database-version-update-error", {msg: "Error forcing database version:", dbVersion: forceDbVersion, error: e});
    }).then(() => {
      mozlog.info("database-version-update-exit", {msg: "Exiting after downgrade"});
      process.exit(hadError ? 2 : 0);
    });
    return;
  }
  let promise;
  if (config.disableControllerTasks) {
    mozlog.info("database-version-update-skipped", {msg: "Note: this server will not perform database initialization"});
    promise = dbschema.createKeygrip();
  } else {
    promise = dbschema.createTables().then(() => {
      return dbschema.createKeygrip();
    }).then(() => {
      return Shot.upgradeSearch();
    });
  }
  promise.catch((e) => {
    mozlog.error("database-version-update-error", {msg: "Error initializing database:", error: e, stack: e.stack});
    captureRavenException(e);
    // Give Raven/etc a chance to work before exit:
    setTimeout(() => {
      process.exit(1);
    }, 500);
  });
}

initDatabase();

const csrfProtection = csrf({cookie: true});

const app = express();

app.set('trust proxy', true);

// Disable x-powered-by header
app.disable("x-powered-by");

const CONTENT_NAME = config.contentOrigin || '';

function addHSTS(req, res) {
  // Note: HSTS will only produce warning on a localhost self-signed cert
  if (req.protocol === "https" && !config.localhostSsl) {
    let time = 24 * 60 * 60 * 1000; // 24 hours
    res.header(
      "Strict-Transport-Security",
      `max-age=${time}`);
  }
}

addRavenRequestHandler(app);

if (config.expectProtocol) {
  if (!/^https?$/.test(config.expectProtocol)) {
    throw new Error(`Error, bad EXPECT_PROTOCOL: ${config.expectProtocol}`);
  }
  app.use((req, res, next) => {
    req.headers["x-forwarded-proto"] = config.expectProtocol;
    next();
  });
}

app.use((req, res, next) => {
  genUuid.generate(genUuid.V_RANDOM, function(err, uuid) {
    if (!err) {
      let dsn = config.sentryPublicDSN;
      if (dsn) {
        dsn = dsn.replace(/^https?:\/\/[^@]*@/, "").replace(/\/.*/, "");
      } else {
        dsn = "";
      }
      req.cspNonce = uuid;
      res.header(
        "Content-Security-Policy",
        `default-src 'self'; img-src 'self' www.google-analytics.com ${CONTENT_NAME} data:; script-src 'self' www.google-analytics.com 'nonce-${uuid}'; style-src 'self' 'unsafe-inline' https://code.cdn.mozilla.net; connect-src 'self' www.google-analytics.com ${dsn}; font-src https://code.cdn.mozilla.net; frame-ancestors 'none'; object-src 'none';`);
      res.header("X-Frame-Options", "DENY");
      res.header("X-Content-Type-Options", "nosniff");
      addHSTS(req, res);
      next();
    } else {
      errorResponse(res, "Error creating nonce:", err);
    }
  });
});

function isApiUrl(url) {
  return url.startsWith("/api") || url === "/event";
}

app.use((req, res, next) => {
  if (isApiUrl(req.url)) {
    // All API requests are CORS-enabled
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Cookie, Content-Type, User-Agent");
    if (req.method === "OPTIONS") {
      res.type("text");
      res.send("");
      return;
    }
  }
  next();
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '25mb'}));

app.use("/static", express.static(path.join(__dirname, "static"), {
  index: false,
  maxAge: cacheTime ? cacheTime * 1000 : null
}));

let xpidir = path.join(__dirname, "..", "xpi");
app.use("/xpi", express.static(xpidir, {index: false}));

app.use("/homepage", express.static(path.join(__dirname, "static/homepage"), {
  index: false
}));

app.use(morgan("combined"));

app.use(function(req, res, next) {
  let authHeader = req.headers['x-screenshots-auth'];
  let authInfo = {};
  let cookies = new Cookies(req, res, {keys: dbschema.getKeygrip()});
  if (authHeader) {
    authInfo = decodeAuthHeader(authHeader);
  } else {
    authInfo.deviceId = cookies.get("user", {signed: true});
    authInfo.accountId = cookies.get("accountid", {signed: true});
    let abTests = cookies.get("abtests", {signed: true});
    if (abTests) {
      abTests = b64DecodeJson(abTests);
      authInfo.abTests = abTests;
    }
  }
  if (authInfo.deviceId) {
    req.deviceId = authInfo.deviceId;
    req.userAnalytics = ua(config.gaId, req.deviceId, {strictCidFormat: false});
    if (config.debugGoogleAnalytics) {
      req.userAnalytics = req.userAnalytics.debug();
    }
  }
  if (authInfo.accountId) {
    req.accountId = authInfo.accountId;
  }
  req.cookies = cookies;
  req.cookies._csrf = cookies.get("_csrf"); // csurf expects a property
  req.abTests = authInfo.abTests || {};
  const host = req.headers.host === config.contentOrigin ? config.contentOrigin : config.siteOrigin;
  req.backend = `${req.protocol}://${host}`;
  req.config = config;
  next();
});

function decodeAuthHeader(header) {
  /** Decode a string header in the format {deviceId}:{deviceIdSig};abtests={b64thing}:{sig} */
  // Since it's treated as opaque, we'll use a fragile regex
  let keygrip = dbschema.getKeygrip();
  let match = /^([^:]{1,255}):([^;]{1,255});abTests=([^:]{1,1500}):(.{0,255})$/.exec(header);
  if (!match) {
    let exc = new Error("Invalid auth header");
    exc.headerValue = header;
    captureRavenException(exc);
    return {};
  }
  let deviceId = match[1];
  let deviceIdSig = match[2];
  let abTestsEncoded = match[3];
  let abTestsEncodedSig = match[4];
  if (!keygrip.verify(deviceId, deviceIdSig)) {
    let exc = new Error("deviceId signature incorrect");
    exc.deviceIdLength = typeof deviceId == "string" ? deviceId.length : String(deviceId);
    exc.deviceIdSigLength = typeof deviceIdSig == "string" ? deviceIdSig.length : String(deviceIdSig);
    captureRavenException(exc);
    return {};
  }
  if (!keygrip.verify(abTestsEncoded, abTestsEncodedSig)) {
    let exc = new Error("abTests signature incorrect");
    exc.abTestsEncodedLength = typeof abTestsEncoded == "string" ? abTestsEncoded.length : String(abTestsEncoded);
    exc.abTestsEncodedSigLength = typeof abTestsEncodedSig == "string" ? abTestsEncodedSig.length : String(abTestsEncodedSig);
    captureRavenException(exc);
    return {};
  }
  let abTests = b64DecodeJson(abTestsEncoded);
  return {deviceId, abTests};
}

app.use(function(req, res, next) {
  req.staticLink = linker.staticLink.bind(null, {
    cdn: req.config.cdn
  });
  let base = `${req.protocol}://${config.contentOrigin}`;
  linker.imageLinkWithHost = linker.imageLink.bind(null, base);
  next();
});

app.use(l10n);

app.param("id", function(req, res, next, id) {
  if (/^[a-zA-Z0-9]{16}$/.test(id)) {
    next();
    return;
  }
  let exc = new Error("invalid id")
  exc.isAppError = true;
  exc.output = {
    statusCode: 400,
    payload: "Invalid id"
  };
  next(exc);
});

app.param("domain", function(req, res, next, domain) {
  if (/^[^\s/]{1,100}$/.test(domain)) {
    next();
    return;
  }
  next(new Error("invalid domain"));
});

app.get("/ga-activation.js", function(req, res) {
  sendGaActivation(req, res, false);
});

app.get("/ga-activation-hashed.js", function(req, res) {
  sendGaActivation(req, res, true);
});

function sendGaActivation(req, res, hashPage) {
  let promise;
  setCache(res, {private: true});
  if (req.deviceId) {
    promise = hashUserId(req.deviceId).then((uuid) => {
      return uuid.toString();
    });
  } else {
    promise = Promise.resolve("");
  }
  promise.then((userUuid) => {
    let script = gaActivation.makeGaActivationString(config.gaId, userUuid, req.abTests, hashPage);
    jsResponse(res, script);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
}

const parentHelperJs = readFileSync(path.join(__dirname, "/static/js/parent-helper.js"), {encoding: "UTF-8"});

app.get("/parent-helper.js", function(req, res) {
  setCache(res);
  let postMessageOrigin = `${req.protocol}://${req.config.contentOrigin}`;
  let script = `${parentHelperJs}\nvar CONTENT_HOSTING_ORIGIN = "${postMessageOrigin}";`
  jsResponse(res, script);
});

const ravenClientJs = readFileSync(require.resolve("raven-js/dist/raven.min"), {encoding: "UTF-8"});

app.get("/install-raven.js", function(req, res) {
  setCache(res);
  if (!req.config.sentryPublicDSN) {
    jsResponse(res, "");
    return;
  }
  let options = {
    environment: process.env.NODE_ENV || "dev",
    release: linker.getGitRevision(),
    serverName: req.backend
  };
  // FIXME: this monkeypatch is because our version of Raven (6.2) doesn't really work
  // with our version of Sentry (8.3.3)
  let script = `
  ${ravenClientJs}

  (function () {
    var old_captureException = Raven.captureException.bind(Raven);
    Raven.captureException = function (ex, options) {
      options = options || {};
      options.message = options.message || ex.message;
      return old_captureException(ex, options);
    };
  })();
  Raven.config("${req.config.sentryPublicDSN}", ${JSON.stringify(options)}).install();
  window.Raven = Raven;`;
  jsResponse(res, script);
});

app.get("/favicon.ico", function(req, res) {
  res.redirect(301, "/static/img/icon-32.png");
});

app.post("/error", function(req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
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
    value = value.replace(/[^a-z0-9_\-=+{}().,/?:[\]| ]/gi, "?");
    value = value.substr(0, 100);
    attrs.push(`${attr}:  ${value}`);
  }
  if (attrs.length) {
    desc += " - " + attrs.join("; ");
  }
  userAnalytics.exception({
    hitType: "exception",
    userAgentOverride: req.headers['user-agent'],
    applicationName: "firefox",
    applicationVersion: bodyObj.version,
    exceptionDescription: desc
  }).send();
  mozlog.info("remote-error", {msg: "Error received:", description: desc});
  simpleResponse(res, "OK", 200);
});

function hashUserId(deviceId) {
  return new Promise((resolve, reject) => {
    if (!dbschema.getTextKeys()) {
      throw new Error("Server keys not initialized");
    }
    let userKey = dbschema.getTextKeys()[0] + deviceId;
    genUuid.generate(genUuid.V_SHA1, genUuid.nil, userKey, function(err, userUuid) {
      if (err) {
        reject(err);
      } else {
        resolve(userUuid);
      }
    });
  });
}

app.post("/event", function(req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
  }
  // We allow clients to signal events with a deviceId even if they haven't logged in yet,
  // by putting deviceId into the request body:
  let deviceId = req.deviceId || bodyObj.deviceId;
  hashUserId(deviceId).then((userUuid) => {
    let userAnalytics = ua(config.gaId, userUuid.toString(), {strictCidFormat: false});
    if (config.debugGoogleAnalytics) {
      userAnalytics = userAnalytics.debug();
    }
    let params = Object.assign(
      {},
      bodyObj.options,
      {
        ec: bodyObj.event,
        ea: bodyObj.action,
        el: bodyObj.label,
        ev: bodyObj.eventValue
      }
    );
    if (req.headers["user-agent"]) {
      params.ua = req.headers["user-agent"];
    }
    userAnalytics.event(params).send();
    simpleResponse(res, "OK", 200);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
});

app.post("/api/register", function(req, res) {
  let vars = req.body;
  let canUpdate = vars.deviceId === req.deviceId;
  if (!vars.deviceId) {
    mozlog.error("bad-api-register", {msg: "Bad register request", vars: JSON.stringify(vars, null, "  ")});
    sendRavenMessage(req, "Attempted to register without deviceId");
    simpleResponse(res, "Bad request, no deviceId", 400);
    return;
  }
  registerLogin(vars.deviceId, {
    secret: vars.secret,
    nickname: vars.nickname || null,
    avatarurl: vars.avatarurl || null
  }, canUpdate).then(function(userAbTests) {
    if (userAbTests) {
      sendAuthInfo(req, res, {deviceId: vars.deviceId, userAbTests});
      // FIXME: send GA signal?
    } else {
      sendRavenMessage(req, "Attempted to register existing user", {
        extra: {
          hasSecret: !!vars.secret,
          hasNickname: !!vars.nickname,
          hasAvatarurl: !!vars.avatarurl
        }
      });
      simpleResponse(res, "User exists", 401);
    }
  }).catch(function(err) {
    errorResponse(res, "Error registering:", err);
  });
});

function sendAuthInfo(req, res, params) {
  let { deviceId, accountId, userAbTests } = params;
  if (deviceId.search(/^[a-zA-Z0-9_-]{1,255}$/) == -1) {
    let exc = new Error("Bad deviceId in login");
    exc.deviceId = deviceId;
    captureRavenException(exc);
    throw new Error("Bad deviceId");
  }
  let encodedAbTests = b64EncodeJson(userAbTests);
  let keygrip = dbschema.getKeygrip();
  let cookies = new Cookies(req, res, {keys: keygrip});
  cookies.set("user", deviceId, {signed: true, sameSite: 'lax', maxAge: COOKIE_EXPIRE_TIME});
  if (accountId) {
    cookies.set("accountid", accountId, {signed: true, sameSite: 'lax', maxAge: COOKIE_EXPIRE_TIME});
  }
  cookies.set("abtests", encodedAbTests, {signed: true, sameSite: 'lax', maxAge: COOKIE_EXPIRE_TIME});
  let authHeader = `${deviceId}:${keygrip.sign(deviceId)};abTests=${encodedAbTests}:${keygrip.sign(encodedAbTests)}`;
  let responseJson = {
    ok: "User created",
    sentryPublicDSN: config.sentryPublicDSN,
    abTests: userAbTests,
    authHeader,
    isOwner: params.isOwner
  };
  // FIXME: I think there's a JSON sendResponse equivalent
  simpleResponse(res, JSON.stringify(responseJson), 200);
}


app.post("/api/login", function(req, res) {
  let vars = req.body;
  let deviceInfo = {};
  try {
    deviceInfo = JSON.parse(vars.deviceInfo);
  } catch (e) {
    if (e instanceof SyntaxError) {
      // JSON isn't valid
      deviceInfo = {};
    } else {
      throw e;
    }
  }
  checkLogin(vars.deviceId, vars.secret, deviceInfo.addonVersion).then((userAbTests) => {
    if (userAbTests) {
      let sendParams = {
        deviceId: vars.deviceId,
        userAbTests
      };
      let sendParamsPromise = Promise.resolve(sendParams);
      retrieveAccount(vars.deviceId).then((accountId) => {
        return sendParams.accountId = accountId;
      }).then((accountId) => {
        if (vars.ownershipCheck) {
          sendParamsPromise = Shot.checkOwnership(vars.ownershipCheck, vars.deviceId, accountId).then((isOwner) => {
            sendParams.isOwner = isOwner;
            return sendParams;
          });
        }
        sendParamsPromise.then((params) => {
          sendAuthInfo(req, res, params);
        }).catch((error) => {
          errorResponse(res, "Error checking ownership", error);
        });
      }).catch((error) => {
        errorResponse(res, "Error retrieving account", error);
      });
      if (config.gaId) {
        let userAnalytics = ua(config.gaId, vars.deviceId, {strictCidFormat: false});
        userAnalytics.event({
          ec: "server",
          ea: "api-login",
          ua: req.headers["user-agent"],
          ni: true
        }).send();
      }
    } else if (!userAbTests) {
      simpleResponse(res, '{"error": "No such user"}', 404);
    } else {
      sendRavenMessage(req, "Invalid login");
      simpleResponse(res, '{"error": "Invalid login"}', 401);
    }
  }).catch(function(err) {
    errorResponse(res, JSON.stringify({"error": `Error in login: ${err}`}), err);
  });
});

app.put("/data/:id/:domain", function(req, res) {
  let slowResponse = config.testing.slowResponse;
  let failSometimes = config.testing.failSometimes;
  if (failSometimes && Math.floor(Math.random() * failSometimes)) {
    console.log("Artificially making request fail"); // eslint-disable-line no-console
    res.status(500);
    res.end();
    return;
  }
  let bodyObj = req.body;
  if (typeof bodyObj != "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
  }
  let shotId = `${req.params.id}/${req.params.domain}`;
  if (!req.deviceId) {
    mozlog.warn("put-without-auth", {msg: "Attempted to PUT without logging in", url: req.url});
    sendRavenMessage(req, "Attempt PUT without authentication");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  let shot = new Shot(req.deviceId, req.backend, shotId, bodyObj);
  let responseDelay = Promise.resolve()
  if (slowResponse) {
    responseDelay = new Promise((resolve) => {
      setTimeout(resolve, slowResponse);
    });
  }
  responseDelay.then(() => {
    return shot.insert();
  }).then((inserted) => {
    if (!inserted) {
      return shot.update();
    }
    return inserted;
  }).then((commands) => {
    if (!commands) {
      mozlog.warn("invalid-put-update", {msg: "Attempt to PUT to existing shot by non-owner", ip: req.ip});
      simpleResponse(res, 'No shot updated', 403);
      return;
    }
    commands = commands || [];
    simpleResponse(res, JSON.stringify({updates: commands.filter((x) => !!x)}), 200);
  }).catch((err) => {
    errorResponse(res, "Error saving Object:", err);
  });
});

app.get("/data/:id/:domain", function(req, res) {
  if (!req.deviceId) {
    res.status(404).send("Not found");
    return;
  }
  let shotId = `${req.params.id}/${req.params.domain}`;
  // FIXME: maybe we should allow for accountId here too:
  Shot.getRawValue(shotId, req.deviceId).then((data) => {
    if (!data) {
      simpleResponse(res, "No such shot", 404);
    } else {
      let value = data.value;
      value = JSON.parse(value);
      value = JSON.stringify(value);
      if ('format' in req.query) {
        value = JSON.stringify(JSON.parse(value), null, '  ');
      }
      res.header("Content-Type", "application/json");
      res.send(value);
    }
  }).catch(function(err) {
    errorResponse(res, "Error serving data:", err);
  });
});

app.post("/api/delete-shot", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to delete shot without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  Shot.deleteShot(req.backend, req.body.id, req.deviceId, req.accountId).then((result) => {
    if (result) {
      simpleResponse(res, "ok", 200);
    } else {
      sendRavenMessage(req, "Attempt to delete shot that does not exist");
      simpleResponse(res, "No such shot", 404);
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not delete shot", err);
  });
});

app.post("/api/disconnect-device", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to disconnect without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  disconnectDevice(req.deviceId).then((result) => {
    let keygrip = dbschema.getKeygrip();
    let cookies = new Cookies(req, res, {keys: keygrip});
    if (result) {
      cookies.set("accountid");
      res.redirect('/settings');
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not disconnect", err);
  });
});

app.post("/api/set-title/:id/:domain", csrfProtection, function(req, res) {
  let shotId = `${req.params.id}/${req.params.domain}`;
  let userTitle = req.body.title;
  if (userTitle === undefined) {
    simpleResponse(res, "No title given", 400);
    return;
  }
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to set title on shot without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  Shot.get(req.backend, shotId, req.deviceId, req.accountId).then((shot) => {
    if (!shot) {
      simpleResponse(res, "No such shot", 404);
      return;
    }
    shot.userTitle = userTitle;
    return shot.update();
  }).then((updated) => {
    simpleResponse(res, "Updated", 200);
  }).catch((err) => {
    errorResponse(res, "Error updating title", err);
  });
});

app.post("/api/set-expiration", csrfProtection, function(req, res) {
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to set expiration without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  let shotId = req.body.id;
  let expiration = parseInt(req.body.expiration, 10);
  if (expiration < 0) {
    sendRavenMessage(req, "Attempt negative expiration", {extra: {expiration}});
    simpleResponse(res, "Error: negative expiration", 400);
    return;
  }
  if (isNaN(expiration)) {
    sendRavenMessage(req, "Set expiration to non-number", {extra: {rawExpiration: req.body.expiration}});
    simpleResponse(res, `Error: bad expiration (${req.body.expiration})`, 400);
    return;
  }
  Shot.setExpiration(req.backend, shotId, req.deviceId, expiration, req.accountId).then((result) => {
    if (result) {
      simpleResponse(res, "ok", 200);
    } else {
      sendRavenMessage(req, "Attempt to set expiration on shot that does not exist");
      simpleResponse(res, "No such shot", 404);
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not set expiration on shot", err);
  });
});

app.get("/images/:imageid", function(req, res) {
  let embedded = req.query.embedded;
  let download = req.query.download;
  let sig = req.query.sig;
  Shot.getRawBytesForClip(
    req.params.imageid
  ).then((obj) => {
    if (obj === null) {
      notFound(req, res);
    } else {
      let localReferrer = false;
      if (req.headers["referer"]) {
        localReferrer = req.headers["referer"].startsWith(req.backend);
      }
      if (!localReferrer) {
        let hasher = require("crypto").createHash("sha1");
        hasher.update(req.params.imageid);
        let hashedId = hasher.digest("hex").substr(0, 15);
        let analyticsUrl = `/images/${embedded ? 'embedded/' : ''}hash${encodeURIComponent(hashedId)}`;
        let analytics = req.userAnalytics;
        if (!analytics) {
          analytics = ua(config.gaId);
          if (config.debugGoogleAnalytics) {
            analytics = analytics.debug();
          }
        }
        const view = embedded ? "direct-view-embedded" : "direct-view";
        const el = view + (obj.ownerId === req.deviceId ? "-owner" : "-non-owner");
        analytics.pageview({
          dp: analyticsUrl,
          dh: req.backend,
          documentReferrer: req.headers["referer"],
          ua: req.headers["user-agent"]
        }).event({
          ec: "web",
          ea: "visit",
          el
        }).send();
      }
      res.header("Content-Type", "image/png");
      if (download) {
        if (dbschema.getKeygrip().verify(new Buffer(download, 'utf8'), sig)) {
          res.header("Content-Disposition", contentDisposition(download));
        }
      }
      res.status(200);
      res.send(obj.data);
    }
  }).catch((e) => {
    errorResponse(res, "Error getting image from database:", e);
  });
});

app.get("/__version__", function(req, res) {
  let response = {
    source: "https://github.com/mozilla-services/screenshots/",
    description: "Firefox Screenshots application server",
    version: selfPackage.version,
    buildDate: buildTime,
    commit: linker.getGitRevision(),
    contentOrigin: config.contentOrigin,
    commitLog: `https://github.com/mozilla-services/screenshots/commits/${linker.getGitRevision()}`,
    unincludedCommits: `https://github.com/mozilla-services/screenshots/compare/${linker.getGitRevision()}...master`,
    dbSchemaVersion: dbschema.MAX_DB_LEVEL
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(JSON.stringify(response, null, '  '));
});

// This is a minimal heartbeat that only indicates the server process is up and responding
app.get("/__lbheartbeat__", function(req, res) {
  res.send("OK");
});

// This tests if the server is really working
app.get("/__heartbeat__", function(req, res) {
  dbschema.connectionOK().then((ok) => {
    if (!ok) {
      statsd.increment("heartbeat.fail");
      res.status(500).send("schema fail");
    } else {
      statsd.increment("heartbeat.pass");
      res.send("OK");
    }
  }).catch((error) => {
    statsd.increment("heartbeat.fail");
    res.status(500).send("database fail");
  });
});

app.get("/contribute.json", function(req, res) {
  let data = {
    name: "Firefox Screenshots",
    description: "Firefox Screenshots is an add-on for Firefox and a service for screenshots",
    repository: {
      url: "https://github.com/mozilla-services/screenshots/",
      license: "MPL2",
      tests: "https://circleci.com/gh/mozilla-services/screenshots"
    },
    participate: {
      home: "https://github.com/mozilla-services/screenshots/",
      irc: "irc://irc.mozilla.org/#screenshots",
      "irc-contacts": ["ianbicking", "fzzzy"]
    },
    bugs: {
      list: "https://github.com/mozilla-services/screenshots/issues",
      report: "https://github.com/mozilla-services/screenshots/issues/new",
      goodfirstbugs: "https://github.com/mozilla-services/screenshots/labels/good%20first%20bug"
    },
    urls: {
      prod: "https://screenshots.firefox.com",
      stage: "https://screenshots.stage.mozaws.net",
      dev: "https://screenshots.dev.mozaws.net"
    },
    keywords: [
      "javascript",
      "node",
      "express",
      "react",
      "postgresql",
      "firefox"
    ]
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(JSON.stringify(data, null, '  '));
});

app.get("/oembed", function(req, res) {
  let url = req.query.url;
  if (!url) {
    simpleResponse(req, "No ?url given", 400);
    return;
  }
  let format = req.query.format || "json";
  if (format !== "json") {
    simpleResponse(res, "Only JSON OEmbed is supported", 501);
    return;
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
  if (!url.startsWith(backend)) {
    simpleResponse(res, `Error: URL is not hosted here (${req.backend})`, 501);
    return;
  }
  url = url.substr(backend.length);
  let match = /^\/{0,255}([^/]{1,255})\/([^/]{1,255})/.exec(url);
  if (!match) {
    simpleResponse(res, "Error: not a Shot url", 404);
    return;
  }
  let shotId = match[1] + "/" + match[2];
  Shot.get(req.backend, shotId).then((shot) => {
    if (!shot) {
      notFound(req, res);
      return;
    }
    let body = shot.oembedJson({maxheight, maxwidth});
    res.header("Content-Type", "application/json");
    res.send(body);
  }).catch((e) => {
    errorResponse(res, "Error fetching shot for OEmbed:", e);
  });
});

// Get OAuth client params for the client-side authorization flow.

app.get('/api/fxa-oauth/login', function(req, res, next) {
  if (!req.deviceId) {
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
    let redirectUri = `${req.backend}/api/fxa-oauth/confirm-login`;
    let profile = "profile profile:displayName profile:email profile:avatar profile:uid";
    res.redirect(`${config.fxa.oAuthServer}/authorization?client_id=${encodeURIComponent(config.fxa.clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(profile)}`);
  }).catch(next);
});

app.get('/api/fxa-oauth/confirm-login', function(req, res, next) {
  if (!req.deviceId) {
    next(errors.missingSession());
    return;
  }
  if (!req.query) {
    next(errors.missingParams());
    return;
  }
  let { code, state } = req.query;
  checkState(req.deviceId, state).then(isValid => {
    if (!isValid) {
      throw errors.badState();
    }
    return tradeCode(code);
  }).then(({ access_token: accessToken }) => {
    return getAccountId(accessToken).then(({ uid: accountId }) => {
      return registerAccount(req.deviceId, accountId, accessToken).then(() => {
        return fetchProfileData(accessToken).then(({ avatar, displayName, email }) => {
          return saveProfileData(accountId, avatar, displayName, email);
        }).then(() => {
          if (config.gaId) {
            let analytics = ua(config.gaId);
            analytics.event({
              ec: "server",
              ea: "fxa-login",
              ua: req.headers["user-agent"],
            }).send();
          }
          res.redirect('/settings');
        });
      }).catch(next);
    }).catch(next);
  }).catch(next);
});

if (!config.disableMetrics) {
  app.use("/metrics", require("./pages/metrics/server").app);
}

app.use("/shots", require("./pages/shotindex/server").app);

app.use("/leave-screenshots", require("./pages/leave-screenshots/server").app);

app.use("/creating", require("./pages/creating/server").app);

app.use("/settings", require("./pages/settings/server").app);

app.use("/", require("./pages/shot/server").app);

app.use("/", require("./pages/homepage/server").app);

app.get("/proxy", function(req, res) {
  let stringUrl = req.query.url;
  let sig = req.query.sig;
  let isValid = dbschema.getKeygrip().verify(new Buffer(stringUrl, 'utf8'), sig);
  if (!isValid) {
    sendRavenMessage(req, "Bad signature on proxy", {extra: {proxyUrl: url, sig}});
    simpleResponse(res, "Bad signature", 403);
    return;
  }
  let url = urlParse(stringUrl);
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
    host,
    port: url.port,
    method: "GET",
    path: url.path,
    headers
  });
  subreq.on("response", function(subres) {
    let headers = {};
    for (let h in subres.headers) {
      if (PROXY_HEADER_WHITELIST[h]) {
        headers[h] = subres.headers[h];
      }
    }
    if (subres.headers.location) {
      let location = urlResolve(stringUrl, subres.headers.location);
      headers.location = require("./proxy-url").createProxyUrl(req, location);
    }
    // Cache for 30 days
    headers["cache-control"] = "public, max-age=2592000";
    headers["expires"] = new Date(Date.now() + 2592000000).toUTCString();
    res.writeHead(subres.statusCode, subres.statusMessage, headers);

    subres.on("data", function(chunk) {
      res.write(chunk);
    });
    subres.on("end", function() {
      res.end();
    });
    subres.on("error", function(err) {
      errorResponse(res, "Error getting response:", err);
    });
  });
  subreq.on("error", function(err) {
    errorResponse(res, "Error fetching:", err);
  });
  subreq.end();
});

let httpsCredentials;
if (config.localhostSsl) {
  // To generate trusted keys on Mac, see: https://certsimple.com/blog/localhost-ssl-fix
  let key = `${process.env.HOME}/.localhost-ssl/key.pem`;
  let cert = `${process.env.HOME}/.localhost-ssl/cert.pem`;
  if (!(existsSync(key) && existsSync(cert))) {
    /* eslint-disable no-console */
    console.log("Error: to use localhost SSL/HTTPS you must create a key.pem and cert.pem file");
    console.log("  These must be located in:");
    console.log(`    ${key}`);
    console.log(`    ${cert}`);
    console.log("  You can find instructions on creating these files here:");
    console.log("    https://certsimple.com/blog/localhost-ssl-fix");
    /* eslint-enable no-console */
    process.exit(2);
  }
  httpsCredentials = {
    key: readFileSync(key),
    cert: readFileSync(cert)
  };
}

linker.init().then(() => {
  let server;
  let scheme;
  if (httpsCredentials) {
    server = https.createServer(httpsCredentials, app);
    scheme = "https";
  } else {
    server = http.createServer(app);
    scheme = "http";
  }
  server.listen(config.port);
  mozlog.info("server-started", {msg: `server listening on ${scheme}://localhost:${config.port}/`});
}).catch((err) => {
  mozlog.error("git-revision-error", {msg: "Error getting git revision", error: err, stack: err.stack});
});

require("./jobs").start();

addRavenErrorHandler(app);

app.use(function(err, req, res, next) {
  if (err.isAppError) {
    let { statusCode, headers, payload } = err.output;
    res.status(statusCode);
    if (headers) {
      res.header(headers);
    }
    res.send(payload);
    return;
  }
  if (err.type === "entity.too.large") {
    mozlog.info("entity-too-large", {
      length: err.length,
      limit: err.limit,
      expected: err.expected
    });
    res.status(err.statusCode);
    res.type("text");
    res.send(res.message);
    return;
  }
  if (err.code === "EBADCSRFTOKEN") {
    mozlog.info("bad-csrf", {id: req.ip, url: req.url});
    res.status(403);
    res.type("text");
    res.send("Bad CSRF Token")
    return;
  }
  errorResponse(res, "General error:", err);
});

/* General 404 handler: */
app.use(function(req, res, next) {
  notFound(req, res);
});
