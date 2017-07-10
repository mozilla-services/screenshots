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
        <div className="column-space full-height">
          <a className="button close-preferences" href="/shots"></a>
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
    if (this.props.accountInfo) {
      info = (
        <div className="account-info">
          <img src={this.props.accountInfo.avatar || defaultAvatar } height="100" width="100" />
            <div className="info-container">
              <p className="username">{this.props.accountInfo.nickname || this.props.accountInfo.email}</p>
              { this.props.accountInfo.nickname ? <p className="email">{this.props.accountInfo.email}</p> : null }
              <a className="account-buttons disconnect" href="" onClick={ this.onClickDisconnect.bind(this) }>Disconnect</a>
            </div>
        </div>
      );
    } else {
      info = (
        <div className="account-info">
          <img src={ defaultAvatar } height="100" width="100" />
            <div className="info-container">
              <p>Guest Account</p>
              <a className="account-buttons connect" href="/api/fxa-oauth/login" onClick={ this.onClickConnect.bind(this) }>Connect</a>
            </div>
        </div>
      );
    }
    return <div className="preferences">
      <p className="header">Firefox Screenshots Settings</p>
      <hr />
      <p className="sub-header">Sync & Accounts</p>
      { info }
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
