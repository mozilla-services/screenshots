let React = require("react"),
  Router = require("react-router"),
  RouteHandler = Router.RouteHandler;

exports.Shell = React.createClass({
  render: function () {
    return <html>
      <head>
        <title>
          PageShot
        </title>
        <script src={"/js/bundle.js?gitRevision=" + this.props.gitRevision } />
        <link rel="stylesheet" href={"/css/styles.css?gitRevision=" + this.props.gitRevision } />
        <link rel="stylesheet" href={"/css/login.css?gitRevision=" + this.props.gitRevision }/>
      </head>
      <body>
        <RouteHandler {...this.props} />
      </body>
    </html>;
  }
});
