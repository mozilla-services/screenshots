/* jshint browser: true */
/* globals ga */

const React = require("react");
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
        node = <img data-step="2" data-intro="This is the clip. Taking multiple clips is easy. After you click the camera button, click 'Add Clip'." src={ clip.image.url } />;
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
      <a href={`#clip=${encodeURIComponent(clip.id)}&source=clip-link`}>
        { node }
      </a>
      <p>
        <img ref="commentBubble" className="comment-bubble"
          src={ closed ? this.props.staticLink("img/comment-bubble.png") : this.props.staticLink("img/comment-bubble-open.png") }
          onClick={ this.onClickComment.bind(this) } />
        <a href={`#clip=${encodeURIComponent(clip.id)}&source=clip-see-full-page-link`}>
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
    let gaScript = null;
    let gaCode = null;
    let gaJs;
    if (this.props.gaId) {
      if (this.props.gaId.search(/^[a-z0-9\-]+$/i) === -1) {
        // Doesn't look like a valid code
        console.warn("Invalid Google Analytics code:", this.props.gaId);
      }
      gaJs = `
       (function () {
         window.GoogleAnalyticsObject = "ga";
         window.ga = window.ga || function () {
           (window.ga.q = window.ga.q || []).push(arguments);
         };
         window.ga.l = 1 * new Date();
         var userId = "${this.props.deviceId}";
         var gaOptions = "auto";
         if (userId) {
           gaOptions = {userId: userId};
         }
         if (location.hostname === "localhost") {
           if (typeof gaOptions === "string") {
             gaOptions = {};
           }
           gaOptions.cookieDomain = "none";
         }
         if (window.crypto) {
           var bytes = [];
           for (var i=0; i<location.pathname.length; i++) {
             bytes.push(location.pathname.charAt(i));
           }
           window.crypto.subtle.digest("sha-256", new Uint8Array(bytes)).then(function (result) {
             result = new Uint8Array(result);
             var c = [];
             for (var i=0; i<10; i++) {
               c.push(result[i].toString(16));
             }
             gaOptions.page = "/a-shot/" + c.join("");
             finish();
           });
         } else {
           gaOptions.page = "/a-shot/unknown";
           finish();
         }
         function finish() {
           ga("create", "${this.props.gaId}", gaOptions);
           ga("send", "pageview");
         }
       })();
      `;
      gaScript = <script src="//www.google-analytics.com/analytics.js" async></script>;
    } else {
      gaJs = `
      window.ga = function () {
        console.info.apply(console, ["stubbed ga("].concat(arguments).concat([")"]));
      };
      `;
    }
    let js = [
      <link rel="stylesheet" href={ this.props.staticLink("vendor/introjs/introjs.css") } key="introjs-stylesheet" />,
      <script src={ this.props.staticLink("vendor/introjs/intro.js") } key="introjs-js" />,
      <script src={ this.props.staticLink("js/server-bundle.js") } key="server-bundle-js" />,
    ];
    if (this.props.simple) {
      js = null;
    }
    gaCode = <script dangerouslySetInnerHTML={{__html: gaJs}}></script>;
    return (
      <head>
        <meta charSet="UTF-8" />
        <title>{this.props.shot.title}</title>
        {gaScript}
        {gaCode}
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
    this.state = {};
  }

  closeGetPageshotBanner() {
    let node = document.getElementById("use-pageshot-to-create");
    node.style.display = "none";
  }

  clickFullPageButton(e) {
    e.preventDefault();
    let frameOffset = document.getElementById("frame").getBoundingClientRect().top + window.scrollY;
    let toolbarHeight = document.getElementById("toolbar").clientHeight;
    let frameTop = frameOffset - (toolbarHeight * 2);
    window.scroll(0, frameTop);
    ga("send", "event", "website", "click-full-page-button", {page: location.toString()});
  }

  render() {
    let body;
    if (this.props.expireTime !== null && Date.now() > this.props.expireTime) {
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
        <p>
          <ExpireWidget expireTime={this.props.expireTime} onSaveExpire={this.onSaveExpire.bind(this)} onDeleteShot={this.onDeleteShot.bind(this)} />
        </p>
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
      prevLink = `#clip=${encodeURIComponent(clipNames[clipIndex-1])}&source=clip-prev-link`;
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
      nextClipNode = <a href={`#clip=${encodeURIComponent(clipNames[clipIndex+1])}&source=clip-next-link`}>
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

    let linkTextShort = shot.urlDisplay;

    let timeDiff = <TimeDiff date={shot.createdDate} simple={this.props.simple} />;
    let expiresDiff = <ExpireWidget
      expireTime={this.props.expireTime}
      onSaveExpire={this.onSaveExpire.bind(this)}
      onDeleteShot={this.onDeleteShot.bind(this)} />
    if (this.props.simple) {
      expiresDiff = null;
    }

    let introJsStart = null;

    if (this.props.showIntro) {
        introJsStart = <script dangerouslySetInnerHTML={{__html: `
          window.introJSRunning = true;
          introJs()
          .setOption('showStepNumbers', false)
          .setOption('highlightClass', 'intro-js-highlight-overlay')
          .onchange(function (el) {
            if (el.getAttribute('data-step') === '4') {
              setTimeout(function () {
                introJs().exit();
                window.introJSRunning = false;
                clientglue.render();
              }, 1);
              document.dispatchEvent(new CustomEvent('content-tour-complete'))
            }
          })
          .onexit(function () {
            window.introJSRunning = false;
            clientglue.render();
          }).start();`}} />;
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

    return (
        <div id="container">
          { this.renderExtRequired() }
          <div id="profile-widget">
            <ProfileButton
              staticLink={ this.props.staticLink }
              initialExpanded={ false }
              avatarurl={ this.props.avatarurl }
              nickname={ this.props.nickname }
              email={ this.props.email }
              deviceId={ this.props.deviceId }
              simple={ this.props.simple }
            />
          </div>
        <div id="toolbar" data-step="1" data-intro="This is the title of the page and a link to it's source.">
          <div className="shot-title">{ shot.title }</div>
          <div className="shot-subtitle">
            <span>source </span><a className="subheading-link" href={ shotRedirectUrl }>{ linkTextShort }</a>
            <span style={{paddingLeft: "15px"}}>saved { timeDiff } ({expiresDiff}) </span>
          </div>
        </div>
        <div id="navigate-toolbar" data-step="4" data-intro="The recall panel can be used to access your previously made shots.">
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
          <p><a className="subheading-link" href={ shotRedirectUrl }>{ linkTextShort }</a></p>
          <p>saved {timeDiff} { expiresDiff }</p>
        </div>
        { clips }
        <div id="full-page-button-scrollable">
          <a data-step="3" data-intro="Every time you take a clip, the full page is also saved." href="#" className="full-page-button-styles" onClick={ this.clickFullPageButton.bind(this) }>
            <span className="full-page-button-arrow">▾</span>
            <span className="full-page-button-text"> Full Page </span>
            <span className="full-page-button-arrow">▾</span>
          </a>
        </div>
        <iframe width="100%" height={frameHeight} id="frame" src={ shot.contentUrl } style={ {backgroundColor: "#fff"} } />
        <div className="pageshot-footer">
          <a href="https://github.com/mozilla-services/pageshot">{this.props.productName}</a> — <a href={`https://github.com/mozilla-services/pageshot/commit/${getGitRevision()}`}>Updated {this.props.buildTime}</a>
        </div>
        <a className="feedback-footer" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + shot.viewUrl }>Send Feedback</a>
        { introJsStart }
      </div>
    );
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
    window.ga('send', 'event', 'website', 'click-install-banner', {useBeacon: true});
  }

  onSaveExpire(value) {
    this.props.clientglue.changeShotExpiration(this.props.shot, value);
  }

  onDeleteShot() {
    this.props.clientglue.deleteShot(this.props.shot);
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
    } else if (this.props.expireTime === null) {
      return this.renderNoExpiration();
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
        expire in <select ref="expireTime">
          <option value="0">Never</option>
          <option value={ 1000 }>1 Second</option>
          <option value={ 10 * minute }>10 Minutes</option>
          <option value={ hour }>1 Hour</option>
          <option value={ day }>1 Day</option>
          <option value={ 7 * day }>1 Week</option>
          <option value={ 14 * day }>2 Weeks</option>
          <option value={ 31 * day }>1 Month</option>
        </select>
        <span className="link-button" onClick={this.clickSaveExpire.bind(this)}>save</span>
        <span className="link-button" onClick={this.clickCancelExpire.bind(this)}>cancel</span>
        <span className="link-button delete-button" onClick={this.clickDelete.bind(this)}>delete</span>
      </span>
    );
  }

  renderNoExpiration() {
    return (
      <span>
        does not expire <span className="link-button" onClick={this.clickChangeExpire.bind(this)}>change</span>
      </span>
    );
  }

  renderNormal() {
    let desc = "expires";
    if (this.props.expireTime < Date.now()) {
      desc = "expired";
    }
    return (
      <span>
        {desc} <TimeDiff date={this.props.expireTime} simple={this.props.simple} />
        <span className="link-button" onClick={this.clickChangeExpire.bind(this)}>change</span>
      </span>
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
    value = parseInt(value, 10);
    window.ga('send', 'event', 'website', 'click-save-expire', {useBeacon: true, eventValue: value/60000});
    this.props.onSaveExpire(value);
    this.setState({isChangingExpire: false});
  }

  clickDelete() {
    window.ga('send', 'event', 'website', 'click-delete-shot', {useBeacon: true});
    if (window.confirm("Are you sure you want to delete the shot permanently?")) {
      this.props.onDeleteShot();
    }
  }

}

let FrameFactory = React.createFactory(Frame);
let HeadFactory = React.createFactory(Head);

exports.FrameFactory = FrameFactory;

exports.render = function (req, res) {
  let showIntro = !!req.query.showIntro;
  let buildTime = require("../build-time").string;
  let serverPayload = {
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    buildTime: buildTime,
    showIntro: showIntro,
    simple: false,
    shotDomain: req.url, // FIXME: should be a property of the shot
    expireTime: req.shot.expireTime === null ? null: req.shot.expireTime.getTime()
  };
  let headString = React.renderToStaticMarkup(HeadFactory(serverPayload));
  let frame = FrameFactory(serverPayload);
  let clientPayload = {
    gitRevision: getGitRevision(),
    backend: req.backend,
    shot: req.shot.asJson(),
    contentOrigin: req.config.contentOrigin,
    contentProtocol: req.protocol,
    id: req.shot.id,
    productName: req.config.productName,
    isExtInstalled: !!req.deviceId,
    gaId: req.config.gaId,
    deviceId: req.deviceId,
    shotDomain: req.url,
    urlIfDeleted: req.shot.urlIfDeleted,
    expireTime: req.shot.expireTime === null ? null : req.shot.expireTime.getTime(),
    deleted: req.shot.deleted,
    buildTime: buildTime,
    showIntro: showIntro,
    simple: false
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
    showIntro: false,
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
