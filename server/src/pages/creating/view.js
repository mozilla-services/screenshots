const reactruntime = require("../../reactruntime");
const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");

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

Head.propTypes = {
  staticLink: PropTypes.func,
};

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-center full-height">
          <div className="loader">
            <div className="loader-inner" />
          </div>
          <Localized id="creatingPageWaitMessage">
            <p>Saving your shot…</p>
          </Localized>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
