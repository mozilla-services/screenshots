const { addReactScripts } = require("./reactutils");
const ReactDOMServer = require("react-dom/server");
const { getGitRevision } = require("./linker");

const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><template></template>");
const template = dom.window.document.querySelector("template");

// Used by the LocalizationProvider to sanitize markup in translations on the
// server side. During runtime it uses document.createElement("template").
function parseMarkup(textContent) {
  // eslint-disable-next-line no-unsanitized/property
  template.innerHTML = textContent;
  return Array.from(template.content.childNodes);
}

exports.render = function(req, res, page) {
  const modelModule = require("./" + page.modelModuleName);
  const viewModule = page.viewModule;
  const cdn = req.config.siteCdn.replace(/\/*$/, "");
  Promise.resolve(modelModule.createModel(req)).then((model) => {
    model.backend = req.backend;
    let jsonModel = model.jsonModel || model;
    let serverModel = model.serverModel || model;
    const csrfToken = req.csrfToken && req.csrfToken();
    jsonModel = Object.assign({
      authenticated: !!req.deviceId,
      hasFxa: !!req.accountId,
      authFxa: !!req.query.auth,
      sentryPublicDSN: req.config.sentryPublicDSN,
      backend: req.backend,
      gitRevision: getGitRevision(),
      cdn,
      csrfToken,
      abTests: req.abTests,
      userLocales: req.userLocales,
      parseMarkup,
    }, jsonModel);
    serverModel = Object.assign({
      authenticated: !!req.deviceId,
      hasFxa: !!req.accountId,
      authFxa: !!req.query.auth,
      sentryPublicDSN: req.config.sentryPublicDSN,
      staticLink: req.staticLink,
      csrfToken,
      abTests: req.abTests,
      userLocales: req.userLocales,
      messages: req.messages,
      parseMarkup,
    }, serverModel);
    if (req.query.data === "json") {
      if (req.query.pretty !== undefined) {
        res.type("json").send(JSON.stringify(jsonModel, null, "  "));
      } else {
        res.type("json").send(jsonModel);
      }
      return;
    }
    const head = ReactDOMServer.renderToStaticMarkup(viewModule.HeadFactory(serverModel));
    let body;
    if (page.noBrowserJavascript) {
      body = ReactDOMServer.renderToStaticMarkup(viewModule.BodyFactory(serverModel));
    } else {
      body = ReactDOMServer.renderToString(viewModule.BodyFactory(serverModel));
    }
    const jsonString = JSON.stringify(jsonModel).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/<script/ig, "\\x3cscript").replace(/<\/script/ig, "\\x3c/script");
    let doc = `
    <html>
      ${head}
      <body class="app-body">
        <div id="react-body-container">${body}</div>
        <script id="json-data" type="data">${jsonString}</script>
      </body></html>
    `.trim();
    if (!page.noBrowserJavascript) {
      // FIXME: we should just inline the addReactScripts functionality in this function:
      let script = `\
      var jsonData = document.getElementById('json-data').textContent;
window.initialModel = JSON.parse(jsonData);
window.initialModelLaunched = false;
if (window.controller) {
  window.controller.launch(window.initialModel);
  window.initialModelLaunched = true;
}
`;
      if (page.extraBodyJavascript) {
        script += page.extraBodyJavascript;
      }
      doc = addReactScripts(doc, script, req.cspNonce);
    }
    res.send(doc);
  }).catch((err) => {
    res.type("txt").status(500).send("Error: " + err + "\n" + err.stack);
  });
};
