/* globals location, sendEvent */
const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("js/delete-account-bundle.js")}></script>
        <link rel="stylesheet" href={ this.props.staticLink("css/styles.css") } />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {

  render() {
    if (this.props.complete) {
      return this.renderComplete();
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <h1 style={{marginLeft: "20%"}}>Confirm account deletion</h1>
        <div style={{maxWidth: "50%", marginLeft: "25%"}}>
          <p>
            You can delete your account.  This will permanently and immediately delete all your shots and all links.  This cannot be undone.
          </p>
          <p>
            Are you sure you want to delete your account and all shots?
          </p>
          <div>
            <form action="/delete-account/delete" method="POST" style={{textAlign: "center"}}>
              <button type="submit" onClick={ this.onClickDelete.bind(this) } className="delete-shot" style={{backgroundColor: "#900", color: "#fff", padding: "3px", border: "1px solid #f00", fontSize: "120%"}}>
                Delete Account
              </button>
              <a style={{textDecoration: "underline", marginLeft: "20px"}} href="/shots" onClick={ this.onClickCancel.bind(this) }>cancel</a>
            </form>
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderComplete() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <h1 style={{marginLeft: "20%"}}>Account deleted</h1>
        <div style={{maxWidth: "50%", marginLeft: "25%"}}>
          <p>
            Your account has been deleted.  Please uninstall the PageShot add-on.  To uninstall
            go to the <b>Tools</b> menu and open <b>Add-ons</b>.
          </p>
          <p>
            If you do not uninstall PageShot, then all new shots you create will be created
            under a new account.  All shots you previously made have been permanently deleted.
          </p>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  onClickDelete() {
    sendEvent("delete-account", "delete-account-button", {useBeacon: true});
  }

  onClickCancel() {
    sendEvent("cancel-delete-account", "cancel-link", {useBeacon: true});
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
