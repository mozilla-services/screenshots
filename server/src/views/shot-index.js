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
      <Shell title="Your Shots" staticLink={this.props.staticLink} gaId={this.props.gaId} bodyClass="shot-index">
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
        <h1 style={{color: "#444", paddingLeft: "40px"}}><img src={this.props.staticLink("img/pageshot-index.svg")} /> PageShot</h1>
        <div id="shot-index">
          {children}
        </div>
      </body>
    );
  }

  renderShot(shot) {
    let imageUrl;
    let clip = shot.clipNames().length ? shot.getClip(shot.clipNames()[0]) : null;
    if (clip && clip.image && clip.image.url) {
      imageUrl = clip.image.url;
    } else if (shot.images.length) {
      imageUrl = shot.images[0].url;
    } else {
      imageUrl = this.props.staticLink("img/question-mark.svg");
    }
    let favicon = null;
    if (shot.favicon) {
      // We use background-image so if the image is broken it just doesn't show:
      favicon = <div style={{backgroundImage: `url("${shot.favicon}")`}} className="favicon" />;
    }

    return (
      <div className="shot" key={shot.id}>
        <div style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "260px",
          height: "260px",
          margin: "10px",
          borderBottom: "1px solid #666"
        }}></div>
        <div style={{
          height: "50px",
          padding: "10px"
        }}>
          <h2><a style={{color: "#000", textDecoration: "none"}} href={shot.viewUrl}>{shot.title}</a></h2>
        </div>
        <div style={{padding: "0px 10px"}}>
          <a href={shot.url} style={{color: "#666"}}>
            {favicon}
            {shot.urlDisplay}
          </a>
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
