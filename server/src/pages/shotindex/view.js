/* globals controller */
const sendEvent = require("../../browser-send-event.js");
const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
const React = require("react");
const PropTypes = require("prop-types");
const { ShareButton } = require("../../share-buttons");
const Masonry = require("react-masonry-component");
const { Localized } = require("fluent-react/compat");
const { isValidClipImageUrl } = require("../../../shared/shot");
const { getThumbnailDimensions } = require("../../../shared/thumbnailGenerator");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
      { this.props.deviceId ? null : <script src={ this.props.staticLink("/static/js/wantsauth.js") } /> }
        <script src={ this.props.staticLink("/static/js/shotindex-bundle.js") } async></script>
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/shot-index.css") } />
      </reactruntime.HeadTemplate>
    );
  }

}

Head.propTypes = {
  deviceId: PropTypes.string,
  staticLink: PropTypes.func
};

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultSearch: props.defaultSearch};
  }

  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height default-color-scheme" id="shot-index-page">
          <div id="shot-index-header" className="header">
            <h1><a href="/shots">Firefox <strong>Screenshots</strong> <sup>Beta</sup></a></h1>
            {this.props.enableUserSettings ? this.renderSettingsPage() : null}
            {this.props.disableSearch ? null : this.renderSearchForm()}
          </div>
          <div id="shot-index" className="flex-1">
            { this.renderShots() }
          </div>
          { this.renderPageNavigation() }
          { this.renderErrorMessages() }
          <Footer forUrl="shots" {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderShots() {
    if (this.props.shots === null) {
      return this.renderShotsLoading();
    }
    const children = [];
    if (this.props.shots && this.props.shots.length) {
      for (const shot of this.props.shots) {
        children.push(<Card shot={shot} downloadUrl={this.props.downloadUrls[shot.id]} abTests={this.props.abTests} clipUrl={shot.urlDisplay} isOwner={this.props.isOwner} staticLink={this.props.staticLink} isExtInstalled={this.props.isExtInstalled} key={shot.id} />);
      }
    }

    if (children.length === 0) {
      if (!this.props.hasDeviceId) {
        children.push(this.renderNoDeviceId());
      } else if (this.props.defaultSearch) {
        children.push(this.renderNoSearchResults());
      } else {
        children.push(this.renderNoShots());
      }
    } else {
      return (
        <div className="masonry-wrapper">
          <Masonry>
            {children}
          </Masonry>
        </div>
      )
    }
    return children;
  }

  renderShotsLoading() {
    return <div className="column-center flex-1">
      <div className="loader">
        <div className="loader-inner" />
      </div>
    </div>;
  }

  renderPageNavigation() {
    if (!this.props.totalShots || parseInt(this.props.totalShots, 10) === 0) {
      return null;
    }

    const totalPages = Math.ceil(this.props.totalShots / this.props.shotsPerPage) || 1;
    const hasPrev = this.props.pageNumber > 1;
    const prevPageNumber = this.props.pageNumber - 1;
    const prevClasses = ["shots-page-nav"].concat(!hasPrev && "disabled").join(" ");
    const hasNext = this.props.pageNumber < totalPages;
    const nextPageNumber = this.props.pageNumber - 0 + 1;
    const nextClasses = ["shots-page-nav"].concat(!hasNext && "disabled").join(" ");
    const hidden = totalPages < 2;

    return (
      <div id="shot-index-page-navigation" hidden={hidden} >
        <span className={prevClasses}>
          <Localized id="shotIndexPagePreviousPage">
            {
              hasPrev
              ? <a href={ controller.getNewUrl({p: prevPageNumber})}
                onClick={ this.onChangePage.bind(this, prevPageNumber) }
                title="previous page"
                ><img src={ this.props.staticLink("/static/img/arrowhead-left-16.svg") } /></a>
              : <img src={ this.props.staticLink("/static/img/arrowhead-left-16.svg") } />
            }
          </Localized>
        </span>
        <span id="shots-page-number">{this.props.pageNumber} / {totalPages}</span>
        <span className={nextClasses}>
          <Localized id="shotIndexPageNextPage">
            {
              hasNext
              ? <a href={ controller.getNewUrl({p: nextPageNumber}) }
                onClick={ this.onChangePage.bind(this, nextPageNumber) }
                title="next page"
                ><img src={ this.props.staticLink("/static/img/arrowhead-right-16.svg") } /></a>
              : <img src={ this.props.staticLink("/static/img/arrowhead-right-16.svg") } />
            }
          </Localized>
        </span>
      </div>
    );
  }

  onChangePage(pageNumber, e) {
    controller.onChangePage(pageNumber);
    e.preventDefault();
    window.scrollTo(0, 0);
  }

  renderErrorMessages() {
    return (
      <div>
        <Localized id="shotIndexPageErrorDeletingShot">
          <div id="shotIndexPageErrorDeletingShot" hidden></div>
        </Localized>
        <Localized id="shotIndexPageConfirmShotDelete">
          <div id="shotIndexPageConfirmShotDelete" hidden></div>
        </Localized>
      </div>
    );
  }

  renderNoShots() {
    return (
      <div className="no-shots" key="no-shots-found">
        <Localized id="gNoShots">
          <img src={ this.props.staticLink("/static/img/image-noshots_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
        </Localized>
        <Localized id="shotIndexPageNoShotsMessage">
          <p>No saved shots.</p>
        </Localized>
        <Localized id="shotIndexPageNoShotsInvitation">
          <p>Go on, create some.</p>
        </Localized>
      </div>
    );
  }

  renderNoDeviceId() {
    return (
      <div className="no-shots" key="no-shots-found">
        <Localized id="gNoShots">
          <img src={ this.props.staticLink("/static/img/image-search_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
        </Localized>
        <Localized id="shotIndexPageLookingForShots">
          <p>Looking for your shots...</p>
        </Localized>
      </div>
    );
  }

  renderNoSearchResults() {
    return (
      <div className="no-shots" key="no-shots-found">
        <Localized id="gNoShots">
          <img src={ this.props.staticLink("/static/img/image-search_screenshots.svg") } alt="no Shots found" width="432" height="432"/>
        </Localized>
        <Localized id="shotIndexPageNoSearchResultsIntro">
          <p>Hmmm!</p>
        </Localized>
        <Localized id="shotIndexPageNoSearchResults">
          <p>We can’t find any shots that match your search.</p>
        </Localized>
      </div>
    );
  }

  renderSettingsPage() {
    return (
      <a className="button preferences" href="/settings" aria-label="Settings" title="Open user settings"></a>
    );
  }

  renderSearchForm() {
    return (
      <form onSubmit={ this.onSubmitForm.bind(this) }>
        <span className="search-label" />
        <Localized id="shotIndexPageSearchPlaceholder">
          <input type="search" id="search" ref={searchInput => this.searchInput = searchInput} maxLength="100" placeholder="search my shots" defaultValue={this.state.defaultSearch} onChange={this.onChangeSearch.bind(this)} />
        </Localized>
        <Localized id="shotIndexPageClearSearchButton">
          <div className="clear-search" title="clear search" onClick={this.onClearSearch.bind(this)}></div>
        </Localized>
      </form>
    );
  }

  onSubmitForm(e) {
    e.preventDefault();
    const val = this.searchInput.value;
    if (val) {
      sendEvent("search", "submit");
    } else {
      sendEvent("clear-search", "submit");
    }
    controller.onChangeSearch(val);
  }

  onChangeSearch() {
    const val = this.searchInput.value;
    this.setState({defaultSearch: val});
    if (!val) {
      sendEvent("clear-search", "keyboard");
      controller.onChangeSearch(val);
      return;
    }
    if (this._keyupTimeout) {
      clearTimeout(this._keyupTimeout);
      this._keyupTimeout = undefined;
    }
    if (val.length > 3) {
      this._keyupTimeout = setTimeout(() => {
        sendEvent("search", "timed");
        controller.onChangeSearch(val);
      }, 1000);
    }
  }

  onClearSearch(e) {
    const val = "";
    this.searchInput.value = val;
    this.setState({defaultSearch: val});
    controller.onChangeSearch(val);
    sendEvent("clear-search", "button");
    return null;
  }

  componentDidUpdate() {
    if ((this.props.defaultSearch || "") !== (this.state.defaultSearch || "")) {
      document.body.classList.add("search-results-loading");
    } else {
      document.body.classList.remove("search-results-loading");
    }
  }

}

Body.propTypes = {
  abTests: PropTypes.object,
  defaultSearch: PropTypes.string,
  disableSearch: PropTypes.bool,
  downloadUrls: PropTypes.object,
  enableUserSettings: PropTypes.bool,
  hasDeviceId: PropTypes.bool,
  isExtInstalled: PropTypes.bool,
  isOwner: PropTypes.bool,
  pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shots: PropTypes.array,
  shotsPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  staticLink: PropTypes.func,
  totalShots: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {panelOpen: "panel-closed", deleted: false};
  }

  render() {
    const defaultImageUrl = this.props.staticLink("img/question-mark.svg");
    const shot = this.props.shot;
    const downloadUrl = this.props.downloadUrl;
    let imageUrl;
    const clip = shot.clipNames().length ? shot.getClip(shot.clipNames()[0]) : null;
    if (!clip) {
      // Some corrupted shot, we'll have to ignore it
      return null;
    }
    if (shot.thumbnail) {
      imageUrl = shot.thumbnail;
    } else if (clip && clip.image && clip.image.url) {
      imageUrl = clip.image.url;
    } else if (shot.images.length) {
      imageUrl = shot.images[0].url;
    } else {
      imageUrl = defaultImageUrl;
    }

    // fallback to the question mark if the imageUrl is invalid
    if (!isValidClipImageUrl(imageUrl)) {
      imageUrl = this.props.staticLink("img/question-mark.svg");
    }

    let favicon = null;
    if (shot.favicon) {
      // We use background-image so if the image is broken it just doesn't show:
      favicon = <div style={{backgroundImage: `url("${shot.favicon}")`}} className="favicon" />;
    }

    let neverExpireIndicator = null;
    if (!shot.expireTime) {
      neverExpireIndicator = <Localized id="shotIndexNoExpirationSymbol"><div className="never-expires" title=""></div></Localized>
    }

    return (
      <div className={`shot ${this.getClipType(shot.thumbnail, clip._image.dimensions)} ${this.state.panelOpen} ${this.isDeleted()}`} key={shot.id}>
        <a href={shot.viewUrl} onClick={this.onOpen.bind(this, shot.viewUrl)}>
          <div className="shot-image-container">
            <img src={imageUrl} />
          </div>
          <div className="shot-info">
          <div className="title-container">
            <h4>{this.displayTitle(shot.title)}</h4>
          </div>
          <div className="link-container">
            {favicon}
            <div className="shot-url">
              {shot.urlDisplay}
            </div>
          </div>
          </div>
        </a>
        <div className="alt-actions-container">
          <Localized id="shotPageDownloadShot">
            <a className="button transparent download" href={ downloadUrl } onClick={ this.onClickDownload.bind(this) }
              title="Download the shot image" ref={downloadButton => this.downloadButton = downloadButton} />
          </Localized>
          <ShareButton setPanelState={this.setPanelState.bind(this)} abTests={this.props.abTests} clipUrl={imageUrl} shot={shot} isOwner={this.props.isOwner} staticLink={this.props.staticLink} isExtInstalled={this.props.isExtInstalled} />
          <Localized id="shotPageDeleteButton">
            <button className="button transparent trash" title="Delete this shot permanently" onClick={ this.onClickDelete.bind(this, shot) } ref={trashButton => this.trashButton = trashButton} />
          </Localized>
        </div>
        {neverExpireIndicator}
      </div>
    );
  }

  getClipType(thumbnailUrl, dimensions) {
    // "portrait": 210 x 280, image scaled on X
    // "landscape": 210 x 140, image scaled on Y
    // "square": 210 x 210, image scaled on X or Y

    const containerWidth = 210;
    const landscapeHeight = 140;
    const portraitHeight = 280;
    const landscapeAspectRatio = containerWidth / landscapeHeight;
    const portraitAspectRatio = containerWidth / portraitHeight;
    let thumbnailWidth, thumbnailHeight;

    if (!thumbnailUrl) {
      thumbnailWidth = dimensions.x;
      thumbnailHeight = dimensions.y;
    } else {
      const thumbnailDimensions = getThumbnailDimensions(dimensions.x, dimensions.y);
      thumbnailWidth = thumbnailDimensions.width;
      thumbnailHeight = thumbnailDimensions.height;
    }

    const thumbnailAspectRatio = thumbnailWidth / thumbnailHeight;

    if (thumbnailAspectRatio <= portraitAspectRatio) {
      return "portrait";
    }
    if (thumbnailAspectRatio >= landscapeAspectRatio) {
      return "landscape";
    }
    if (thumbnailHeight > thumbnailWidth) {
      return "square-x";
    }
    return "square-y";
  }

  setPanelState(state) {
    this.setState({panelOpen: state});
  }

  isDeleted() {
    return this.state.deleted ? "deleted" : "";
  }

  onOpen(url, event) {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      // Don't override what might be an open-in-another-tab click
      sendEvent("goto-shot", "myshots-tile-new-tab", {useBeacon: true});
      return;
    }

    sendEvent("goto-shot", "myshots-tile", {useBeacon: true});
    location.href = url;
  }

  displayTitle(title) {
    // FIXME: this won't work for rtl languages. use CSS ellipsis instead? (#3116)
    if (title.length > 140) {
      return (title.substring(0, 140) + "...");
    }
    return title;
  }

  onClickDelete(shot, event) {
    event.stopPropagation();
    event.preventDefault();
    sendEvent("start-delete", "my-shots", {useBeacon: true});
    const confirmMessage = document.getElementById("shotIndexPageConfirmShotDelete").textContent;
    if (window.confirm(confirmMessage)) {
      sendEvent("delete", "my-shots-popup-confirm", {useBeacon: true});
      this.setState({deleted: true});
      controller.deleteShot(shot);
    } else {
      sendEvent("cancel-delete", "my-shots-popup-confirm");
    }
    this.trashButton.blur();
    return false;
  }

  onClickDownload() {
    this.downloadButton.blur();
    sendEvent("download", "myshots-tile");
  }
}

Card.propTypes = {
  abTests: PropTypes.object,
  downloadUrl: PropTypes.string,
  isExtInstalled: PropTypes.bool,
  isOwner: PropTypes.bool,
  shot: PropTypes.object,
  staticLink: PropTypes.func
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
