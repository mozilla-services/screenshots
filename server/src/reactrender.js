const { addReactScripts } = require("./reactutils");
const React = require("react");
const { getGitRevision } = require("./linker");

exports.render = function (req, res, page) {
  console.log("rendering");
  let modelModule = require("./" + page.modelModuleName);
  let viewModule = page.viewModule;
  modelModule.createModel(req).then((model) => {
    model = {
      backend: req.backend,
      gitRevision: getGitRevision(),
      ...model
    };
    let serverModel = {
      staticLink: req.staticLink,
      ...model
    };
    let head = React.renderToStaticMarkup(viewModule.HeadFactory(serverModel));
    let body = React.renderToString(viewModule.BodyFactory(serverModel));
    let doc = `
    <html>
      ${head}
      <body>
        <div id="react-body-container">${body}</div>
      </body></html>
    `.trim();
    // FIXME: we should just inline the addReactScripts functionality in this function:
    doc = addReactScripts(doc, `controller.launch(${JSON.stringify(model)});`);
    res.send(doc);
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err + "\n" + err.stack);
  });
};
