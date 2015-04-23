let React = require("react"),
  {AbstractShot} = require("../../../addon/dist/lib/shot.js");

let Snippet = React.createClass({
  onClickFullPage: function (e) {
    e.preventDefault();
    alert("FIXME: Navigate not implemented yet");
  },

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
    return <div class="snippet-container">
      <a href="#" onClick={ this.onClickFullPage }>
        <img src={ clip.image.url } />
        <p>
          <a href="#" onClick={ this.onClickComment }>
            <img src={ this.props.linkify("/img/comment.png") } />
          </a>
          &nbsp;
          See in full page
        </p>
      </a>
    </div>;
  }
});

exports.Frame = React.createClass({
  onClickNavigateNext: function (e) {
    e.preventDefault();
    alert("FIXME: Not implemented yet");
  },
  onClickNavigatePrevious: function (e) {
    e.preventDefault();
    alert("FIXME: Not implemented yet");
  },
  render: function () {
    if (this.props.data === null) {
      return <div>Not Found</div>;
    }

    let shot = new AbstractShot(this.props.backend, this.props.id, this.props.shot);

    let favicon = "";
    if (shot.favicon) {
      favicon = <link rel="shortcut icon" href={shot.favicon} />;
    }

    let snippets = [];

    for (let name of shot.clipNames()) {
      snippets.push(<Snippet key={ name } clip={ shot.getClip(name) } linkify={ this.props.linkify } />);
    }

    let numberOfClips = shot.clipNames().length;
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
          <img className="navigate-clips" src={ this.props.linkify("/img/up-arrow.png") } onClick={ this.onClickNavigatePrevious } />
          <img className="navigate-clips" src={ this.props.linkify("/img/down-arrow.png") } onClick={ this.onClickNavigateNext } />
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

