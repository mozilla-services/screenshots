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
    let bgEl = null;
    let img = shot.favicon;
    if (shot.images && shot.images.length) {
      img = shot.images[0].url;
    }
    if (img) {
      bgEl = <img src={img} />;
    }
    return (
      <div className="shot" key={shot.id}>
        <div className="shot-background">{bgEl}</div>
        <a href={shot.viewUrl}><div className="title-container">
          <h2 className="title">{shot.title}</h2>
        </div></a>
        <div className="shot-footer">
          <div className="shot-date">
            <TimeDiff date={shot.createdDate} />
          </div>
          <div className="shot-link-container"><a href={shot.url} className="subheading-link" target="_blank">
            { shot.urlDisplay }
          </a></div>
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
