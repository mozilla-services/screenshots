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
        <link rel="stylesheet" href={this.props.staticLink("/static/css/shot-index.css")} />
      </reactruntime.HeadTemplate>
    );
  }
}

Head.propTypes = {
  staticLink: PropTypes.func,
};

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultSearch: props.defaultSearch};
  }

  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height">
          <Header hasLogo={true} />
          <div id="shot-index" className="flex-1">
            <div className="no-shots" key="no-shots-found">
              <Localized id="gNoShots" attrs={{alt: true}}>
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
          <Footer {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }
}

Body.propTypes = {
  defaultSearch: PropTypes.string,
  staticLink: PropTypes.func,
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
