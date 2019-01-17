const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");
const { PromotionStrategy } = require("./promotion-strategy.js");

exports.AdBanner = class AdBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  clickedInstallFirefox() {
    sendEvent("click-install-firefox-shot", {useBeacon: true});
  }

  clickedSignIn() {
    sendEvent("fxa-signin-ad-banner", {useBeacon: true});
  }

  clickedDeprecation() {
    sendEvent("clicked-deprecation-banner", {useBeacon: true});
  }

  render() {
    let bannerContent = null;
    const promoStrategy = new PromotionStrategy();

    if (promoStrategy.shouldShowFirefoxBanner(this.props.shouldGetFirefox, this.props.isOwner)) {
      const upsellLink = <a className="upsellLink"
        href="https://www.mozilla.org/firefox/new/?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm_content=from-shot"
        onClick={ this.clickedInstallFirefox.bind(this) }>Get Firefox now</a>;
      bannerContent = <Localized id="bannerUpsell" a={upsellLink}>
          <p>
            Screenshots made simple. Take, save and share screenshots without leaving Firefox. {upsellLink}
          </p>
        </Localized>;
    } else if (promoStrategy.shouldShowFxaBanner(this.props.hasFxa)) {
      const signInLink = <a className="signInLink"
        href="/api/fxa-oauth/login/shots"
        onClick={ this.clickedSignIn.bind(this) }></a>;
      bannerContent = <Localized id="bannerSignIn" a={signInLink}>
          <p>
            <a>Sign in or sign up</a> to sync shots across devices, save your favorite shots forever.
          </p>
        </Localized>;
    } else if (promoStrategy.shouldShowDeprecation()) {
      // eslint-disable-next-line no-unused-vars
      bannerContent = /* <Localized id="deprecationWarning" a={deprecationLink}> */
        <div>
          <p>
            The Firefox Screenshots server is shutting down in June of 2019. Download any saved screenshots you want to keep.
          </p>
          <p>
              Screenshots will continue to be a part of Firefox. You can still
          capture screenshots, download them or copy them to your clipboard.
          <a href="SUMO-PAGE">&nbsp;Learn more</a>.
          </p>
      </div>
        /* </Localized> */;
    }

    if (bannerContent) {
      return <aside className="upsell">
        <div className="logo message">
          {bannerContent}
        </div>
      </aside>;
    }
    return null;
  }
};

exports.AdBanner.propTypes = {
  isOwner: PropTypes.bool,
  hasFxa: PropTypes.bool,
  shouldGetFirefox: PropTypes.bool,
};

exports.AdBanner.defaultProps = {
  shouldGetFirefox: false,
};
