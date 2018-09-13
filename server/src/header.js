const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");

exports.Header = function Header(props) {
  const logo = props.hasLogo ? <div className="logo">
      <Localized id="screenshotsLogo">
        <a href="/" title="Screenshots home" className="screenshots-logo"></a>
      </Localized>
    </div> : null;

  return <header className="header-panel default-color-scheme">
      {logo}
      {props.children}
    </header>;
};

exports.Header.propTypes = {
  hasLogo: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
