const React = require("react");
const { Localized } = require("fluent-react/compat");
const { Footer } = require("../../footer-view.js");
const sendEvent = require("../../browser-send-event.js");

exports.ShotFooter = class ShotFooter extends Footer {
  updateLinks() {
    if (this.props.isOwner) {
      this.links.push(<li key="removedata">
        <Localized id="footerLinkRemoveAllData"><a href="/leave-screenshots">Remove All Data</a></Localized>
      </li>);
    } else {
      const dmcaIdx = this.links.findIndex(link => link.key === "dmca");
      if (dmcaIdx !== -1) {
        this.links.splice(dmcaIdx, 0,
          <li key="reportshot"><Localized id="footerReportShot" attrs={{title: true}}>
            <a href={`https://qsurvey.mozilla.com/s3/screenshots-flagged-shots?ref=${this.props.id}`}
              title="Report this shot for abuse, spam, or other problems"
              target="_blank" rel="noopener noreferrer"
              onClick={this.onReportShot.bind(this)}>Report Shot</a>
          </Localized></li>);
      }
    }
  }

  onReportShot() {
    sendEvent("start-flag", "navbar", {useBeacon: true});
  }
};
