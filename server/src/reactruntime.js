require("core-js");

const React = require("react");
const ReactDOM = require("react-dom");
const linker = require("./linker");
require("fluent-intl-polyfill/compat");
const { MessageContext } = require("fluent/compat");
const { LocalizationProvider } = require("fluent-react/compat");
const { getLocaleMessages } = require("./locale-messages");

function generateMessages(messages, locales) {
  const contexts = [];
  for (const locale of locales) {
    const cx = new MessageContext(locale);
    cx.addMessages(messages[locale]);
    contexts.push(cx);
  }
  return contexts;
}

exports.HeadTemplate = class HeadTemplate extends React.Component {

  render() {
    // FIXME: this should probably include some standard CSS or other boilerplate
    let analyticsScript;
    let activationScript;
    if (!this.props.noAnalytics) {
      analyticsScript = <script src="//www.google-analytics.com/analytics.js" async />;
      if (this.props.hashAnalytics) {
        activationScript = <script src={this.props.staticLink("/ga-activation-hashed.js")} />;
      } else {
        activationScript = <script src={this.props.staticLink("/ga-activation.js")} />;
      }
    }

    let localeScripts = [];
    for (let locale of this.props.userLocales) {
      localeScripts.push(<script key={`l10n-${locale}`} src={this.props.staticLink(`/static/locales/${locale}.js`)} />);
    }

    return (
    <LocalizationProvider messages={generateMessages(this.props.messages, this.props.userLocales)}>
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.title}</title>
        <link rel="shortcut icon" href={this.props.staticLink("/static/img/favicon-32.png")} />
        <link rel="icon" type="image/png" href={this.props.staticLink("/static/img/favicon-16.png")} sizes="16x16"/>
        <link rel="icon" type="image/png" href={this.props.staticLink("/static/img/favicon-32.png")} sizes="32x32"/>
        <link rel="icon" type="image/png" href={this.props.staticLink("/static/img/favicon-96.png")} sizes="96x96"/>
        { analyticsScript }
        { activationScript }
        { localeScripts }
        { this.props.sentryPublicDSN ? <script src={this.props.staticLink("/install-raven.js")} async /> : null }
        {this.props.children}
      </head>
    </LocalizationProvider>
    );
  }

};

exports.BodyTemplate = class Body extends React.Component {

  render() {
    return (
    <LocalizationProvider messages={generateMessages(this.props.messages, this.props.userLocales)}>
      <div>
        {this.props.children}
      </div>
    </LocalizationProvider>
    );
  }

};

exports.Page = class Page {
  constructor(options) {
    for (let name in options) {
      if (!this.ATTRS.includes(name)) {
        throw new Error("Invalid attribute to Page: " + name);
      }
      let value = options[name];
      this[name] = value;
    }
  }

  set dir(val) {
    if (val.startsWith("/")) {
      if (!val.startsWith(__dirname)) {
        throw new Error("Unknown directory for page: " + val + " (not " + __dirname + ")");
      }
      val = val.substr(__dirname.length).replace(/^\/+/, "");
    }
    val = val.replace(/\/+$/, "");
    this._dir = val;
  }

  render(model) {
    let renderBody = () => {
      let body = this.BodyFactory(model);
      let curTitle = document.title;
      if (model.title && model.title != curTitle) {
        document.title = model.title;
      }
      ReactDOM.render(
        body,
        document.getElementById("react-body-container"));
    };

    let tryGetL10nMessages = (locales) => {
      let successHandler = localeMessages => {
        model.messages = Object.assign({}, ...localeMessages);
        renderBody();
      };
      let failureHandler = failedLocale => {
        if (locales.length === 1) {
          // everything failed at this point. what can we do here?
          renderBody();
          return;
        }
        let remainingLocales = locales.slice();
        let failedLocaleIndex = locales.indexOf(failedLocale);
        remainingLocales.splice(failedLocaleIndex, 1);
        tryGetL10nMessages(remainingLocales);
      }
      getLocaleMessages(locales)
        .then(successHandler)
        .catch(failureHandler);
    };

    if (!model.staticLink) {
      linker.setGitRevision(model.gitRevision);
      model.staticLink = linker.staticLink.bind(null, {
        cdn: model.cdn
      });
    }

    if (model.userLocales && model.userLocales.length && !model.messages) {
      return tryGetL10nMessages(model.userLocales);
    }

    renderBody();
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
dir viewModule noBrowserJavascript extraBodyJavascript
`.split(/\s+/g);

if (typeof window !== "undefined") {
  setTimeout(() => {
    if (window.initialModel !== undefined && !window.initialModelLaunched) {
      window.initialModelLaunched = true;
      window.controller.launch(window.initialModel);
    }
  });
}
