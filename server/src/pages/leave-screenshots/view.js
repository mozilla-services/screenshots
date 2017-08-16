const sendEvent = require("../../browser-send-event.js");
const reactruntime = require("../../reactruntime");
const React = require("react");
const { Localized } = require("fluent-react/compat");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/leave-bundle.js")} async></script>
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/simple.css") } />
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
        <div className="column-center full-height alt-color-scheme">
          <Localized id="gNoShots">
            <img src={ this.props.staticLink("/static/img/image-nope_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
          </Localized>
          <div className="alt-content">
            <Localized id="leavePageWarning">
              <p>This will permanently erase all of your screenshots.</p>
            </Localized>
            <form action="/leave-screenshots/leave" method="POST">
              <input type="hidden" name="_csrf" value={this.props.csrfToken} />
              <Localized id="leavePageButtonProceed">
                <button type="submit" onClick={ this.onClickDelete.bind(this) } className="button warning">
                  Proceed
                </button>
              </Localized>
              <Localized id="leavePageButtonCancel">
                <a href="/shots" onClick={ this.onClickCancel.bind(this) } className="cancel-delete">Cancel</a>
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
        <div className="column-center full-height alt-color-scheme">
          <Localized id="gNoShots">
            <img src={ this.props.staticLink("/static/img/image-nope_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
          </Localized>
          <div className="alt-content">
            <Localized id="leavePageDeleted">
              <p>All of your screenshots have been erased!</p>
            </Localized>
            <Localized id="gHomeLink">
              <a href="/shots" onClick={ this.onClickHome.bind(this) } className="button primary">Home</a>
            </Localized>
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

  onClickHome() {
    sendEvent("home-after-leave", "home-link", {useBeacon: true});
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
