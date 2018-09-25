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

  render() {
    let bannerContent = null;

    if (this.props.shouldGetFirefox) {
      const upsellLink = <a className="upsellLink"
        href="https://www.mozilla.org/firefox/new/?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition&utm_content=from-shot"
        onClick={ this.clickedInstallFirefox.bind(this) }>Get Firefox now</a>;
      bannerContent = <Localized id="bannerUpsell" a={upsellLink}>
          <p>
            Screenshots made simple. Take, save and share screenshots without leaving Firefox. {upsellLink}
          </p>
        </Localized>;
    } else if (this.props.isOwner && !this.props.hasFxa) {
      bannerContent = <Localized id="bannerMessage">
          <p>
            Sign in or sign up to sync shots across devices, save your favorite shots forever.
          </p>
        </Localized>;
    }

    if (bannerContent) {
      return <aside className="ad-banner">
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
