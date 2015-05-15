let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link,
  {AbstractShot} = require("../../../shared/dist/shot.js");

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
    console.log("img.src", img.src);
    if (img.src.indexOf("/img/comment-bubble-open.png") !== -1) {
      img.src = this.props.linkify("/img/comment-bubble.png");
    } else {
      img.src = this.props.linkify("/img/comment-bubble-open.png");
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
      <Link to="shot" params={{shotId: this.props.shotId, shotDomain: this.props.shotDomain}} query={{clip: clip.id}}>
        { node }
      </Link>
      <p>
        <img ref="commentBubble" className="comment-bubble"
          src={ this.props.linkify(closed ? "/img/comment-bubble.png" : "/img/comment-bubble-open.png") }
          onClick={ this.onClickComment.bind(this) } />
        <Link to="shot" params={{shotId: this.props.shotId, shotDomain: this.props.shotDomain}} query={{clip: clip.id}}>
          <span className="clip-anchor-link">See in full page</span>
        </Link>
      </p>
      <div ref="commentHolder"
        className="comment-holder"
        style={{ display: closed ? "none" : "inline-block" }}>
        { comments_nodes }
      </div>
    </div>;
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

exports.Frame = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function () {
    if (this.props.data === null) {
      return <div>Not Found</div>;
    }

    let shot = new AbstractShot(this.props.backend, this.props.id, this.props.shot),
      params = this.context.router.getCurrentParams(),
      query = this.context.router.getCurrentQuery(),
      shotId = params.shotId,
      shotDomain = params.shotDomain;

    let favicon = "";
    if (shot.favicon) {
      favicon = <link rel="shortcut icon" href={shot.favicon} />;
    }

    let snippets = [],
      clipNames = shot.clipNames(),
      previousClip = null,
      nextClip = null;

    for (let i = 0; i < clipNames.length; i++) {
      let name = clipNames[i],
        clip = shot.getClip(name);

      snippets.push(<Snippet key={ name } clip={ clip } linkify={ this.props.linkify } shotId={ shotId } shotDomain={ shotDomain } previousClip={ previousClip } nextClip={ nextClip } />);

      if (query.clip === name) {
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
            function cb() {
              frame.contentWindow.postMessage({
                show: showElement,
                location: location
              }, window.location.origin);
            }
            if (frame.contentDocument.readyState === "complete") {
              cb()
            } else {
              frame.contentWindow.onload = cb;
            }
          }
        }

        if (i > 0) {
          previousClip = clipNames[i - 1];
        }
        if (i < clipNames.length) {
          nextClip = clipNames[i + 1];
        }
      }
    }

    let previousClipNode = "",
      nextClipNode = "";

    if (previousClip) {
      previousClipNode = <Link to="shot" params={{shotId: shotId, shotDomain: shotDomain}} query={{clip: previousClip}}>
        <img className="navigate-clips" src={ this.props.linkify("/img/up-arrow.png") } />
      </Link>;
    }

    if (nextClip || query.clip === undefined) {
      nextClipNode = <Link to="shot" params={{shotId: shotId, shotDomain: shotDomain}} query={{clip: nextClip || clipNames[0]}}>
        <img className="navigate-clips" src={ this.props.linkify("/img/down-arrow.png") } />
      </Link>;
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

    return <div id="container">
      <script src={ this.props.linkify("/js/parent-helper.js") } />
      { favicon }
      <div id="toolbar">
        <a className="main-link" href={ shot.url }>
          { shot.title }
          &nbsp;&mdash;&nbsp;
          { linkTextShort }
          <img src={ this.props.linkify("/img/clipboard-8-xl.png") } />
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
    </div>;
  }
});
