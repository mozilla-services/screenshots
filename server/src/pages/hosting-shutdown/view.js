const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
// const { Localized } = require("fluent-react/compat");
const React = require("react");
const PropTypes = require("prop-types");
const { Header } = require("../../header.js");

class Head extends React.Component {
  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/shot-index.css")} />
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
        <div className="column-space full-height">
          <Header hasLogo={true} hasFxa={this.props.hasFxa} />
          <div id="shot-index" className="flex-1">
            <div className="no-shots" key="no-shots-found">
              { /* <Localized id="shutdownPageIntro"> */ }
                <h1>Hosting shutdown notice.</h1>
              { /* </Localized> */ }
              { /* <Localized id="shutdownPageDescription"> */ }
                <p>We will be discontinuing hosted screenshots. You will still be able to download and copy screenshots in Firefox.</p>
              { /* </Localized> */ }
            </div>
          </div>
          <Footer {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }
}

Body.propTypes = {
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
