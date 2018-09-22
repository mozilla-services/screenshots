const React = require("react");
const PropTypes = require("prop-types");
const { SignInButton } = require("../../signin-button.js");
const { Header } = require("../../header.js");

exports.MyShotsHeader = function MyShotsHeader(props) {
  const signin = props.enableUserSettings && props.hasDeviceId ?
    <SignInButton
      isAuthenticated={props.hasFxa} initialPage="shots"
      staticLink={props.staticLink} /> : null;

  return (
    <Header hasLogo={true} isOwner={props.hasDeviceId} hasFxa={props.hasFxa}>
      <div className="alt-actions">
        { signin }
      </div>
    </Header>
  );
};

exports.MyShotsHeader.propTypes = {
  hasFxa: PropTypes.bool,
  hasDeviceId: PropTypes.bool,
  enableUserSettings: PropTypes.bool,
  staticLink: PropTypes.func,
};
