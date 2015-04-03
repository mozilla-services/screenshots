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
        <script src={"/js/bundle.js?git_revision=" + this.props.git_revision } />
        <link rel="stylesheet" href={"/css/styles.css?git_revision=" + this.props.git_revision } />
        <link rel="stylesheet" href={"/css/login.css?git_revision=" + this.props.git_revision }/>
      </head>
      <body>
        <RouteHandler {...this.props} />
      </body>
    </html>;
  }
});
