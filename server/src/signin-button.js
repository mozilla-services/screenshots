const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");
const { FxaOnboardingDialog } = require("./fxa-onboarding-dialog");

exports.SignInButton = class SignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySettings: props.isFxaAuthenticated,
      hasFxaOnboardingDialog: props.hasFxaOnboardingDialog,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { displaySettings: nextProps.isFxaAuthenticated};
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldProps.hasFxaOnboardingDialog !== this.props.hasFxaOnboardingDialog) {
      this.setState({hasFxaOnboardingDialog: this.props.hasFxaOnboardingDialog});
    }
  }

  render() {
    if (this.state.displaySettings) {
      return <div className="fxa-signin">
          <Localized id="buttonSettings" attrs={{title: true}}>
            <a className="transparent nav-button icon-settings" tabIndex="0" href="/settings" title="Settings">
              <img src={this.props.staticLink("/static/img/icon-settings.svg")} />
            </a>
          </Localized>
        </div>;
    }

    const logInURI = "/api/fxa-oauth/login/" + this.props.initialPage;
    const fxaOnboardingDialog = this.state.hasFxaOnboardingDialog ?
      <FxaOnboardingDialog logInURI={logInURI}
                           hideDialog={this.hideFxaOnboardingDialog.bind(this)} /> : null;

    return <div className="fxa-signin">
        <Localized id="buttonSignIn" attrs={{title: true}}>
          <a className="transparent nav-button icon-settings" tabIndex="0" href={logInURI} title="SignIn"
             onClick={this.clickHandler.bind(this)}>
            <img src={this.props.staticLink("/static/img/icon-settings.svg")} />
          </a>
        </Localized>
        { fxaOnboardingDialog }
      </div>;
  }

  clickHandler(event) {
    sendEvent("fxa-signin", this.props.initialPage, {useBeacon: true});
    if (this.state.hasFxaOnboardingDialog) {
      this.hideFxaOnboardingDialog();
    }
  }

  hideFxaOnboardingDialog() {
    const hasFxaOnboardingDialog = !this.state.hasFxaOnboardingDialog;
    this.setState({hasFxaOnboardingDialog});
    // set counter to max to stop showing promo again
    localStorage.hasSeenOnboardingDialog = 3;
  }
};

exports.SignInButton.propTypes = {
  initialPage: PropTypes.string,
  isFxaAuthenticated: PropTypes.bool,
  staticLink: PropTypes.func,
  hasFxaOnboardingDialog: PropTypes.bool,
};
