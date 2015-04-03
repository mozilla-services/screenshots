let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js"),
  lookupContentType = require('mime-types').contentType,
  git = require('git-rev');

let git_revision = null;

const jspath = "/js/",
  csspath = "/css/",
  modelspath = "/data/",
  metapath = "/meta/",
  imgpath = "/img/",
  favicopath = "/favicon.ico",
  contentType = "Content-type",
  notFound = "Not Found",
  doctype = "<!DOCTYPE html>",
  footer = "</body></html>",
  script = `
function gotData(Handler, data) {
  React.render(React.createElement(Handler, data), document);
}

Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) {
  if (cachedData) {
    var _d = cachedData;
    cachedData = null;
    gotData(Handler, _d);
    return;
  }
  console.error("Error: partial page refresh not currently implemented");
});
`;

let server = http.createServer(function (req, res) {
  let parsed = url.parse(req.url, true),
    pth = parsed.pathname,
    query = parsed.query;

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

  if (pth.startsWith(modelspath)) {
    modelname = pth.slice(modelspath.length);
    storeMap = models.modelMap;
  } else if (pth.startsWith(metapath)) {
    modelname = pth.slice(metapath.length);
    storeMap = models.metaMap;
  }

  if (modelname) {
    if (req.method === "PUT") {
      let body = "";
      req.on('data', function(chunk) {
        body = body + chunk;
      });
      req.on('end', function() {
        if (body.length && body[0] === "{") {
          storeMap.put(modelname, body).then(() => res.end());
        } else {
          res.writeHead(400);
          res.end("Bad Request");
        }
      });
    } else if (req.method === 'GET') {
      storeMap.get(modelname).then((val) => {
        if (val === null) {
          res.writeHead(404);
          res.end(notFound);
        } else {
          res.end(val);
        }
      });
    } else {
      res.writeHead(405);
      res.end("Method Not Allowed");
    }
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
        path: state.path,
        params: state.params,
        query: state.query}
    ).then(function (data) {
      data.git_revision = git_revision;
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
      res.end(e.stack);
    });
  });
});

git.long(function (str) {
  git_revision = str;
  console.log("git revision", git_revision);
  server.listen(10080);
  console.log("server listening on http://localhost:10080/");
});
