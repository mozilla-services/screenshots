const React = require("react");
const sendEvent = require("../../browser-send-event.js");

exports.ShareButton = class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    let display = false;
    if (props.abTests.autoOpenSharePanel && props.abTests.autoOpenSharePanel.value === "autoopen") {
      display = props.isOwner && Date.now() - props.shot.createdDate < 30000;
    }
    this.state = { display };
  }

  render() {
    let panel = null;
    if (this.state.display) {
      panel = (
        <ShareButtonPanel
          clipUrl={this.props.clipUrl}
          closePanel={this.onPanelClose.bind(this)}
          shot={this.props.shot}
          staticLink={this.props.staticLink}
          renderExtensionNotification={this.props.renderExtensionNotification}
          isOwner={this.props.isOwner}
          sendRichCopy={this.props.sendRichCopy}
          isExtInstalled={this.props.isExtInstalled}
        />
      );
    }
    return (
      <div>
        <button className="button primary" id="toggle-share" onClick={this.onClick.bind(this)}>
          <span className="flex">
            <img className="share-icon" src={this.props.staticLink("/static/img/share.svg")} />Share
          </span>
        </button>
        {panel}
      </div>
    );
  }

  onClick() {
    let show = !this.state.display;
    this.setState({ display: show });
    if (show) {
      sendEvent(this.props.isOwner ? "start-share-owner" : "start-share-non-owner", "navbar");
    } else {
      sendEvent("cancel-share");
    }
  }

  onPanelClose() {
    this.setState({ display: false });
  }
};

class ShareButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copyText: "Copy" };
    this.clickMaybeClose = this.clickMaybeClose.bind(this);
    this.keyMaybeClose = this.keyMaybeClose.bind(this);
  }

  onClickShareButton(whichButton) {
    sendEvent(this.props.isOwner ? "share-owner" : "share-non-owner", whichButton);
    this.props.closePanel();
  }

  onClickCopyButton(e) {
    let target = e.target;
    target.previousSibling.select();
    document.execCommand("copy");
    this.setState({ copyText: "Copied" });
    setTimeout(
      () => {
        this.setState({ copyText: "Copy" });
      },
      1000
    );
    sendEvent("share", "copy");
  }

  onClickInputField(e) {
    e.target.select();
    sendEvent("share", "focus-url");
  }

  onClickRichCopy(event) {
    event.preventDefault();
    this.props.sendRichCopy();
    sendEvent("share", "rich-copy");
    this.props.closePanel();
    return false;
  }

  render() {
    let className = "share-panel default-color-scheme";
    if (this.props.renderExtensionNotification) {
      className += " share-panel-with-notification";
    }
    return (
      <div id="share-buttons-panel" className={className}>
        <div className="wrapper row-space">
          <a
            title="Share to Facebook wall or message"
            onClick={this.onClickShareButton.bind(this, "facebook")}
            target="_blank"
            href={"https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.props.shot.viewUrl)}
          >
            <img src={this.props.staticLink("/static/img/share-facebook.svg")} />
          </a>
          <a
            title="Share to a tweet"
            onClick={this.onClickShareButton.bind(this, "twitter")}
            target="_blank"
            href={"https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl)}
          >
            <img src={this.props.staticLink("/static/img/share-twitter.svg")} />
          </a>
          <a
            title="Share to Pinterest"
            onClick={this.onClickShareButton.bind(this, "pinterest")}
            target="_blank"
            href={
              "https://pinterest.com/pin/create/button/?url=" +
                encodeURIComponent(this.props.shot.viewUrl) +
                "&media=" +
                encodeURIComponent(this.props.clipUrl) +
                "&description=" +
                encodeURIComponent(this.props.shot.title)
            }
          >
            <img src={this.props.staticLink("/static/img/share-pinterest.svg")} />
          </a>
          <a
            title="Create email with link"
            onClick={this.onClickShareButton.bind(this, "email")}
            target="_blank"
            href={
              `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(
                this.props.shot.title
              )}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(
                this.props.shot.url
              )}%0A`
            }
          >
            <img src={this.props.staticLink("/static/img/share-email.svg")} />
          </a>
          {this.props.isExtInstalled
            ? <a
                title="Copy the image and link to the clipboard"
                onClick={this.onClickRichCopy.bind(this)}
                target="_blank"
                href="#"
              >
                <img src={this.props.staticLink("/static/img/copy.png")} />
              </a>
            : null}
        </div>
        <p>Get a shareable link to this shot:</p>
        <div className="wrapper row-space">
          <input
            className="copy-shot-link-input"
            value={this.props.shot.viewUrl}
            onClick={this.onClickInputField.bind(this)}
            onChange={function() {} /* react gives a warning otherwise */}
          />
          <button className="button secondary copy-toggle" onClick={this.onClickCopyButton.bind(this)}>
            {this.state.copyText}
          </button>
        </div>
        <p>
          This shot is only visible to you until you share the link.
        </p>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener("click", this.clickMaybeClose, false);
    document.addEventListener("keyup", this.keyMaybeClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickMaybeClose, false);
    document.removeEventListener("keyup", this.keyMaybeClose, false);
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
