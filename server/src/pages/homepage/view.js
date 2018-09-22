const React = require("react");
const PropTypes = require("prop-types");
const reactruntime = require("../../reactruntime");
const classnames = require("classnames");
const sendEvent = require("../../browser-send-event.js");
const { Footer } = require("../../footer-view.js");
const { Localized } = require("fluent-react/compat");
const { HomePageHeader } = require("./homepage-header");

class Head extends React.Component {
  generateFullLink(link) {
    return this.props.backend + link;
  }

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/home.css")} />
        <script src={this.props.staticLink("/static/js/UITour-lib.js")} async></script>
        <script src={this.props.staticLink("/static/js/homepage-bundle.js")} async></script>
        <meta name="viewport" content="width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <Localized id="homePageDescription" attrs={{content: true}}>
          <meta name="description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta property="og:title" content={this.props.title} />
        <meta property="og:url" content={this.props.backend} />
        <Localized id="homePageDescription" attrs={{content: true}}>
          <meta property="og:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta name="twitter:title" content={this.props.title} />
        <Localized id="homePageDescription" attrs={{content: true}}>
          <meta name="twitter:description" content="Intuitive screenshots baked right into the browser. Capture, save and share screenshots as you browse the Web using Firefox." />
        </Localized>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@firefox" />
        <meta property="og:image" content={this.props.staticLink("/static/img/og-image.png")} />
        <meta name="twitter:image" content={this.generateFullLink("/static/img/twitter-image.png")} />
      </reactruntime.HeadTemplate>
    );
  }

}

Head.propTypes = {
  backend: PropTypes.string,
  staticLink: PropTypes.func,
  title: PropTypes.string,
};

class Body extends React.Component {
  onClickInstallFirefox() {
    sendEvent("click-install-firefox-home", { useBeacon: true });
  }

  renderGetFirefox() {
    if (this.props.isFirefox) {
      return null;
    }
    return (
      <a href="https://www.mozilla.org/firefox/new/?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm_content=from-home" className="button primary download-firefox" onClick={this.onClickInstallFirefox.bind(this)}>
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
    const is57 = this.props.isFirefox && this.props.firefoxVersion >= 57;
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <HomePageHeader isOwner={this.props.showMyShots} isFirefox={this.props.isFirefox}
                        hasFxa={this.props.hasFxa} staticLink={this.props.staticLink}/>
        <div className="banner">
          <div className="banner-image-back" />
          <div className="banner-container">
            <div className="banner-content">
              <h1>Firefox Screenshots</h1>
              <Localized id="gScreenshotsDescription">
                <p>Screenshots made simple. Take, save, and share screenshots without leaving Firefox.</p>
              </Localized>
              {this.renderGetFirefox()}
            </div>
            <div className="banner-image-front" />
          </div>
        </div>
        <Localized id="homePageHowScreenshotsWorks">
          <h2 id="how-screenshots-works">How Screenshots Works</h2>
        </Localized>
        <section id="section-1">
          <div className="container">
            <div className="section-content align-left">
              <Localized id="homePageGetStartedTitle">
                <h3>Get Started</h3>
              </Localized>
              {is57 ? (
                <Localized id="homePageGetStartedDescriptionPageAction">
                  <p>Select the Screenshots icon from the page actions menu in the address bar, and the Screenshots menu will appear on top of your browser window.</p>
                </Localized>
              ) : (
                  <Localized id="homePageGetStartedDescription">
                    <p>Find the new Screenshots icon on your toolbar. Select it, and the Screenshots menu will appear on top of your browser window.</p>
                  </Localized>
                )
              }
            </div>
            <div className={classnames("section-image", "align-right", { "page-action": is57 })}></div>
          </div>
        </section>
        <section id="section-2">
          <div className="container">
            <div className="section-content align-right">
              <Localized id="homePageCaptureRegion">
                <h3>Capture a Region</h3>
              </Localized>
              <Localized id="homePageCaptureRegionDescription">
                <p>Click and drag to select the area you want to capture. Or just hover and click — Screenshots will select the area for you. Like what you see? Select Save to access your screenshot online or the down arrow button to download it to your computer.</p>
              </Localized>
            </div>
            <div className="section-image align-left"></div>
          </div>
        </section>
        {is57 &&
          <section id="section-3">
            <div className="container">
              <div className="section-content align-left">
                <Localized id="homePageCapturePage">
                  <h3>Capture a Page</h3>
                </Localized>
                <Localized id="homePageCapturePageDescription">
                  <p>Use the buttons in the upper right to capture full pages. The Save Visible button will capture the area you can view without scrolling, and the Save Full Page will capture everything on the page.</p>
                </Localized>
              </div>
              <div className="section-image align-right"></div>
            </div>
          </section>
        }
        <section id="section-4">
          <div className="container">
            <div className={classnames("section-content", { "align-right": is57 }, { "align-left": !is57 })}>
              <Localized id="homePageSaveShare">
                <h3>Save and Share</h3>
              </Localized>
              <Localized id="homePageSaveShareDescription">
                <p>When you take a shot, Firefox posts your screenshot to your online Screenshots library and copies the link to your clipboard. We automatically store your screenshot for two weeks, but you can delete shots at any time or change the expiration date to keep them in your library for longer. </p>
              </Localized>
            </div>
            <div className={classnames("section-image", { "align-left": is57 }, { "align-right": !is57 })}></div>
          </div>
        </section>
        <Footer {...this.props} />
      </reactruntime.BodyTemplate>
    );
  }

}

Body.propTypes = {
  hasFxa: PropTypes.bool,
  firefoxVersion: PropTypes.string,
  isFirefox: PropTypes.bool,
  showMyShots: PropTypes.bool,
  staticLink: PropTypes.func,
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
