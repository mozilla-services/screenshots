/* globals document, location */

const React = require("react");
const ReactDOM = require("react-dom");
const linker = require("./linker");

exports.HeadTemplate = class HeadTemplate extends React.Component {

  render() {
    // FIXME: this should probably include some standard CSS or other boilerplate
    let analyticsScript;
    let activationScript;
    if (! this.props.noAnalytics) {
      analyticsScript = <script src="//www.google-analytics.com/analytics.js" async />;
      if (this.props.hashAnalytics) {
        activationScript = <script src={this.props.staticLink("/ga-activation-hashed.js")} />;
      } else {
        activationScript = <script src={this.props.staticLink("/ga-activation.js")} />;
      }
    }
    return (
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.title}</title>
        <link rel="icon" type="image/png" href={this.props.staticLink("/static/img/pageshot-icon-32.png")} />
        <link rel="shortcut icon" href={this.props.staticLink("/static/img/pageshot-icon-32.png")} />
        { analyticsScript }
        { activationScript }
        { this.props.sentryPublicDSN ? <script src={ this.props.staticLink("/static/vendor/raven.js") } /> : null }
        { this.props.sentryPublicDSN ? <script src={this.props.staticLink("/configure-raven.js")} /> : null }
        {this.props.children}
      </head>
    );
  }

};

exports.BodyTemplate = class Body extends React.Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

};

exports.Page = class Page {
  constructor(options) {
    for (let name in options) {
      if (! this.ATTRS.includes(name)) {
        throw new Error("Invalid attribute to Page: " + name);
      }
      let value = options[name];
      this[name] = value;
    }
  }

  set dir(val) {
    if (val.startsWith("/")) {
      if (! val.startsWith(__dirname)) {
        throw new Error("Unknown directory for page: " + val + " (not " + __dirname + ")");
      }
      val = val.substr(__dirname.length).replace(/^\/+/, "");
    }
    val = val.replace(/\/+$/, "");
    this._dir = val;
  }

  render(model) {
    if (! model.staticLink) {
      linker.setGitRevision(model.gitRevision);
      model.staticLink = linker.staticLink;
      model.staticLinkWithHost = linker.staticLinkWithHost.bind(null, {
        protocol: location.protocol.replace(/:$/, ""),
        headers: {
          host: location.host
        }
      });
    }
    let body = this.BodyFactory(model);
    ReactDOM.render(
      body,
      document.getElementById("react-body-container"));
  }

  get dir() {
    return this._dir;
  }

  get modelModuleName() {
    return this.dir + "/model";
  }

  get BodyFactory() {
    return this.viewModule.BodyFactory;
  }

};

exports.Page.prototype.ATTRS = `
dir viewModule noBrowserJavascript
`.split(/\s+/g);
