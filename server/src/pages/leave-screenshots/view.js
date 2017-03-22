/* globals location */
const sendEvent = require("../../browser-send-event.js");
const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/leave-bundle.js")} async></script>
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/warning-page.css") } />
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
        <div className="column-center full-height inverse-color-scheme">
          <div className="large-icon-message-container">
            <div className="large-icon logo" />
            <div className="large-icon-message-string">
              This will permanently erase all of your Firefox Screenshots data.
            </div>
            <form action="/leave-screenshots/leave" method="POST" className="responsive-wrapper row-center">
              <button type="submit" onClick={ this.onClickDelete.bind(this) } className="button warning">
                Proceed
              </button>
              <a href="/shots" onClick={ this.onClickCancel.bind(this) } className="cancel-delete">cancel</a>
            </form>
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderComplete() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-center full-height inverse-color-scheme">
          <div className="large-icon-message-container">
            <div className="large-icon check" />
            <div className="large-icon-message-string">All of your Firefox Screenshots data has been erased.<br/>
              You can uninstall the Firefox Screenshots add-on via Test Pilot
            </div>
            <div className="responsive-wrapper row-center">
              <a className="button primary" href="https://testpilot.firefox.com/experiments/page-shot">Go to Test Pilot</a>
            </div>
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  onClickDelete() {
    sendEvent("leave-service", "leave-button", {useBeacon: true});
  }

  onClickCancel() {
    sendEvent("cancel-leave", "cancel-link", {useBeacon: true});
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
