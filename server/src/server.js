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
  registerAccount
} = require("./users");
const dbschema = require("./dbschema");
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const linker = require("./linker");
const { randomBytes } = require("./helpers");
const errors = require("../shared/errors");
const config = require("./config").root();
const { checkContent, checkAttributes } = require("./contentcheck");
const buildTime = require("./build-time").string;
const ua = require("universal-analytics");

dbschema.createTables().then(() => {
  dbschema.createKeygrip();
});

const app = express();

app.set('trust proxy', true);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '100mb'}));

app.use("/static", express.static(path.join(__dirname, "static"), {
  index: false
}));

app.use("/homepage", express.static(path.join(__dirname, "static/homepage"), {
  index: false
}));

app.use(morgan("dev"));

app.use(function (req, res, next) {
  let cookies = new Cookies(req, res, dbschema.getKeygrip());
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

app.post("/error", function (req, res) {
  let bodyObj = req.body;
  if (typeof bodyObj != "object") {
    throw new Error("Got unexpected req.body type: " + typeof bodyObj);
  }

  let userAnalytics = ua(config.gaId);
  userAnalytics.exception(
    bodyObj.name
  ).send();
  simpleResponse(res, "Noted.", 200);
});

app.get("/redirect", function (req, res) {
  if (req.query.to) {
    res.header("Content-type", "text/html");
    res.status(200);
    let redirectUrl = JSON.stringify(req.query.to);
    let output = `<html>
  <head>
    <title>Redirect</title>
  </head>
  <body>
    <a href=${redirectUrl}>If you are not automatically redirected, click here.</a>
    <script>
window.location = ${redirectUrl};
    </script>
  </body>
</html>`;
    res.send(output);
  } else {
    simpleResponse(res, "Bad Request", 400);
  }
});

app.post("/api/register", function (req, res) {
  let vars = req.body;
  // FIXME: need to hash secret
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
      simpleResponse(res, "User exists", 401);
    }
  }).catch(function (err) {
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
    res.sendStatus(204);
  }, err => {
    console.warn("Error updating device info", err);
    throw errors.badParams();
  }).catch(next);
});

app.post("/api/login", function (req, res) {
  let vars = req.body;
  checkLogin(vars.deviceId, vars.secret).then((ok) => {
    if (ok) {
      let cookies = new Cookies(req, res, dbschema.getKeygrip());
      cookies.set("user", vars.deviceId, {signed: true});
      let userAnalytics = ua(config.gaId, req.deviceId, {strictCidFormat: false});
      userAnalytics.pageview("/api/login").send();
      simpleResponse(res, "User logged in", 200);
    } else if (ok === null) {
      simpleResponse(res, "No such user", 404);
    } else {
      simpleResponse(res, "Invalid login", 401);
    }
  }).catch(function (err) {
    errorResponse(res, "Error in login:", err);
  });
});

app.post("/api/unload", function (req, res) {
  let reason = req.body.reason;
  console.info("Device", req.deviceId, "unloaded for reason:", reason);
  let cookies = new Cookies(req, res, dbschema.getKeygrip());
  // This erases the session cookie:
  cookies.set("user");
  cookies.set("user.sig");
  if (req.userAnalytics) {
    req.userAnalytics.pageview("/api/unload").send();
  }
  simpleResponse(res, "Noted", 200);
});

app.get("/clip/:id/:domain/:clipId", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    let clip = shot.getClip(req.params.clipId);
    if (! clip) {
      simpleResponse(res, "No such clip", 404);
      return;
    }
    let image = clip.imageBinary();
    let analyticsUrl = `/clip/${encodeURIComponent(req.params.id)}/${encodeURIComponent(req.params.domain)}/${encodeURIComponent(req.params.clipId)}`;
    if (req.userAnalytics) {
      req.userAnalytics.pageview(analyticsUrl).send();
    } else {
      let anonAnalytics = ua(config.gaId);
      anonAnalytics.pageview(analyticsUrl).send();
    }
    res.header("Content-Type", image.contentType);
    res.send(image.data);
  }).catch((err) => {
    errorResponse(res, "Failed to get clip", err);
  });
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
    return null;
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

app.get("/images/:imageid", function (req, res) {
  Shot.getRawBytesForClip(
    req.params.imageid
  ).then((obj) => {
    if (obj === null) {
      simpleResponse(res, "Not Found", 404);
    } else {
      let analyticsUrl = `/images/${encodeURIComponent(req.params.imageid)}`;
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

app.get("/shots", function (req, res) {
  if (! req.deviceId) {
    return simpleResponse(res, "You must have the addon installed to see your shot index", 403);
  }
  Shot.getShotsForDevice(req.backend, req.deviceId).then((shots) => {
    req.shots = shots;
    if (shouldRenderSimple(req)) {
      require("./views/shot-index").renderSimple(req, res);
    } else {
      require("./views/shot-index").render(req, res);
    }
  }).catch((err) => {
    errorResponse(res, "Error rendering page:", err);
  });
});

app.post("/delete", function (req, res) {
  if (! req.deviceId) {
    return simpleResponse(res, "You must have the addon installed delete your account", 403);
  }
  Shot.deleteEverythingForDevice(req.backend, req.deviceId).then(() => {
    return simpleResponse(res, "Goodbye.", 200);
  }).catch((e) => {
    console.error("An error occurred trying to delete:", e);
    return simpleResponse(res, "An error occurred.", 500);
  });
});

// FIXME: this can't the right way to do this...
require("./exporter").setup(app);

app.get("/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    if (! shot || shot.clipNames().length === 0) {
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
      res.send({
        access_token: accessToken
      });
    });
  }).catch(next);
});

app.use(function (err, req, res, next) {
  console.error("Error:", err);
  console.error(err.stack);
  if (err.isAppError) {
    let { statusCode, headers, payload } = err.output;
    res.status(statusCode);
    res.header(headers);
    res.send(payload);
    return;
  }
  errorResponse(res, "General error:", err);
});

const contentApp = express();

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
      <script>var SITE_ORIGIN = "${req.protocol}://${config.siteOrigin}";</script>
      <script src="${req.staticLinkWithHost("js/content-helper.js")}"></script>
      <link rel="stylesheet" href="${req.staticLinkWithHost("css/content.css")}">
      `
    }));
  }).catch(function (e) {
    errorResponse(res, "Failed to load shot", e);
  });
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

function errorResponse(res, message, err) {
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.status(500);
  if (err) {
    message += "\n" + err;
    if (err.stack) {
      message += "\n\n" + err.stack;
    }
  }
  res.send(message);
  console.error("Error: " + message, err+"", err);
}

exports.simpleResponse = simpleResponse;
exports.errorResponse = errorResponse;

linker.init().then(() => {
  app.listen(config.port);
  console.info(`server listening on http://localhost:${config.port}/`);
  contentApp.listen(config.contentPort);
  console.info(`content server listening on http://localhost:${config.contentPort}/`);
}).catch((err) => {
  console.error("Error getting revision:", err, err.stack);
});

require("./jobs").start();
