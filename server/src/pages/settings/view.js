/* globals controller */
const reactruntime = require("../../reactruntime");
const sendEvent = require("../../browser-send-event.js");
const React = require("react");

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

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="full-height">
          <div id="settings-header">
            <a className="button close-preferences" href="/shots"></a>
          </div>
          <div>
            { this.renderAccountInfo() }
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderAccountInfo() {
    let defaultAvatar = this.props.staticLink('/static/img/default-profile.svg');
    let info;
    let subInfo;
    if (this.props.accountInfo) {
      info = (
        <div className="account-info">
          <img src={this.props.accountInfo.avatarUrl || defaultAvatar } height="100" width="100" />
          <div className="info-container">
            <p className="username title">{this.props.accountInfo.nickname || this.props.accountInfo.email}</p>
            { this.props.accountInfo.nickname ? <p className="email info">{this.props.accountInfo.email}</p> : null }
            <button className="account-buttons disconnect" onClick={ this.onClickDisconnect.bind(this) }>Disconnect</button>
          </div>
        </div>
      );
    } else {
      info = (
        <div className="account-info">
          <img src={ defaultAvatar } height="100" width="100" />
          <div className="info-container">
            <p className="title">Guest Account</p>
            <p className="info">Sign in to sync across devices</p>
            <a className="account-buttons" href="/api/fxa-oauth/login" onClick={ this.onClickConnect.bind(this) }>Sign In</a>
          </div>
        </div>
      );
      subInfo = (
        <p className="sub-info">You can sign in with Firefox Account to sync all your screenshots across devices and access them privately.</p>
      );
    }
    return <div className="preferences">
      <p className="header">Firefox Screenshots Settings</p>
      <hr />
      <p className="sub-header">Sync & Accounts</p>
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

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
