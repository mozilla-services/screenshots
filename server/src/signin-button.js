const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

exports.SignInButton = class SignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySettings: props.isAuthenticated
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { displaySettings: nextProps.isAuthenticated };
  }

  render() {
    if (this.state.displaySettings) {
      return <Localized id="settingsButton">
        <a className="settings-button" href="/settings" aria-label="Settings">
          <Localized id="gSettings">
            <span>Settings</span>
          </Localized>
        </a>
      </Localized>;
    }

    const logInURI = "/api/fxa-oauth/login/" + this.props.initiatePage;
    return <Localized id="signInButton">
      <a className="signin-button" href={logInURI} onClick={ this.clickHandler.bind(this) } aria-label="Sign In">
        <Localized id="gSignIn">
          <span>Sign In</span>
        </Localized>
      </a>
    </Localized>;
  }

  clickHandler(event) {
    sendEvent("fxa-signin", this.props.initiatePage, {useBeacon: true});
  }
};

exports.SignInButton.propTypes = {
  initiatePage: PropTypes.string,
  isAuthenticated: PropTypes.bool
};
