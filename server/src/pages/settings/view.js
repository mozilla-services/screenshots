/* globals controller */
const reactruntime = require("../../reactruntime");
const sendEvent = require("../../browser-send-event.js");
const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/settings-bundle.js")} async></script>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/settings.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}

Head.propTypes = {
  staticLink: PropTypes.func,
};

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="full-height">
          <div id="settings-header">
            <Localized id="settingsClosePreferences" attrs={{title: true}}>
              <a className="button close-preferences" href="/shots" title="Close preferences"></a>
            </Localized>
          </div>
          <div>
            { this.renderAccountInfo() }
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderAccountInfo() {
    const defaultAvatar = this.props.staticLink("/static/img/default-profile.svg");
    let info;
    let subInfo;
    if (this.props.accountInfo) {
      info = (
        <div className="account-info">
          <img src={this.props.accountInfo.avatarUrl || defaultAvatar } height="100" width="100" />
          <div className="info-container">
            <p className="username title">{this.props.accountInfo.nickname || this.props.accountInfo.email}</p>
            { this.props.accountInfo.nickname ? <p className="email info">{this.props.accountInfo.email}</p> : null }
            <Localized id="settingsDisconnectButton" attrs={{title: true}}>
              <button className="account-buttons disconnect" onClick={ this.onClickDisconnect.bind(this) } title="Disconnect">Disconnect</button>
            </Localized>
          </div>
        </div>
      );
    } else {
      info = (
        <div className="account-info">
          <img src={ defaultAvatar } height="100" width="100" />
          <div className="info-container">
            <Localized id="settingsGuestAccountMessage">
              <p className="title">Guest Account</p>
            </Localized>
            <Localized id="settingsSignInInvite">
              <p className="info">Sign in to sync across devices</p>
            </Localized>
            <Localized id="settingsSignInButton" attrs={{title: true}}>
              <a className="account-buttons" href="/api/fxa-oauth/login/" onClick={ this.onClickConnect.bind(this)} title="Sign in">Sign In</a>
            </Localized>
          </div>
        </div>
      );
      subInfo = (
        <Localized id="settingsDescription">
          <p className="sub-info">You can sign in with Firefox Accounts to sync all your screenshots across devices and access them privately.</p>
        </Localized>
      );
    }
    return <div className="preferences">
      <Localized id="SettingsPageHeader">
        <p className="header">Firefox Screenshots Settings</p>
      </Localized>
      <hr />
      <Localized id="settingsPageSubHeader">
        <p className="sub-header">Sync & Accounts</p>
      </Localized>
      { info }
      { subInfo}
    </div>;
  }

  onClickDisconnect() {
    sendEvent("start-disconnect", "settings", { useBeacon: true });
    if (window.confirm("Are you sure you want to disconnect this device from your Firefox account?")) {
      sendEvent("confirm-disconnect", "settings-popup-confirm", { useBeacon: true });
      controller.disconnectDevice();
    } else {
      sendEvent("cancel-disconnect", "settings-popup-confirm", { useBeacon: true });
    }
  }

  onClickConnect() {
    sendEvent("start-connect", "settings", { useBeacon: true });
  }
}

Body.propTypes = {
  accountInfo: PropTypes.object,
  staticLink: PropTypes.func,
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
