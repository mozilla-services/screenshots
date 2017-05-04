const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/creating-bundle.js")} async></script>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/simple.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-center full-height inverse-color-scheme">
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
