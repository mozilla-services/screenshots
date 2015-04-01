/* globals window */

let React = require("react"),
  Router = require("react-router"),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  url = require("url"),
  shell = require("./views/shell.js"),
  main = require("./views/main.js"),
  frame = require("./views/frame.js"),
  content = require("./views/content.js");

/*
Shot view: /{random/domainName}
Content: /content/{id} (the saved DOM, plus interactive.js)
Overview: /summary/{id}
Tag/collection view: /tag/{tagname}
Data: /data/{id} - support GET and PUT
Meta: /meta/{id}
Tags: /tags-for/{id} - list of tags on the page, GET and PUT a JSON list
  This affects the rendering of /tag/{tagname}
  Derived from meta comment, by parsing #hashtags
*/


exports.routes = (
  <Route path="/" handler={shell.Shell}>
    <Route name="content" path="content/:contentId/:contentDomain" handler={content.Content} />
    <Route name="summary" path="summary/:summaryId" handler={main.Main} />
    <Route name="tag" path="tag/:tagId" handler={main.Main} />
    <Route name="meta" path="meta/:metaId" handler={main.Main} />
    <Route name="tags" path="tags-for/:tagsId" handler={main.Main} />
    <Route name="shot" path=":shotId/:shotDomain" handler={frame.Frame} />
    <DefaultRoute name="main" handler={main.Main} />
  </Route>
);

try {
  window.React = React;
  window.Router = Router;
  window.shell = shell;
  window.routes = exports;
  window.url = url;
} catch (e) {

}
