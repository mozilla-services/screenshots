const React = require("react");
const { gaActivation } = require("../ga-activation");

export class Shell extends React.Component {
  render() {
    if (this.props.children.length != 2) {
      throw new Error("Shell needs exactly two children (head and body)");
    }
    if (this.props.children[0].type != "head") {
      throw new Error("Shell first child must be <head> (not " + this.props.children[0].type + ")");
    }
    if (this.props.children[1].type != "body") {
      throw new Error("Shell second child must be <body> (not " + this.props.children[1].type + ")");
    }
    let js = [
      <link rel="stylesheet" href={ this.props.staticLink("vendor/introjs/introjs.css") } key="introjs-stylesheet" />,
      <script src={ this.props.staticLink("vendor/introjs/intro.js") } key="introjs-js" />,
      <script src={ this.props.staticLink("js/server-bundle.js") } key="server-bundle-js" />,
    ];
    js = js.concat(gaActivation(this.props.gaId, this.props.deviceId));
    if (this.props.simple) {
      js = null;
    }
    return <html prefix="og: http://ogp.me/ns#">
      <head>
        <meta charSet="UTF-8" />
        <meta name="referrer" content="origin" />
        <title>{this.props.title}</title>
        {js}
        <link rel="stylesheet" href={ this.props.staticLink("css/styles.css") } />
        <link rel="stylesheet" href={ this.props.staticLink("css/profile.css") } />
        {this.props.children[0].props.children}
      </head>
      <body>
        {this.props.children[1].props.children}
      </body>
    </html>;
  }
}
