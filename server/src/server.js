const config = require("./config").getProperties();
require("./logging").installConsoleHandler();
const mozlog = require("./logging").mozlog("server");
const path = require("path");
const { readFileSync, existsSync } = require("fs");
const Cookies = require("cookies");
const { URL } = require("url");
const Watchdog = require("./watchdog");

let istanbulMiddleware = null;
if (config.enableCoverage && process.env.NODE_ENV === "dev") {
    istanbulMiddleware = require("istanbul-middleware");
    mozlog.info("coverage-hook-enabled", {msg: "Hook loader for coverage - ensure this is not production!"});
    istanbulMiddleware.hookLoader(__dirname); // cover all files except under node_modules
}

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
  retrieveAccount,
  isValidDeviceId,
} = require("./users");
const dbschema = require("./dbschema");
const express = require("express");
const bodyParser = require("body-parser");
const contentDisposition = require("content-disposition");
const { csrfProtection, csrfErrorResponse } = require("./middleware/csrf");
const morgan = require("morgan");
const linker = require("./linker");
const { randomBytes } = require("./helpers");
const errors = require("./errors");
const buildTime = require("./build-time").string;
const ua = require("universal-analytics");
const http = require("http");
const https = require("https");
const gaActivation = require("./ga-activation");
const genUuid = require("nodify-uuid");
const statsd = require("./statsd");
const { notFound } = require("./pages/not-found/server");
const { setMonthlyCache, setDailyCache, doNotCache } = require("./caching");
const { captureRavenException, sendRavenMessage,
        addRavenRequestHandler, addRavenErrorHandler } = require("./ravenclient");
const { errorResponse, simpleResponse, jsResponse } = require("./responses");
const selfPackage = require("./package.json");
const { b64EncodeJson, b64DecodeJson } = require("./b64");
const { l10n } = require("./middleware/l10n");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage});
const { isValidClipImageUrl } = require("../shared/shot");
const urlParse = require("url").parse;
const { updateAbTests } = require("./ab-tests");

const COOKIE_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days

function initDatabase() {
  const forceDbVersion = config.db.forceDbVersion;
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

const app = express();

app.set("trust proxy", true);

// Disable x-powered-by header
app.disable("x-powered-by");

if (config.enableCoverage && istanbulMiddleware) {
    // enable coverage endpoints under /coverage
    app.use("/coverage", istanbulMiddleware.createHandler());
}

const SITE_CDN = (config.siteCdn && (new URL(config.siteCdn)).host) || "";
const CONTENT_NAME = config.contentOrigin || "";
const CONTENT_CDN = (config.contentCdn && (new URL(config.contentCdn)).host) || "";
const FXA_SERVER = config.fxa.profileServer && require("url").parse(config.fxa.profileServer).host;

function addHSTS(req, res) {
  // Note: HSTS will only produce warning on a localhost self-signed cert
  if (req.protocol === "https" && !config.localhostSsl) {
    const time = 24 * 60 * 60; // 24 hours
    res.header(
      "Strict-Transport-Security",
      `max-age=${time}`);
  }
}

app.use((req, res, next) => {
  res.header("X-Content-Type-Options", "nosniff");
  addHSTS(req, res);
  next();
});

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

function isApiUrl(url) {
  return url.startsWith("/api") || url === "/event" || url === "/timing";
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
app.use(bodyParser.json({limit: config.requestBodySizeLimit}));

app.use(
  "/static",
  function(req, res, next) {
    if (req.query.rev && req.query.rev === linker.getGitRevision()) {
      setMonthlyCache(res);
    } else {
      doNotCache(res);
    }
    next();
  },
  express.static(path.join(__dirname, "static"), {index: false})
);

const xpidir = path.join(__dirname, "..", "xpi");
app.use("/xpi", express.static(xpidir, {index: false}));

app.use(morgan("combined"));

app.use(function(req, res, next) {
  const authHeader = req.headers["x-screenshots-auth"];
  let authInfo = {};
  const cookies = new Cookies(req, res, {keys: dbschema.getKeygrip("auth")});
  if (authHeader) {
    authInfo = decodeAuthHeader(authHeader);
  } else {
    authInfo.deviceId = cookies.get("user", {signed: true});
    authInfo.accountId = cookies.get("accountid", {signed: true});
    const encodedAbTests = cookies.get("abtests", {signed: true});
    let abTests;
    if (encodedAbTests) {
      abTests = b64DecodeJson(encodedAbTests);
    }
    if (!authInfo.deviceId) {
      // Authenticated users get A/B tests when they register/login, but unauthenticated
      // users have to get it lazily
      const origAbTests = Object.assign({}, abTests);
      abTests = updateAbTests(abTests || {}, null, true);
      if (Object.keys(abTests).length) {
        // Only send if there's some test
        const newEncodedAbTests = b64EncodeJson(abTests);
        if (encodedAbTests !== newEncodedAbTests) {
          cookies.set("abtests", newEncodedAbTests, {signed: true, sameSite: "lax", maxAge: COOKIE_EXPIRE_TIME});
        }
      } else if (Object.keys(origAbTests).length) {
        // All the A/B tests were removed (probably because the tests have been
        // deprecated), but the user has an old A/B test. Therefore we should
        // delete the cookie
        cookies.set("abtests", "", {signed: true, sameSite: "lax", maxAge: 0});
      }
    }
    authInfo.abTests = abTests;
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
  req.abTests = authInfo.abTests || {};
  const host = req.headers.host === config.contentOrigin ? config.contentOrigin : config.siteOrigin;
  req.backend = `${req.protocol}://${host}`;
  req.config = config;
  next();
});

// NOTE - the csrf middleware should come after the middleware that
// assigns req.cookies.
app.use(csrfProtection);

function decodeAuthHeader(header) {
  /** Decode a string header in the format {deviceId}:{deviceIdSig};abtests={b64thing}:{sig} */
  // Since it's treated as opaque, we'll use a fragile regex
  const keygrip = dbschema.getKeygrip("auth");
  const match = /^([^:]{1,255}):([^;]{1,255});abTests=([^:]{1,1500}):(.{0,255})$/.exec(header);
  if (!match) {
    const exc = new Error("Invalid auth header");
    exc.headerValue = header;
    captureRavenException(exc);
    return {};
  }
  const deviceId = match[1];
  const deviceIdSig = match[2];
  const abTestsEncoded = match[3];
  const abTestsEncodedSig = match[4];
  if (!keygrip.verify(deviceId, deviceIdSig)) {
    const exc = new Error("deviceId signature incorrect");
    exc.deviceIdLength = typeof deviceId === "string" ? deviceId.length : String(deviceId);
    exc.deviceIdSigLength = typeof deviceIdSig === "string" ? deviceIdSig.length : String(deviceIdSig);
    captureRavenException(exc);
    return {};
  }
  if (!keygrip.verify(abTestsEncoded, abTestsEncodedSig)) {
    const exc = new Error("abTests signature incorrect");
    exc.abTestsEncodedLength = typeof abTestsEncoded === "string" ? abTestsEncoded.length : String(abTestsEncoded);
    exc.abTestsEncodedSigLength = typeof abTestsEncodedSig === "string" ? abTestsEncodedSig.length : String(abTestsEncodedSig);
    captureRavenException(exc);
    return {};
  }
  const abTests = b64DecodeJson(abTestsEncoded);
  return {deviceId, abTests};
}

app.use(function(req, res, next) {
  req.staticLink = linker.staticLink.bind(null, {
    cdn: req.config.siteCdn,
  });
  // The contentCdn config does not have a default value but contentOrigin does.
  const base = config.contentCdn || `${req.protocol}://${config.contentOrigin}`;
  linker.imageLinkWithHost = linker.imageLink.bind(null, base);
  next();
});

app.use(l10n);

app.param("id", function(req, res, next, id) {
  if (/^[a-zA-Z0-9]{16}$/.test(id)) {
    next();
    return;
  }
  const exc = new Error("invalid id");
  exc.isAppError = true;
  exc.output = {
    statusCode: 400,
    payload: "Invalid id",
  };
  next(exc);
});

app.param("domain", function(req, res, next, domain) {
  if (/^[^\s/]{1,252}$/.test(domain)) {
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
  setMonthlyCache(res, {private: true});
  if (req.deviceId) {
    promise = hashUserId(req.deviceId).then((uuid) => {
      return uuid.toString();
    });
  } else {
    promise = Promise.resolve("");
  }
  promise.then((userUuid) => {
    const script = gaActivation.makeGaActivationString(config.gaId, userUuid, req.abTests, hashPage);
    jsResponse(res, script);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
}

const parentHelperJs = readFileSync(path.join(__dirname, "/static/js/parent-helper.js"), {encoding: "UTF-8"});

app.get("/parent-helper.js", function(req, res) {
  setMonthlyCache(res);
  const postMessageOrigin = `${req.protocol}://${req.config.contentOrigin}`;
  const script = `${parentHelperJs}\nvar CONTENT_HOSTING_ORIGIN = "${postMessageOrigin}";`;
  jsResponse(res, script);
});

const ravenClientJs = readFileSync(require.resolve("raven-js/dist/raven.min"), {encoding: "UTF-8"});

app.get("/install-raven.js", function(req, res) {
  setMonthlyCache(res);
  if (!req.config.sentryPublicDSN) {
    jsResponse(res, "");
    return;
  }
  const options = {
    environment: process.env.NODE_ENV || "dev",
    release: linker.getGitRevision(),
    sanitizeKeys: ["url"],
    serverName: req.backend,
  };
  const script = `
  ${ravenClientJs}
  Raven.config("${req.config.sentryPublicDSN}", ${JSON.stringify(options)}).install();
  window.Raven = Raven;`;
  jsResponse(res, script);
});

app.get("/favicon.ico", function(req, res) {
  res.redirect(301, "/static/img/icon-32.png");
});

app.post("/error", function(req, res) {
  const bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
  }
  const userAnalytics = ua(config.gaId);
  let desc = bodyObj.name;
  const attrs = [];
  for (const attr in bodyObj) {
    if (attr === "name" || attr === "help" || attr === "version") {
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
    userAgentOverride: req.headers["user-agent"],
    applicationName: "firefox",
    applicationVersion: bodyObj.version,
    exceptionDescription: desc,
  }).send();
  mozlog.info("remote-error", {msg: "Error received:", description: desc});
  simpleResponse(res, "OK", 200);
});

function hashUserId(deviceId) {
  return new Promise((resolve, reject) => {
    if (!dbschema.getTextKeys("ga-user-nonce")) {
      throw new Error("Server keys not initialized");
    }
    const userKey = dbschema.getTextKeys("ga-user-nonce")[0] + deviceId;
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
  const bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
  }
  // We allow clients to signal events with a deviceId even if they haven't logged in yet,
  // by putting deviceId into the request body:
  const deviceId = req.deviceId || bodyObj.deviceId;
  let events;

  if (bodyObj.events) {
    events = bodyObj.events;
  } else {
    events = [bodyObj];
  }

  hashUserId(deviceId).then((userUuid) => {
    let userAnalytics = ua(config.gaId, userUuid.toString(), {strictCidFormat: false});
    if (config.debugGoogleAnalytics) {
      userAnalytics = userAnalytics.debug();
    }
    events.forEach(event => {
      const params = Object.assign(
        {},
        event.options,
        {
          ec: event.event,
          ea: event.action,
          el: event.label,
          ev: event.eventValue,
          qt: (event.queueTime || 0),
        }
      );
      if (req.headers["user-agent"]) {
        params.ua = req.headers["user-agent"];
      }
      userAnalytics.event(params);
    });
    userAnalytics.send();
    simpleResponse(res, "OK", 200);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
});

app.post("/timing", function(req, res) {
  const bodyObj = req.body;
  if (typeof bodyObj !== "object") {
    throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
  }

  const deviceId = req.deviceId || bodyObj.deviceId;
  let timings;

  if (bodyObj.timings) {
    timings = bodyObj.timings;
  } else {
    timings = [bodyObj];
  }

  hashUserId(deviceId).then((userUuid) => {
    let userAnalytics = ua(config.gaId, userUuid.toString(), {strictCidFormat: false});
    if (config.debugGoogleAnalytics) {
      userAnalytics = userAnalytics.debug();
    }
    timings.forEach(timing => {
      const params = {
        userTimingCategory: timing.timingCategory,
        userTimingVariableName: timing.timingVar,
        userTimingTime: timing.timingValue,
        userTimingLabel: timing.timingLabel,
      };
      userAnalytics.timing(params);
    });
    userAnalytics.send();
    simpleResponse(res, "OK", 200);
  }).catch((e) => {
    errorResponse(res, "Error creating user UUID:", e);
  });
});

app.post("/api/register", function(req, res) {
  const vars = req.body;
  const canUpdate = vars.deviceId === req.deviceId;
  if (!vars.deviceId) {
    mozlog.error("bad-api-register", {msg: "Bad register request", vars: JSON.stringify(vars, null, "  ")});
    sendRavenMessage(req, "Attempted to register without deviceId");
    simpleResponse(res, "Bad request, no deviceId", 400);
    return;
  }
  if (!isValidDeviceId(vars.deviceId)) {
    mozlog.error("bad-api-register", {msg: "Bad register request", vars: JSON.stringify(vars, null, "  ")});
    sendRavenMessage(req, "Attempted to register with invalid deviceId");
    simpleResponse(res, "Bad request, invalid deviceId", 400);
    return;
  }
  if (!vars.secret) {
    mozlog.error("bad-api-register", {msg: "Bad register request", vars: JSON.stringify(vars, null, "  ")});
    sendRavenMessage(req, "Attempted to register without secret");
    simpleResponse(res, "Bad request, no secret", 400);
    return;
  }
  registerLogin(vars.deviceId, {
    secret: vars.secret,
    nickname: vars.nickname || null,
    avatarurl: vars.avatarurl || null,
  }, canUpdate).then(function(userAbTests) {
    if (userAbTests) {
      sendAuthInfo(req, res, {deviceId: vars.deviceId, userAbTests});
      // FIXME: send GA signal?
    } else {
      sendRavenMessage(req, "Attempted to register existing user", {
        extra: {
          hasSecret: !!vars.secret,
          hasNickname: !!vars.nickname,
          hasAvatarurl: !!vars.avatarurl,
        },
      });
      simpleResponse(res, "User exists", 401);
    }
  }).catch(function(err) {
    errorResponse(res, "Error registering:", err);
  });
});

function sendAuthInfo(req, res, params) {
  const { deviceId, accountId, userAbTests } = params;
  if (deviceId.search(/^[a-zA-Z0-9_-]{1,255}$/) === -1) {
    const exc = new Error("Bad deviceId in login");
    exc.deviceId = deviceId;
    captureRavenException(exc, req);
    throw new Error("Bad deviceId");
  }
  const encodedAbTests = b64EncodeJson(userAbTests);
  const keygrip = dbschema.getKeygrip("auth");
  const cookies = new Cookies(req, res, {keys: keygrip});
  cookies.set("user", deviceId, {signed: true, sameSite: "lax", maxAge: COOKIE_EXPIRE_TIME});
  if (accountId) {
    cookies.set("accountid", accountId, {signed: true, sameSite: "lax", maxAge: COOKIE_EXPIRE_TIME});
  }
  cookies.set("abtests", encodedAbTests, {signed: true, sameSite: "lax", maxAge: COOKIE_EXPIRE_TIME});
  const authHeader = `${deviceId}:${keygrip.sign(deviceId)};abTests=${encodedAbTests}:${keygrip.sign(encodedAbTests)}`;
  const responseJson = {
    ok: "User created",
    sentryPublicDSN: config.sentryPublicDSN,
    abTests: userAbTests,
    authHeader,
    isOwner: params.isOwner,
    accountId,
  };
  // FIXME: I think there's a JSON sendResponse equivalent
  simpleResponse(res, JSON.stringify(responseJson), 200);
}


app.post("/api/login", function(req, res) {
  const vars = req.body;
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
  if (!vars.secret) {
    mozlog.error("bad-api-login", {msg: "Bad login request", vars: JSON.stringify(vars, null, "  ")});
    sendRavenMessage(req, "Attempted to login without secret");
    simpleResponse(res, "Bad request", 400);
    return;
  }
  checkLogin(vars.deviceId, vars.secret, deviceInfo.addonVersion).then((userAbTests) => {
    if (userAbTests) {
      const sendParams = {
        deviceId: vars.deviceId,
        userAbTests,
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
        const userAnalytics = ua(config.gaId, vars.deviceId, {strictCidFormat: false});
        userAnalytics.event({
          ec: "server",
          ea: "api-login",
          ua: req.headers["user-agent"],
          ni: true,
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

app.post("/api/set-login-cookie", function(req, res) {
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to set login cookie without authentication");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  sendAuthInfo(req, res, {
    deviceId: req.deviceId,
    accountId: req.accountId,
    userAbTests: req.abTests,
  });
});

/** This endpoint is used by the site to confirm if the cookie was set */
app.get("/api/check-login-cookie", function(req, res) {
  if (req.deviceId) {
    simpleResponse(res, "Login OK", 200);
  } else {
    simpleResponse(res, "No credentials available", 401);
  }
});

app.put("/data/:id/:domain",
  upload.fields([{name: "blob", maxCount: 1}, {name: "thumbnail", maxCount: 1}]),
  function(req, res) {
    const slowResponse = config.testing.slowResponse;
    const failSometimes = config.testing.failSometimes;
    if (failSometimes && Math.floor(Math.random() * failSometimes)) {
      console.log("Artificially making request fail"); // eslint-disable-line no-console
      res.status(500);
      res.end();
      return;
    }
    let bodyObj = [];
    if (req.body.shot && req.files) {
      bodyObj = JSON.parse(req.body.shot);
      const clipId = Object.getOwnPropertyNames(bodyObj.clips)[0];
      let b64 = req.files.blob[0].buffer.toString("base64");
      let contentType = req.files.blob[0].mimetype;
      if (contentType !== "image/png" && contentType !== "image/jpeg") {
        // Force PNG as a fallback
        mozlog.warn("invalid-upload-content-type", {contentType});
        contentType = "image/png";
      }
      b64 = `data:${contentType};base64,${b64}`;
      bodyObj.clips[clipId].image.url = b64;

      if (req.files.thumbnail) {
        const encodedThumbnail = req.files.thumbnail[0].buffer.toString("base64");
        bodyObj.thumbnail = `data:image/png;base64,${encodedThumbnail}`;
      }
    } else if (req.body) {
      bodyObj = req.body;
    }
    if (typeof bodyObj !== "object") {
      throw new Error(`Got unexpected req.body type: ${typeof bodyObj}`);
    }
    const shotId = `${req.params.id}/${req.params.domain}`;
    if (!req.deviceId) {
      mozlog.warn("put-without-auth", {msg: "Attempted to PUT without logging in", url: req.url});
      sendRavenMessage(req, "Attempt PUT without authentication");
      simpleResponse(res, "Not logged in", 401);
      return;
    }
    const shot = new Shot(req.deviceId, req.backend, shotId, bodyObj);
    const match = /Firefox\/(\d+)\./.exec(req.headers["user-agent"] || "");
    if (match) {
      shot.firefoxMajorVersion = parseInt(match[1], 10);
    }
    let responseDelay = Promise.resolve();
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
        simpleResponse(res, "No shot updated", 403);
        return;
      }
      Watchdog.submit(shot);
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
  const shotId = `${req.params.id}/${req.params.domain}`;
  // FIXME: maybe we should allow for accountId here too:
  Shot.getRawValue(shotId, req.deviceId).then((data) => {
    if (!data) {
      simpleResponse(res, "No such shot", 404);
    } else {
      let value = data.value;
      value = JSON.parse(value);
      value = JSON.stringify(value);
      if ("format" in req.query) {
        value = JSON.stringify(JSON.parse(value), null, "  ");
      }
      res.header("Content-Type", "application/json");
      res.send(value);
    }
  }).catch(function(err) {
    errorResponse(res, "Error serving data:", err);
  });
});

app.post("/api/delete-shot", function(req, res) {
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

app.post("/api/disconnect-device", function(req, res) {
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to disconnect without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  disconnectDevice(req.deviceId).then((result) => {
    const keygrip = dbschema.getKeygrip("auth");
    const cookies = new Cookies(req, res, {keys: keygrip});
    if (result) {
      cookies.set("accountid");
      cookies.set("accountid.sig");
      simpleResponse(res, "ok", 200);
    }
  }).catch((err) => {
    errorResponse(res, "Error: could not disconnect", err);
  });
});

app.post("/api/set-title/:id/:domain", function(req, res) {
  const shotId = `${req.params.id}/${req.params.domain}`;
  const userTitle = req.body.title;
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
      return null;
    }
    shot.userTitle = userTitle;
    if (shot.openGraph && shot.openGraph.title) {
        shot.openGraph.title = userTitle;
    }
    return shot.update();
  }).then((updated) => {
    simpleResponse(res, "Updated", 200);
  }).catch((err) => {
    errorResponse(res, "Error updating title", err);
  });
});

app.post("/api/save-edit", function(req, res) {
  const vars = req.body;
  if (!req.deviceId) {
    sendRavenMessage(req, "Attempt to edit shot without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  const id = vars.shotId;
  const url = vars.url;
  const width = vars.x;
  const height = vars.y;
  let thumbnail = vars.thumbnail || null;
  if (!isValidClipImageUrl(url)) {
    sendRavenMessage(req, "Attempt to edit shot to set invalid clip url.");
    simpleResponse(res, "Invalid shot url.", 400);
    return;
  }
  if (thumbnail && !isValidClipImageUrl(thumbnail)) {
    thumbnail = null;
  }
  Shot.get(req.backend, id, req.deviceId, req.accountId).then((shot) => {
    if (!shot) {
      sendRavenMessage(req, "Attempt to edit shot that does not exist");
      simpleResponse(res, "No such shot", 404);
      return null;
    }
    const name = shot.clipNames()[0];
    shot.getClip(name).image.url = url;
    shot.getClip(name).image.dimensions.x = width;
    shot.getClip(name).image.dimensions.y = height;
    shot.thumbnail = thumbnail;
    return shot.update().then(updated => ({updated, shot}));
  }).then(({updated, shot}) => {
    Watchdog.submit(shot);
    simpleResponse(res, "Updated", 200);
  }).catch((err) => {
    errorResponse(res, "Error updating image", err);
  });
});

app.post("/api/set-expiration", function(req, res) {
  if (!req.deviceId || !req.accountId) {
    sendRavenMessage(req, "Attempt to set expiration without login");
    simpleResponse(res, "Not logged in", 401);
    return;
  }
  const shotId = req.body.id;
  const expiration = parseInt(req.body.expiration, 10);
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
  const embedded = req.query.embedded;
  const download = req.query.download;
  const sig = req.query.sig;
  Shot.getRawBytesForClip(
    req.params.imageid
  ).then((obj) => {
    if (obj === null) {
      notFound(req, res);
    } else {
      let localReferrer = false;
      if (req.headers.referer) {
        localReferrer = req.headers.referer.startsWith(req.backend);
      }
      if (!localReferrer) {
        const hasher = require("crypto").createHash("sha1");
        hasher.update(req.params.imageid);
        const hashedId = hasher.digest("hex").substr(0, 15);
        const analyticsUrl = `/images/${embedded ? "embedded/" : ""}hash${encodeURIComponent(hashedId)}`;
        let analytics = req.userAnalytics;
        if (!analytics) {
          analytics = ua(config.gaId);
          if (config.debugGoogleAnalytics) {
            analytics = analytics.debug();
          }
        }
        const view = embedded ? "direct-view-embedded" : "direct-view";
        const el = view + (obj.ownerId === req.deviceId ? "-owner" : "-non-owner");
        let documentReferrer = null;
        if (req.headers.referer) {
          try {
            const parsed = urlParse(req.headers.referer);
            documentReferrer = `${parsed.protocol}//${parsed.host}`;
          } catch (e) {
            // We ignore any errors parsing this header
          }
        }
        analytics.pageview({
          dp: analyticsUrl,
          dh: req.backend,
          documentReferrer,
          ua: req.headers["user-agent"],
        }).event({
          ec: "web",
          ea: "visit",
          el,
        }).send();
      }
      let contentType = obj.contentType;
      if (contentType !== "image/png" && contentType !== "image/jpeg") {
        contentType = "image/png";
      }
      res.header("Content-Type", contentType);
      if (download) {
        if (dbschema.getKeygrip("download-url").verify(new Buffer(`${req.path} ${download}`, "utf8"), sig)) {
          res.header("Content-Disposition", contentDisposition(download));
        }
      }
      setDailyCache(res);
      res.header("Access-Control-Allow-Origin", `${req.protocol}://${config.siteOrigin}`);
      res.status(200);
      res.send(obj.data);
    }
  }).catch((e) => {
    errorResponse(res, "Error getting image from database:", e);
  });
});

app.get("/__version__", function(req, res) {
  dbschema.getCurrentDbPatchLevel().then(level => {
    const response = {
      source: "https://github.com/mozilla-services/screenshots/",
      description: "Firefox Screenshots application server",
      version: selfPackage.version,
      buildDate: buildTime,
      commit: linker.getGitRevision(),
      contentOrigin: config.contentOrigin,
      commitLog: `https://github.com/mozilla-services/screenshots/commits/${linker.getGitRevision()}`,
      unincludedCommits: `https://github.com/mozilla-services/screenshots/compare/${linker.getGitRevision()}...master`,
      dbSchemaVersion: level,
      dbSchemaVersionJS: dbschema.MAX_DB_LEVEL,
    };
    res.header("Content-Type", "application/json; charset=utf-8");
    res.send(JSON.stringify(response, null, "  "));
  }).catch((e) => {
    errorResponse(res, "Error fetching version data: ", e);
  });
});

app.get("/contribute.json", function(req, res) {
  const data = {
    name: "Firefox Screenshots",
    description: "Firefox Screenshots is an add-on for Firefox and a service for screenshots",
    repository: {
      url: "https://github.com/mozilla-services/screenshots/",
      license: "MPL2",
      tests: "https://circleci.com/gh/mozilla-services/screenshots",
    },
    participate: {
      home: "https://github.com/mozilla-services/screenshots/",
      irc: "irc://irc.mozilla.org/#screenshots",
      "irc-contacts": ["ianbicking", "fzzzy"],
    },
    bugs: {
      list: "https://github.com/mozilla-services/screenshots/issues",
      report: "https://github.com/mozilla-services/screenshots/issues/new",
      goodfirstbugs: "https://github.com/mozilla-services/screenshots/labels/good%20first%20bug",
    },
    urls: {
      prod: "https://screenshots.firefox.com",
      stage: "https://screenshots.stage.mozaws.net",
      dev: "https://screenshots.dev.mozaws.net",
    },
    keywords: [
      "javascript",
      "node",
      "express",
      "react",
      "postgresql",
      "firefox",
    ],
  };
  res.header("Content-Type", "application/json; charset=utf-8");
  res.send(JSON.stringify(data, null, "  "));
});

app.get("/oembed", function(req, res) {
  let url = req.query.url;
  if (!url) {
    simpleResponse(req, "No ?url given", 400);
    return;
  }
  const format = req.query.format || "json";
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
  const backend = req.backend.replace(/^http:\/\//i, "https://");
  if (!url.startsWith(backend)) {
    simpleResponse(res, `Error: URL is not hosted here (${req.backend})`, 501);
    return;
  }
  url = url.substr(backend.length);
  const match = /^\/{0,255}([^/]{1,255})\/([^/]{1,255})/.exec(url);
  if (!match) {
    simpleResponse(res, "Error: not a Shot url", 404);
    return;
  }
  const shotId = match[1] + "/" + match[2];
  Shot.get(req.backend, shotId).then((shot) => {
    if (!shot) {
      notFound(req, res);
      return;
    }
    const body = shot.oembedJson({maxheight, maxwidth});
    res.header("Content-Type", "application/json");
    res.send(body);
  }).catch((e) => {
    errorResponse(res, "Error fetching shot for OEmbed:", e);
  });
});

const END_POINT_SEPARATOR = "|";

// Get OAuth client params for the client-side authorization flow.
app.get("/api/fxa-oauth/login/*", function(req, res, next) {
  if (!req.deviceId) {
    next(errors.missingSession());
    return;
  }
  randomBytes(32).then(stateBytes => {
    const state = stateBytes.toString("hex");
    return setState(req.deviceId, state).then(inserted => {
      if (!inserted) {
        throw errors.dupeLogin();
      }
      return state;
    });
  }).then(state => {
    const redirectUri = `${req.backend}/api/fxa-oauth/confirm-login`;
    // Use state to store post-auth redirect page inside the 'state'
    // request parameter sent to FxA authorization API
    // FxA returns state parameter as is upon redirection to url given in
    // redirectUri.
    state = `${state}${END_POINT_SEPARATOR}${req.params[0]}`;
    const profile = "profile";
    res.redirect(`${config.fxa.oAuthServer}/authorization?client_id=${encodeURIComponent(config.fxa.clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(profile)}`);
  }).catch(next);
});

app.get("/api/fxa-oauth/confirm-login", function(req, res, next) {
  if (!req.deviceId) {
    next(errors.missingSession());
    return;
  }

  if (!req.query) {
    next(errors.missingParams());
    return;
  }
  const { code, state } = req.query;
  // Retrieve endpoint and 32-bit value used to verify if
  // the redirect is authentic. Use endpoint to redirect to page
  // where the login request was initiated from.
  const data = state.split(END_POINT_SEPARATOR, 2);
  const endpoint = data[1];

  checkState(req.deviceId, data[0]).then(isValid => {
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
            const analytics = ua(config.gaId);
            analytics.event({
              ec: "server",
              ea: "fxa-login",
              ua: req.headers["user-agent"],
            }).send();
          }
          // Redirect to endpoint with auth param indicating successful Fxa auth flow.
          // 'auth' param is used in reactrender and reactruntime to load wantsauth.js
          // and display Fxa SignIn button state when request doesn't have accountId
          // right after fxa-ouath/confirm-login redirection.
          const pageUri = endpoint ? "/" + endpoint : "/";
          res.redirect(pageUri + "?auth=1");
        });
      }).catch(next);
    }).catch(next);
  }).catch(next);
});

app.post("/watchdog/:submissionId", function(req, res) {
  Watchdog.handleResult(req);
  res.end();
});

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
      // This should be a temporary workaround for
      // https://github.com/mozilla-services/screenshots/issues/4281
      // (https://bugzilla.mozilla.org/show_bug.cgi?id=1267027).
      // TODO: remove this when bug 1267027 is resolved.
      const DO_NOT_SEND_CSP = process.env.NODE_ENV === "dev" && process.env.DO_NOT_SEND_CSP && process.env.DO_NOT_SEND_CSP === "true";
      if (!DO_NOT_SEND_CSP) {
        res.header(
          "Content-Security-Policy",
          `default-src 'self'; img-src 'self' ${FXA_SERVER} www.google-analytics.com ${SITE_CDN} ${CONTENT_CDN} ${CONTENT_NAME} data:; script-src 'self' ${SITE_CDN} www.google-analytics.com 'nonce-${uuid}'; style-src 'self' ${SITE_CDN} 'unsafe-inline' https://code.cdn.mozilla.net; connect-src 'self' ${SITE_CDN} ${CONTENT_CDN} www.google-analytics.com ${dsn}; font-src https://code.cdn.mozilla.net; frame-ancestors 'none'; object-src 'none';`);
      }
      res.header("X-Frame-Options", "DENY");
      next();
    } else {
      errorResponse(res, "Error creating nonce:", err);
    }
  });
});

app.use("/homepage", express.static(path.join(__dirname, "static/homepage"), {
  index: false,
}));

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

if (!config.disableMetrics) {
  app.use("/metrics", require("./pages/metrics/server").app);
}

app.use("/shots", require("./pages/shotindex/server").app);

app.use("/leave-screenshots", require("./pages/leave-screenshots/server").app);

app.use("/creating", require("./pages/creating/server").app);

app.use("/settings", require("./pages/settings/server").app);

app.use("/", require("./pages/shot/server").app);

app.use("/", require("./pages/homepage/server").app);

let httpsCredentials;
if (config.localhostSsl) {
  // To generate trusted keys on Mac, see: https://certsimple.com/blog/localhost-ssl-fix
  const key = `${process.env.HOME}/.localhost-ssl/key.pem`;
  const cert = `${process.env.HOME}/.localhost-ssl/cert.pem`;
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
    cert: readFileSync(cert),
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
    const { statusCode, headers, payload } = err.output;
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
      expected: err.expected,
    });
    res.status(err.statusCode);
    res.type("text");
    res.send(res.message);
    return;
  }
  if (err.code === "EBADCSRFTOKEN") {
    csrfErrorResponse(err, req, res);
    return;
  }
  errorResponse(res, "General error:", err);
});

/* General 404 handler: */
app.use(function(req, res, next) {
  notFound(req, res);
});
