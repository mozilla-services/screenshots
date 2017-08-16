const reactruntime = require("../../reactruntime");
const React = require("react");
const { Localized } = require("fluent-react/compat");
const { Footer } = require("../../footer-view.js");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/homepage-bundle.js")} async></script>
        <meta name="viewport" content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <Localized id="homePageDescription">
          <meta name="description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta property="og:title" content={ this.props.title } />
        <meta property="og:url" content={ this.props.backend } />
        <Localized id="homePageDescription">
          <meta property="og:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta name="twitter:title" content={ this.props.title } />
        <Localized id="homePageDescription">
          <meta name="twitter:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={ this.props.staticLink("/static/img/onboarding-1.png") } />
        <meta name="twitter:image" content={ this.props.staticLink("/static/img/onboarding-1.png") } />
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/home.css") } />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {
  onClickMyShots() {
    window.location = "/shots";
  }

  renderGetFirefox() {
    if (this.props.isFirefox) {
      return null;
    }
    return (
      <a href="https://www.mozilla.org/firefox" className="button primary download-firefox">
        <div className="button-icon">
          <div className="button-icon-badge"></div>
        </div>
        <div className="button-copy">
          <Localized id="homePageDownloadFirefoxTitle">
            <div className="button-title">Firefox</div>
          </Localized>
          <Localized id="homePageDownloadFirefoxSubTitle">
            <div className="button-description">Free Download</div>
          </Localized>
        </div>
      </a>
    );
  }

  render() {
    let myShots;
    if (this.props.showMyShots) {
      myShots = <a className="myshots-button" onClick={ this.onClickMyShots.bind(this) }>
        <Localized id="gMyShots">
          <span className="myshots-text">My Shots</span>
        </Localized>
      </a>
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="default-color-scheme">
          <header>
            <nav>
              <div className="container">
                <div className="header-logo">
                  <a href="#" className="screenshots-logo"></a>
                </div>
                <div className="nav-links">
                  <Localized id="homePageGetStarted">
                    <a href="#how-screenshots-works">Get Started</a>
                  </Localized>
                  { myShots }
                </div>
              </div>
            </nav>
            <div className="banner-spacer" />
            <div className="banner">
              <div className="container">
                <div className="banner-content">
                  <h1>Firefox Screenshots</h1>
                  <Localized id="gScreenshotsDescription">
                    <p>Screenshots made simple. Take, save, and share screenshots without leaving Firefox.</p>
                  </Localized>
                  { this.renderGetFirefox() }
                </div>
              </div>
              <div className="banner-image" />
            </div>
          </header>
          <Localized id="homePageHowScreenshotsWorks">
            <h2 id="how-screenshots-works">How Screenshots Works</h2>
          </Localized>
          <section id="section-1">
            <div className="container">
              <div className="section-content">
                <Localized id="homePageGetStartedTitle">
                  <h3>Get Started</h3>
                </Localized>
                <Localized id="homePageGetStartedDescription">
                  <p>Find the new Screenshots icon on your toolbar. Select it, and the Screenshots menu will appear on top of your browser window.</p>
                </Localized>
              </div>
              <div className="section-image"></div>
            </div>
          </section>
          <section id="section-2">
            <div className="container">
              <div className="section-content">
                <Localized id="homePageCaptureRegion">
                  <h3>Capture a Region</h3>
                </Localized>
                <Localized id="homePageCaptureRegionDescription">
                  <p>Click and drag to select the area you want to capture. Or just hover and click — Screenshots will select the area for you. Like what you see? Select Save to access your screenshot online or the down arrow button to download it to your computer.</p>
                </Localized>
              </div>
              <div className="section-image"></div>
            </div>
          </section>
          <section id="section-4">
            <div className="container">
              <div className="section-content">
                <Localized id="homePageSaveShare">
                  <h3>Save and Share</h3>
                </Localized>
                <Localized id="homePageSaveShareDescription">
                  <p>When you take a shot, Firefox posts your screenshot to your online Screenshots library and copies the link to your clipboard. We automatically store your screenshot for two weeks, but you can delete shots at any time or change the expiration date to keep them in your library for longer. </p>
                </Localized>
              </div>
              <div className="section-image"></div>
            </div>
          </section>
          <Footer {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
