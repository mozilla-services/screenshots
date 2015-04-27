let React = require("react"),
  Router = require("react-router"),
  Link = Router.Link,
  {AbstractShot} = require("../../../addon/dist/lib/shot.js");

let Snippet = React.createClass({
  onClickComment: function (e) {
    e.preventDefault();
    alert("FIXME: Comment display not implemented yet");
  },

  render: function () {
    let clip = this.props.clip;

    if (clip.image === undefined) {
      return <p>
        FIXME: Support text clips
      </p>;
    }

    return <div className="snippet-container">
      <Link to="shot" params={{shotId: this.props.shotId, shotDomain: this.props.shotDomain}} query={{clip: clip.id}}>
        <img src={ clip.image.url } />
        <p className="clip-anchor-link">See in full page</p>
      </Link>
    </div>;
  }
});

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
        console.log("query.clip === name", i, clipNames);
        if (typeof window !== "undefined") {
          let frame = document.getElementById("frame");

          console.log("clip.image.location", clip.image.location);
          function cb() {
            frame.contentWindow.postMessage({
              show: clip.image.location.topLeftElement.slice(1),
              location: clip.image.location
            }, window.location.origin);
          }
          if (frame.contentDocument.readyState === "complete") {
            cb()
          } else {
            frame.contentWindow.onload = cb;
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

    console.log("previous, next", previousClip, nextClip);

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
          { shot.docTitle }
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
        <h1 id="main-title">{ shot.docTitle }</h1>
        <p><a href={ shot.url }>{ linkTextShort }</a></p>
      </div>
      { snippets }
      <iframe width="100%" id="frame" src={ "/content/" +  shot.id } />
    </div>;
  }
});

