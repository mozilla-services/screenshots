/* globals document, location */

const React = require("react");
const linker = require("./linker");

exports.HeadTemplate = class HeadTemplate extends React.Component {

  render() {
    // FIXME: this should probably include some standard CSS or other boilerplate
    // FIXME: should also include (at least optionally) GA
    return (
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.title}</title>
        <link rel="shortcut icon" href={this.props.staticLink("img/pageshot-icon-32.png")} />
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
    React.render(
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
dir viewModule
`.split(/\s+/g);
