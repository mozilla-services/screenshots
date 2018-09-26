const React = require("react");
const PropTypes = require("prop-types");
const classnames = require("classnames");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("./browser-send-event.js");

exports.ShareButton = class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    const display = false;
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
    const useNewIcon = this.props.abTests.shotShareIcon && this.props.abTests.shotShareIcon.value === "newicon";
    const shareClasses = classnames("button", "transparent", "share", {
      "active": this.state.display,
      "inactive": !this.state.display,
      "newicon": useNewIcon,
    });
    return <div>
      <Localized id="shotPageShareButton" attrs={{title: true}}>
        <button className={shareClasses} id="toggle-share" onClick={ this.onClick.bind(this) } title="Share" />
      </Localized>
      {panel}
    </div>;
  }

  onClick() {
    const show = !this.state.display;
    this.setState({display: show});
    if (show) {
      if (this.props.setPanelState) {
        this.props.setPanelState("panel-open");
      }
      sendEvent(
        this.props.isOwner ? "start-share-owner" : "start-share-non-owner",
        "navbar");
    } else {
      if (this.props.setPanelState) {
        this.props.setPanelState("panel-closed");
      }
      if (this.shareDiv) {
        this.shareDiv.blur();
      }
      sendEvent("cancel-share");
    }
  }

  onPanelClose() {
    this.setState({display: false});
    if (this.props.setPanelState) {
      this.props.setPanelState("panel-closed");
    }
  }
};

exports.ShareButton.propTypes = {
  abTests: PropTypes.object,
  clipUrl: PropTypes.string,
  isExtInstalled: PropTypes.bool,
  isOwner: PropTypes.bool,
  renderExtensionNotification: PropTypes.bool,
  setPanelState: PropTypes.func,
  shot: PropTypes.object,
  staticLink: PropTypes.func,
};

class ShareButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copy: "copy"};
    this.clickMaybeClose = this.clickMaybeClose.bind(this);
    this.keyMaybeClose = this.keyMaybeClose.bind(this);
  }


  onClickShareButton(whichButton, shareUrl) {
    sendEvent(
      this.props.isOwner ? "share-owner" : "share-non-owner",
      whichButton);

    // There's always an extra event argument at the end
    if (typeof shareUrl === "string") {
      window.open(shareUrl).opener = null;
      this.props.closePanel();
      return false;
    }

    this.props.closePanel();
    return null;
  }

  onClickCopyButton(e) {
    const target = e.target;
    target.previousSibling.select();
    document.execCommand("copy");
    this.setState({copy: "copied"});
    setTimeout(() => {
      this.setState({copy: "copy"});
    }, 1000);
    sendEvent("share", "copy");
  }

  onClickInputField(e) {
    e.target.select();
    sendEvent("share", "focus-url");
  }

  render() {
    let className = "share-panel";
    if (this.props.renderExtensionNotification) {
      className += " share-panel-with-notification";
    }
    return <div id="share-buttons-panel" className={className} ref={shareDiv => this.shareDiv = shareDiv} style={{top: this.state.top, left: this.state.left}}>
      <div className="wrapper row-wrap share-buttons">
        <Localized id="shotPageShareFacebook" attrs={{title: true}}>
          <a title="Share to Facebook wall or message" onClick={ this.onClickShareButton.bind(this, "facebook", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.props.shot.viewUrl)) }>
            <img src={ this.props.staticLink("/static/img/btn-fb.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageShareTwitter" attrs={{title: true}}>
          <a title="Share to a tweet" onClick={ this.onClickShareButton.bind(this, "twitter", "https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl)) }>
            <img src={ this.props.staticLink("/static/img/btn-twitter.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageSharePinterest" attrs={{title: true}}>
          <a title="Share to Pinterest" onClick={ this.onClickShareButton.bind(this, "pinterest", "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.props.shot.viewUrl) + "&media=" + encodeURIComponent(this.props.clipUrl) + "&description=" + encodeURIComponent(this.props.shot.title)) }>
            <img src={ this.props.staticLink("/static/img/btn-pinterest.svg") } />
          </a>
        </Localized>
        <Localized id="shotPageShareEmail" attrs={{title: true}}>
          <a title="Create email with link" onClick={ this.onClickShareButton.bind(this, "email") } target="_blank" rel="noopener noreferrer" href={ `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(this.props.shot.title)}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(this.props.shot.url)}%0A` }>
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
        <Localized id={ this.state.copy === "copy" ? "shotPageCopy" : "shotPageCopied" }>
          <button
            className="button secondary copy-toggle"
            onClick={ this.onClickCopyButton.bind(this) }></button>
        </Localized>
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
    const el = this.shareDiv;
    const rect = el.getBoundingClientRect();
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
    if ((event.key || event.code) === "Escape") {
      this.props.closePanel();
    }
  }

  /* Returns true if the element is part of the share panel */
  isPanel(el) {
    while (el) {
      if (el.id === "share-buttons-panel") {
        return true;
      }
      el = el.parentNode;
    }
    return false;
  }

}

ShareButtonPanel.propTypes = {
  clipUrl: PropTypes.string,
  closePanel: PropTypes.func,
  isOwner: PropTypes.bool,
  renderExtensionNotification: PropTypes.bool,
  shot: PropTypes.object,
  staticLink: PropTypes.func,
};
