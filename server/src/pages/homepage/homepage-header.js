const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const { SignInButton } = require("../../signin-button.js");
const sendEvent = require("../../browser-send-event.js");
const { Header } = require("../../header.js");

exports.HomePageHeader = class HomePageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickMyShots() {
    sendEvent("goto-myshots", "homepage", {useBeacon: true});
  }

  renderFxASignIn() {
      return (
        this.props.isFirefox && this.props.isOwner ?
          <SignInButton isAuthenticated={this.props.hasFxa} initialPage=""
                        staticLink={this.props.staticLink} /> : null
      );
  }

  render() {
    let myShots;
    if (this.props.isOwner) {
      myShots = <Localized id="shotIndexPageMyShotsButton" attrs={{title: true}}>
          <a className="nav-button icon-shots" title="My Shots" href="/shots"
             onClick={ this.onClickMyShots.bind(this) } tabIndex="0">
            <img src={this.props.staticLink("/static/img/icon-shots.svg")} />
          </a>
        </Localized>;
    }

    const signin = this.renderFxASignIn();
    return (
      <Header hasLogo={true} isOwner={this.props.isOwner} hasFxa={this.props.hasFxa}>
        <div className="alt-actions">
          { myShots }
          { signin }
        </div>
      </Header>
    );
  }
};

exports.HomePageHeader.propTypes = {
  hasFxa: PropTypes.bool,
  isOwner: PropTypes.bool,
  isFirefox: PropTypes.bool,
  staticLink: PropTypes.func,
};
