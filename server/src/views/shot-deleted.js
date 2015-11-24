const React = require("react");
const { getGitRevision } = require("../linker");
const { Shell } = require("./shell");

class Message extends React.Component {
  render() {
    return (
      <Shell title="Shot deleted" staticLink={this.props.staticLink}>
        <head></head>
        <body>
          <div style={{textAlign: "center", marginTop: "30px"}}>
            <p>The shot has been deleted.</p>

            <p><a href={ `${this.props.backend}/shots` } className="button">Continue...</a></p>
          </div>
        </body>
      </Shell>
    );
  }
}

let MessageFactory = React.createFactory(Message);

exports.render = function (req, res) {
  let serverPayload = {
    staticLink: req.staticLink.simple,
    backend: req.backend,
    gaId: req.config.gaId,
    gitRevision: getGitRevision(),
    buildTime: require("../build-time").string
  };
  let message = MessageFactory(serverPayload);
  let html = React.renderToStaticMarkup(message);
  res.send(html);
};
