const React = require("react");
const PropTypes = require("prop-types");
const reactruntime = require("../../reactruntime");
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
        <link
          rel="stylesheet"
          href={this.props.staticLink("/static/css/home.css")}
        />
        <script src={this.props.staticLink("/static/js/UITour-lib.js")} async />
        <script src={this.props.staticLink("/static/js/homepage-tour.js")} />
        <Localized id="homePageDescription" attrs={{ content: true }}>
          <meta
            name="description"
            content="Intuitive screenshots baked right into the browser. Capture and download screenshots as you browse the Web using Firefox."
          />
        </Localized>
        <meta property="og:title" content={this.props.title} />
        <meta property="og:url" content={this.props.backend} />
        <Localized id="homePageDescription" attrs={{ content: true }}>
          <meta
            property="og:description"
            content="Intuitive screenshots baked right into the browser. Capture and download screenshots as you browse the Web using Firefox."
          />
        </Localized>
        <meta name="twitter:title" content={this.props.title} />
        <Localized id="homePageDescription" attrs={{ content: true }}>
          <meta
            name="twitter:description"
            content="Intuitive screenshots baked right into the browser. Capture and download screenshots as you browse the Web using Firefox."
          />
        </Localized>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@firefox" />
        <meta
          property="og:image"
          content={this.props.staticLink("/static/img/og-image.png")}
        />
        <meta
          name="twitter:image"
          content={this.generateFullLink("/static/img/twitter-image.png")}
        />
      </reactruntime.HeadTemplate>
    );
  }
}

Head.propTypes = {
  backend: PropTypes.string,
  staticLink: PropTypes.func,
  title: PropTypes.string
};

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="banner">
          <div className="banner-image-back" />
          <div className="banner-container">
            <div className="banner-content">
              <h1>Firefox Screenshots</h1>
              <Localized id="gScreenshotsDescriptionServerless">
                <p>
                  Screenshots made simple. Capture and download screenshots
                  without leaving Firefox.
                </p>
              </Localized>
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
              <Localized id="homePageGetStartedDescriptionPageAction">
                <p>
                  Select the Screenshots icon from the page actions menu in the
                  address bar, and the Screenshots menu will appear on top of
                  your browser window.
                </p>
              </Localized>
            </div>
            <div className="section-image align-right page-action" />
          </div>
        </section>
        <section id="section-2">
          <div className="container">
            <div className="section-content align-right">
              <Localized id="homePageCaptureRegion">
                <h3>Capture a Region</h3>
              </Localized>
              <Localized id="homePageCaptureRegionDescription">
                <p>
                  Click and drag to select the area you want to capture. Or just
                  hover and click — Screenshots will select the area for you.
                  Like what you see? Select Save to access your screenshot
                  online or the down arrow button to download it to your
                  computer.
                </p>
              </Localized>
            </div>
            <div className="section-image align-left" />
          </div>
        </section>
        <section id="section-3">
          <div className="container">
            <div className="section-content align-left">
              <Localized id="homePageCapturePage">
                <h3>Capture a Page</h3>
              </Localized>
              <Localized id="homePageCapturePageDescription">
                <p>
                  Use the buttons in the upper right to capture full pages. The
                  Save Visible button will capture the area you can view without
                  scrolling, and the Save Full Page will capture everything on
                  the page.
                </p>
              </Localized>
            </div>
            <div className="section-image align-right" />
          </div>
        </section>
        <section id="section-4">
          <div className="container">
            <div className="section-content align-right">
              <Localized id="homePageDownloadCopy">
                <h3>Download or Copy</h3>
              </Localized>
              <Localized id="homePageDownloadCopyDescription">
                <p>
                  Take your best shot. Screenshots lets you download your
                  selection it or copy it right to your clipboard.
                </p>
              </Localized>
            </div>
            <div className="section-image align-left" />
          </div>
        </section>
        <Footer {...this.props} />
      </reactruntime.BodyTemplate>
    );
  }
}

Body.propTypes = {
  hasFxa: PropTypes.bool,
  isFirefox: PropTypes.bool,
  authenticated: PropTypes.bool,
  staticLink: PropTypes.func
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
