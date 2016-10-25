const React = require("react");
const { gaScript } = require("../ga-activation");

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
      <script src={ this.props.staticLink("/static/js/shot-bundle.js") } key="shot-bundle-js" />,
    ];
    if (this.props.gaId) {
      js.push(gaScript);
    }
    if (this.props.simple) {
      js = null;
    }
    return <html prefix="og: http://ogp.me/ns#">
      <head>
        <meta charSet="UTF-8" />
        <meta name="referrer" content="origin" />
        <title>{this.props.title}</title>
        {js}
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/styles.css") } />
        {this.props.children[0].props.children}
      </head>
      <body className={this.props.bodyClass}>
        {this.props.children[1].props.children}
      </body>
    </html>;
  }
}
