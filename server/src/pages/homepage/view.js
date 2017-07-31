const reactruntime = require("../../reactruntime");
const React = require("react");
const { Localized } = require("fluent-react/compat");
const style = `
  html, body {
    padding: 0;
    margin: 0;
    font-family: SF UI Text, sans-serif;
    font-size: 12pt;
  }

  .container {
    max-width: 1160px;
    padding: 40px 33px;
    margin: 0 auto;
    display: -ms-flexbox;
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: end;
    justify-content: space-between;
    position: relative;
    min-width: 0;
    height: 100%;
  }

  /* Navigation Bar */

  nav {
    height: 82px;
    display: flex;
    align-items: center;
    background-color: #fff;
    position: fixed;
    width: 100%;
    z-index: 1000;
    box-shadow: rgba(0,0,0,0.09) 0px 3px 6px;
  }

  .myshots-text {
    cursor: pointer;
  }

  .header-logo {
    display: -ms-flexbox;
      display: flex;
      -ms-flex-align: end;
      align-items: flex-end;
  }

  .nav-links {
    display: -ms-flexbox;
      display: flex;
      -ms-flex-align: end;
      align-items: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -ms-flex: 1;
      flex: 1;
  }

  .screenshots-logo {
    background-image: url(../static/img/landing-Screenshot-logo.svg);
    background-repeat: no-repeat;
      background-size: contain;
      height: 37px;
      width: 390px;
      position: relative;
  }

  .nav-links a {
    color: #4a4a4a;
    text-decoration: none;
    cursor: pointer;
  }

  .nav-links a:first-child {
    margin-right: 71px;
  }

  /* Header Banner */

  .banner {
    background-color: #04d1e6;
    background-image: url(../static/img/landing-screenshots_banner.svg);
    background-repeat: no-repeat;
    background-position: 60% 65%;
    min-height: 587px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: 82px;
  }

  .banner-content {
    width: 50%;
  }

  .banner-content h1 {
    color: #fff;
    font-size: 3em;
    font-weight: 400;
    margin: 0 0 20px 0;
  }

  .banner-content p {
    color: #fff;
    font-size: 1.3em;
    padding-right: 80px;
    line-height: 1.61;
    margin: 0;
    font-weight: 300;
  }

  h2 {
    color: #004c66;
    font-size: 2.3em;
    text-align: center;
    margin: 29px 20px 22px 20px;
    font-weight: 600;
    line-height: 55px;
  }

  .button {
      border: 1px solid transparent;
      border-radius: 3px;
      cursor: pointer;
      display: inline-block;
      font-family: Fira Sans,sans-serif;
      font-weight: 400;
      height: 40px;
      line-height: 40px;
      outline: none;
      position: relative;
      text-align: center;
      text-decoration: none;
      transition: background .15s,width .15s;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      white-space: nowrap;
      box-shadow: rgba(0,0,0,.09) 0px 6px 9px;
  }

  .download-firefox {
      display: -ms-flexbox;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: center;
      justify-content: center;
      color: #fff;
      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      font-weight: 500;
      height: 80px;
      margin-top: 30px;
      transition-duration: .25s;
      transition-property: box-shadow,border;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      width: 260px;
  }

  .button.primary {
      background: #95E100;
      color: #fff;
      text-align: left;
  }

  .download-firefox .button-icon {
      background-image: url(../static/img/landing-small-firefox-logo.png);
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 57px 59px;
      -ms-flex: 0 0 57px;
      flex: 0 0 57px;
      height: 59px;
      margin-right: 16px;
      position: relative;
  }

  .download-firefox .button-icon-badge {
      background-image: url(../static/img/landing-download-icon.png);
      background-size: 16px 16px;
      background-color: #fff;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: 16px;
      border-radius: 50%;
      bottom: 4px;
      box-shadow: 0 2px 0 rgba(0,0,0,.2);
      height: 16px;
      padding: 6px;
      position: absolute;
      right: 2px;
      transition-duration: .15s;
      width: 16px;
  }

  .download-firefox .button-title {
      font-size: 24px;
      font-weight: 600;
      line-height: 1em;
      margin-bottom: .25em;
  }

  .download-firefox .button-description {
      font-size: 18px;
      font-weight: 300;
      line-height: 1em;
  }

  /* Instruction Sections */

  section {
    min-height: 650px;
    display: flex;
    align-items: center;
  }

  section:nth-child(even) {
    background-color: #f7fdfe;
  }

  section .container{
    max-width: 1100px;
    padding: 40px 63px;
  }

  .section-content h3 {
    font-size: 2.5em;
    font-weight: 100;
    margin: 0;
  }

  .section-content .bold {
    font-weight: 500;
  }

  .section-content {
    display: flex;
    justify-content: flex-start;
    width: 36%;
    flex-direction: column;
    color: #4a4a4a;
    line-height: 1.61;
  }

  .section-image {
    display: flex;
    justify-content: flex-end;
    width: 50%;
    height: auto;
    background-size: contain;
  }

  #section-1 .section-image {
    background-image: url(../static/img/landing-screenshots_image_01.svg);
    background-repeat: no-repeat;
    background-position: 100% center;
    height: 476px;
  }
  #section-2 .section-image {
    background-image: url(../static/img/landing-screenshots_image_02.svg);
    background-repeat: no-repeat;
    background-position: 0% center;
    height: 500px;
  }
  #section-3 .section-image {
    background-image: url(../static/img/landing-screenshots_image_03.svg);
    background-repeat: no-repeat;
    background-position: 100% center;
    height: 519px;
  }
  #section-4 .section-image {
    background-image: url(../static/img/landing-screenshots_image_04.svg);
    background-repeat: no-repeat;
    background-position: 0% center;
    height: 533px;
  }

  #section-1 .section-content,
  #section-2 .section-image,
  #section-3 .section-content,
  #section-4 .section-image {
    order: 1;
  }

  #section-1 .section-image,
  #section-2 .section-content,
  #section-3 .section-image,
  #section-4 .section-content {
    order: 2;
  }

  /* Coming Soon Section */

  #coming {
    min-height: 350px;
  }

  #coming .container{
    max-width: 840px;
    padding: 40px 100px;
  }

  .coming-content {
    display: flex;
    color: #4a4a4a;
    flex-direction: column;
    justify-content: flex-end;
    width: 45%;
  }

  .coming-content h3 {
    font-size: 2em;
    font-weight: 100;
    margin: 0;
  }

  .coming-content p {
    font-size: .9em;
    line-height: 1.61;
    margin-bottom: 0;
  }

  .coming-icons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .coming-icons span {
    font-size: 2em;
    margin: 0 33px;
    color: #4a4a4a;
    position: relative;
    top: 16px;
  }

  .coming-icons div {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .chrome-icon {
    background-image: url(../static/img/landing-icon-chrome.svg);
  }

  .screenshots-icon {
    background-image: url(../static/img/landing-icon-screenshots.svg);
  }

  /* Footer */

  footer {
    min-height: 100px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
  }

  .legal-links {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: end;
      align-items: flex-end;
  }

  .legal-links .boilerplate {
    margin-right: 30px;
    position: relative;
    top: -7px;
    color: #4a4a4a;
    text-decoration: none;
  }

  .social-links {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: end;
      align-items: flex-end;
      -ms-flex-pack: end;
      justify-content: flex-end;
      -ms-flex: 1;
      flex: 1;
  }

  .social-links .link-icon {
      background-repeat: repeat;
      cursor: pointer;
      -ms-flex: 0 0 37px;
      flex: 0 0 37px;
      height: 37px;
      margin-left: 15px;
  }

  .social-links .github {
    background-image: url(../static/img/landing-icon-github.svg);
  }

  .social-links .twitter {
    background-image: url(../static/img/landing-icon-twitter.svg);
  }

  .mozilla-logo {
      background-image: url(../static/img/mozilla.svg);
      background-repeat: no-repeat;
      background-size: auto 31px;
      height: 31px;
      width: 107px;
      margin-right: 93px;
  }

  /* Responsive */

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .screenshots-logo {
      max-width: 263px;
    }

    .container {
      text-align: center;
      justify-content: center;
      flex-direction: column;
    }

    .banner {
      background-image: url(../static/img/landing-screenshots_mobile.svg);
      background-position: 100% 20%;
    }

    .banner-content {
      width: 100%;
      max-width: 500px;
      text-align: center;
    }

    .banner-content p {
      font-size: 1.2em;
      padding-right: 0;
    }

    .button {
      margin-right: auto;
      margin-left: auto;
    }

    h2 {
      font-size: 1.6em;
    }

    section .container {
      padding: 40px 33px;
    }

    .section-content h3 {
    font-size: 2em;
    }

    .section-content {
      order: 1 !important;
      width: 100%;
      max-width: 500px;
    }

    .section-image {
      order: 2 !important;
      margin-top: 33px;
      width: 90vw !important;
      background-position: center center !important;
      height: 90vw !important;
      max-width: 500px;
      max-height: 500px;
    }

    #coming .container {
      padding: 40px 33px;
    }

    .coming-content {
      width: 100%;
      max-width: 300px;
      margin-top: 40px;
    }

    .coming-icons div {
    width: 50px;
    height: 50px;
    }

    .coming-icons span {
    top: 3px;
    margin: 0 16px;
    }

    .legal-links {
      flex-direction: column;
      align-items: center;
    }

    .mozilla-logo {
      margin-right: 0 !important;
    margin-bottom: 30px;
    }

    .legal-links .boilerplate {
    margin-right: 0 !important;
    margin-bottom: 20px;
    }

    .social-links {
      justify-content: center;
    }

    .social-links .link-icon {
      margin-top: 20px;
      margin-left: 0px;
    }

    .social-links .link-icon:first-child {
      margin-right: 33px;
    }
  }
`

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
        <style>{style}</style>
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
        <section id="section-3">
          <div className="container">
            <div className="section-content">
              <Localized id="homePageCapturePage">
                <h3>Capture a Page</h3>
              </Localized>
              <Localized id="homePageCapturePageDescription">
                <p>Use the buttons in the upper right to capture full pages. The Save Visible button will capture the area you can view without scrolling, and the Save Full Page will capture everything on the page.</p>
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
        <footer>
          <div className="container">
            <div className="legal-links">
              <a href="https://www.mozilla.org" className="mozilla-logo"></a>
              <Localized id="homePageLegalLink">
                <a href="https://www.mozilla.org/about/legal/" className="boilerplate">Legal</a>
              </Localized>
              <Localized id="homePagePrivacyLink">
                <a href="https://www.mozilla.org/privacy/firefox-cloud/" className="boilerplate">Privacy</a>
              </Localized>
              <Localized id="homePageTermsLink">
                <a href="https://www.mozilla.org/about/legal/terms/services/" className="boilerplate">Terms</a>
              </Localized>
              <Localized id="homePageCookiesLink">
                <a href="https://www.mozilla.org/privacy/websites/#cookies" className="boilerplate">Cookies</a>
              </Localized>
            </div>
            <div className="social-links">
              <a href="https://github.com/mozilla-services/screenshots" target="_blank" rel="noopener noreferrer" className="link-icon github" title="GitHub"></a>
              <a href="https://twitter.com/FxScreenshots" target="_blank" rel="noopener noreferrer" className="link-icon twitter" title="Twitter"></a>
            </div>
          </div>
        </footer>
      </reactruntime.BodyTemplate>
    );
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
