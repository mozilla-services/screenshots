const React = require("react");
const ReactDOMServer = require("react-dom/server");
const PropTypes = require("prop-types");

class OEmbed extends React.Component {
  render() {
    return (
      <div>
        <h3><a href={this.props.shot.viewUrl}>{this.props.shot.title}</a></h3>
      </div>
    );
  }
}

const OEmbedFactory = React.createFactory(OEmbed);

exports.renderString = function(args) {
  const oembed = OEmbedFactory(args);
  return ReactDOMServer.renderToStaticMarkup(oembed);
};

OEmbed.propTypes = {
  shot: PropTypes.object
};
