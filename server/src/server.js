

let http = require("http"),
  path = require('path'),
  url = require('url'),
  fs = require('fs'),
  React = require("react"),
  Router = require("react-router"),
  routes = require("./routes.js"),
  models = require("./models.js"),
  request = require("superagent");

const jspath = "/js/",
  jsext = ".js",
  csspath = "/css/",
  modelspath = "/data/",
  metapath = "/meta/",
  imgpath = "/img/",
  imgext = ".png",
  cssext = ".css",
  favicopath = "/favicon.ico",
  favicoext = ".ico",
  content_type = "Content-type",
  jstype = "application/javascript",
  csstype = "text/css",
  imgtype = "image/png",
  favicotype = "image/x-icon",
  jsontype = "application/json",
  accept = "Accept",
  not_found = "Not Found",
  doctype = "<!DOCTYPE html>",
  footer = "</body></html>",
  script = `
function got_data(Handler, data) {
  React.render(React.createElement(Handler, data), document);
}

Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) {
  if (cached_data) {
    var _d = cached_data;
    cached_data = null;
    got_data(Handler, _d);
    return;
  }

  var appname = state.routes.filter(function (r) { return !!r.name })[0].name;
  var querystring = "";
  for (var n in state.query) {
    querystring += n + "=" + state.query[n] + "&";
  }
  querystring = querystring.slice(0, querystring.length - 1);
  request.get(
    url.format({pathname: "/models/" + appname, query: {path: state.pathname, query: querystring}})
  ).set(
    "Accept", "application/json"
  ).end(function (r) {
    got_data(Handler, r.body);
  });
});
`;

let server = http.createServer(function (req, res) {
  let parsed = url.parse(req.url, true),
    pth = parsed.pathname,
    query = parsed.query;

  console.log(req.method, pth, query);

  if (req.method === "GET" && (pth.indexOf(jspath) === 0 || pth.indexOf(csspath) === 0 || pth.indexOf(imgpath) === 0 || pth === favicopath)) {
    let filename = path.join(__dirname, pth);
    fs.exists(filename, function(exists) {
      if (exists) {
        if (filename.endsWith(jsext)) {
          res.setHeader(content_type, jstype);
        } else if (filename.endsWith(cssext)) {
          res.setHeader(content_type, csstype);
        } else if (filename.endsWith(imgext)) {
          res.setHeader(content_type, imgtype);
        } else if (filename.endsWith(favicoext)) {
          res.setHeader(content_type, favicotype);
        }
        fs.createReadStream(filename).pipe(res);
      } else {
        res.writeHead(404); res.end(not_found);
      }
    });
    return;
  }
  let modelname = "",
    store_map = null;

  if (pth.indexOf(modelspath) === 0) {
    modelname = pth.slice(modelspath.length);
    store_map = models.model_map;
  } else if (pth.indexOf(metapath) === 0) {
    modelname = pth.slice(metapath.length);
    store_map = models.meta_map;
  }
  if (modelname) {
    if (req.method === "PUT") {
      let body = "";
      req.on('data', function(chunk) {
        body = body + chunk;
      });
      req.on('end', function() {
        if (body.length && body[0] === "{") {
          store_map.put(modelname, body).then(() => res.end());
        }
      });
    } else if (req.method === 'GET') {
      store_map.get(modelname).then((val) => {
        if (val === null) {
          res.writeHead(404);
          res.end(not_found);
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
      res.end(not_found);
      return;
    }

    console.log("App:", appnames[0].name);

    models[appnames[0].name](
      {method: req.method,
        path: state.path,
        params: state.params,
        query: state.query}
    ).then(function (data) {
      try {
        let response = React.renderToString(<Handler {...data} />),
          footer_index = response.indexOf(footer),
          header = response.slice(0, footer_index);
  
        res.setHeader(content_type, "text/html; charset=utf-8");
        res.end(
          doctype +
          header +
          "<script>var cached_data = " + JSON.stringify(data) + ";" +
          script +
          "</script>" +
          footer);
      } catch (e) {
        res.setHeader(content_type, "text/plain; charset=utf-8");
        res.end(e.stack);
      }
    });
  });
});

server.listen(10080);
console.log("server listening on http://localhost:10080/")


