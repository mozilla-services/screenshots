const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
const { Localized } = require("fluent-react/compat");
const React = require("react");

class Head extends React.Component {
  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/shot-index.css")} />
      </reactruntime.HeadTemplate>
    );
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultSearch: props.defaultSearch};
  }

  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height default-color-scheme">
          <div id="shot-index-header" className="header">
            <h1><a href="/shots">Firefox <strong>Screenshots</strong> <sup>Beta</sup></a></h1>
          </div>
          <div id="shot-index" className="flex-1">
            <div className="no-shots" key="no-shots-found">
              <Localized id="gNoShots">
                <img src={ this.props.staticLink("/static/img/image-nope_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
              </Localized>
              <Localized id="notFoundPageIntro">
                <p>Oops.</p>
              </Localized>
              <Localized id="notFoundPageDescription">
                <p>Page not found.</p>
              </Localized>
            </div>
          </div>
          <Footer forUrl="shots" {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
