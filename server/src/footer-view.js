const React = require("react");
const { Localized } = require("fluent-react/compat");
const PropTypes = require("prop-types");
const sendEvent = require("./browser-send-event.js");

exports.Footer = class Footer extends React.Component {
  onReportShot() {
    sendEvent("start-flag", "navbar", {useBeacon: true});
  }

  render() {
    return (
      <footer className="footer">
        <a href="https://www.mozilla.org" target="_blank" rel="noopener noreferrer" className="mozilla-logo" title="Mozilla"/>
        <ul className="footer-links">
          <li><Localized id="footerLinkTerms">
            <a href="https://www.mozilla.org/about/legal/terms/services/" target="_blank" rel="noopener noreferrer">Terms</a>
          </Localized></li>
          <li><Localized id="footerLinkPrivacy">
            <a href="https://www.mozilla.org/privacy/firefox/" target="_blank" rel="noopener noreferrer">Privacy Notice</a>
          </Localized></li>
          <li><Localized id="footerLinkFaqs">
            <a href="https://support.mozilla.org/kb/firefox-screenshots" target="_blank" rel="noopener noreferrer">FAQs</a>
          </Localized></li>
          {
            this.props.isOwner ? null
            : <li><Localized id="footerReportShot">
                <a href={`https://qsurvey.mozilla.com/s3/screenshots-flagged-shots?ref=${this.props.id}`}
                  title="Report this shot for abuse, spam, or other problems"
                  target="_blank" rel="noopener noreferrer"
                  onClick={this.onReportShot.bind(this)}>Report Shot</a>
              </Localized></li>
          }
          <li><Localized id="footerLinkDMCA">
            <a href="https://www.mozilla.org/about/legal/report-infringement/" target="_blank" rel="noopener noreferrer">Report IP Infringement</a>
          </Localized></li>
          <li><Localized id="footerLinkDiscourse">
            <a href="https://discourse.mozilla-community.org/c/test-pilot/page-shot" target="_blank" rel="noopener noreferrer">Give Feedback</a>
          </Localized></li>
          <li><a href="https://github.com/mozilla-services/screenshots" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          {this.props.isOwner ? <li><Localized id="footerLinkRemoveAllData"><a href="/leave-screenshots">Remove All Data</a></Localized></li> : null}
        </ul>
      </footer>
    );
  }
};

exports.Footer.propTypes = {
  id: PropTypes.string,
  isOwner: PropTypes.bool,
};
