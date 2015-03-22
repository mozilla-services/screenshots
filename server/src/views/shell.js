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
        <script src="/js/bundle.js" />
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/login.css" />
      </head>
      <body>
        <RouteHandler {...this.props} />
      </body>
    </html>;
  }
});
