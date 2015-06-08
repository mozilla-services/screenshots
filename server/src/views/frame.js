/* globals window, document, location */

const React = require("react");
const { Shell } = require("./shell");
const { getGitRevision } = require("../linker");

let IS_BROWSER = typeof window !== "undefined";

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

class Frame extends React.Component {
  closeGetPageshotBanner() {
    let node = document.getElementById("use-pageshot-to-create");
    node.style.display = "none";
  }

  render() {
    let head = this.renderHead();
    let body = this.renderBody();
    let result = (
      <Shell title={`PageShot: ${this.props.shot.title}`} staticLink={this.props.staticLink}>
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

    let favicon = "";
    if (shot.favicon) {
      favicon = <link rel="shortcut icon" href={shot.favicon} />;
    }

    let snippets = [],
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

      snippets.push(<Snippet staticLink={this.props.staticLink} key={ clipId } clip={ clip }  shotId={ shotId } shotDomain={ shotDomain } previousClip={ previousClip } nextClip={ nextClip } />);
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
        </div>
        <div className="navigate-toolbar">
          <span className="clip-count">
            { numberOfClips }
          </span>
          { previousClipNode }
          { nextClipNode }
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
}

let FrameFactory = React.createFactory(Frame);

exports.FrameFactory = FrameFactory;

exports.render = function (req, res) {
  let frame = FrameFactory({
    staticLink: req.staticLink,
    backend: req.backend,
    shot: req.shot,
    id: req.shot.id,
    shotDomain: req.url // FIXME: should be a property of the shot
  });
  let clientPayload = {
    gitRevision: getGitRevision(),
    backend: req.backend,
    shot: req.shot.asJson(),
    id: req.shot.id,
    shotDomain: req.url
  };
  let body = React.renderToString(frame);
  let footer = "</body></html>";
  let frontmatter = body.slice(0, body.length - footer.length);
  let json = JSON.stringify(clientPayload);
  body = (`<!DOCTYPE html>
${frontmatter}
<script>
  var serverData = ${json};
  clientglue.setModel(serverData);
</script>
${footer}`
  );
  res.send(body);
};
