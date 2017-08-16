const React = require("react");
const ReactDOMServer = require("react-dom/server");

class OEmbed extends React.Component {
  render() {
    return (
      <div>
        <h3><a href={this.props.shot.viewUrl}>{this.props.shot.title}</a></h3>
      </div>
    );
  }
}

let OEmbedFactory = React.createFactory(OEmbed);

exports.renderString = function(args) {
  let oembed = OEmbedFactory(args);
  return ReactDOMServer.renderToStaticMarkup(oembed);
};
