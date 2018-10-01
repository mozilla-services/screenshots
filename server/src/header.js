const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const { AdBanner } = require("./ad-banner");

exports.Header = function Header(props) {
  const logo = props.hasLogo ? <div className="logo">
      <Localized id="screenshotsLogo" attrs={{title: true}}>
        <a href="/" title="Screenshots home" className="screenshots-logo"></a>
      </Localized>
    </div> : null;

  return [
    <AdBanner key="banner" isOwner={props.isOwner} hasFxa={props.hasFxa} shouldGetFirefox={props.shouldGetFirefox} />,
    <header key="header" className="header-panel">
      {logo}
      {props.children}
    </header>,
  ];
};

exports.Header.propTypes = {
  hasLogo: PropTypes.bool,
  children: PropTypes.node,
  isOwner: PropTypes.bool,
  hasFxa: PropTypes.bool,
  shouldGetFirefox: PropTypes.bool,
};
