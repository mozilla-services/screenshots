/* globals window, document */

const React = require("react");
const { Shell } = require("./shell");

let script = `
function gotData(Handler, data) {
  data.linkify = linkify;
  routes.setGitRevision(data.gitRevision);
  React.render(React.createElement(Handler, data), document);
}

Router.run(routes.routes, Router.HistoryLocation, function (Handler, state) {
  if (cachedData) {
    var _d = cachedData;
    cachedData = null;
    gotData(Handler, _d);
    return;
  }

  var appnames = [],
    app = null;
  for (var i in state.routes) {
    if (!!state.routes[i].name) {
      appnames.push(state.routes[i].name);
      if (app === null) {
        app = state.routes[i];
      }
    }
  }
  if (!appnames.length) {
    console.error("Error: No app was routed");
    return;
  }

  console.log("Route to app", appnames[0]);

  if (appnames[0] === "shot") {
    var key = state.params.shotId + "/" + state.params.shotDomain,
      xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        gotData(Handler, {backend: location.origin, id: key, shot: data});
      } else {
        console.error("Error: Bad response: ", xhr.status, xhr.responseText);
      }
    };

    xhr.open("GET", "/data/" + key);
    xhr.send();
  }
});
`;


let IS_BROWSER = true;

try {
  window;
} catch (e) {
  IS_BROWSER = false;
}

class Snippet extends React.Component {
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
      node = <p className="text-snippet">
        <span dangerouslySetInnerHTML={{__html: clip.text.html}} />
      </p>;
    } else {
      node = <img src={ clip.image.url } />;
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

    return <div className="snippet-container">
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

function sendShowElement(frame, showElement, location) {
  function post() {
    frame.contentWindow.postMessage({
      show: showElement,
      location: location
    });
  }
  if (frame.contentDocument.readyState == "complete") {
    post();
  } else {
    frame.contentWindow.onload = post;
  }
}

// FIXME: I can't convert this to an es6 class because I get an exception related
// to the way this class uses contextTypes, even though I am doing what
// google searches appear to indicate is the right thing:
// export class Frame extends React.Component {
//   ...
// }
// Frame.contextTypes = {
//    router: React.PropTypes.func
// }

const Frame = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  closeGetPageshotBanner: function () {
    let node = document.getElementById("use-pageshot-to-create");
    node.style.display = "none";
  },

  render: function () {
    let head = this.renderHead();
    let body = this.renderBody();
    let result = (
      <Shell title={`PageShot: ${this.props.shot.title}`} staticLink={this.props.staticLink}>
        {head}
        {body}
      </Shell>);
    return result;
  },
  renderHead: function () {
    let ogImage = [];
    if (this.props.shot) {
      for (let clipId in this.props.shot.clips) {
        let clip = this.props.shot.clips[clipId];
        if (clip.image) {
          let clipUrl = this.props.backend + "/clip/" + this.props.shot.id + "/" + clipId;
          ogImage.push(<meta property="og:image" content={clipUrl} />);
          if (clip.image.dimensions) {
            ogImage.push(<meta property="og:image:width" content={clip.image.dimensions.x} />);
            ogImage.push(<meta property="og:image:height" content={clip.image.dimensions.y} />);
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
        {ogTitle}
        {ogImage}
      </head>);
  },
  renderBody: function () {
    if (! this.props.shot) {
      return <body><div>Not Found</div></body>;
    }

    let shot = this.props.shot;
    let query = this.props.query;
    let shotId = this.props.shot.id;
    let shotDomain = this.props.shot.url; // FIXME: calculate

    let favicon = "";
    if (shot.favicon) {
      favicon = <link rel="shortcut icon" href={shot.favicon} />;
    }

    let snippets = [],
      clipNames = shot.clipNames(),
      previousClip = null,
      nextClip = null;

    for (let i=0; i<clipNames.length; i++) {
      let clipId = clipNames[i];
      let clip = shot.getClip(clipId);
      let nextClip = null;
      if (i + 1 < clipNames.length) {
        nextClip = shot.getClip(clipNames[i+1]);
      }
      let previousClip = null;
      if (i > 0) {
        previousClip = shot.getClip(clipNames[i-1]);
      }

      snippets.push(<Snippet staticLink={this.props.staticLink} key={ clipId } clip={ clip }  shotId={ shotId } shotDomain={ shotDomain } previousClip={ previousClip } nextClip={ nextClip } />);

      if (query.clip === clipId) {
        if (typeof window !== "undefined") {
          let frame = document.getElementById("frame"),
            showElement = null,
            location = null;

          if (clip.image !== undefined) {
            showElement = clip.image.location.topLeftElement.slice(1);
            location = clip.image.location;
          } else {
            showElement = clip.text.location.selectionStart;
            location = clip.text.location;
          }

          if (showElement) {
            sendShowElement(frame, showElement, location);
          }
        }
      }
    }

    let previousClipNode = "",
      nextClipNode = "";

    if (previousClip) {
      previousClipNode = <a href={'#clip=' + encodeURIComponent(previousClip.id)}>
        <img className="navigate-clips" src={ this.props.staticLink("img/up-arrow.png") } />
      </a>;
    }

    if (nextClip || query.clip === undefined) {
      let nextId = nextClip ? nextClip.id : clipNames[0];
      nextClipNode = <a href={'#clip=' + nextId}>
        <img className="navigate-clips" src={ this.props.staticLink("img/down-arrow.png") } />
      </a>;
    }

    let numberOfClips = clipNames.length;
    if (numberOfClips === 1) {
      numberOfClips = "1 clip";
    } else if (numberOfClips === 0) {
      numberOfClips = "No clips";
    } else {
      numberOfClips = numberOfClips + " clips";
    }

    let linkTextShort = "";
    if (shot.url) {
      let txt = shot.url;
      if (txt.length > 50) {
        txt = txt.slice(0, 50) + '...';
      }
      linkTextShort = txt;
    }

    if (IS_BROWSER) {
      let timer = setTimeout(function () {
        timer = null;
        let node = document.getElementById("use-pageshot-to-create");
        node.style.display = "block";
      }, 2000);
      document.addEventListener("helper-ready", function() {
        if (timer === null) {
          console.error("helper-ready took more than 2 seconds to fire!");
        } else {
          clearTimeout(timer);
        }
      });
    }

    return (
      <body>
        <div id="container">
          <div id="use-pageshot-to-create" style={{ display: "none" }}>
            To create your own shots, get the Firefox extension <a href={ this.props.backend }>PageShot</a>.
            <a id="banner-close" onClick={ this.closeGetPageshotBanner }>X</a>
          </div>
          <script src={ this.props.staticLink("js/parent-helper.js") } />
        { favicon }
        <div id="toolbar">
          <a className="main-link" href={ shot.url }>
            { shot.title }
            &nbsp;&mdash;&nbsp;
            { linkTextShort }
            <img src={ this.props.staticLink("img/clipboard-8-xl.png") } />
          </a>
          <div className="navigate-toolbar">
            <span className="clip-count">
              { numberOfClips }
            </span>
            { previousClipNode }
            { nextClipNode }
          </div>
        </div>
        <div className="metadata">
          <h1 id="main-title">{ shot.title }</h1>
          <p><a href={ shot.url }>{ linkTextShort }</a></p>
        </div>
        { snippets }
        <iframe width="100%" id="frame" src={ "/content/" +  shot.id } />
        <a className="pageshot-footer" href="https://github.com/mozilla-services/pageshot">PageShot</a>
        <a className="feedback-footer" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + shot.viewUrl }>Send Feedback</a>
      </div>
    </body>);
  }
});

let FrameFactory = React.createFactory(Frame);

exports.render = function (req, res) {
  let frame = FrameFactory({
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    id: req.shot.id,
    shotDomain: req.url, // FIXME: should be a property of the shot
    query: req.query,
    params: req.params
  });
  let body = React.renderToString(frame);
  body = '<!DOCTYPE html>\n' + body;
  res.send(body);
};
