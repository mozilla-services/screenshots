/* globals controller */
const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");
const { SignInButton } = require("../../signin-button.js");
const { Header } = require("../../header.js");
const { TimeDiff } = require("./time-diff");

exports.ShotPageHeader = class ShotPageHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMyShotsText() {
    // FIXME: this means that on someone else's shot they won't see a My Shots link:
    if (!this.props.isOwner) {
      return (
        <Localized id="shotPageBackToHomeButton" attrs={{title: true}}>
        <a className="nav-link" title="Homepage" href="/" tabIndex="0" onClick={this.onClickMyShots.bind(this)}>
          <span className="back-to-home">
            <span>
              Firefox
            </span>
            <span className="small-text">
              Screenshots
            </span>
          </span>
        </a>
      </Localized>
      );
    }
    return (
      <Localized id="shotPageAllShotsButton" attrs={{title: true}}>
        <a className="nav-button icon-shots" href="/shots" tabIndex="0" title="All Shots">
          <img src={this.props.staticLink("/static/img/icon-shots.svg")} />
        </a>
      </Localized>
    );
  }

  onClickMyShots() {
    if (this.props.isOwner) {
      sendEvent("goto-myshots", "navbar", {useBeacon: true});
    } else {
      sendEvent("goto-homepage", "navbar", {useBeacon: true});
    }
  }

  renderShotInfo() {
    const shot = this.props.shot;
    const linkTextShort = shot.urlDisplay;
    const timeDiff = <TimeDiff date={shot.createdDate} />;
    let expirationSubtitle;
    if (this.props.expireTime === null) {
      expirationSubtitle = <Localized id="shotPageDoesNotExpire"><span className="expire-info">does not expire</span></Localized>;
    } else {
      const expired = this.props.expireTime < Date.now();
      const expireTimeDiff = <TimeDiff date={this.props.expireTime}/>;
      if (expired) {
        expirationSubtitle = <Localized id="shotPageTimeExpired" timediff={expireTimeDiff}><span className="expire-info">expired {expireTimeDiff}</span></Localized>;
      } else {
        expirationSubtitle = <Localized id="shotPageTimeExpiresIn" timediff={expireTimeDiff}><span className="expire-info">expires {expireTimeDiff}</span></Localized>;
      }
    }

    return (
      <div className="shot-main-actions">
        <div className="shot-info">
          <EditableTitle title={shot.title} isOwner={this.props.isOwner} />
          <div className="shot-subtitle">
            { linkTextShort ? <a className="subtitle-link" rel="noopener noreferrer" href={ shot.url } target="_blank" onClick={ this.onClickOrigUrl.bind(this, "navbar") }>{ linkTextShort }</a> : null }
            <span className="time-diff expire-info">{ timeDiff }</span>
            { expirationSubtitle }
          </div>
        </div>
      </div>
    );
  }

  onClickOrigUrl(label) {
    if (this.props.isOwner) {
      sendEvent("view-original", `${label}-owner`, {useBeacon: true});
    } else {
      sendEvent("view-original", `${label}-non-owner`, {useBeacon: true});
    }
    // Note: we allow the default action to continue
  }

  renderFxASignIn() {
    return (
      this.props.isOwner ?
        <div className="shot-fxa-signin">
          <SignInButton isAuthenticated={this.props.isFxaAuthenticated} initialPage={this.props.shot.id}
                        staticLink={this.props.staticLink} />
        </div> : null
    );
  }

  render() {
    const myShotsText = this.renderMyShotsText();
    const signin = this.renderFxASignIn();
    const shotInfo = this.renderShotInfo();

    return (
      <Header shouldGetFirefox={this.props.shouldGetFirefox} isOwner={this.props.isOwner}
              hasFxa={this.props.isFxaAuthenticated}>
        { myShotsText }
        { shotInfo }
        <div className="shot-alt-actions">
        { this.props.children }
        </div>
        { signin }
      </Header>
    );
  }
};

exports.ShotPageHeader.propTypes = {
  children: PropTypes.node.isRequired,
  isOwner: PropTypes.bool,
  shot: PropTypes.object,
  isFxaAuthenticated: PropTypes.bool,
  expireTime: PropTypes.number,
  shouldGetFirefox: PropTypes.bool,
  staticLink: PropTypes.func,
};

class EditableTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isEditing: false, isSaving: false, minWidth: 200};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // When the save completes, this component just gets updated with the new title
    if (this.state.isSaving && this.state.isSaving === nextProps.title) {
      this.setState({isSaving: false});
    }
  }

  render() {
    if (this.state.isEditing) {
      return this.renderEditing();
    }
    let className = "shot-title";
    const handlers = {};
    if (this.props.isOwner) {
      className += " editable";
      handlers.onClick = this.onClick.bind(this);
    }
    if (this.state.isSaving) {
      className += " saving";
    }
    return <span ref={titleElement => this.titleElement = titleElement} className={className} {...handlers}>{this.state.isSaving || this.props.title}</span>;
  }

  renderEditing() {
    return <form onSubmit={this.onExit.bind(this)}>
        <input ref={(input) => this.textInput = input}
               className="shot-title-input"
               style={{minWidth: this.state.minWidth}}
               type="text" defaultValue={this.props.title} autoFocus={true}
               onBlur={this.onExit.bind(this)} onKeyUp={this.onKeyUp.bind(this)}
               onFocus={this.onFocus} />
      </form>;
  }

  onClick() {
    if (!this.state.isEditing) {
      this.setState({minWidth: this.titleElement.offsetWidth });
    }
    this.setState({isEditing: true});
  }

  onExit() {
    const val = this.textInput.value;

    if (val.trim() === "") {
      this.setState({isEditing: false, isSaving: false});
    } else {
      controller.setTitle(val);
      this.setState({isEditing: false, isSaving: val});
    }
  }

  onFocus(event) {
    event.target.select();
  }

  onKeyUp(event) {
    if ((event.key || event.code) === "Escape") {
      this.setState({isEditing: false});
    }
  }

}

EditableTitle.propTypes = {
  isOwner: PropTypes.bool,
  title: PropTypes.string,
};
