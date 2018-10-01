/* globals controller */
const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const { ShotFooter } = require("./footer");
const sendEvent = require("../../browser-send-event.js");
const { PromoDialog } = require("./promo-dialog");
const { DeleteShotButton } = require("../../delete-shot-button");
const { TimeDiff } = require("./time-diff");
const reactruntime = require("../../reactruntime");
const { Editor } = require("./editor");
const { isValidClipImageUrl } = require("../../../shared/shot");
const { ShotPageHeader } = require("./shotpage-header");

class Clip extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // TODO: how can we resize nicely if JS is disabled? maybe CSS?
    const image = this.clipImage;
    const onResize = () => {
      const windowHeight = window.innerHeight;
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
    const clip = this.props.clip;
    if (!clip.image) {
      console.warn("Somehow there's a shot without an image");
      return null;
    }
    if (!isValidClipImageUrl(clip.image.url)) {
      return null;
    }

    const node = <img id="clipImage"
      style={{height: "auto", width: Math.floor(clip.image.dimensions.x) + "px", maxWidth: "100%" }}
      ref={clipImage => this.clipImage = clipImage}
      src={clip.image.url}
      alt={clip.image.text} />;

    const clipUrl = this.props.isMobile
                    ? this.props.downloadUrl
                    : clip.image.url;

    return <div ref={clipContainer => this.clipContainer = clipContainer} className="clip-container">
      { this.copyTextContextMenu() }
      <a href={ clipUrl } onClick={ this.onClickClip.bind(this) } contextMenu="clip-image-context">
        { node }
      </a>
    </div>;
  }

  onClickClip() {
    if (this.props.isMobile) {
      sendEvent("mobile-download", "content", {useBeacon: true});
    } else {
      sendEvent("goto-clip", "content", {useBeacon: true});
    }
    // Allow default action to continue
  }

  copyTextContextMenu() {
    if (this.props.clip.image.text) {
      return (
        <menu type="context" id="clip-image-context">
          <Localized id="shotPageCopyImageText" attrs={{label: true}}>
            <menuitem label="Copy Image Text" onClick={this.copyImageText.bind(this)} ></menuitem>
          </Localized>
        </menu>
      );
    }
    return null;
  }

  copyImageText() {
    sendEvent("copy-image-text", "context-menu");
    const text = this.props.clip.image.text;
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
}

Clip.propTypes = {
  clip: PropTypes.object,
  isMobile: PropTypes.bool,
  downloadUrl: PropTypes.string,
};

class Head extends React.Component {
  render() {
    const expired = this.props.expireTime !== null && Date.now() > this.props.expireTime;
    if (expired) {
      return (
        <reactruntime.HeadTemplate {...this.props}>
          <meta name="robots" content="noindex, nofollow, noimageindex" />
          <script src={ this.props.staticLink("/static/js/shot-bundle.js") } async />
          <link rel="stylesheet" href={ this.props.staticLink("/static/css/frame.css") } />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </reactruntime.HeadTemplate>
      );
    }
    // FIXME: we need to review if the oembed form actually works and is valuable (#585)
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <meta name="robots" content="noindex, nofollow, noimageindex" />
        <script src={ this.props.staticLink("/static/js/shot-bundle.js") } async />
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/inline-selection.css") } />
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
    const og = [
      <meta property="og:type" content="image" key="ogtype" />,
      <meta property="og:title" content={this.props.shot.title} key="ogtitle" />,
    ];
    const twitter = [
      <meta name="twitter:card" content="summary_large_image" key="twittercard" />,
      <meta name="twitter:title" content={this.props.shot.title} key="twitterTitle" />,
    ];

    for (const clipId of this.props.shot.clipNames()) {
      const clip = this.props.shot.getClip(clipId);
      if (!clip.image) {
        continue;
      }
      const text = `From ${this.props.shot.urlDisplay}`;
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
    if (!isValidClipImageUrl(url)) {
      return "";
    }
    if (!url.startsWith("http")) {
      return url;
    }
    if (!url.includes("?")) {
      url += "?";
    } else {
      url += "&";
    }
    url += "embedded=" + encodeURIComponent(type);
    return url;
  }
}

Head.propTypes = {
  expireTime: PropTypes.number,
  shot: PropTypes.object,
  staticLink: PropTypes.func,
};

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      imageEditing: false,
      canCopy: false,
    };
  }

  componentDidMount() {
    this.setState({
      highlightEditButton: this.props.highlightEditButton || this.props.promoDialog,
      promoDialog: this.props.promoDialog,
      isClient: true,
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.canCopy !== props.canCopy) {
      return {canCopy: props.canCopy};
    }
    return null;
  }

  clickDeleteHandler() {
    sendEvent("start-delete", "navbar", {useBeacon: true});
  }

  confirmDeleteHandler() {
    sendEvent("delete", "popup-confirm", {useBeacon: true});
    this.props.controller.deleteShot(this.props.shot);
  }

  cancelDeleteHandler() {
    sendEvent("cancel-delete", "popup-confirm");
  }

  onClickFlag(e) {
    sendEvent("start-flag", "navbar", {useBeacon: true});
    window.open(`https://qsurvey.mozilla.com/s3/screenshots-flagged-shots?ref=${this.props.id}`);
  }

  render() {
    if (this.props.blockType !== "none") {
      return this.renderBlock();
    }
    if (this.props.expireTime !== null && Date.now() > this.props.expireTime) {
      return this.renderExpired();
    }
    if (this.state.imageEditing) {
     return this.renderEditor();
    }
    return this.renderBody();
  }

  renderEditor() {
    const shot = this.props.shot;
    const clipNames = shot.clipNames();
    const clip = shot.getClip(clipNames[0]);
    return <reactruntime.BodyTemplate {...this.props}>
        <Editor clip={clip} pngToJpegCutoff={this.props.pngToJpegCutoff}
          onCancelEdit={this.onCancelEdit.bind(this)}
          onClickSave={this.onClickSave.bind(this)}></Editor>
    </reactruntime.BodyTemplate>;
  }

  renderBlock() {
    let message = null;
    let moreInfo = null;
    const dmca = <a href="mailto:dmcanotice@mozilla.com">dmcanotice@mozilla.com</a>;
    const url = `${this.props.backend}/${this.props.id}`;
    if (this.props.blockType === "dmca") {
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
        <Localized id="gNoShots" attrs={{alt: true}}>
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
    if (typeof expireTime !== "number") {
      expireTime = expireTime.getTime();
    }
    const deleteTime = new Date(expireTime + this.props.retentionTime);
    let restoreWidget;
    const expirationTimeDiff = <TimeDiff date={deleteTime} />;
    const restoreDate = new Date(Date.now() + this.props.defaultExpiration).toLocaleString();
    if (this.props.isOwner) {
      restoreWidget = (
        <p>
          <Localized id="shotPageTimeExpirationMessage" timediff={expirationTimeDiff}>
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
    const shot = this.props.shot;
    const shotId = this.props.shot.id;

    const clips = [];
    const clipNames = shot.clipNames();
    if (clipNames.length && !this.state.hidden) {
      const clipId = clipNames[0];
      const clip = shot.getClip(clipId);

      clips.push(<Clip
        staticLink={this.props.staticLink}
        key={ clipId }
        clip={ clip }
        shotId={ shotId } />);
    }

    const errorMessages = [
      <Localized id="shotPageAlertErrorUpdatingExpirationTime" key="error-1"><div id="shotPageAlertErrorUpdatingExpirationTime" className="clips-warning" hidden></div></Localized>,
      <Localized id="shotPageAlertErrorDeletingShot" key="error-2"><div id="shotPageAlertErrorDeletingShot" className="clips-warning" hidden></div></Localized>,
      <Localized id="shotPageAlertErrorUpdatingTitle" key="error-3"><div id="shotPageAlertErrorUpdatingTitle" className="clips-warning" hidden></div></Localized>,
      <Localized id="shotPageConfirmDelete" key="error-4"><div id="shotPageConfirmDelete" hidden></div></Localized>,
    ];

    let favoriteShotButton = null;
    let trashOrFlagButton = null;
    let editButton = null;
    let downloadButton = null;
    let copyButton = null;

    if (this.props.isOwner) {
      const highlight = this.state.highlightEditButton
        ? <div className="edit-highlight"
               onClick={this.onClickEdit.bind(this)}
               onMouseOver={this.onMouseOverHighlight.bind(this)}
               onMouseOut={this.onMouseOutHighlight.bind(this)}>
          </div> : null;
      const favImgSrc = this.props.expireTime ? this.props.staticLink("/static/img/icon-heart-outline.svg") :
        this.props.staticLink("/static/img/icon-heart.svg");
      const inactive = this.props.isFxaAuthenticated ? "" : "inactive";

      favoriteShotButton = <div className="favorite-shot-button">
        <Localized id="shotPagefavoriteButton" attrs={{title: true}}>
          <button className={`button transparent nav-button ${inactive}`}
                  disabled={!this.props.isFxaAuthenticated} onClick={this.onClickFavorite.bind(this)}>
            <img src={favImgSrc} />
          </button>
        </Localized></div>;

      trashOrFlagButton = <DeleteShotButton
        clickDeleteHandler={this.clickDeleteHandler.bind(this)}
        confirmDeleteHandler={this.confirmDeleteHandler.bind(this)}
        cancelDeleteHandler={this.cancelDeleteHandler.bind(this)}
        staticLink={this.props.staticLink} />;

      editButton = this.props.enableAnnotations ? <div className="edit-shot-button">
        <Localized id="shotPageEditButton" attrs={{title: true}}>
          <button className="button transparent nav-button"
                  title="Edit this image"
                  onClick={this.onClickEdit.bind(this)}
                  ref={(edit) => { this.editButton = edit; }}>
            <img src={this.props.staticLink("/static/img/icon-pen.svg")} />
          </button>
        </Localized>
        <PromoDialog promoClose={this.promoClose.bind(this)} display={this.state.promoDialog} />
        { highlight }
        </div> : null;

      downloadButton = <div className="download-shot-button">
        <Localized id="shotPageDownloadShot" attrs={{title: true}}>
          <button className={`button transparent nav-button`} onClick={this.onClickDownload.bind(this)}
                  title="Download the shot image">
            <img src={this.props.staticLink("/static/img/icon-download.svg")} />
          </button>
        </Localized></div>;

      copyButton = <div className="copy-img-button" hidden={this.state.isClient && !this.state.canCopy}>
        <Localized id="shotPageCopyButton" attrs={{title: true}}>
          <button className="button nav-button transparent copy"
                  title="Copy image to clipboard"
                  onClick={this.onClickCopy.bind(this)}>
            <img src={this.props.staticLink("/static/img/icon-copy.svg")} />
          </button>
        </Localized></div>;
    }

    let clip;
    let clipUrl = null;
    if (clipNames.length) {
      const clipId = clipNames[0];
      clip = this.props.shot.getClip(clipId);
      clipUrl = clip.image.url;
      if (!isValidClipImageUrl(clipUrl)) {
        clipUrl = "";
      }
    }

    let renderGetFirefox = this.props.userAgent && (this.props.userAgent + "").search(/firefox\/\d{1,255}/i) === -1;
    if (this.props.isMobile) {
      renderGetFirefox = false;
    }

    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div id="frame" className="inverse-color-scheme full-height column-space">
        <ShotPageHeader isOwner={this.props.isOwner} isFxaAuthenticated={this.props.isFxaAuthenticated}
          shot={this.props.shot} expireTime={this.props.expireTime} shouldGetFirefox={renderGetFirefox}
          staticLink={this.props.staticLink}>
          { favoriteShotButton }
          { editButton }
          { copyButton }
          { downloadButton }
          { trashOrFlagButton }
        </ShotPageHeader>
        <section className="clips">
          { this.props.isOwner && this.props.loginFailed ? <LoginFailedWarning /> : null }
          { errorMessages }
          { clips }
        </section>
        <ShotFooter {...this.props} />
      </div>
    </reactruntime.BodyTemplate>);
  }

  promoClose() {
    this.setState({promoDialog: false});
    // set counter to max to stop showing notification again
    localStorage.hasSeenPromoDialog = 3;
  }

  onMouseOverHighlight() {
    this.editButton.style.backgroundColor = "#ededf0";
  }

  onMouseOutHighlight() {
    this.editButton.style.backgroundColor = "transparent";
  }

  onClickEdit() {
    if (!this.state.imageEditing) {
      this.setState({imageEditing: true});
      sendEvent("start-annotations", "navbar");
    }
    // Close promo dialog if user clicked edit after seeing new edit tool promo
    if (this.props.promoDialog) {
      this.promoClose();
    }
  }

  async onClickCopy() {
    const clipId = this.props.shot.clipNames()[0];
    const clip = this.props.shot.getClip(clipId);
    try {
      const resp = await fetch(clip.image.url);

      if (!resp.ok) {
        throw new Error(resp.statusText);
      }

      const blob = await resp.blob();
      document.dispatchEvent(new CustomEvent("copy-to-clipboard", {detail: blob}));
    } catch (e) {
      document.dispatchEvent(new CustomEvent("show-notification", { detail: {
        type: "basic",
        title: this.props.copyImageErrorMessage.title,
        message: this.props.copyImageErrorMessage.message,
      }}));
    }
  }

  onClickSave(dataUrl, dimensions) {
    this.props.controller.saveEdit(this.props.shot, dataUrl, dimensions);
  }

  onCancelEdit(imageEditing) {
    this.setState({imageEditing});
  }

  clickedInstallExtension() {
    sendEvent("click-install-banner", {useBeacon: true});
  }

  clickedInstallFirefox() {
    sendEvent("click-install-firefox-shot", {useBeacon: true});
  }

  onRestore() {
    sendEvent("recover-expired");
    this.props.controller.changeShotExpiration(this.props.shot, this.props.defaultExpiration);
  }

  onClickOrigUrl(label) {
    if (this.props.isOwner) {
      sendEvent("view-original", `${label}-owner`, {useBeacon: true});
    } else {
      sendEvent("view-original", `${label}-non-owner`, {useBeacon: true});
    }
    // Note: we allow the default action to continue
  }

  onClickFavorite() {
    if (this.props.expireTime) {
      sendEvent("set-favorite", "navbar");
      const INDEFINITE = 0;
      this.props.controller.changeShotExpiration(this.props.shot, INDEFINITE);
    } else {
      sendEvent("unset-favorite", "navbar");
      this.props.controller.changeShotExpiration(this.props.shot, this.props.defaultExpiration);
    }
  }

  onClickDownload() {
    sendEvent("download", "navbar");
    location.href = this.props.downloadUrl;
  }

  onClickFeedback() {
    sendEvent("start-feedback", "footer", {useBeacon: true});
  }

}

Body.propTypes = {
  abTests: PropTypes.object,
  backend: PropTypes.string,
  blockType: PropTypes.string,
  canCopy: PropTypes.bool,
  controller: PropTypes.object,
  defaultExpiration: PropTypes.number,
  downloadUrl: PropTypes.string,
  enableAnnotations: PropTypes.bool,
  expireTime: PropTypes.number,
  highlightEditButton: PropTypes.bool,
  promoDialog: PropTypes.bool,
  id: PropTypes.string,
  isExtInstalled: PropTypes.bool,
  isMobile: PropTypes.bool,
  isOwner: PropTypes.bool,
  isFxaAuthenticated: PropTypes.bool,
  loginFailed: PropTypes.bool,
  pngToJpegCutoff: PropTypes.number,
  retentionTime: PropTypes.number,
  showSurveyLink: PropTypes.bool,
  shot: PropTypes.object,
  staticLink: PropTypes.func,
  userAgent: PropTypes.string,
  userLocales: PropTypes.array,
};

class LoginFailedWarning extends React.Component {
  render() {
    return <Localized id="errorThirdPartyCookiesEnabled">
      <div className="clips-warning">
        If you took this shot and cannot delete it, you may need to temporarily enable third party cookies from your browser’s preferences!!
      </div>
    </Localized>;
  }
}

exports.BodyFactory = React.createFactory(Body);
exports.HeadFactory = React.createFactory(Head);
