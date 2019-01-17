const React = require("react");
const { Localized } = require("fluent-react/compat");
const { Footer } = require("../../footer-view.js");

exports.MyShotsFooter = class MyShotsFooter extends Footer {
  updateLinks() {
    this.links.push(<li key="removedata">
      <Localized id="footerLinkRemoveAllData"><a href="/leave-screenshots">Remove All Data</a></Localized>
    </li>);
  }
};
