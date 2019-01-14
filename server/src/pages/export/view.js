/* globals controller */
const reactruntime = require("../../reactruntime");
const { MyShotsFooter } = require("./footer");
const React = require("react");
const PropTypes = require("prop-types");
const Masonry = require("react-masonry-component");
const { Localized } = require("fluent-react/compat");
const { isValidClipImageUrl } = require("../../../shared/shot");
const { getThumbnailDimensions } = require("../../../shared/thumbnailGenerator");
const { Header } = require("../../header.js");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate noBrowserJavascript={true} {...this.props}>
        <link rel="stylesheet" href={ this.props.staticLink("/static/css/shot-index.css") } />
      </reactruntime.HeadTemplate>
    );
  }

}

Head.propTypes = {
  staticLink: PropTypes.func,
};

function urlWithPage(page) {
  return `/export?p=${encodeURIComponent(page)}`;
}

class Body extends React.Component {

  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height" id="shot-index-page">
          <Header hasLogo={true} isOwner={true} />
          <div id="shot-index" className="flex-1">
            <Localized id="exportInstructions">
              <p id="exportInstructions">
                To export: use File &gt; Save Page As... and you will find your screenshots in Export_files/
              </p>
            </Localized>
            { this.renderShots() }
          </div>
          { this.renderPageNavigation() }
          { this.renderErrorMessages() }
          <MyShotsFooter {...this.props} />
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderShots() {
    const children = [];
    if (this.props.shots && this.props.shots.length) {
      for (const shot of this.props.shots) {
        children.push(<Card shot={shot} clipUrl={shot.urlDisplay} staticLink={this.props.staticLink} key={shot.id} />);
      }
    }

    if (children.length === 0) {
      children.push(this.renderNoShots());
    } else {
      const masonryOptions = {
        originLeft: !this.props.isRtl,
      };
      return (
        <div className="masonry-wrapper">
          <Masonry options={masonryOptions}>
            {children}
          </Masonry>
        </div>
      );
    }
    return children;
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
    let arrowheadPrev = "←";
    let arrowheadNext = "→";
    if (this.props.isRtl) {
      [arrowheadNext, arrowheadPrev] = [arrowheadPrev, arrowheadNext];
    }

    return (
      <div id="shot-index-page-navigation" hidden={hidden} >
        <span className={prevClasses}>
          <Localized id="shotIndexPagePreviousPage" attrs={{title: true}}>
            {
              hasPrev || true
              ? <a href={ urlWithPage(prevPageNumber)}
                title="previous page"
                >{ arrowheadPrev }</a>
              : arrowheadPrev
            }
          </Localized>
        </span>
        <bdo id="shots-page-number" dir="ltr">{this.props.pageNumber} / {totalPages}</bdo>
        <span className={nextClasses}>
          <Localized id="shotIndexPageNextPage" attrs={{title: true}}>
            {
              hasNext
              ? <a href={ urlWithPage(nextPageNumber) }
                title="next page"
                >{ arrowheadNext }</a>
              : arrowheadNext
            }
          </Localized>
        </span>
      </div>
    );
  }

  renderErrorMessages() {
    return (
      <div>
        <Localized id="shotIndexAlertErrorFavoriteShot">
          <div id="shotIndexAlertErrorFavoriteShot" hidden></div>
        </Localized>
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
        <Localized id="gNoShots" attrs={{alt: true}}>
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

}

Body.propTypes = {
  abTests: PropTypes.object,
  pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shots: PropTypes.array,
  shotsPerPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  staticLink: PropTypes.func,
  totalShots: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRtl: PropTypes.bool,
};

class Card extends React.Component {

  render() {
    const defaultImageUrl = this.props.staticLink("img/question-mark.svg");
    const shot = this.props.shot;
    const clip = shot.clipNames().length ? shot.getClip(shot.clipNames()[0]) : null;
    if (!clip || !clip.image || !clip.image.url) {
      // Some corrupted shot, we'll have to ignore it
      return null;
    }
    let imageUrl = clip.image.url;

    // fallback to the question mark if the imageUrl is invalid
    if (!isValidClipImageUrl(imageUrl)) {
      imageUrl = defaultImageUrl;
    }
    const filename = shot.filename.replace(/\s+/g, "_");
    const fullImgUrl = `${imageUrl}/${encodeURIComponent(filename)}`;

    return (
      <div className={`shot ${this.getClipType(clip._image.dimensions)}`}
        key={shot.id}>
        <a href={fullImgUrl}>
          <div className="shot-image-container">
            <img src={fullImgUrl} />
          </div>
          <div className="shot-info">
          <div className="title-container">
            <h4>{this.displayTitle(shot.title)}</h4>
          </div>
          <div className="link-container">
            <div className="shot-url">
              {shot.urlDisplay}
            </div>
          </div>
          </div>
        </a>
      </div>
    );
  }

  getClipType(dimensions) {
    // "portrait": 210 x 280, image scaled on X
    // "landscape": 210 x 140, image scaled on Y
    // "square": 210 x 210, image scaled on X or Y

    const containerWidth = 210;
    const landscapeHeight = 140;
    const portraitHeight = 280;
    const landscapeAspectRatio = containerWidth / landscapeHeight;
    const portraitAspectRatio = containerWidth / portraitHeight;

    const thumbnailDimensions = getThumbnailDimensions(dimensions.x, dimensions.y);
    const thumbnailWidth = thumbnailDimensions.width;
    const thumbnailHeight = thumbnailDimensions.height;

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

  displayTitle(title) {
    // FIXME: this won't work for rtl languages. use CSS ellipsis instead? (#3116)
    if (title.length > 140) {
      return (title.substring(0, 140) + "...");
    }
    return title;
  }

}

Card.propTypes = {
  abTests: PropTypes.object,
  hasFxa: PropTypes.bool,
  isExtInstalled: PropTypes.bool,
  isOwner: PropTypes.bool,
  shot: PropTypes.object,
  staticLink: PropTypes.func,
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
