const React = require("react");

exports.Footer = class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        {this.props.children}
      </div>
    );
  }
};
