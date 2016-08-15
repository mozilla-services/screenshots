const { addReactScripts } = require("./reactutils");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { getGitRevision } = require("./linker");

exports.render = function (req, res, page) {
  let modelModule = require("./" + page.modelModuleName);
  let viewModule = page.viewModule;
  modelModule.createModel(req).then((model) => {
    let jsonModel = model.jsonModel || model;
    let serverModel = model.serverModel || model;
    jsonModel = Object.assign({
      backend: req.backend,
      gitRevision: getGitRevision()
    }, jsonModel);
    serverModel = Object.assign({
      staticLink: req.staticLink,
      staticLinkWithHost: req.staticLinkWithHost
    }, serverModel);
    if (req.query.data == "json") {
      res.type("json").send(jsonModel);
      return;
    }
    let head = ReactDOMServer.renderToStaticMarkup(viewModule.HeadFactory(serverModel));
    let body = ReactDOMServer.renderToString(viewModule.BodyFactory(serverModel));
    let doc = `
    <html>
      ${head}
      <body>
        <div id="react-body-container">${body}</div>
      </body></html>
    `.trim();
    // FIXME: we should just inline the addReactScripts functionality in this function:
    doc = addReactScripts(doc, `controller.launch(${JSON.stringify(jsonModel)});`, req.cspNonce);
    res.send(doc);
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err + "\n" + err.stack);
  });
};
