/* globals document, window */

const React = require("react");
const { Shell } = require("./shell");
const { getGitRevision } = require("../linker");
const { ProfileButton } = require("./profile");
const { addReactScripts } = require("../reactutils");

class Clip extends React.Component {
  onClickComment(e) {
    e.preventDefault();
    let node = React.findDOMNode(this.refs.commentHolder),
      img = React.findDOMNode(this.refs.commentBubble);

    if (node.style.display === "none") {
      node.style.display = "inline-block";
    } else {
      node.style.display = "none";
    }
    if (img.src.indexOf("/static/img/comment-bubble-open.png") !== -1) {
      img.src = "/static/img/comment-bubble.png";
    } else {
      img.src = "/static/img/comment-bubble-open.png";
    }
  }

  render() {
    let clip = this.props.clip,
      node = null,
      comments_nodes = [];

    if (clip.image === undefined) {
      node = <div className="text-clip" dangerouslySetInnerHTML={{__html: clip.text.html}} />;
    } else {
      if (this.props.previousClip === null) {
        node = <img data-step="1" data-intro="This is the clip, saved as an image." src={ clip.image.url } />;
      } else {
        node = <img src={ clip.image.url } />;
      }
    }

    let comments = clip.comments,
      closed = false;
    if (comments.length === 0) {
      comments = [{text: "No comments."}];
      closed = true;
    }

    for (let i = 0, l = comments.length; i < l; i++) {
      let c = comments[i];
      // FIXME add the username once implemented
      //           <span className="comment-user">{ c.user }</span>
      comments_nodes.push(
        <div
          key={ `comment.${i}` }
          className="comment">
          <span className="comment-text">{ c.text }</span>
        </div>
      );
    }

    return <div className="clip-container">
      <a href={'#clip=' + encodeURIComponent(clip.id)}>
        { node }
      </a>
      <p>
        <img ref="commentBubble" className="comment-bubble"
          src={ closed ? this.props.staticLink("img/comment-bubble.png") : this.props.staticLink("img/comment-bubble-open.png") }
          onClick={ this.onClickComment.bind(this) } />
        <a href={'#clip=' + encodeURIComponent(clip.id)}>
          <span className="clip-anchor-link">See in full page</span>
        </a>
      </p>
      <div ref="commentHolder"
        className="comment-holder"
        style={{ display: closed ? "none" : "inline-block" }}>
        { comments_nodes }
      </div>
    </div>;
  }
}

class TimeDiff extends React.Component {
  render() {
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
        timeDiff = `${Math.floor(seconds / (60*60*24))} days ago`;
      }
    } else {
      if (seconds > -20) {
        timeDiff = "very soon";
      } else if (seconds > -60) {
        timeDiff = "in 1 minute";
      } else if (seconds > -60*60) {
        timeDiff = `${Math.floor(seconds / -60)} minutes from now`;
      } else if (seconds > -60*60*24) {
        timeDiff = `${Math.floor(seconds / (-60*60))} hours from now`;
      } else if (seconds > -60*60*48) {
        timeDiff = "tomorrow";
      } else {
        timeDiff = `${Math.floor(seconds / (-60*60*24))} days from now`;
      }
    }
    return <span title={this.props.date.toString()}>{timeDiff}</span>;
  }
}

class Frame extends React.Component {
  closeGetPageshotBanner() {
    let node = document.getElementById("use-pageshot-to-create");
    node.style.display = "none";
  }

  clickFullPageButton(e) {
    e.preventDefault();
    let frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
    let toolbarHeight = document.getElementById("toolbar").clientHeight;
    let visibleHeight = window.innerHeight - toolbarHeight;
    let frameTop = frameOffset - (toolbarHeight * 2);
    window.scroll(0, frameTop);
  }

  render() {
    let head = this.renderHead();
    let body;
    if (Date.now() > this.props.shot.expireTime) {
      body = <body>
        <div id="container">
          <p>&nbsp;</p>
          <p>
            This shot has expired. You may visit the original page it was originally created from:
          </p>
          <p>
            <a href={this.props.shot.urlIfDeleted}>
              {this.props.shot.urlIfDeleted}
            </a>
          </p>
        </div>
      </body>;
    } else {
      body = this.renderBody();
    }
    let result = (
      <Shell title={`${this.props.productName}: ${this.props.shot.title}`} staticLink={this.props.staticLink} gaId={this.props.gaId}>
        {head}
        {body}
      </Shell>);
    return result;
  }

  renderHead() {
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
    let ogTitle = "";
    if (this.props.shot && this.props.shot.ogTitle) {
      ogTitle = <meta propery="og:title" content={this.props.shot.ogTitle} />;
    }
    return (
      <head>
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" type="application/json+oembed" href={this.props.shot.oembedUrl} title={`${this.props.shot.title} oEmbed`} />
        {ogTitle}
        {ogImage}
      </head>);
  }

  renderBody() {
    if (! this.props.shot) {
      return <body><div>Not Found</div></body>;
    }

    let shot = this.props.shot;
    let activeClipId = this.props.activeClipId;
    let shotId = this.props.shot.id;
    let shotDomain = this.props.shot.url; // FIXME: calculate

    let clips = [],
      clipNames = shot.clipNames(),
      previousClip = null,
      nextClip = null;

    for (let i=0; i < clipNames.length; i++) {
      let clipId = clipNames[i];
      let clip = shot.getClip(clipId);
      if (i + 1 < clipNames.length) {
        nextClip = shot.getClip(clipNames[i+1]);
      }
      if (i > 0) {
        previousClip = shot.getClip(clipNames[i-1]);
      }

      clips.push(<Clip staticLink={this.props.staticLink} key={ clipId } clip={ clip }  shotId={ shotId } shotDomain={ shotDomain } previousClip={ previousClip } nextClip={ nextClip } />);
    }

    let previousClipNode = null,
      nextClipNode = null,
      clipIndex = activeClipId ? clipNames.indexOf(activeClipId) : -1;

    let prevLink = null;
    if (clipIndex >= 1) {
      prevLink = '#clip=' + encodeURIComponent(clipNames[clipIndex-1]);
    } else if (clipIndex === 0) {
      prevLink = "#";
    }

    if (prevLink) {
      previousClipNode = <a href={prevLink}>
        <img className="navigate-clips" src={ this.props.staticLink("img/up-arrow.png") } />
      </a>;
    } else {
      previousClipNode = <img className="navigate-clips disabled" src={ this.props.staticLink("img/up-arrow.png") } />;
    }

    if (clipIndex < clipNames.length - 1) {
      nextClipNode = <a href={'#clip=' + encodeURIComponent(clipNames[clipIndex + 1])}>
        <img className="navigate-clips" src={ this.props.staticLink("img/down-arrow.png") } />
      </a>;
    } else {
      nextClipNode = <img className="navigate-clips disabled" src={ this.props.staticLink("img/down-arrow.png") } />;
    }

    let numberOfClips = clipNames.length;
    if (numberOfClips === 1) {
      numberOfClips = "1 clip";
    } else if (numberOfClips === 0) {
      numberOfClips = "No clips";
    } else {
      numberOfClips = numberOfClips + " clips";
    }
    if (clipIndex >= 0) {
      numberOfClips = (clipIndex + 1) + " of " + numberOfClips;
    }

    let linkTextShort = shot.urlDisplay

    let timeDiff = <TimeDiff date={shot.createdDate} />;
    let expiresDiff = <TimeDiff date={shot.expireTime} />;

    let postMessageOrigin = `${this.props.contentProtocol}://${this.props.contentOrigin}`;

    let introJsStart = null;

    if (this.props.showIntro) {
        introJsStart = <script dangerouslySetInnerHTML={{__html: "introJs().start();"}} />;
    }

    return (
      <body>
        <div id="container">
          { this.renderExtRequired() }
          <script dangerouslySetInnerHTML={{__html: `var CONTENT_HOSTING_ORIGIN = "${postMessageOrigin}";`}}></script>
          <script src={ this.props.staticLink("js/parent-helper.js") } />
          <div id="profile-widget">
            <ProfileButton
              staticLink={ this.props.staticLink }
              initialExpanded={ false }
              avatarurl={ this.props.avatarurl }
              nickname={ this.props.nickname }
              email={ this.props.email }
            />
          </div>
        <div id="toolbar">
          <div className="shot-title">{ shot.title }</div>
          <div className="shot-subtitle">
            <span>source </span><a className="subheading-link" href={ shot.url }>{ linkTextShort }</a>
            <span style={{paddingLeft: "15px"}}>saved { timeDiff } (expires { expiresDiff })</span>
          </div>
        </div>
        <div id="navigate-toolbar">
          <span className="clip-count">
            { numberOfClips }
          </span>
          { previousClipNode }
          { nextClipNode }
        </div>
        <div id="full-page-button">
          <a href="#" className="full-page-button-styles" onClick={ this.clickFullPageButton.bind(this) }>
            <span className="full-page-button-arrow">▾</span>
            <span className="full-page-button-text"> Full Page </span>
            <span className="full-page-button-arrow">▾</span>
          </a>
        </div>
        <div className="metadata">
          <h1 id="main-title">{ shot.title }</h1>
          <p><a className="subheading-link" href={ shot.url }>{ linkTextShort }</a></p>
          <p>saved {timeDiff} (expires { expiresDiff })</p>
        </div>
        { clips }
        <div id="full-page-button-scrollable">
          <a data-step="2" data-intro="Scroll down or click here to see the full copy of the page." href="#" className="full-page-button-styles" onClick={ this.clickFullPageButton.bind(this) }>
            <span className="full-page-button-arrow">▾</span>
            <span className="full-page-button-text"> Full Page </span>
            <span className="full-page-button-arrow">▾</span>
          </a>
        </div>
        <iframe width="100%" id="frame" src={ shot.contentUrl } style={ {backgroundColor: "#fff"} } />
        <div className="pageshot-footer">
          <a href="https://github.com/mozilla-services/pageshot">{this.props.productName}</a> — <a href={`https://github.com/mozilla-services/pageshot/commit/${getGitRevision()}`}>Updated {this.props.buildTime}</a>
        </div>
        <a className="feedback-footer" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + shot.viewUrl }>Send Feedback</a>
      </div>
      { introJsStart }
    </body>);
  }

  renderExtRequired() {
    if (this.props.isExtInstalled) {
      return null;
    }
    return <div id="use-pageshot-to-create">
      <a href={ this.props.backend } onClick={ this.clickedCreate.bind(this) }>To create your own shots, get the Firefox extension {this.props.productName}</a>.
      <a id="banner-close" onClick={ this.closeGetPageshotBanner }>&times;</a>
    </div>;
  }

  clickedCreate() {
    window.ga('send', 'event', 'click', 'install-banner', {useBeacon: true});
  }
}

let FrameFactory = React.createFactory(Frame);

exports.FrameFactory = FrameFactory;

exports.render = function (req, res) {
  let showIntro = !!req.query.showIntro;
  let buildTime = require("../build-time").string;
  let frame = FrameFactory({
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: true,
    gaId: req.config.gaId,
    buildTime: buildTime,
    showIntro: showIntro,
    shotDomain: req.url // FIXME: should be a property of the shot
  });
  let clientPayload = {
    gitRevision: getGitRevision(),
    backend: req.backend,
    shot: req.shot.asJson(),
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    gaId: req.config.gaId,
    shotDomain: req.url,
    urlIfDeleted: req.shot.urlIfDeleted,
    expireTime: req.shot.expireTime.getTime(),
    deleted: req.shot.deleted,
    buildTime: buildTime,
    showIntro: showIntro
  };
  let body = React.renderToString(frame);
  let json = JSON.stringify(clientPayload);
  body = addReactScripts(body, `
    var serverData = ${json};
    clientglue.setModel(serverData);
  `);
  res.send(body);
};
