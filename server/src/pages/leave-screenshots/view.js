/* globals location */
const sendEvent = require("../../browser-send-event.js");
const reactruntime = require("../../reactruntime");
const React = require("react");
const { Localized } = require("fluent-react/compat");

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
            <Localized id="leavePageWarning">
              <div className="large-icon-message-string">
                This will permanently erase all of your Firefox Screenshots data.
              </div>
            </Localized>
            <form action="/leave-screenshots/leave" method="POST" className="responsive-wrapper row-center">
              <input type="hidden" name="_csrf" value={this.props.csrfToken} />
              <button type="submit" onClick={ this.onClickDelete.bind(this) } className="button warning">
                <Localized id="leavePageButtonProceed">
                  Proceed
                </Localized>
              </button>
              <Localized id="leavePageButtonCancel">
                <a href="/shots" onClick={ this.onClickCancel.bind(this) } className="cancel-delete">cancel</a>
              </Localized>
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
            <Localized id="leavePageDeleted">
              <div className="large-icon-message-string">All of your Firefox Screenshots data has been erased.
            </Localized>
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
