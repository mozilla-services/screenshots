let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js"),
  lookupContentType = require('mime-types').contentType,
  git = require('git-rev'),
  Cookies = require("cookies"),
  qs = require('querystring');

const { Shot } = require("./servershot");
const { checkLogin, registerLogin } = require("./users");
const dbschema = require("./dbschema");

const jspath = "/js/",
  csspath = "/css/",
  modelspath = "/data/",
  contentpath = "/content/",
  imgpath = "/img/",
  favicopath = "/favicon.ico",
  loginpath = "/api/login",
  registerpath = "/api/register",
  clipImagePath = "/clip/",
  contentType = "Content-type",
  notFound = "Not Found",
  doctype = "<!DOCTYPE html>",
  footer = "</body></html>",
  script = `
function gotData(Handler, data) {
  data.linkify = linkify;
  routes.setGitRevision(data.gitRevision);
  React.render(React.createElement(Handler, data), document);
}

Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) {
  if (cachedData) {
    var _d = cachedData;
    cachedData = null;
    gotData(Handler, _d);
    return;
  }

  var appnames = [],
    app = null;
  for (var i in state.routes) {
    if (!!state.routes[i].name) {
      appnames.push(state.routes[i].name);
      if (app === null) {
        app = state.routes[i];
      }
    }
  }
  if (!appnames.length) {
    console.error("Error: No app was routed");
    return;
  }

  console.log("Route to app", appnames[0]);

  if (appnames[0] === "shot") {
    var key = state.params.shotId + "/" + state.params.shotDomain,
      xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        gotData(Handler, {backend: location.origin, id: key, shot: data});
      } else {
        console.error("Error: Bad response: ", xhr.status, xhr.responseText);
      }
    };

    xhr.open("GET", "/data/" + key);
    xhr.send();
  }
});
`;

dbschema.createTables();
dbschema.createKeygrip();

let server = http.createServer(function (req, res) {
  let cookies = new Cookies(req, res, dbschema.getKeygrip());
  req.userId = cookies.get("user", {signed: true});
  let parsed = url.parse(req.url, true),
    pth = parsed.pathname,
    query = parsed.query;
  let backend = "http://" + req.headers.host;

  console.log(req.method, pth, query);

  if (req.method === "GET" && (pth.startsWith(jspath) || pth.startsWith(csspath) || pth.startsWith(imgpath) || pth === favicopath)) {
    let filename = path.join(__dirname, pth);
    fs.exists(filename, function(exists) {
      if (exists) {
        res.setHeader(contentType, lookupContentType(path.extname(filename)));
        fs.createReadStream(filename).pipe(res);
      } else {
        res.writeHead(404); res.end(notFound);
      }
    });
    return;
  }
  let modelname = "",
    storeMap = null;

  if (pth.startsWith(registerpath)) {
    return handleRegister(req, res);
  } else if (pth.startsWith(loginpath)) {
    return handleLogin(req, res);
  }

  if (pth.startsWith(modelspath)) {
    modelname = pth.slice(modelspath.length);
    storeMap = models.modelMap;
  }

  if (pth.startsWith(clipImagePath)) {
    let rest = pth.slice(clipImagePath.length);
    let match = (/^([^\/]+\/[^\/]+)\/(.*)$/).exec(rest);
    if (! match) {
      return simpleResponse(res, "Bad clip path", 404);
    }
    Shot.get(backend, match[1]).then((shot) => {
      let clip = shot.getClip(match[2]);
      if (! clip) {
        simpleResponse(res, "No such clip", 404);
        return;
      }
      let image = clip.imageBinary();
      res.setHeader(contentType, image.contentType);
      res.writeHead(200);
      res.end(image.data);
    }).catch((err) => {
      errorResponse(res, "Failed to get clip", err);
    });
    return;
  }

  if (modelname) {
    if (req.method === "PUT") {
      let body = "";
      req.on('data', function(chunk) {
        body = body + chunk;
      });
      req.on('end', function() {
        if (body.length && body[0] === "{") {
          let bodyObj = JSON.parse(body);
          if (! bodyObj.userId) {
            simpleResponse(res, "No userId in body", 400);
            return;
          }
          if (! req.userId) {
            simpleResponse(res, "Not logged in", 401);
            return;
          }
          if (req.userId != bodyObj.userId) {
            // FIXME: this doesn't make sense for comments or other stuff, see https://github.com/mozilla-services/pageshot/issues/245
            simpleResponse(res, "Cannot save a page on behalf of another user", 403);
          }
          // FIXME: this needs to confirm that the userid doesn't change on an
          // update; right now anyone can overwrite a shot so long as they
          // update the userId appropriately:
          let shot = new Shot(req.userId, backend, modelname, bodyObj);
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
        } else {
          res.writeHead(400);
          res.end("Bad Request");
        }
      });
    } else if (req.method === 'GET') {
      Shot.getRawValue(modelname).then((data) => {
        if (! data) {
          res.writeHead(404);
          res.end(notFound);
        } else {
          let value = data.value;
          if ('format' in query) {
            value = JSON.stringify(JSON.parse(value), null, '  ');
          }
          res.setHeader(contentType, "application/json");
          res.end(value);
        }
      });
    } else {
      res.writeHead(405);
      res.end("Method Not Allowed");
    }
    return;
  }

  if (pth.startsWith(contentpath)) {
    let key = pth.slice(contentpath.length);
    Shot.get(backend, key).then((shot) => {
      if (! shot) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
      res.writeHead(200);
      res.end(shot.staticHtml({
        addHead: `<script src="${backend}/js/content-helper.js"></script>`
      }));
    }).catch(function (e) {
      console.log("Error:", e.stack);
      res.setHeader(contentType, "text/plain; charset=utf-8");
      res.writeHead(500);
      if (e.code == "ECONNREFUSED") {
        // Database connection error
        res.end("Cannot connect to database");
      } else {
        res.end(e.stack);
      }
    });
    return;
  }

  Router.run(routes.routes, req.url, function (Handler, state) {
    let appnames = state.routes.filter((r) => !!r.name);

    if (appnames.length === 0 || models[appnames[0].name] === undefined) {
      res.writeHead(404);
      res.end(notFound);
      return;
    }

    console.log("App:", appnames[0].name);

    models[appnames[0].name](
      {method: req.method,
        backend: backend,
        path: state.path,
        params: state.params,
        query: state.query}
    ).then(function (data) {
      data.linkify = routes.linkify;
      data.gitRevision = routes.getGitRevision();
      data.backend = backend;

      let response = React.renderToString(<Handler {...data} />),
        footerIndex = response.indexOf(footer),
        header = response.slice(0, footerIndex);

      res.setHeader(contentType, "text/html; charset=utf-8");
      res.end(
        doctype +
        header +
        "<script>var cachedData = " + JSON.stringify(data) + ";" +
        script +
        "</script>" +
        footer);
    }).catch(function (e) {
      console.log("Error:", e.stack);
      res.setHeader(contentType, "text/plain; charset=utf-8");
      res.writeHead(500);
      if (e.code == "ECONNREFUSED") {
        // Database connection error
        res.end("Cannot connect to database");
      } else {
        res.end(e.stack);
      }
    });
  });
});

function handleRegister(req, res) {
  parsePost(req).then(function (vars) {
    // FIXME: should also handle updating
    // FIXME: need to hash secret
    let canUpdate = vars.userId === req.userId;
    return registerLogin(vars.userId, {
      secret: vars.secret,
      nickname: vars.nickname || null,
      avatarurl: vars.avatarurl || null
    }, canUpdate).then(function (ok) {
      if (ok) {
        let cookies = new Cookies(req, res, dbschema.getKeygrip());
        cookies.set("userId", vars.userId, {signed: true});
        simpleResponse(res, "Created", 200);
      } else {
        simpleResponse(res, "User exists", 401);
      }
    });
  }).catch(function (err) {
    errorResponse(res, "Error registering:", err);
  });
}

function parsePost(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', function (data) {
      body += data;
      // Too much POST data, kill the connection!
      if (body.length > 1e6) {
        req.connection.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on('end', function () {
      let post = qs.parse(body);
      resolve(post);
    });
  });
}

function handleLogin(req, res) {
  parsePost(req).then(function (vars) {
    checkLogin(vars.userId, vars.secret).then((ok) => {
      if (ok) {
        let cookies = new Cookies(req, res, dbschema.getKeygrip());
        cookies.set("user", vars.userId, {signed: true});
        simpleResponse(res, "User logged in", 200);
      } else {
        simpleResponse(res, "Invalid login", 401);
      }
    });
  }).catch(function (err) {
    errorResponse(err, "Error in login:", err);
  });
}

function simpleResponse(res, message, status) {
  status = status || 200;
  res.setHeader(contentType, "text/plain; charset=utf-8");
  res.writeHead(status);
  res.end(message);
}

function errorResponse(res, message, err) {
  res.setHeader(contentType, "text/plain; charset=utf-8");
  res.writeHead(500);
  if (err) {
    message += "\n" + err;
    if (err.stack) {
      message += "\n\n" + err.stack;
    }
  }
  res.end(message);
  console.error("Error: " + message, err+"", err);
}

git.long(function (rev) {
  routes.setGitRevision(rev);
  console.log("git revision", rev);
  server.listen(10080);
  console.log("server listening on http://localhost:10080/");
});
