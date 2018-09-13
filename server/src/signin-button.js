const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

exports.SignInButton = class SignInButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySettings: props.isAuthenticated,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return { displaySettings: nextProps.isAuthenticated };
  }

  render() {
    if (this.state.displaySettings) {
      return <Localized id="buttonSettings">
        <a className="nav-button icon-settings" tabIndex="0" href="/settings" title="Settings">
          <Localized id="gSettings">
            <span>Settings</span>
          </Localized>
        </a>
      </Localized>;
    }

    const logInURI = "/api/fxa-oauth/login/" + this.props.initialPage;
    return <Localized id="buttonSignIn">
        <a className="nav-button icon-settings" tabIndex="0" href={logInURI} title="SignIn" onClick={this.clickHandler.bind(this)}>
          <Localized id="gSignIn">
            <span>Sign In</span>
          </Localized>
        </a>
      </Localized>;
  }

  clickHandler(event) {
    sendEvent("fxa-signin", this.props.initialPage, {useBeacon: true});
  }
};

exports.SignInButton.propTypes = {
  initialPage: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};
