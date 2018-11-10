const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

exports.FxaOnboardingDialog = class FxaOnboardingDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="onboarding-promo-dialog right-align">
      <div className="triangle"><div className="triangle-inner"></div></div>
      <div className="promo-header">
        <span className="promo-logo" />
        <Localized id="onboardingPromoTitle">
          <span className="promo-title">What’s new with Firefox Screenshots?</span>
        </Localized>
      </div>
      <div className="promo-message">
        <Localized id="onboardingPromoMessage">
          <p>
            Now, sign in to Screenshots with a Firefox Account and
            do more:
          </p>
        </Localized>
        <ul>
          <Localized id="onboardingPromoMessageListItem1">
            <li>Access your library on all of your devices</li>
          </Localized>
          <Localized id="onboardingPromoMessageListItem2">
            <li>Store your favorite shots forever</li>
          </Localized>
        </ul>
      </div>
      <div className="promo-footer">
        <Localized id="onboardingPromoDismissButton" attrs={{title: true}}>
          <a href="#" title="Dismiss" onClick={ this.onCloseDialog.bind(this) }>Dismiss</a>
        </Localized>
        <Localized id="onboardingPromoSigninButton" attrs={{title: true}}>
          <button className="button primary" title="Sign in" onClick={ this.onConfirm.bind(this) }>Sign in</button>
        </Localized>
      </div>
    </div>;
  }

  onCloseDialog(event) {
    this.props.hideDialog();
    sendEvent("onboarding-promo-closed");
  }

  onConfirm(event) {
    this.props.hideDialog();
    sendEvent("fxa-signin-onboarding-promo");
    location.href = this.props.logInURI;
  }
};

exports.FxaOnboardingDialog.propTypes = {
  logInURI: PropTypes.string,
  hideDialog: PropTypes.func,
};
