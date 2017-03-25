const React = require("react");

exports.Footer = class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="responsive-wrapper row-space-end">
          <div className="footer-left">
            <a href="https://www.mozilla.org" target="_blank" className="mozilla-logo" title="Mozilla"/>
          </div>
          <div className="footer-right">
            <div className="legal-links">
              <a href="/terms" target="_blank">Terms</a>
              <a href="https://www.mozilla.org/fr/privacy/websites/" target="_blank">Privacy Notice</a>
              <a href="https://www.mozilla.org/en-US/about/legal/report-infringement/" target="_blank">Report IP Infringement</a>
              <a href="https://discourse.mozilla-community.org/c/test-pilot/page-shot" target="_blank">Give Feedback</a>
              <a href="https://github.com/mozilla-services/screenshots" target="_blank">GitHub</a>
              {this.props.authenticated ? <a href="/leave-screenshots">Remove All Data</a> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
