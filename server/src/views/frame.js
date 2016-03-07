/* jshint browser: true */
/* globals ga, Raven */

const React = require("react");
const { getGitRevision } = require("../linker");
const { ProfileButton } = require("./profile");
const { addReactScripts } = require("../reactutils");
const { gaActivation } = require("../ga-activation");

class ShareButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copyText: "Copy"};
  }

  onClickShareButton(whichButton) {
    // FIXME implement analytics tracking here
  }

  onClickCopyButton(e) {
    let target = e.target;
    target.previousSibling.select();
    document.execCommand("copy");
    this.setState({copyText: "Copied"});
    setTimeout(() => {
      this.setState({copyText: "Copy"});
    }, 1000);
  }

  onClickInputField(e) {
    e.target.select();
  }

  onChange(e) {
    // Do nothing -- we simply need this event handler to placate React
  }

  render() {
    let size = this.props.large ? "32" : "16";
    return <div id="share-buttons-panel" className="share-row">
      <div>Share to email and social networks</div>
      <a onClick={ this.onClickShareButton.bind(this, "facebook") } target="_blank" href={ "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(this.props.shot.viewUrl) }>
        <img src={ this.props.staticLink(`img/facebook-${size}.png`) } />
      </a>
      <a onClick={ this.onClickShareButton.bind(this, "twitter") }target="_blank" href={"https://twitter.com/home?status=" + encodeURIComponent(this.props.shot.viewUrl) }>
        <img src={ this.props.staticLink(`img/twitter-${size}.png`) } />
      </a>
      <a onClick={ this.onClickShareButton.bind(this, "pinterest") }target="_blank" href={"https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(this.props.shot.viewUrl) + "&media=" + encodeURIComponent(this.props.clipUrl) + "&description=" }>
        <img src={ this.props.staticLink(`img/pinterest-${size}.png`) } />
      </a>
      <a onClick={ this.onClickShareButton.bind(this, "email") }target="_blank" href={ `mailto:?subject=Fwd:%20${encodeURIComponent(this.props.shot.title)}&body=${encodeURIComponent(this.props.shot.title)}%0A%0A${encodeURIComponent(this.props.shot.viewUrl)}%0A%0ASource:%20${encodeURIComponent(this.props.shot.url)}%0A` }>
        <img src={ this.props.staticLink(`img/email-${size}.png`) } />
      </a>
      <hr />
      <div>Get a shareable link to this shot</div>
      <input className="copy-shot-link-input"
        value={ this.props.shot.viewUrl }
        onClick={ this.onClickInputField.bind(this) }
        onChange={ this.onChange.bind(this) } />
      <button
        className="copy-shot-link-button"
        onClick={ this.onClickCopyButton.bind(this) }>
        { this.state.copyText }
      </button>
    </div>;
  }
}

class Clip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paddingTop: 66,
      hidden: false
    };
  }

  componentDidMount() {
    let image = React.findDOMNode(this.refs.clipImage);
    let onResize = () => {
      let windowHeight = window.innerHeight;
      let paddingTop = Math.floor((windowHeight - image.height - 35) / 2);
      if (paddingTop < 66) {
        paddingTop = 66;
      }
      this.setState({paddingTop});
    }
    window.addEventListener("resize", onResize, true);

    onResize();
  }

  onClickClose() {
    this.setState({hidden: true});
  }

  render() {
    if (this.state.hidden) {
      return <span />;
    }

    let clip = this.props.clip,
      node = null;

    if (clip.image === undefined) {
      node = <div className="text-clip" dangerouslySetInnerHTML={{__html: clip.text.html}} />;
    } else {
      node = <img ref="clipImage" src={ clip.image.url } />;
    }

    let closeButton = null;
    if (this.props.showCloseButton) {
      closeButton = <img
        style={{
          position: "absolute",
          top: "81px",
          right: "15px",
          height: "32px",
          width: "32px"}}
        src={ this.props.staticLink("img/close.svg") }
        onClick={ this.onClickClose.bind(this) }/>;
    }
    return <div ref="clipContainer" className="clip-container" style={{paddingTop: this.state.paddingTop}} onClick={this.onClickClose.bind(this)}>
      { closeButton }
      <a href={ clip.image.url }>
        { node }
      </a>
    </div>;
  }
}

class TimeDiff extends React.Component {
  render() {
    if (this.props.simple) {
      return this.renderSimple();
    }
    let timeDiff;
    let seconds = (Date.now() - this.props.date) / 1000;
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
    return <span title={this.dateString(this.props.date)}>{timeDiff}</span>;
  }

  renderSimple() {
    return <span>{this.dateString(this.props.date)}</span>;
  }

  dateString(d) {
    if (! (d instanceof Date)) {
      d = new Date(d);
    }
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[d.getMonth() - 1];
    let hour = d.getHours();
    if (hour === 0) {
      hour = "12am";
    } else if (hour === 12) {
      hour = "12pm";
    } else if (hour > 12) {
      hour = (hour % 12) + "pm";
    } else {
      hour = hour + "am";
    }
    let year = 1900 + d.getYear();
    return `${month} ${d.getDay()} ${year}, ${hour}`;
  }
}

exports.TimeDiff = TimeDiff;

class Head extends React.Component {
  render() {
    let ogImage = [];
    if (this.props.shot) {
      for (let clipId in this.props.shot.clips) {
        let clip = this.props.shot.clips[clipId];
        if (clip.image) {
          let clipUrl = this.props.backend + "/clip/" + this.props.shot.id + "/" + clipId;
          ogImage.push(<meta key={ "ogimage" + this.props.shot.id } property="og:image" content={clipUrl} />);
          if (clip.image.dimensions) {
            ogImage.push(<meta key={ "ogimagewidth" + this.props.shot.id } property="og:image:width" content={clip.image.dimensions.x} />);
            ogImage.push(<meta key={ "ogimageheight" + this.props.shot.id } property="og:image:height" content={clip.image.dimensions.y} />);
          }
        }
      }
    }
    let ogTitle = null;
    if (this.props.shot && this.props.shot.ogTitle) {
      ogTitle = <meta propery="og:title" content={this.props.shot.ogTitle} />;
    }
    let oembed;
    if (! this.props.simple) {
      oembed = <link rel="alternate" type="application/json+oembed" href={this.props.shot.oembedUrl} title={`${this.props.shot.title} oEmbed`} />;
    }
    let postMessageOrigin = `${this.props.contentProtocol}://${this.props.contentOrigin}`;
    let js = [
      <script src={ this.props.staticLink("vendor/core.js") } key="core-js-js" />,
      <script src={ this.props.staticLink("js/server-bundle.js") } key="server-bundle-js" />,
    ];

    if (this.props.sentryPublicDSN) {
      js = js.concat([
        <script src={ this.props.staticLink("vendor/raven.js") } key="raven-js-js" />,
        <script dangerouslySetInnerHTML={{__html: `Raven.config("${this.props.sentryPublicDSN}").install(); window.Raven = Raven;`}}></script>,
      ]);
    }

    js = js.concat(gaActivation(this.props.gaId, this.props.deviceId, true));
    if (this.props.simple) {
      js = [];
    }
    return (
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.shot.title}</title>
        {js}
        <link rel="stylesheet" href={ this.props.staticLink("css/styles.css") } />
        <link rel="stylesheet" href={ this.props.staticLink("css/profile.css") } />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {oembed}
        {ogTitle}
        {ogImage}
        <script dangerouslySetInnerHTML={{__html: `var CONTENT_HOSTING_ORIGIN = "${postMessageOrigin}";`}}></script>
        <script src={ this.props.staticLink("js/parent-helper.js") } />
      </head>);
  }
}

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sharePanelDisplay: false, closePageshotBanner: false};
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
      document.addEventListener("click", this.unsharePanelHandler, false);
    } else {
      document.removeEventListener("click", this.unsharePanelHandler, false);
    }
  }

  unsharePanelHandler(e) {
    let el = e.target;
    while (el) {
      if (el.id === "share-buttons-panel") {
        // A click in the share panel itself
        return;
      }
      el = el.parentNode;
    }
    this.onClickShareButton();
  }

  onClickDelete(e) {
    window.ga('send', 'event', 'website', 'click-delete-shot', {useBeacon: true});
    if (window.confirm("Are you sure you want to delete the shot permanently?")) {
      this.props.clientglue.deleteShot(this.props.shot);
    }
  }

  onClickFlag(e) {
    window.open(`mailto:pageshot-feedback@mozilla.com?subject=Flagging%20shot%20for%20abuse&body=Flagging%20shot%20for%20abuse:%20${encodeURIComponent(this.props.shot.url)}`);
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
        <h2><a href={this.props.shot.urlIfDeleted}>{this.props.shot.title}</a></h2>
        <p>
          <a href={this.props.shot.urlIfDeleted}>
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

    for (let i=0; i < clipNames.length; i++) {
      let clipId = clipNames[i];
      let clip = shot.getClip(clipId);

      clips.push(<Clip staticLink={this.props.staticLink} key={ clipId } clip={ clip }  shotId={ shotId } shotDomain={ shotDomain } showCloseButton={ this.props.shot.showPage } />);
    }

    let linkTextShort = shot.urlDisplay;

    let timeDiff = <TimeDiff date={shot.createdDate} simple={this.props.simple} />;
    let expiresDiff = <span>
      –&nbsp;
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

    /*
    <div id="full-screen-thumbnail">
      <img src={ this.props.shot.fullScreenThumbnail } onClick={ this.clickFullPageButton.bind(this) } />
    </div>
    */

    /*
    <div id="profile-widget">
      <ProfileButton
        staticLink={ this.props.staticLink }
        initialExpanded={ false }
        avatarurl={ this.props.avatarurl }
        nickname={ this.props.nickname }
        email={ this.props.email }
        deviceId={ this.props.deviceId }
        simple={ this.props.simple }
        allowExport={ this.props.allowExport }
      />
    </div>
    */

    if (this.state.sharePanelDisplay) {
      shareButtons = <ShareButtons
                large={ true }
                clipUrl={ shot.viewUrl }
                { ...this.props } />;
    }

    let trashOrFlagButton = null;
    if (this.props.isOwner) {
      trashOrFlagButton = <button className="trash-button" onClick={ this.onClickDelete.bind(this) }>
        <img src={ this.props.staticLink("img/garbage-bin.png") } />
      </button>;
    } else {
      trashOrFlagButton = <button className="flag-button" onClick={ this.onClickFlag.bind(this) }>
        <img src={ this.props.staticLink("img/flag.png") } />
      </button>;
    }

    let myShotsHref = "/shots";
    let myShotsText = <span style={{backgroundImage: `url(${this.props.staticLink("img/arrow-right.svg")})`, backgroundRepeat: "no-repeat", backgroundPosition: "100% 50%", backgroundSize: "8px 14px", paddingRight: "18px", paddingLeft: "20px", fontSize: "110%"}}>My Shots</span>;
    if (!this.props.isOwner) {
      myShotsText = <span>
        <span>
          Made with
        </span>
        <br />
        <span style={{fontWeight: "bold"}}>
          PageShot
        </span>
      </span>;
      myShotsHref = "/";
    }

    return (
        <div id="container">
          { this.renderExtRequired() }
        <div id="toolbar" data-step="1" data-intro="This is the title of the page and a link to it's source.">
          <a href={ myShotsHref }>
            <button className="my-shots-button" style={{background: `no-repeat 10% center url(${this.props.staticLink("img/my-shots.png")}) #ebebeb`}}>
              <span>{ myShotsText }</span>
            </button>
          </a>
          <span className="shot-title"> { shot.title } </span>
          <div className="shot-subtitle">
            <span>Saved from </span><a className="subheading-link" href={ shotRedirectUrl }>{ linkTextShort }</a>
            <img height="16" width="16" style={{
              marginRight: "7px",
              marginLeft: "7px",
              position: "relative",
              top: "4px"}}
              src={ this.props.staticLink("img/clock.svg") } />
            { timeDiff } { expiresDiff }
          </div>
          <div className="more-shot-actions">
            {this.props.hasSavedShot ?
              <button id="upload-full-page" className="upload-full-page" onClick={ this.onClickUploadFullPage.bind(this) }>
                Upload full page
              </button>
              : null}
            <button className="share-button" onClick={ this.onClickShareButton.bind(this) }>
              Share
            </button>
            { trashOrFlagButton }
          </div>
        </div>
        { shareButtons }
        { clips }
        { this.props.shot.showPage ?
          <iframe width="100%" height={frameHeight} id="frame" src={ shot.contentUrl } style={ {backgroundColor: "#fff"} } /> : null }
        <div className="pageshot-footer">
          <a href="https://github.com/mozilla-services/pageshot">{this.props.productName}</a> — <a href={`https://github.com/mozilla-services/pageshot/commit/${getGitRevision()}`}>Updated {this.props.buildTime}</a>
        </div>
        <a className="feedback-footer" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + shot.viewUrl }>Send Feedback</a>
      </div>
    );
  }

  renderExtRequired() {
    if (this.props.isExtInstalled || this.state.closePageshotBanner) {
      return null;
    }
    return <div id="use-pageshot-to-create">
      <a href={ this.props.backend } onClick={ this.clickedCreate.bind(this) }>To create your own shots, get the Firefox extension {this.props.productName}</a>.
      <a id="banner-close" onClick={ this.closeGetPageshotBanner }>&times;</a>
    </div>;
  }

  clickedCreate() {
    window.ga('send', 'event', 'website', 'click-install-banner', {useBeacon: true});
  }

  onSaveExpire(value) {
    this.props.clientglue.changeShotExpiration(this.props.shot, value);
  }

  onRestore() {
    this.props.clientglue.changeShotExpiration(this.props.shot, this.props.defaultExpiration);
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
      <button onClick={this.clickChangeExpire.bind(this)} style={{
        border: "1px solid #999",
        borderRadius: "3px",
        backgroundColor: "#f2f2f2",
        color: "#858585"
      }}>
        {button}
      </button>
    );
  }

  clickChangeExpire() {
    window.ga('send', 'event', 'website', 'click-change-expire', {useBeacon: true});
    this.setState({isChangingExpire: true});
  }

  clickCancelExpire() {
    window.ga('send', 'event', 'website', 'click-cancel-expire', {useBeacon: true});
    this.setState({isChangingExpire: false});
  }

  clickSaveExpire() {
    // FIXME: save the value that it was changed to?  Yes!  Not sure where to put it.
    let value = this.refs.expireTime.getDOMNode().value;
    if (value === "cancel") {
      this.clickCancelExpire();
      return;
    }
    value = parseInt(value, 10);
    window.ga('send', 'event', 'website', 'click-save-expire', {useBeacon: true, eventValue: value/60000});
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
  };
  let headString = React.renderToStaticMarkup(HeadFactory(serverPayload));
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
  let body = React.renderToString(frame);
  let json = JSON.stringify(clientPayload);
  let result = addReactScripts(
`<html>
  ${headString}
  <body>
    <div id="react-body-container">${body}</div>
  </body></html>`, `
    var serverData = ${json};
    clientglue.setModel(serverData);
  `);
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
  let headString = React.renderToStaticMarkup(HeadFactory(serverPayload));
  let frame = FrameFactory(serverPayload);
  let body = React.renderToStaticMarkup(frame);
  body = `<!DOCTYPE HTML>
  ${headString}
  <body>${body}
  </body></html>`;
  res.send(body);
};
