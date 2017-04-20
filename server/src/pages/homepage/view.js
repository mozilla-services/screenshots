/* globals window */
const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/homepage-bundle.js")} async></script>
        <meta name="viewport" content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Share anything on the web with anyone using Firefox Screenshots." /> <!-- todo l10n: homePageDescription -->
        <link href={this.props.staticLink("/homepage/css/style.css")} rel="stylesheet" />
        <meta name="description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." /><!-- todo l10n: homePageDescription2 -->
        <meta property="og:title" content={ this.props.title } />
        <meta property="og:url" content={ this.props.backend } />
        <meta property="og:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." /><!-- todo l10n: homePageDescription2 -->
        <meta name="twitter:title" content={ this.props.title } />
        <meta name="twitter:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." /><!-- todo l10n: homePageDescription2 -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="/static/img/onboarding-1.png" />
        <meta name="twitter:image" content="/static/img/onboarding-1.png" />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {
  onClickMyShots() {
    window.location = "/shots";
  }

  render() {
    let myShots;
    if (this.props.showMyShots) {
      myShots = <button className="myshots-button" onClick={ this.onClickMyShots.bind(this) }>
        <span className="myshots-text">Go To My Shots</span><!-- todo l10n: homePageButtonMyShots -->
      </button>;
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="vertical-centered-content-wrapper">
          { myShots }
          <div className="graphic" />
          <h1><strong>Firefox</strong> Screenshots<sup>Beta</sup></h1><!-- todo l10n: 'firefox screenshots' is untranslated, but 'beta' is homePageTitleBeta -->
          <p>Coming Soon...</p><!-- todo l10n: homePageTeaser -->
        </div>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
