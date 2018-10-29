const React = require("react");
const PropTypes = require("prop-types");
const { SignInButton } = require("../../signin-button.js");
const { Header } = require("../../header.js");

exports.MyShotsHeader = function MyShotsHeader(props) {
  const signin = props.enableUserSettings && props.authenticated ?
    <SignInButton
      isFxaAuthenticated={props.hasFxa} initialPage="shots"
      staticLink={props.staticLink}
      hasFxaOnboardingDialog={props.hasFxaOnboardingDialog} /> : null;

  return (
    <Header hasLogo={true} isOwner={props.authenticated} hasFxa={props.hasFxa}
            hasFxaOnboardingDialog={props.hasFxaOnboardingDialog}>
      <div className="alt-actions">
        { signin }
      </div>
    </Header>
  );
};

exports.MyShotsHeader.propTypes = {
  hasFxa: PropTypes.bool,
  authenticated: PropTypes.bool,
  enableUserSettings: PropTypes.bool,
  staticLink: PropTypes.func,
  hasFxaOnboardingDialog: PropTypes.bool,
};
