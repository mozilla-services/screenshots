const React = require("react");

exports.Footer = class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="responsive-wrapper row-space">
          <div className="legal-links">
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy Notice</a>
          <a href="https://www.mozilla.org/en-US/about/legal/report-infringement/" target="_blank">Report IP Infringement</a>
          <a href={ `mailto:pageshot-feedback@mozilla.com?subject=Page%20Shot%20Feedback&body=Feedback%20regarding:%20${this.props.forUrl}` } target="_blank">Send Feedback</a>
          <a href="https://github.com/mozilla-services/pageshot" target="_blank">GitHub</a>
          <a href="/leave-page-shot">Leave Page Shot</a>
          </div>
        </div>
      </div>
    );
  }
};
