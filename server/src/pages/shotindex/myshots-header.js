const React = require("react");
const PropTypes = require("prop-types");
const { SignInButton } = require("../../signin-button.js");
const { Header } = require("../../header.js");

exports.MyShotsHeader = function MyShotsHeader(props) {
  const signin = props.enableUserSettings ?
    <SignInButton
      isAuthenticated={props.hasFxa} initialPage="shots"
      staticLink={props.staticLink} /> : null;

  return (
    <Header hasLogo={true} isOwner={true} hasFxa={props.hasFxa}>
      <div className="alt-actions">
        { signin }
      </div>
    </Header>
  );
};

exports.MyShotsHeader.propTypes = {
  hasFxa: PropTypes.bool,
  enableUserSettings: PropTypes.bool,
  staticLink: PropTypes.func,
};
