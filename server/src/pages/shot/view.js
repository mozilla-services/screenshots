/* globals controller */
const React = require("react");
const { Localized } = require("fluent-react/compat");
const { Footer } = require("../../footer-view");
const sendEvent = require("../../browser-send-event.js");
const { ShareButton } = require("../../share-buttons");
const { TimeDiff } = require("./time-diff");
const reactruntime = require("../../reactruntime");

class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO: how can we resize nicely if JS is disabled? maybe CSS?
    let image = this.clipImage;
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
    // FIXME: need to remove event listener on unmount
  }

  render() {
    let clip = this.props.clip;
    if (!clip.image) {
      console.warn("Somehow there's a shot without an image");
      return null;
    }
    let node = <img id="clipImage" style={{height: "auto", width: clip.image.dimensions.x + "px", maxWidth: "100%" }} ref={clipImage => this.clipImage = clipImage} src={ clip.image.url } alt={ clip.image.text } />;
    return <div ref={clipContainer => this.clipContainer = clipContainer} className="clip-container">
      { this.copyTextContextMenu() }
      <a href={ clip.image.url } onClick={ this.onClickClip.bind(this) } contextMenu="clip-image-context">
        { node }
      </a>
    </div>;
  }

  onClickClip() {
    sendEvent("goto-clip", "content", {useBeacon: true});
    // Allow default action to continue
  }

  copyTextContextMenu() {
    if (this.props.clip.image.text) {
      return (
        <menu type="context" id="clip-image-context">
          <Localized id="shotPageCopyImageText">
            <menuitem label="Copy Image Text" onClick={this.copyImageText.bind(this)} ></menuitem>
          </Localized>
        </menu>
      );
    }
    return null;
  }

  copyImageText() {
    sendEvent("copy-image-text", "context-menu");
    let text = this.props.clip.image.text;
    let el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}


class Head extends React.Component {
  render() {
    let expired = this.props.expireTime !== null && Date.now() > this.props.expireTime;
    if (expired) {
      return (
        <reactruntime.HeadTemplate {...this.props}>
          <meta name="robots" content="noindex" />
          <script src={ this.props.staticLink("/static/js/wantsauth.js") } />
          <script src={ this.props.staticLink("/static/js/shot-bundle.js") } async />
          <link rel="stylesheet" href={ this.props.staticLink("/static/css/frame.css") } />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </reactruntime.HeadTemplate>
      );
    }
    // FIXME: we need to review if the oembed form actually works and is valuable (#585)
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={ this.props.staticLink("/static/js/wantsauth.js") } />
        <script src={ this.props.staticLink("/static/js/shot-bundle.js") } async />
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/frame.css") } />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" type="application/json+oembed" href={this.props.shot.oembedUrl} title={`${this.props.shot.title} oEmbed`} />
        {this.socialMetadata()}
      </reactruntime.HeadTemplate>
    );
  }

  socialMetadata() {
    if (!this.props.shot) {
      return null;
    }
    let title = (this.props.shot.openGraph && this.props.shot.openGraph.title) ||
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
      if (!clip.image) {
        continue;
      }
      let text = `From ${this.props.shot.urlDisplay}`;
      og.push(<meta key={ `ogimage${clipId}` } property="og:image" content={this.makeEmbeddedImageUrl(clip.image.url, "og")} />);
      og.push(<meta key={ `ogdescription${clipId}` } property="og:description" content={text} />);
      twitter.push(<meta key={ `twitterimage${clipId}` } name="twitter:image" content={this.makeEmbeddedImageUrl(clip.image.url, "twitter")} />);
      twitter.push(<meta key={ `twitterdesc${clipId}` } name="twitter:description" content={text} />);
      // FIXME: consider twitter:site @sometwitteraccount
      if (clip.image.dimensions) {
        og.push(<meta key={ `ogimagewidth${clipId}` } property="og:image:width" content={clip.image.dimensions.x} />);
        og.push(<meta key={ `ogimageheight${clipId}` } property="og:image:height" content={clip.image.dimensions.y} />);
      }
    }
    return og.concat(twitter);
  }

  makeEmbeddedImageUrl(url, type) {
    if (!url.startsWith("http")) {
      return url;
    }
    if (url.indexOf("?") == -1) {
      url += "?";
    } else {
      url += "&";
    }
    url += "embedded=" + encodeURIComponent(type);
    return url;
  }
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      closeBanner: false,
      isChangingExpire: false
    };
  }

  doCloseBanner() {
    this.setState({closeBanner: true});
  }

  onClickDelete(e) {
    sendEvent("start-delete", "navbar", {useBeacon: true});
    const confirmMessage = document.getElementById("shotPageConfirmDelete").textContent;
    if (window.confirm(confirmMessage)) {
      sendEvent("delete", "popup-confirm", {useBeacon: true});
      this.props.controller.deleteShot(this.props.shot);
    } else {
      sendEvent("cancel-delete", "popup-confirm");
    }
  }

  onClickFlag(e) {
    sendEvent("start-flag", "navbar", {useBeacon: true});
    window.open(`mailto:screenshots-report@mozilla.com?subject=Flagging%20shot%20for%20abuse&body=Flagging%20shot%20for%20abuse:%20${encodeURIComponent(this.props.shot.viewUrl)}`);
  }

  render() {
    if (this.props.blockType !== 'none') {
      return this.renderBlock();
    }
    if (this.props.expireTime !== null && Date.now() > this.props.expireTime) {
      return this.renderExpired();
    }
    return this.renderBody();
  }

  renderBlock() {
    let message = null;
    let moreInfo = null;
    const dmca = <a href="mailto:dmcanotice@mozilla.com">dmcanotice@mozilla.com</a>;
    const url = `${this.props.backend}/${this.props.id}`;
    if (this.props.blockType === 'dmca') {
      if (this.props.isOwner) {
        message = (
          <Localized id="shotPageDMCAMessage">
            <span>This shot is no longer available due to a third party intellectual property claim.</span>
          </Localized>
        );
        moreInfo = (
          <p>
            <Localized id="shotPageDMCAContact" $dmca={dmca}>
              <span>Please email {dmca} to request further information.</span>
            </Localized>
            <Localized id="shotPageDMCAWarning">
              <span>If your Shots are subject to multiple claims, we may revoke your access to Firefox Screenshots.</span>
            </Localized>
            <br/>
            <Localized id="shotPageDMCAIncludeLink" $url={url}>
              <span>Please include the URL of this shot in your email: {url}</span>
            </Localized>
          </p>
        );
      }
    }

    return <reactruntime.BodyTemplate {...this.props}>
      <div className="column-center full-height alt-color-scheme">
        <Localized id="gNoShots">
          <img src={ this.props.staticLink("/static/img/image-nope_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
        </Localized>
        <div className="alt-content">
          <p>{ message }</p>
          { moreInfo }
        </div>
      </div>
    </reactruntime.BodyTemplate>;
  }

  renderExpired() {
    let expireTime = this.props.expireTime;
    if (typeof expireTime != "number") {
      expireTime = expireTime.getTime();
    }
    let deleteTime = new Date(expireTime + this.props.retentionTime);
    let restoreWidget;
    const expirationTimeDiff = <TimeDiff date={deleteTime} />;
    const restoreDate = new Date(Date.now() + this.props.defaultExpiration).toLocaleString();
    if (this.props.isOwner) {
      restoreWidget = (
        <p>
          <Localized id="shotPageExpirationMessage" $timediff={expirationTimeDiff}>
            <span></span>
          </Localized>
          <Localized id="shotPageRestoreButton" $date={restoreDate}>
            <button className="button primary" onClick={this.onRestore.bind(this)}></button>
          </Localized>
        </p>
      );
    }
    // Note: any attributes used here need to be preserved
    // in the render() function
    return <reactruntime.BodyTemplate {...this.props}>
      <div className="column-center full-height alt-color-scheme">
        <img src={ this.props.staticLink("/static/img/image-expired_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
        <div className="alt-content">
          <Localized id="shotPageExpiredMessage">
            <h1>This shot has expired.</h1>
          </Localized>
          <p>
            <Localized id="shotPageExpiredMessageDetails">
              <span>Here is the page it was originally created from:</span>
            </Localized>
            <br/>
            <a href={this.props.shot.urlIfDeleted} onClick={ this.onClickOrigUrl.bind(this, "expired") }>{this.props.shot.title}</a>
          </p>
          { restoreWidget }
        </div>
      </div>
    </reactruntime.BodyTemplate>;
  }

  renderBody() {
    let shot = this.props.shot;
    let shotId = this.props.shot.id;

    let clips = [];
    let clipNames = shot.clipNames();
    if (clipNames.length && !this.state.hidden) {
      let clipId = clipNames[0];
      let clip = shot.getClip(clipId);

      clips.push(<Clip
        staticLink={this.props.staticLink}
        key={ clipId }
        clip={ clip }
        shotId={ shotId } />);
    }

    let errorMessages = [
      <Localized id="shotPageAlertErrorUpdatingExpirationTime" key="error-1"><div id="shotPageAlertErrorUpdatingExpirationTime" hidden></div></Localized>,
      <Localized id="shotPageAlertErrorDeletingShot" key="error-2"><div id="shotPageAlertErrorDeletingShot" hidden></div></Localized>,
      <Localized id="shotPageAlertErrorUpdatingTitle" key="error-3"><div id="shotPageAlertErrorUpdatingTitle" hidden></div></Localized>,
      <Localized id="shotPageConfirmDelete" key="error-4"><div id="shotPageConfirmDelete" hidden></div></Localized>
    ];

    let linkTextShort = shot.urlDisplay;

    let timeDiff = <TimeDiff date={shot.createdDate} />;
    let expiresDiff = null;
    if (this.props.isOwner) {
      expiresDiff = <span className="expire-widget">
      <ExpireWidget
        expireTime={this.props.expireTime}
        onChanging={this.onChangingExpire.bind(this)}
        onSaveExpire={this.onSaveExpire.bind(this)} />
      </span>;
    }

    let trashOrFlagButton;
    if (this.props.isOwner) {
      trashOrFlagButton = <Localized id="shotPageDeleteButton">
        <button className="button transparent trash" title="Delete this shot permanently" onClick={ this.onClickDelete.bind(this) }></button>
      </Localized>;
    } else {
      trashOrFlagButton = <Localized id="shotPageAbuseButton">
        <button className="button transparent flag" title="Report this shot for abuse, spam, or other problems" onClick={ this.onClickFlag.bind(this) }></button>
      </Localized>;
    }

    let myShotsHref = "/shots";
    let myShotsText = <Localized id="gMyShots"><span className="back-to-index">My Shots</span></Localized>;
    // FIXME: this means that on someone else's shot they won't see a My Shots link:
    if (!this.props.isOwner) {
      myShotsText = <span className="back-to-home">
        <span>
          Firefox
        </span>
        <span style={{fontWeight: "bold"}}>
          Screenshots
        </span>
      </span>;
      myShotsHref = "/";
    }

    let clipUrl = null;
    if (clipNames.length) {
      let clipId = clipNames[0];
      let clip = this.props.shot.getClip(clipId);
      clipUrl = clip.image.url;
    }

    let renderGetFirefox = this.props.userAgent && (this.props.userAgent + "").search(/firefox\/\d{1,255}/i) === -1;
    let renderExtensionNotification = !(this.props.isExtInstalled || renderGetFirefox);
    if (this.props.isMobile || this.state.closeBanner) {
      renderGetFirefox = renderExtensionNotification = false;
    }

    let favicon = null;
    if (shot.favicon) {
      // We use background-image so if the image is broken it just doesn't show:
      favicon = <div style={{backgroundImage: `url("${shot.favicon}")`}} className="favicon" />;
    }

    const shotPageDownload = <Localized id="shotPageDownload"><span className="download-text">Download</span></Localized>;

    return (
      <reactruntime.BodyTemplate {...this.props}>
        { renderGetFirefox ? this.renderFirefoxRequired() : null }
        <div id="frame" className="inverse-color-scheme full-height column-space">
        <div className="frame-header default-color-scheme">
        <a className="block-button button secondary" href={ myShotsHref } onClick={this.onClickMyShots.bind(this)}>{ myShotsText }</a>
          <div className="shot-main-actions">
            <div className="shot-info">
              <EditableTitle title={shot.title} isOwner={this.props.isOwner} />
              <div className="shot-subtitle">
                { this.state.isChangingExpire ? null : favicon }
                { linkTextShort && !this.state.isChangingExpire ? <a className="subtitle-link" rel="noopener noreferrer" href={ shot.url } target="_blank" onClick={ this.onClickOrigUrl.bind(this, "navbar") }>{ linkTextShort }</a> : null }
                { this.state.isChangingExpire ? null : <span className="time-diff">{ timeDiff }</span> }
                { expiresDiff }
              </div>
            </div>
          </div>
          <div className="shot-alt-actions">
            { trashOrFlagButton }
            <ShareButton abTests={this.props.abTests} clipUrl={clipUrl} shot={shot} isOwner={this.props.isOwner} staticLink={this.props.staticLink} renderExtensionNotification={renderExtensionNotification} isExtInstalled={this.props.isExtInstalled} />
            <Localized id="shotPageDownloadShot">
              <a className="button primary" href={ this.props.downloadUrl } onClick={ this.onClickDownload.bind(this) }
                title="Download the shot image">
                <img src={ this.props.staticLink("/static/img/download-white.svg") } width="20" height="20"/>&nbsp;
                {shotPageDownload}
              </a>
            </Localized>
          </div>
        </div>
        { clips }
        { errorMessages }
        <Footer forUrl={ shot.viewUrl } {...this.props} />
      </div>
    </reactruntime.BodyTemplate>);
  }

  renderFirefoxRequired() {
    return <div className="highlight-color-scheme alt-notification">
      <div>
        <Localized id="gScreenshotsDescription">
          <span>Screenshots made simple. Take, save and share screenshots without leaving Firefox.</span>
        </Localized>
        &nbsp;
        <Localized id="shotPageUpsellFirefox">
          <a href="https://www.mozilla.org/firefox/new/?utm_source=screenshots.firefox.com&utm_medium=referral&utm_campaign=screenshots-acquisition" onClick={ this.clickedInstallFirefox.bind(this) }>Get Firefox now</a>
        </Localized>
      </div>
      <a className="close" onClick={ this.doCloseBanner.bind(this) }></a>
    </div>;
  }

  clickedInstallExtension() {
    sendEvent("click-install-banner", {useBeacon: true});
  }

  clickedInstallFirefox() {
    sendEvent("click-install-firefox", {useBeacon: true});
  }

  onSaveExpire(value) {
    sendEvent("set-expiration", "navbar");
    if (value === 0 || value === "0") {
      sendEvent("set-expiration-to-indefinite", "navbar");
    } else {
      sendEvent("set-expiration-to-time", "navbar");
    }
    this.props.controller.changeShotExpiration(this.props.shot, value);
  }

  onChangingExpire(value) {
    this.setState({isChangingExpire: value});
  }

  onRestore() {
    sendEvent("recover-expired");
    this.props.controller.changeShotExpiration(this.props.shot, this.props.defaultExpiration);
  }

  onClickMyShots() {
    if (this.props.isOwner) {
      sendEvent("goto-myshots", "navbar", {useBeacon: true});
    } else {
      sendEvent("goto-homepage", "navbar", {useBeacon: true});
    }
    // Note: we allow the default action to continue
  }

  onClickOrigUrl(label) {
    if (this.props.isOwner) {
      sendEvent("view-original", `${label}-owner`, {useBeacon: true});
    } else {
      sendEvent("view-original", `${label}-non-owner`, {useBeacon: true});
    }
    // Note: we allow the default action to continue
  }

  onClickDownload() {
    sendEvent("download", "navbar");
  }

  onClickFeedback() {
    sendEvent("start-feedback", "footer", {useBeacon: true});
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
    }
    return this.renderNormal();
  }

  renderChanging() {
    let minute = 60 * 1000;
    let hour = minute * 60;
    let day = hour * 24;
    return (
      <span className="keep-for-form">
        <Localized id="shotPageKeepFor"><span>How long should this shot be retained?</span></Localized>
        <select ref={expireTime => this.expireTime = expireTime}>
          <Localized id="shotPageSelectTime"><option value="cancel">Select time</option></Localized>
          <Localized id="shotPageKeepIndefinitely"><option value="0">Indefinitely</option></Localized>
          <Localized id="shotPageKeepTenMinutes"><option value={ 10 * minute }>10 Minutes</option></Localized>
          <Localized id="shotPageKeepOneHour"><option value={ hour }>1 Hour</option></Localized>
          <Localized id="shotPageKeepOneDay"><option value={ day }>1 Day</option></Localized>
          <Localized id="shotPageKeepOneWeek"><option value={ 7 * day }>1 Week</option></Localized>
          <Localized id="shotPageKeepTwoWeeks"><option value={ 14 * day }>2 Weeks</option></Localized>
          <Localized id="shotPageKeepOneMonth"><option value={ 31 * day }>1 Month</option></Localized>
        </select>
        <Localized id="shotPageSaveExpiration"><span className="button tiny secondary" onClick={this.clickSaveExpire.bind(this)}>save</span></Localized>
        <Localized id="shotPageCancelExpiration"><span className="button tiny secondary" onClick={this.clickCancelExpire.bind(this)}>cancel</span></Localized>
      </span>
    );
  }

  renderNormal() {
    let button;
    if (this.props.expireTime === null) {
      button = <Localized id="shotPageDoesNotExpire"><span>does not expire</span></Localized>;
    } else {
      const expired = this.props.expireTime < Date.now();
      const timediff = <TimeDiff date={this.props.expireTime} simple={this.props.simple} />;
      if (expired) {
        button = <Localized id="shotPageExpired" $timediff={timediff}><span>expired {timediff}</span></Localized>
      } else {
        button = <Localized id="shotPageExpiresIn" $timediff={timediff}><span>expires {timediff}</span></Localized>
      }
    }
    return (
      <button className="button tiny secondary inline" onClick={this.clickChangeExpire.bind(this)}>
        {button}
      </button>
    );
  }

  clickChangeExpire() {
    sendEvent("start-expiration-change", "navbar");
    this.setState({isChangingExpire: true});
    this.props.onChanging(true);
  }

  clickCancelExpire() {
    sendEvent("cancel-expiration-change", "navbar");
    this.setState({isChangingExpire: false});
    this.props.onChanging(false);
  }

  clickSaveExpire() {
    // FIXME: save the value that it was changed to?  Yes!  Not sure where to put it.
    let value = this.expireTime.value;
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

class EditableTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isEditing: false, isSaving: false, minWidth: 200};
  }

  componentWillReceiveProps(nextProps) {
    // When the save completes, this component just gets updated with the new title
    if (this.state.isSaving && this.state.isSaving === nextProps.title) {
      this.setState({isSaving: false});
    }
  }

  render() {
    if (this.state.isEditing) {
      return this.renderEditing();
    }
    let className = "shot-title";
    let handlers = {};
    if (this.props.isOwner) {
      className += " editable";
      handlers.onClick = this.onClick.bind(this);
    }
    if (this.state.isSaving) {
      className += " saving";
    }
    return <span ref={titleElement => this.titleElement = titleElement} className={className} {...handlers}>{this.state.isSaving || this.props.title}</span>;
  }

  renderEditing() {
    return <form onSubmit={this.onExit.bind(this)}>
      <input ref={(input) => this.textInput = input}
        className="shot-title-input"
        style={{minWidth: this.state.minWidth}}
        type="text" defaultValue={this.props.title} autoFocus="true"
        onBlur={this.onExit.bind(this)} onKeyUp={this.onKeyUp.bind(this)} />
    </form>;
  }

  onClick() {
    if (!this.state.isEditing) {
      this.setState({minWidth: this.titleElement.offsetWidth });
    }
    this.setState({isEditing: true});
  }

  onExit() {
    let val = this.textInput.value;
    controller.setTitle(val);
    this.setState({isEditing: false, isSaving: val});
  }

  onKeyUp(event) {
    if ((event.key || event.code) == "Escape") {
      this.setState({isEditing: false});
    }
  }

}

exports.BodyFactory = React.createFactory(Body);
exports.HeadFactory = React.createFactory(Head);
