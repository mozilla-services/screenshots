const config = require("./config").getProperties();
require("./logging").installConsoleHandler();
const mozlog = require("./logging").mozlog("server");
const path = require("path");
const { readFileSync, existsSync } = require("fs");
const { URL } = require("url");
const Watchdog = require("./watchdog");

let istanbulMiddleware = null;
if (config.enableCoverage && process.env.NODE_ENV === "dev") {
  istanbulMiddleware = require("istanbul-middleware");
  mozlog.info("coverage-hook-enabled", {
    msg: "Hook loader for coverage - ensure this is not production!"
  });
  istanbulMiddleware.hookLoader(__dirname); // cover all files except under node_modules
}

const dbschema = require("./dbschema");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const linker = require("./linker");
const buildTime = require("./build-time").string;
const http = require("http");
const https = require("https");
const genUuid = require("nodify-uuid");
const statsd = require("./statsd");
const { notFound } = require("./pages/not-found/server");
const { setMonthlyCache, doNotCache } = require("./caching");
const {
  addRavenErrorHandler,
  addRavenRequestHandler
} = require("./ravenclient");
const { errorResponse, simpleResponse, jsResponse } = require("./responses");
const selfPackage = require("./package.json");
const { l10n } = require("./middleware/l10n");

const app = express();

app.set("trust proxy", true);

// Disable x-powered-by header
app.disable("x-powered-by");

if (config.enableCoverage && istanbulMiddleware) {
  // enable coverage endpoints under /coverage
  app.use("/coverage", istanbulMiddleware.createHandler());
}

const SITE_CDN = (config.siteCdn && new URL(config.siteCdn).host) || "";
const CONTENT_NAME = config.contentOrigin || "";
const CONTENT_CDN =
  (config.contentCdn && new URL(config.contentCdn).host) || "";
const FXA_SERVER =
  config.fxa.profileServer &&
  require("url").parse(config.fxa.profileServer).host;
const FXA_USER_CONTENT = config.fxa.profileImageServer || "";

function addHSTS(req, res) {
  // Note: HSTS will only produce warning on a localhost self-signed cert
  if (req.protocol === "https" && !config.localhostSsl) {
    const time = 24 * 60 * 60; // 24 hours
    res.header("Strict-Transport-Security", `max-age=${time}`);
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
    res.header(
      "Access-Control-Allow-Headers",
      "Cookie, Content-Type, User-Agent"
    );
    if (req.method === "OPTIONS") {
      res.type("text");
      res.send("");
      return;
    }
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: config.requestBodySizeLimit }));

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
  express.static(path.join(__dirname, "static"), { index: false })
);

const xpidir = path.join(__dirname, "..", "xpi");
app.use("/xpi", express.static(xpidir, { index: false }));

app.use(morgan("combined"));

app.use(function(req, res, next) {
  const host =
    req.headers.host === config.contentOrigin
      ? config.contentOrigin
      : config.siteOrigin;
  req.backend = `${req.protocol}://${host}`;
  req.config = config;
  next();
});

app.use(l10n);

app.use(function(req, res, next) {
  req.staticLink = linker.staticLink.bind(null, {
    cdn: config.siteCdn,
    isRtl: req.isRtl
  });
  // The contentCdn config does not have a default value but contentOrigin does.
  const base = config.contentCdn || `${req.protocol}://${config.contentOrigin}`;
  linker.imageLinkWithHost = linker.imageLink.bind(null, base);
  next();
});

app.param("id", function(req, res, next, id) {
  if (/^[a-zA-Z0-9]{16}$/.test(id)) {
    next();
    return;
  }
  const exc = new Error("invalid id");
  exc.isAppError = true;
  exc.output = {
    statusCode: 400,
    payload: "Invalid id"
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
  simpleResponse(res, "// disabled", 200);
});

app.get("/ga-activation-hashed.js", function(req, res) {
  simpleResponse(res, "// disabled", 200);
});

const ravenClientJs = readFileSync(require.resolve("raven-js/dist/raven.min"), {
  encoding: "UTF-8"
});

app.get("/install-raven.js", function(req, res) {
  setMonthlyCache(res);
  if (!config.sentryPublicDSN) {
    jsResponse(res, "");
    return;
  }
  const options = {
    environment: process.env.NODE_ENV || "dev",
    release: linker.getGitRevision(),
    sanitizeKeys: ["url"],
    serverName: req.backend
  };
  const script = `
  ${ravenClientJs}
  Raven.config("${req.config.sentryPublicDSN}", ${JSON.stringify(
    options
  )}).install();
  window.Raven = Raven;`;
  jsResponse(res, script);
});

app.get("/favicon.ico", function(req, res) {
  res.redirect(301, "/static/img/icon-32.png");
});

app.post("/error", function(req, res) {
  simpleResponse(res, "OK", 200);
});

app.post("/event", function(req, res) {
  simpleResponse(res, "OK", 200);
});

app.post("/timing", function(req, res) {
  simpleResponse(res, "OK", 200);
});

app.post("/api/login", function(req, res) {
  simpleResponse(
    res,
    JSON.stringify({
      ok: true,
      sentryPublicDSN: config.sentryPublicDSN,
      abTests: {},
      authHeader: {},
      accountId: null
    }),
    200
  );
});

app.post("/api/set-login-cookie", function(req, res) {
  simpleResponse(res, "", 200);
});

app.get("/__version__", function(req, res) {
  dbschema
    .getCurrentDbPatchLevel()
    .then(level => {
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
        dbSchemaVersionJS: dbschema.MAX_DB_LEVEL
      };
      res.header("Content-Type", "application/json; charset=utf-8");
      res.send(JSON.stringify(response, null, "  "));
    })
    .catch(e => {
      errorResponse(res, "Error fetching version data: ", e);
    });
});

app.get("/contribute.json", function(req, res) {
  const data = {
    name: "Firefox Screenshots",
    description:
      "Firefox Screenshots is an add-on for Firefox and a service for screenshots",
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
      goodfirstbugs:
        "https://github.com/mozilla-services/screenshots/labels/good%20first%20bug"
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
  res.send(JSON.stringify(data, null, "  "));
});

app.get("/api/has-shots", async function(req, res) {
  res.send({ hasIndefinite: false, hasAny: false });
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
      const DO_NOT_SEND_CSP =
        process.env.NODE_ENV === "dev" &&
        process.env.DO_NOT_SEND_CSP &&
        process.env.DO_NOT_SEND_CSP === "true";
      if (!DO_NOT_SEND_CSP) {
        res.header(
          "Content-Security-Policy",
          `default-src 'self'; img-src 'self' ${FXA_SERVER} ${FXA_USER_CONTENT} www.google-analytics.com ${SITE_CDN} ${CONTENT_CDN} ${CONTENT_NAME} data:; script-src 'self' ${SITE_CDN} www.google-analytics.com 'nonce-${uuid}'; style-src 'self' ${SITE_CDN} 'unsafe-inline' https://code.cdn.mozilla.net; connect-src 'self' ${SITE_CDN} ${CONTENT_CDN} www.google-analytics.com ${dsn}; font-src https://code.cdn.mozilla.net; frame-ancestors 'none'; object-src 'none';`
        );
      }
      res.header("X-Frame-Options", "DENY");
      next();
    } else {
      errorResponse(res, "Error creating nonce:", err);
    }
  });
});

app.use(
  "/homepage",
  express.static(path.join(__dirname, "static/homepage"), {
    index: false
  })
);

// This is a minimal heartbeat that only indicates the server process is up and responding
app.get("/__lbheartbeat__", function(req, res) {
  res.send("OK");
});

// This tests if the server is really working
app.get("/__heartbeat__", function(req, res) {
  dbschema
    .connectionOK()
    .then(ok => {
      if (!ok) {
        statsd.increment("heartbeat.fail");
        res.status(500).send("schema fail");
      } else {
        statsd.increment("heartbeat.pass");
        res.send("OK");
      }
    })
    .catch(error => {
      statsd.increment("heartbeat.fail");
      res.status(500).send("database fail");
    });
});

app.use("/export", require("./pages/export/server").app);

app.use("/leave-screenshots", require("./pages/leave-screenshots/server").app);

app.use("/hosting-shutdown", require("./pages/hosting-shutdown/server").app);

app.use("/", require("./pages/homepage/server").app);

let httpsCredentials;
if (config.localhostSsl) {
  // To generate trusted keys on Mac, see: https://certsimple.com/blog/localhost-ssl-fix
  const key = `${process.env.HOME}/.localhost-ssl/key.pem`;
  const cert = `${process.env.HOME}/.localhost-ssl/cert.pem`;
  if (!(existsSync(key) && existsSync(cert))) {
    /* eslint-disable no-console */
    console.log(
      "Error: to use localhost SSL/HTTPS you must create a key.pem and cert.pem file"
    );
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

linker
  .init()
  .then(() => {
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
    mozlog.info("server-started", {
      msg: `server listening on ${scheme}://localhost:${config.port}/`
    });
  })
  .catch(err => {
    mozlog.error("git-revision-error", {
      msg: "Error getting git revision",
      error: err,
      stack: err.stack
    });
  });

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
      expected: err.expected
    });
    res.status(err.statusCode);
    res.type("text");
    res.send(res.message);
    return;
  }
  errorResponse(res, "General error:", err);
});

/* General 404 handler: */
app.use(function(req, res, next) {
  notFound(req, res);
});
