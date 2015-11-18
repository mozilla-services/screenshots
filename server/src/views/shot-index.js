const React = require("react");
const { Shell } = require("./shell");
const { addReactScripts } = require("../reactutils");
const { getGitRevision } = require("../linker");
const { TimeDiff } = require("./frame");

class ShotIndex extends React.Component {
  render() {
    let head = this.renderHead();
    let body = this.renderBody();
    let result = (
      <Shell title="Your Shots" staticLink={this.props.staticLink} gaId={this.props.gaId}>
        {head}
        {body}
      </Shell>);
    return result;
  }

  renderHead() {
    return <head></head>;
  }

  renderBody() {
    let children = [];
    for (let shot of this.props.shots) {
      children.push(this.renderShot(shot));
    }
    if (children.length === 0) {
      children = "You don't have any shots. Go create some.";
    }
    return (
      <body>
        <h1>Your Shots</h1>
        <div id="shot-index">
          {children}
        </div>
      </body>
    );
  }

  renderShot(shot) {
    let bgStyle = null;
    let img = null;
    if (shot.images && shot.images.length) {
      img = shot.images[0].url;
    } else {
      let clip = shot.getClip(shot.clipNames()[0]);
      if (clip && clip.image && clip.image.url) {
        img = clip.image.url;
      }
    }
    if (img) {
      bgStyle = {backgroundImage: `url("${img}")`};
    }
    let favicon = null;
    if (shot.favicon) {
      // We use background-image so if the image is broken it just doesn't show:
      favicon = <div style={{backgroundImage: `url("${shot.favicon}")`}} className="favicon" />;
    }

    return (
      <div className="shot" key={shot.id}>
        <div className="shot-background" style={bgStyle}></div>
        <div className="shot-text">
          <a href={ shot.viewUrl }><div className="title-container">
            <h2 className="title">{shot.title}</h2>
          </div></a>
          <div className="shot-footer">
            <div className="shot-date">
              <TimeDiff date={shot.createdDate} simple={this.props.simple} />
            </div>
            <div className="shot-link-container">
              {favicon}
              <a href={`/redirect?from=shot-index-original-link&to=${encodeURIComponent(shot.url)}`} className="subheading-link" target="_blank">
              { shot.urlDisplay }
            </a></div>
          </div>
        </div>
      </div>
    );
  }
}

let ShotIndexFactory = exports.ShotIndexFactory = React.createFactory(ShotIndex);

exports.render = function (req, res) {
  let args = {
    staticLink: req.staticLink,
    gaId: req.config.gaId,
    shots: req.shots
  };
  let shotsJson = [];
  for (let s of req.shots) {
    shotsJson.push({id: s.id, json: s.asRecallJson()});
  }
  let clientArgs = {
    gitRevision: getGitRevision(),
    gaId: req.config.gaId,
    shots: shotsJson,
    backend: req.backend
  };
  let body = React.renderToString(ShotIndexFactory(args));
  let json = JSON.stringify(clientArgs);
  body = addReactScripts(body, `
    var serverData = ${json};
    shotindexglue.setModel(serverData);
  `);
  res.send(body);
};

exports.renderSimple = function (req, res) {
  let body = ShotIndexFactory({
    staticLink: req.staticLink.simple,
    gaId: null,
    shots: req.shots,
    simple: true
  });
  body = React.renderToStaticMarkup(body);
  body = '<!DOCTYPE HTML>\n' + body;
  res.send(body);
};
