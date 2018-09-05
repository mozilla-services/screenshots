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
            <a href="https://support.mozilla.org/kb/firefox-screenshots" target="_blank" rel="noopener noreferrer">FAQs</a>
          </Localized>
          {
            this.props.isOwner ? null
            : <Localized id="footerReportShot">
                <a href={`https://qsurvey.mozilla.com/s3/screenshots-flagged-shots?ref=${this.props.id}`}
                  title="Report this shot for abuse, spam, or other problems"
                  target="_blank" rel="noopener noreferrer"
                  onClick={this.onReportShot.bind(this)}>Report Shot</a>
              </Localized>
          }
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

exports.Footer.propTypes = {
  id: PropTypes.string,
  isOwner: PropTypes.bool,
  authenticated: PropTypes.bool,
};
