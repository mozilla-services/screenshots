const React = require("react");
const { Shell } = require("./shell");
const { addReactScripts } = require("../reactutils");
const { getGitRevision } = require("../linker");

class ShotIndex extends React.Component {
  render() {
    let head = this.renderHead();
    let body = this.renderBody();
    let result = (
      <Shell title="Your Shots" staticLink={this.props.staticLink}>
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
    return (
      <div className="shot" key={shot.id}>
        <h2 className="title"><a href={shot.viewUrl}>{shot.title}</a></h2>
        <div className="shot-link-container"><a href={shot.url} className="subheading-link" target="_blank">
          { shot.urlDisplay }
        </a></div>
      </div>
    );
  }
}

let ShotIndexFactory = exports.ShotIndexFactory = React.createFactory(ShotIndex);

exports.render = function (req, res) {
  let args = {
    staticLink: req.staticLink,
    shots: req.shots
  };
  let shotsJson = [];
  for (let s of req.shots) {
    shotsJson.push({id: s.id, json: s.asRecallJson()});
  }
  let clientArgs = {
    gitRevision: getGitRevision(),
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
