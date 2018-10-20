const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

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

  render() {
    let bannerContent = null;

    if (this.props.shouldGetFirefox && !this.props.isOwner) {
      const upsellLink = <a className="upsellLink"
        href="https://www.mozilla.org/firefox/new/?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm_content=from-shot"
        onClick={ this.clickedInstallFirefox.bind(this) }>Get Firefox now</a>;
      bannerContent = <Localized id="bannerUpsell" a={upsellLink}>
          <p>
            Screenshots made simple. Take, save and share screenshots without leaving Firefox. {upsellLink}
          </p>
        </Localized>;
    } else if (!this.props.hasFxa) {
      const signInLink = <a className="signInLink"
        href="/api/fxa-oauth/login/shots"
        onClick={ this.clickedSignIn.bind(this) }></a>;
      bannerContent = <Localized id="bannerSignIn" a={signInLink}>
          <p>
            <a>Sign in or sign up</a> to sync shots across devices, save your favorite shots forever.
          </p>
        </Localized>;
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
