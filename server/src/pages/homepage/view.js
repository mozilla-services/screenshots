/* globals window */
const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/homepage-bundle.js")}></script>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/styles.css")} />
        <meta name="viewport" content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="description" content="Share anything on the web with anyone using Page Shot." />
        <link rel="stylesheet" href="https://code.cdn.mozilla.net/fonts/fira.css" />
        <link href={this.props.staticLink("/homepage/css/style.css")} rel="stylesheet" />
        <meta name="description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        <meta property="og:title" content={ this.props.title } />
        <meta property="og:url" content={ this.props.backend } />
        <meta property="og:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        <meta name="twitter:title" content={ this.props.title } />
        <meta name="twitter:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://testpilot-prod.s3.amazonaws.com/experiments_experiment/2/d/2d3eaabad489f46bf835790776c0f74a_image_1475081824_0659.jpg" />
        <meta name="twitter:image" content="https://testpilot-prod.s3.amazonaws.com/experiments_experiment/2/d/2d3eaabad489f46bf835790776c0f74a_image_1475081824_0845.jpg" />
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
      myShots = <button className="pageshot-myshots" onClick={ this.onClickMyShots.bind(this) }>
        <div className="pageshot-pre-myshots"></div>
        <span className="pageshot-myshots-text">My Shots</span>
        <div className="pageshot-post-myshots"></div>
      </button>;
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="vertical-centered-content-wrapper">
          <div className="stars"></div>
          <div className="copter fly-up"></div>
          <h1>Welcome to Page Shot</h1>
          <a className="button primary" href="https://testpilot.firefox.com/experiments/page-shot">Install Page Shot with Firefox Test Pilot</a>
          { myShots }
          <div className="social-links">
            <a href="https://github.com/mozilla-services/pageshot" target="_blank" className="link-icon github" title="GitHub"></a>
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
