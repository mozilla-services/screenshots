const React = require("react");
const sendEvent = require("../../browser-send-event.js");

exports.ShareButtons = class ShareButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copyText: "Copy"};
  }

  onClickShareButton(whichButton) {
    sendEvent(
      this.props.isOwner ? "share-owner" : "share-non-owner",
      whichButton);
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

  onChange(e) {
    // Do nothing -- we simply need this event handler to placate React
  }

  render() {
    return <div id="share-buttons-panel" className="share-panel default-color-scheme">
      <div className="wrapper row-space">
        <a onClick={ this.onClickShareButton.bind(this, "facebook") } target="_blank" href={ "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.props.shot.viewUrl) }>
          <img src={ this.props.staticLink("/static/img/share-facebook.svg") } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "twitter") }target="_blank" href={"https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl) }>
          <img src={ this.props.staticLink("/static/img/share-twitter.svg") } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "pinterest") } target="_blank" href={ "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.props.shot.viewUrl) + "&media=" + encodeURIComponent(this.props.clipUrl) + "&description=" + encodeURIComponent(this.props.shot.title) }>
          <img src={ this.props.staticLink("/static/img/share-pinterest.svg") } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "email") } target="_blank" href={ `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(this.props.shot.title)}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(this.props.shot.url)}%0A` }>
          <img src={ this.props.staticLink("/static/img/share-email.svg") } />
        </a>
      </div>
      <p>Get a shareable link to this shot:</p>
      <div className="wrapper row-space">
        <input className="copy-shot-link-input"
          value={ this.props.shot.viewUrl }
          onClick={ this.onClickInputField.bind(this) }
          onChange={ this.onChange.bind(this) } />
        <button
          className="button secondary"
          onClick={ this.onClickCopyButton.bind(this) }>
          { this.state.copyText }
        </button>
      </div>
      <div className="small">
        { this.props.isPublic }
      </div>
    </div>;
  }
};
