const React = require("react");
const { Localized } = require("fluent-react/compat");

exports.Footer = class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <a href="https://www.mozilla.org" target="_blank" rel="noopener noreferrer" className="mozilla-logo" title="Mozilla"/>
        <div className="legal-links">
          <Localized id="footerLinkTerms">
            <a href="https://www.mozilla.org/about/legal/terms/services/" target="_blank" rel="noopener noreferrer">Terms</a>
          </Localized>
          <Localized id="footerLinkPrivacy">
            <a href="https://www.mozilla.org/privacy/firefox/" target="_blank" rel="noopener noreferrer">Privacy Notice</a>
          </Localized>
          <Localized id="footerLinkFaqs">
            <a href="https://wiki.mozilla.org/Firefox/Screenshots/FAQs" target="_blank" rel="noopener noreferrer">FAQs</a>
          </Localized>
          <Localized id="footerLinkDMCA">
            <a href="https://www.mozilla.org/about/legal/report-infringement/" target="_blank" rel="noopener noreferrer">Report IP Infringement</a>
          </Localized>
          <Localized id="footerLinkDiscourse">
            <a href="https://discourse.mozilla-community.org/c/test-pilot/page-shot" target="_blank" rel="noopener noreferrer">Give Feedback</a>
          </Localized>
          <a href="https://github.com/mozilla-services/screenshots" target="_blank" rel="noopener noreferrer">GitHub</a>
          {this.props.authenticated ? <Localized id="footerLinkRemoveAllData"><a href="/leave-screenshots">Remove All Data</a></Localized> : null}
        </div>
      </div>
    );
  }
};
