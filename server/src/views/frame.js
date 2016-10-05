/* globals ga, sendEvent */

const React = require("react");
const ReactDOM = require("react-dom");
const ReactDOMServer = require("react-dom/server");
const { getGitRevision } = require("../linker");
// const { ProfileButton } = require("./profile");
const { addReactScripts } = require("../reactutils");
const { Footer } = require("../footer-view");

class ShareButtons extends React.Component {
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
          <img src={ this.props.staticLink(`img/share-facebook.svg`) } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "twitter") }target="_blank" href={"https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl) }>
          <img src={ this.props.staticLink(`img/share-twitter.svg`) } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "pinterest") } target="_blank" href={ "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.props.shot.viewUrl) + "&media=" + encodeURIComponent(this.props.clipUrl) + "&description=" + encodeURIComponent(this.props.shot.title) }>
          <img src={ this.props.staticLink(`img/share-pinterest.svg`) } />
        </a>
        <a onClick={ this.onClickShareButton.bind(this, "email") } target="_blank" href={ `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(this.props.shot.title)}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(this.props.shot.url)}%0A` }>
          <img src={ this.props.staticLink(`img/share-email.svg`) } />
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
}

class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let image = ReactDOM.findDOMNode(this.refs.clipImage);
    let onResize = () => {
      let windowHeight = window.innerHeight;
      let paddingTop = Math.floor((windowHeight - image.height - 35) / 2);
      if (paddingTop < 66) {
        paddingTop = 66;
      }
      this.setState({paddingTop});
    };
    window.addEventListener("resize", onResize, true);

    onResize();

    try {
      window.sendToChild({
        type: "displayClip",
        clip: this.props.clip.asJson()
      });
    } catch (e) {
      console.error("Error sending message to child", e);
    }
  }

  onClickClose() {
    this.props.onClickClose();
  }

  onClickCloseBackground(event) {
    if (event.target.tagName == "A") {
      // A click on the clip itself
      return;
    }
    // FIXME: totally hacky way to handle this,
    // but suppress the click action when the share panel
    // is open:
    if (document.getElementById("share-buttons-panel")) {
      return;
    }

    if (this.props.showCloseButton) {
      this.onClickClose();
    }
  }

  render() {
    let clip = this.props.clip,
      node = null;

    if (clip.image !== undefined) {
      node = <img height={clip.image.dimensions.y} width={clip.image.dimensions.x} ref="clipImage" src={ clip.image.url } />;
    }

    let closeButton = null;
    if (this.props.showCloseButton) {
      closeButton = <img
        style={{
          position: "absolute",
          cursor: "pointer",
          top: "81px",
          right: "15px",
          height: "32px",
          width: "32px"}}
        src={ this.props.staticLink("img/zoom-out.svg") }
        onClick={ this.onClickClose.bind(this) }/>;
    }
    return <div ref="clipContainer" className="clip-container" onClick={this.onClickCloseBackground.bind(this)}>
      { closeButton }
      <a href={ clip.image.url } onClick={ this.onClickClip.bind(this) }>
        { node }
      </a>
    </div>;
  }

  onClickClip() {
    sendEvent("goto-clip", "content", {useBeacon: true});
    // Allow default action to continue
  }
}

class TimeDiff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {useLocalTime: false};
  }

  render() {
    let timeDiff;
    if (this.state.useLocalTime) {
      timeDiff = this.makeDiffString(this.props.date);
    } else {
      timeDiff = this.dateString(this.props.date);
    }
    return <span title={this.dateString(this.props.date)}>{timeDiff}</span>;
  }

  componentDidMount() {
    if (typeof window !== "undefined" && ! this.state.useLocalTime) {
      setTimeout(() => {
        this.setState({useLocalTime: true});
      });
    }
  }

  makeDiffString(d) {
    let timeDiff;
    let seconds = (Date.now() - d) / 1000;
    if (seconds > 0) {
      if (seconds < 20) {
        timeDiff = "just now";
      } else if (seconds > 0 && seconds < 60) {
        timeDiff = "1 minute ago";
      } else if (seconds < 60*60) {
        timeDiff = `${Math.floor(seconds / 60)} minutes ago`;
      } else if (seconds < 60*60*24) {
        timeDiff = `${Math.floor(seconds / (60*60))} hours ago`;
      } else if (seconds < 60*60*48) {
        timeDiff = "yesterday";
      } else if (seconds > 0) {
        seconds += 60*60*2; // 2 hours fudge time
        timeDiff = `${Math.floor(seconds / (60*60*24))} days ago`;
      }
    } else {
      if (seconds > -20) {
        timeDiff = "very soon";
      } else if (seconds > -60) {
        timeDiff = "in 1 minute";
      } else if (seconds > -60*60) {
        timeDiff = `in ${Math.floor(seconds / -60)} minutes`;
      } else if (seconds > -60*60*24) {
        timeDiff = `in ${Math.floor(seconds / (-60*60))} hours`;
      } else if (seconds > -60*60*48) {
        timeDiff = "tomorrow";
      } else {
        seconds -= 60*60*2; // 2 hours fudge time
        timeDiff = `in ${Math.floor(seconds / (-60*60*24))} days`;
      }
    }
    return timeDiff;
  }

  dateString(d) {
    let dYear, dMonth, dDay, dHour;
    if (! (d instanceof Date)) {
      d = new Date(d);
    }
    if (this.state.useLocalTime) {
      dYear = d.getFullYear();
      dMonth = d.getMonth();
      dDay = d.getDate();
      dHour = d.getHours();
    } else {
      dYear = d.getUTCFullYear();
      dMonth = d.getUTCMonth();
      dDay = d.getUTCDate();
      dHour = d.getUTCHours();
    }
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[dMonth];
    let hour;
    if (dHour === 0) {
      hour = "12am";
    } else if (dHour === 12) {
      hour = "12pm";
    } else if (dHour > 12) {
      hour = (dHour % 12) + "pm";
    } else {
      hour = dHour + "am";
    }
    return `${month} ${dDay} ${dYear}, ${hour}`;
  }
}

exports.TimeDiff = TimeDiff;

class Head extends React.Component {
  render() {
    let oembed;
    if (! this.props.simple) {
      oembed = <link rel="alternate" type="application/json+oembed" href={this.props.shot.oembedUrl} title={`${this.props.shot.title} oEmbed`} />;
    }
    let js = [
      <script src="//www.google-analytics.com/analytics.js" async key="gaScript" />,
      <script src="/ga-activation-hashed.js" key="gaActivation" />,
      <script src={ this.props.staticLink("vendor/core.js") } key="core-js-js" />,
      <script src={ this.props.staticLink("js/server-bundle.js") } key="server-bundle-js" />,
    ];

    if (this.props.sentryPublicDSN) {
      js = js.concat([
        <script src={ this.props.staticLink("vendor/raven.js") } key="raven-js-js" />,
        <script src="/configure-raven.js" key="configure-raven" />
      ]);
    }
    if (this.props.simple) {
      js = [];
    }
    return (
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.shot.title}</title>
        {js}
        <link rel="stylesheet" href={ this.props.staticLink("css/frame.css") } />
        <link rel="icon" type="image/png" href={this.props.staticLink("img/pageshot-icon-32.png")} />
        <link rel="shortcut icon" href={this.props.staticLink("img/pageshot-icon-32.png")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {oembed}
        {this.socialMetadata()}
        <script src="/set-content-hosting-origin.js" />
        <script src={ this.props.staticLink("js/parent-helper.js") } />
      </head>);
  }

  socialMetadata() {
    if (! this.props.shot) {
      return null;
    }
    let title = this.props.shot.ogTitle ||
      (this.props.shot.twitterCard && this.props.shot.twitterCard.title) ||
      this.props.shot.title;
    let og = [
      <meta property="og:type" content="website" key="ogtype" />,
      <meta property="og:title" content={title} key="ogtitle" />
    ];
    let twitter = [
      <meta name="twitter:card" content="summary_large_image" key="twittercard" />,
      <meta name="twitter:title" content={title} key="twitterTitle" />
    ];
    for (let clipId of this.props.shot.clipNames()) {
      let clip = this.props.shot.getClip(clipId);
      if (! clip.image) {
        continue;
      }
      let text = `From ${this.props.shot.urlDisplay}`;
      og.push(<meta key={ `ogimage${clipId}` } property="og:image" content={clip.image.url} />);
      og.push(<meta key={ `ogdescription${clipId}` } property="og:description" content={text} />);
      twitter.push(<meta key={ `twitterimage${clipId}` } name="twitter:image" content={clip.image.url} />);
      twitter.push(<meta key={ `twitterdesc${clipId}` } name="twitter:description" content={text} />);
      // FIXME: consider twitter:site @mozillapageshot
      if (clip.image.dimensions) {
        og.push(<meta key={ `ogimagewidth${clipId}` } property="og:image:width" content={clip.image.dimensions.x} />);
        og.push(<meta key={ `ogimageheight${clipId}` } property="og:image:height" content={clip.image.dimensions.y} />);
      }
    }
    return og.concat(twitter);
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      sharePanelDisplay: (
        props.isOwner &&
        Date.now() - props.shot.createdDate < 30000),
      closePageshotBanner: false
    };
    // Need to bind this so we can add/remove the event listener
    this.unsharePanelHandler = this.unsharePanelHandler.bind(this);
  }

  closeGetPageshotBanner() {
    this.setState({closePageshotBanner: true});
  }

  clickFullPageButton(e) {
    ga("send", "event", "website", "click-full-page-button", {page: location.toString()});
  }

  onClickUploadFullPage(e) {
    this.props.clientglue.requestSavedShot();
  }

  onClickShareButton(e) {
    let show = ! this.state.sharePanelDisplay;
    this.setState({sharePanelDisplay: show});
    if (show) {
      sendEvent(
        this.props.isOwner ? "start-share-owner" : "start-share-non-owner",
        "navbar");
    } else {
      sendEvent("cancel-share");
    }
  }

  onClickClose() {
    this.setState({hidden: true});
  }

  onClickZoom() {
    this.setState({hidden: false});
  }

  unsharePanelHandler(e) {
    let el = e.target;
    while (el) {
      if (el.id === "share-buttons-panel" || el.id === "share-button") {
        // A click in the share panel itself
        return;
      }
      el = el.parentNode;
    }
    this.onClickShareButton();
  }

  onClickDelete(e) {
    sendEvent("start-delete", "navbar", {useBeacon: true});
    if (window.confirm("Are you sure you want to delete this shot permanently?")) {
      sendEvent("delete", "popup-confirm", {useBeacon: true});
      this.props.clientglue.deleteShot(this.props.shot);
    } else {
      sendEvent("cancel-delete", "popup-confirm");
    }
  }

  onClickFlag(e) {
    sendEvent("start-flag", "navbar", {useBeacon: true});
    window.open(`mailto:pageshot-feedback@mozilla.com?subject=Flagging%20shot%20for%20abuse&body=Flagging%20shot%20for%20abuse:%20${encodeURIComponent(this.props.shot.viewUrl)}`);
  }

  render() {
    let body;
    if (this.props.expireTime !== null && Date.now() > this.props.expireTime) {
      let expireTime = this.props.expireTime;
      if (typeof expireTime != "number") {
        expireTime = expireTime.getTime();
      }
      let deleteTime = new Date(expireTime + this.props.retentionTime);
      let restoreWidget;
      if (this.props.isOwner) {
        restoreWidget = (
          <p>
            Will be permanently deleted <TimeDiff date={deleteTime} />
            &#8195;<span className="link-button" onClick={this.onRestore.bind(this)}>restore for {intervalDescription(this.props.defaultExpiration)}</span>
          </p>
        );
      }
      // Note: any attributes used here need to be preserved
      // in the render() function
      body = <div id="container">
        <p>&nbsp;</p>
        <p>
          This shot has expired. You may visit the original page it was originally created from:
        </p>
        <h2><a href={this.props.shot.urlIfDeleted} onClick={ this.onClickOrigUrl.bind(this, "expired") }>{this.props.shot.title}</a></h2>
        <p>
          <a href={this.props.shot.urlIfDeleted} onClick={ this.onClickOrigUrl.bind(this, "expired") }>
            {this.props.shot.urlIfDeleted}
          </a>
        </p>
        { restoreWidget }
      </div>;
    } else {
      body = this.renderBody();
    }
    return body;
  }

  renderBody() {
    if (! this.props.shot) {
      return <body><div>Not Found</div></body>;
    }

    let shot = this.props.shot;
    let shotId = this.props.shot.id;
    let shotDomain = this.props.shot.url; // FIXME: calculate

    let clips = [];
    let shareButtons = [];
    let clipNames = shot.clipNames();
    if (clipNames.length && ! this.state.hidden) {
      let clipId = clipNames[0];
      let clip = shot.getClip(clipId);

      clips.push(<Clip
        staticLink={this.props.staticLink}
        key={ clipId }
        clip={ clip }
        shotId={ shotId }
        shotDomain={ shotDomain }
        showCloseButton={ this.props.shot.showPage }
        onClickClose={ this.onClickClose.bind(this) }/>);
    }

    let linkTextShort = shot.urlDisplay;

    let timeDiff = <TimeDiff date={shot.createdDate} simple={this.props.simple} />;
    let expiresDiff = <span>
      &nbsp; &bull; &nbsp;
      <ExpireWidget
        expireTime={this.props.expireTime}
        onSaveExpire={this.onSaveExpire.bind(this)} />
    </span>;

    if (this.props.simple || ! this.props.isOwner) {
      expiresDiff = null;
    }

    let frameHeight = 100;
    if (this.props.shot.documentSize) {
      frameHeight = this.props.shot.documentSize.height;
    }

    let shotRedirectUrl = `/redirect?to=${encodeURIComponent(shot.url)}`;

    let trashOrFlagButton = null;
    if (this.props.isOwner) {
      trashOrFlagButton = <button className="button secondary" title="Delete this shot permanently" onClick={ this.onClickDelete.bind(this) }>
        <img src={ this.props.staticLink("img/garbage-bin.svg") } />
      </button>;
    } else {
      trashOrFlagButton = <button className="button secondary" title="Report this shot for abuse, spam, or other problems" onClick={ this.onClickFlag.bind(this) }>
        <img src={ this.props.staticLink("img/flag.svg") } />
      </button>;
    }

    let myShotsHref = "/shots";
    let myShotsText = <span className="back-to-index">My Shots <span className="arrow-icon"/></span>;
    if (!this.props.isOwner) {
      myShotsText = <span className="back-to-home">
        <span className="sub">
          Made with
        </span>
        <span style={{fontWeight: "bold"}}>
          Page Shot
        </span>
      </span>;
      myShotsHref = "/";
    }

    let isPublic = null;
    if (this.props.isOwner && !this.state.closePrivacyNotice && Date.now() - shot.createdDate < 30000) {
      if (shot.isPublic) {
        isPublic = <div
          id="private-notice">
          This shot is only visible to you until you share the link.
        </div>;
      } else {
        isPublic = <div
          id="private-notice">
          You&#39;ve saved a personal version of this shot. This shot is only visible to you until you share the link.
        </div>;
      }
    }

    let clipUrl = null;
    if (clipNames.length) {
      let clipId = clipNames[0];
      let clip = this.props.shot.getClip(clipId);
      clipUrl = clip.image.url;
    }
    let date = new Date(this.props.shot.createdDate);
    let filenameTitle = this.props.shot.title;
    filenameTitle = filenameTitle.replace(/[\/!@&*.|\n\r\t]/g, " ");
    filenameTitle = filenameTitle.replace(/\s+/g, " ");
    let clipFilename = `Page-Shot-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${filenameTitle}`;

    if (this.state.sharePanelDisplay) {
      shareButtons = <ShareButtons
                large={ true }
                clipUrl={ clipUrl }
                isPublic={ isPublic }
                { ...this.props } />;
    }

    /*
    {this.props.hasSavedShot ?
      <button id="upload-full-page" className="upload-full-page" onClick={ this.onClickUploadFullPage.bind(this) }>
        Save full page
      </button>
      : null}
    */

    return (
        <div id="frame" className="inverse-color-scheme full-height column-space">
          { this.renderExtRequired() }
        <div className="frame-header default-color-scheme">
          <div className="left">
            <a className="block-button button secondary" href={ myShotsHref } onClick={this.onClickMyShots.bind(this)}>{ myShotsText }</a>
            <div className="shot-info">
              <span className="shot-title"> { shot.title } </span>
              <div className="shot-subtitle">Saved from &nbsp;<a className="subtitle-link" href={ shotRedirectUrl } onClick={ this.onClickOrigUrl.bind(this, "navbar") }>{ linkTextShort }</a> <span className="clock-icon"/> { timeDiff } { expiresDiff } </div>
            </div>
          </div>
          <div className="more-shot-actions right">
            <button className="button primary" id="share-button" onClick={ this.onClickShareButton.bind(this) }>
              Share
            </button>
            <a className="button secondary" href={ clipUrl } onClick={ this.onClickDownload.bind(this) }
              title="Download the shot image" download={ `${clipFilename}.png` }>
              <img src={ this.props.staticLink("img/download.svg") } />
            </a>
            { trashOrFlagButton }
          </div>
        </div>
        { shareButtons }
        { clips }
        { this.props.shot.showPage ? <span id="copy-flag">Copy</span> : null }
        { this.props.shot.showPage ?
          <iframe width="100%" height={frameHeight} id="frame" src={ shot.contentUrl } style={ {backgroundColor: "#fff"} } /> : null }
        <Footer forUrl={ shot.viewUrl } />
      </div>
    );
  }

  renderExtRequired() {
    if (this.props.isExtInstalled || this.state.closePageshotBanner) {
      return null;
    }
    return <div className="default-color-scheme notification">
      <div> Page Shot is an experimental extension for Firefox. <a href={ this.props.backend } onClick={ this.clickedCreate.bind(this) }>Get it here</a></div>
      <a className="close" onClick={ this.closeGetPageshotBanner.bind(this) }></a>
    </div>;
  }


  clickedCreate() {
    sendEvent("click-install-banner", {useBeacon: true});
  }

  onSaveExpire(value) {
    sendEvent("set-expiration", "navbar");
    if (value === 0 || value === "0") {
      sendEvent("set-expiration-to-indefinite", "navbar");
    } else {
      sendEvent("set-expiration-to-time", "navbar");
    }
    this.props.clientglue.changeShotExpiration(this.props.shot, value);
  }

  onRestore() {
    sendEvent("recover-expired");
    this.props.clientglue.changeShotExpiration(this.props.shot, this.props.defaultExpiration);
  }

  onClickMyShots() {
    if (this.props.isOwner) {
      sendEvent("goto-myshots", "navbar", {useBeacon: true});
    } else {
      sendEvent("goto-pageshot", "navbar", {useBeacon: true});
    }
    // Note: we allow the default action to continue
  }

  onClickOrigUrl(label) {
    sendEvent("view-original", label, {useBeacon: true});
    // Note: we allow the default action to continue
  }

  onClickDownload() {
    sendEvent("download", "navbar");
  }

  onClickFeedback() {
    sendEvent("start-feedback", "footer", {useBeacon: true});
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.sharePanelDisplay) {
      document.addEventListener("click", this.unsharePanelHandler, false);
    } else {
      document.removeEventListener("click", this.unsharePanelHandler, false);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.unsharePanelHandler, false);
  }

}

class ExpireWidget extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isChangingExpire: false};
  }

  render() {
    if (this.state.isChangingExpire) {
      return this.renderChanging();
    } else {
      return this.renderNormal();
    }
  }

  renderChanging() {
    let minute = 60 * 1000;
    let hour = minute * 60;
    let day = hour * 24;
    return (
      <span>
        keep for <select ref="expireTime">
          <option value="cancel">Select time:</option>
          <option value="0">Indefinitely</option>
          <option value={ 10 * minute }>10 Minutes</option>
          <option value={ hour }>1 Hour</option>
          <option value={ day }>1 Day</option>
          <option value={ 7 * day }>1 Week</option>
          <option value={ 14 * day }>2 Weeks</option>
          <option value={ 31 * day }>1 Month</option>
        </select>
        &#8195;<span className="link-button" onClick={this.clickSaveExpire.bind(this)}>save</span>
        &#8195;<span className="link-button" onClick={this.clickCancelExpire.bind(this)}>cancel</span>
      </span>
    );
  }

  renderNormal() {
    let button;
    if (this.props.expireTime === null) {
      button = <span>does not expire</span>;
    } else {
      let desc = "expires";
      if (this.props.expireTime < Date.now()) {
        desc = "expired";
      }
      button = <span>
        {desc} <TimeDiff date={this.props.expireTime} simple={this.props.simple} />
      </span>;
    }
    return (
      <button className="button tiny secondary" onClick={this.clickChangeExpire.bind(this)}>
        {button}
      </button>
    );
  }

  clickChangeExpire() {
    sendEvent("start-expiration-change", "navbar");
    this.setState({isChangingExpire: true});
  }

  clickCancelExpire() {
    sendEvent("cancel-expiration-change", "navbar");
    this.setState({isChangingExpire: false});
  }

  clickSaveExpire() {
    // FIXME: save the value that it was changed to?  Yes!  Not sure where to put it.
    let value = ReactDOM.findDOMNode(this.refs.expireTime).value;
    if (value === "cancel") {
      this.clickCancelExpire();
      return;
    }
    value = parseInt(value, 10);
    // Note: sendEvent done in onSaveExpire
    this.props.onSaveExpire(value);
    this.setState({isChangingExpire: false});
  }
}

function intervalDescription(ms) {
  let parts = [];
  let second = 1000;
  let minute = second*60;
  let hour = minute*60;
  let day = hour*24;
  if (ms > day) {
    let days = Math.floor(ms/day);
    if (days === 1) {
      parts.push("1 day");
    } else {
      parts.push(`${days} days`);
    }
    ms = ms % day;
  }
  if (ms > hour) {
    let hours = Math.floor(ms/hour);
    if (hours === 1) {
      parts.push("1 hour");
    } else {
      parts.push(`{$hours} hours`);
    }
    ms = ms % hour;
  }
  if (ms > minute) {
    let minutes = Math.floor(ms/minute);
    if (minutes === 1) {
      parts.push("1 minute");
    } else {
      parts.push(`${minutes} minutes`);
    }
    ms = ms % minute;
  }
  if (ms) {
    let seconds = Math.floor(ms/second);
    if (seconds === 1) {
      parts.push("1 second");
    } else {
      parts.push(`${seconds} seconds`);
    }
  }
  if (! parts.length) {
    parts.push("immediately");
  }
  return parts.join(" ");
}

let FrameFactory = React.createFactory(Frame);
let HeadFactory = React.createFactory(Head);

exports.FrameFactory = FrameFactory;

exports.render = function (req, res) {
  let buildTime = require("../build-time").string;
  let serverPayload = {
    allowExport: req.config.allowExport,
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    isOwner: req.deviceId == req.shot.ownerId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    buildTime: buildTime,
    simple: false,
    shotDomain: req.url, // FIXME: should be a property of the shot
    expireTime: req.shot.expireTime === null ? null: req.shot.expireTime.getTime(),
    retentionTime: req.config.expiredRetentionTime*1000,
    defaultExpiration: req.config.defaultExpiration*1000,
    sentryPublicDSN: req.config.sentryPublicDSN,
    cspNonce: req.cspNonce,
  };
  let headString = ReactDOMServer.renderToStaticMarkup(HeadFactory(serverPayload));
  let frame = FrameFactory(serverPayload);
  let clientPayload = {
    allowExport: req.config.allowExport,
    gitRevision: getGitRevision(),
    backend: req.backend,
    shot: req.shot.asJson(),
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    isOwner: req.deviceId == req.shot.ownerId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    shotDomain: req.url,
    urlIfDeleted: req.shot.urlIfDeleted,
    expireTime: req.shot.expireTime === null ? null : req.shot.expireTime.getTime(),
    deleted: req.shot.deleted,
    buildTime: buildTime,
    simple: false,
    retentionTime: req.config.expiredRetentionTime*1000,
    defaultExpiration: req.config.defaultExpiration*1000
  };
  if (serverPayload.expireTime !== null && Date.now() > serverPayload.expireTime) {
    serverPayload.shot = clientPayload.shot = {
      url: req.shot.url,
      docTitle: req.shot.title
    };
  }
  let body = ReactDOMServer.renderToString(frame);
  let json = JSON.stringify(clientPayload);
  let result = addReactScripts(
`<html>
  ${headString}
  <body className="inverse-color-scheme">
    <div id="react-body-container">${body}</div>
  </body></html>`, `
    var serverData = ${json};
    clientglue.setModel(serverData);
  `, req.cspNonce);
  res.send(result);
};

exports.renderSimple = function (req, res) {
  let buildTime = require("../build-time").string;
  let serverPayload = {
    allowExport: req.config.allowExport,
    staticLink: req.staticLink.simple,
    backend: req.backend,
    shot: req.shot,
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    gaId: null,
    deviceId: req.deviceId,
    buildTime: buildTime,
    simple: true,
    shotDomain: req.url // FIXME: should be a property of the shot
  };
  let headString = ReactDOMServer.renderToStaticMarkup(HeadFactory(serverPayload));
  let frame = FrameFactory(serverPayload);
  let body = ReactDOMServer.renderToStaticMarkup(frame);
  body = `<!DOCTYPE HTML>
  ${headString}
  <body className="inverse-color-scheme">${body}
  </body></html>`;
  res.send(body);
};
