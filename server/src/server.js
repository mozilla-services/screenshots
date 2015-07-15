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

app.use(morgan("dev"));

app.use(function (req, res, next) {
  let cookies = new Cookies(req, res, dbschema.getKeygrip());
  req.deviceId = cookies.get("user", {signed: true});
  req.backend = req.protocol + "://" + req.headers.host;
  req.config = config;
  next();
});

app.use(function (req, res, next) {
  req.staticLink = linker.staticLink;
  req.staticLinkWithHost = linker.staticLinkWithHost.bind(null, req);
  next();
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

app.get("/clip/:id/:domain/:clipId", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    let clip = shot.getClip(req.params.clipId);
    if (! clip) {
      simpleResponse(res, "No such clip", 404);
      return;
    }
    let image = clip.imageBinary();
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
  let shot = new Shot(req.deviceId, req.backend, shotId, bodyObj);
  shot.insert().then((inserted) => {
    if (! inserted) {
      return shot.update();
    }
    return null;
  }).then(() => {
    simpleResponse(res, "Saved", 200);
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

app.get("/content/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    if (! shot) {
      simpleResponse(res, "Not found", 404);
      return;
    }
    res.send(shot.staticHtml({
      addHead: `
      <base href="${shot.url}" target="_blank" />
      <script src="${req.staticLinkWithHost("js/content-helper.js")}"></script>
      <link rel="stylesheet" href="${req.staticLinkWithHost("css/content.css")}">
      `
    }));
  }).catch(function (e) {
    errorResponse(res, "Failed to load shot", e);
  });
});

app.get("/images/:id/:domain/:clipId", function (req, res) {
  Shot.prototype.Clip.getRawBytesForClip(
    req.params.id, req.params.domain, req.params.clipId
  ).then((bytes) => {
    if (bytes === null) {
      simpleResponse(res, "Not Found", 404);
    } else {
      res.header("Content-Type", "image/png");
      res.status(200);
      res.send(bytes);
    }
  });
});

app.get("/", function (req, res) {
  if (req.deviceId) {
    Shot.getShotsForDevice(req.backend, req.deviceId).then((shots) => {
      req.shots = shots;
      require("./views/shot-index").render(req, res);
    }).catch((err) => {
      errorResponse(res, "Error rendering page:", err);
    });
  } else {
    require("./views/main").render(req, res);
  }
});

app.get("/:id/:domain", function (req, res) {
  let shotId = req.params.id + "/" + req.params.domain;
  Shot.get(req.backend, shotId).then((shot) => {
    if (! shot || shot.clipNames().length === 0) {
      simpleResponse(res, "Not found", 404);
      return;
    }
    req.shot = shot;
    return require("./views/frame").render(req, res);
  }).catch(function (err) {
    errorResponse(res, "Error rendering page:", err);
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

linker.init().then(() => {
  app.listen(config.port);
  console.info(`server listening on http://localhost:${config.port}/`);
}).catch((err) => {
  console.error("Error getting revision:", err, err.stack);
});
