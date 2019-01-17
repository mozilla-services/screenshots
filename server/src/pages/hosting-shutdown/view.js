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
        <link
          rel="stylesheet"
          href={this.props.staticLink("/static/css/shot-index.css")}
        />
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
              {/* <Localized id="shutdownPageIntro"> */}
              <h1>Screenshots is changing</h1>
              {/* </Localized> */}
              {/* <Localized id="shutdownPageDescription"> */}
              <p>
                The Firefox Screenshots server is shutting down in June of this
                year. Thank you for using this feature, and we apologize for any
                inconvenience.&nbsp;
                <span className="if-indefinite">
                  <a href="/export">Follow this link</a> to download all of the
                  screenshots you currently have saved on our server.
                </span>
              </p>
              <p>
                Screenshots will continue to be a part of Firefox. You can still
                capture screenshots, download them or copy them to your
                clipboard.
              </p>
              Thank you
              {/* </Localized> */}
            </div>
          </div>
          <Footer {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }
}

Body.propTypes = {};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
