const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
const { Localized } = require("fluent-react/compat");
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
    const exportLink = <a href="/export"></a>;
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height">
          <Header hasLogo={true} hasFxa={this.props.hasFxa} />
          <div id="shot-index" className="flex-1">
            <div className="no-shots" key="no-shots-found">
              <Localized id="shutdownPageTitle">
                <h1>Screenshots is changing</h1>
              </Localized>
              <Localized id="shutdownPageDescription" a={exportLink}>
                <p>
                  Starting in June, Screenshots will no longer offer online storage. Want to keep shots from your library? Download shots individually or <a>in batch</a>. Thank you for using this feature, and we’re sorry for any inconvenience.
                </p>
              </Localized>
              <p>&nbsp;</p>
              <Localized id="shutdownPageContinue">
                <p>
                  We hope you’ll continue to use Screenshots to capture, copy, and download shots.
                </p>
              </Localized>
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
