const React = require("react");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

exports.ShareButton = class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    let display = false;
    this.state = {display};
  }

  render() {
    let panel = null;
    if (this.state.display) {
      panel =  <ShareButtonPanel
        clipUrl={this.props.clipUrl}
        closePanel={this.onPanelClose.bind(this)} shot={this.props.shot}
        staticLink={this.props.staticLink}
        renderExtensionNotification={this.props.renderExtensionNotification}
        isOwner={this.props.isOwner}
        isExtInstalled={this.props.isExtInstalled}
      />;
    }
    const active = this.state.display ? "active" : "inactive";
    return <div>
      <Localized id="shotPageShareButton">
        <button className={`button transparent share ${active}`} id="toggle-share" onClick={ this.onClick.bind(this) } title="Share" />
      </Localized>
      {panel}
    </div>;
  }

  onClick() {
    let show = !this.state.display;
    this.setState({display: show});
    if (show) {
      this.props.setPanelState("panel-open");
      sendEvent(
        this.props.isOwner ? "start-share-owner" : "start-share-non-owner",
        "navbar");
    } else {
      this.props.setPanelState("panel-closed");
      this.refs.share.blur();
      sendEvent("cancel-share");
    }
  }

  onPanelClose() {
    this.setState({display: false});
    this.props.setPanelState("panel-closed");
  }
};

class ShareButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copyText: "Copy"};
    this.clickMaybeClose = this.clickMaybeClose.bind(this);
    this.keyMaybeClose = this.keyMaybeClose.bind(this);
  }

  onClickShareButton(whichButton) {
    sendEvent(
      this.props.isOwner ? "share-owner" : "share-non-owner",
      whichButton);
    this.props.closePanel();
  }

  onClickCopyButton(e) {
    let target = e.target;
    target.previousSibling.select();
    document.execCommand("copy");
    this.setState({copyText: "Copied"});
    setTimeout(() => {
      this.setState({copyText: "Copy"});
    }, 1000);
    sendEvent("share", "copy");
  }

  onClickInputField(e) {
    e.target.select();
    sendEvent("share", "focus-url");
  }

  render() {
    let className = "share-panel default-color-scheme";
    if (this.props.renderExtensionNotification) {
      className += " share-panel-with-notification";
    }
    return <div id="share-buttons-panel" className={className} ref="share" style={{top: this.state.top, left: this.state.left}}>
      <div className="wrapper row-wrap share-buttons">
        <Localized id="shotPageShareFacebook">
          <a title="Share to Facebook wall or message" onClick={ this.onClickShareButton.bind(this, "facebook") } target="_blank" href={ "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.props.shot.viewUrl) }>
            <img src={ this.props.staticLink("/static/img/btn-fb.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageShareTwitter">
          <a title="Share to a tweet" onClick={ this.onClickShareButton.bind(this, "twitter") }target="_blank" href={"https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl) }>
            <img src={ this.props.staticLink("/static/img/btn-twitter.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageSharePinterest">
          <a title="Share to Pinterest" onClick={ this.onClickShareButton.bind(this, "pinterest") } target="_blank" href={ "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.props.shot.viewUrl) + "&media=" + encodeURIComponent(this.props.clipUrl) + "&description=" + encodeURIComponent(this.props.shot.title) }>
            <img src={ this.props.staticLink("/static/img/btn-pinterest.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageShareEmail">
          <a title="Create email with link" onClick={ this.onClickShareButton.bind(this, "email") } target="_blank" href={ `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(this.props.shot.title)}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(this.props.shot.url)}%0A` }>
            <img src={ this.props.staticLink("/static/img/btn-email.svg") } />
          </a>
        </Localized>
      </div>
      <div className="share-url-box">
      <Localized id="shotPageShareLink">
        <p>Get a shareable link to this shot:</p>
      </Localized>
      <div className="wrapper row-space">
        <input className="copy-shot-link-input"
          value={ this.props.shot.viewUrl }
          onClick={ this.onClickInputField.bind(this) }
          onChange={ function() {} /* react gives a warning otherwise */ } />
        <button
          className="button secondary copy-toggle"
          onClick={ this.onClickCopyButton.bind(this) }>
          { this.state.copyText }
        </button>
      </div>
      <Localized id="shotPagePrivacyMessage">
        <p className="share-visibility-notice">
          This shot is only visible to you until you share the link.
        </p>
      </Localized>
    </div>
    </div>;
  }

  changePanelPosition() {
    let el = this.refs.share;
    let rect = el.getBoundingClientRect();
    if (!(rect.right <= (window.innerWidth || document.documentElement.clientWidth))) {
      this.setState({left: -140});
    }
    if (!(rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))) {
      this.setState({top: -385});
    }
  }

  componentDidMount() {
    this.changePanelPosition();
    document.addEventListener("click", this.clickMaybeClose);
    document.addEventListener("keyup", this.keyMaybeClose);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickMaybeClose);
    document.removeEventListener("keyup", this.keyMaybeClose);
  }

  clickMaybeClose(event) {
    if (!this.isPanel(event.target)) {
      this.props.closePanel();
    }
  }

  keyMaybeClose(event) {
    if ((event.key || event.code) == "Escape") {
      this.props.closePanel();
    }
  }

  /* Returns true if the element is part of the share panel */
  isPanel(el) {
    while (el) {
      if (el.id == "share-buttons-panel") {
        return true;
      }
      el = el.parentNode;
    }
    return false;
  }

}
