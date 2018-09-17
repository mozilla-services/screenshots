const React = require("react");
const { Localized } = require("fluent-react/compat");
const PropTypes = require("prop-types");

exports.Footer = class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.links = [
      <li key="terms"><Localized id="footerLinkTerms">
        <a href="https://www.mozilla.org/about/legal/terms/services/" target="_blank" rel="noopener noreferrer">Terms</a>
      </Localized></li>,
      <li key="privacy"><Localized id="footerLinkPrivacy">
        <a href="https://www.mozilla.org/privacy/firefox/" target="_blank" rel="noopener noreferrer">Privacy Notice</a>
      </Localized></li>,
      <li key="faqs"><Localized id="footerLinkFaqs">
        <a href="https://support.mozilla.org/kb/firefox-screenshots" target="_blank" rel="noopener noreferrer">FAQs</a>
      </Localized></li>,
      <li key="dmca"><Localized id="footerLinkDMCA">
        <a href="https://www.mozilla.org/about/legal/report-infringement/" target="_blank" rel="noopener noreferrer">Report IP Infringement</a>
      </Localized></li>,
      <li key="discourse"><Localized id="footerLinkDiscourse">
        <a href="https://discourse.mozilla-community.org/c/test-pilot/page-shot" target="_blank" rel="noopener noreferrer">Give Feedback</a>
      </Localized></li>,
      <li key="github"><a href="https://github.com/mozilla-services/screenshots" target="_blank" rel="noopener noreferrer">GitHub</a></li>,
    ];
    this.updateLinks && this.updateLinks();
  }

  render() {
    return (
      <footer className="footer">
        <a href="https://www.mozilla.org" target="_blank" rel="noopener noreferrer" className="mozilla-logo" title="Mozilla"/>
        <ul className="footer-links">
          {this.links}
        </ul>
      </footer>
    );
  }
};

exports.Footer.propTypes = {
  id: PropTypes.string,
  isOwner: PropTypes.bool,
};
