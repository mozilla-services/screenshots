/* jshint browser:true */

const React = require("react");
const errors = require("../../shared/errors");

const PROFILE_CREATE = 'create';
const PROFILE_FETCH = 'fetch';
const PROFILE_READY = 'ready';
const PROFILE_UPDATE = 'update';

function delay(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

exports.ProfileButton = class ProfileButton extends React.Component {
  constructor(props) {
    super(props);
    this.onDocumentClick = this.dismiss.bind(this);
    this.onRefreshProfileBound = this.onRefreshProfile.bind(this);
    this.state = {
      avatarurl: null,
      nickname: null,
      email: null,
      isExpanded: props.initialExpanded,
      isFetching: false
    };
  }

  fetchProfile() {
    this.setState({
      isFetching: true,
      lastError: null
    }, function () {
      Promise.race([
        this.props.getProfile(),
        delay(5000).then(() => Promise.reject(errors.extTimeout('fetchProfile')))
      ]).then(
        profile => {
          this.setState({
            isFetching: false,
            avatarurl: profile && profile.avatarurl,
            nickname: profile && profile.nickname,
            email: profile && profile.email
          });
        },
        err => {
          this.setState({
            isFetching: false,
            lastError: err
          });
        }
      ).catch(err => {
        console.error("Error refreshing profile", err);
      });
    });
  }

  signIn() {
    Promise.race([
      this.props.signIn(),
      delay(2000).then(() => Promise.reject(errors.extTimeout('signIn')))
    ]).then(() => {
      this.setState({ isExpanded: false });
    }, err => {
      if (err.errno == 1101) {
        // TODO: Handle extension timeouts.
        console.log("Timed out fetching profile", err);
        return;
      }
      if (err.errno == 1102) {
        // User already signed in. Fetch their profile and refresh the view.
        this.fetchProfile();
        return;
      }
      this.setState({ lastError: err });
    });
  }

  signUp() {
    Promise.race([
      this.props.signUp(),
      delay(2000).then(() => Promise.reject(errors.extTimeout('signUp')))
    ]).then(() => {
      this.setState({ isExpanded: false });
    }, err => {
      if (err.errno == 1101) {
        // TODO: Timeouts.
        return;
      }
      if (err.errno == 1102) {
        this.fetchProfile();
        return;
      }
      this.setState({ lastError: err });
    });
  }

  updateProfile(profile) {
    this.props.updateProfile(profile).then(() => {
      this.fetchProfile();
    }).catch(err => {
      console.error("Error updating profile", err);
    });
  }

  componentDidMount() {
    window.addEventListener("click", this.onDocumentClick);
    document.addEventListener("profile-refresh", this.onRefreshProfileBound);
    this.props.ready().then(() => this.fetchProfile());
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onDocumentClick);
    document.removeEventListener("profile-refresh", this.onRefreshProfileBound);
  }

  dismiss(e) {
    if (this.state.isExpanded) {
      let panel = React.findDOMNode(this.refs.panel);
      if (!panel.contains(e.target)) {
        this.setState({ isExpanded: false });
      }
    }
  }

  // Triggered by the add-on when the user finishes signing in.
  onRefreshProfile(e) {
    console.log("User signed in; refreshing profile");
    this.fetchProfile();
  }

  hideProfile() {
    this.setState({ isExpanded: false });
  }

  showProfile() {
    this.setState({ isExpanded: true });
  }

  onClickProfile(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    let { isExpanded, status, lastError } = this.state;
    if (lastError && lastError.errno == 1101) {
      return null;
    }
    if (status == 'loading') {
      // TODO: Render the cached account state if we're refreshing.
      return null;
    }
    let { avatarurl } = this.state;
    if (! avatarurl) {
      avatarurl = this.props.staticLink("img/profile-anonymous.svg");
    }
    if (isExpanded) {
      return (
        <span className="account">
          <img src={ this.props.staticLink("img/profile-open.png") } onClick={ this.onClickProfile.bind(this) } />
          <exports.Profile
            ref="panel"
            signUp={ this.signUp.bind(this) }
            signIn={ this.signIn.bind(this) }
            updateProfile={ this.updateProfile.bind(this) }
            avatarurl={ avatarurl }
            nickname={ this.state.nickname }
            email={ this.state.email }
          />
        </span>
      );
    }
    return (
      <span className="account">
        <img src={ this.props.staticLink("img/profile.png") } onClick={ this.onClickProfile.bind(this) } />
      </span>
    );
  }
};

exports.Profile = class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickname
    };
  }

  onClickSignUp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.signUp();
  }

  onClickSignIn(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.signIn();
  }

  onKeyPressName(e) {
    let input = React.findDOMNode(this.refs.nickname);
    if (e.which == 13) {
      input.blur();
      this.props.updateProfile({ nickname: this.state.nickname });
    }
  }

  onChangeName(e) {
    this.setState({ nickname: e.target.value });
  }

  renderSignedIn() {
    // Show a list of connected devices with PageShot installed, too.
    return (
      <div className="sync-status">
        <p>You are signed in as {this.props.email}.</p>
      </div>
    );
  }

  renderSignedOut() {
    return (
      <div className="sync-status">
        <p>Access your snapshot history wherever you use Firefox.</p>
        <ul className="sync-buttons">
          <li><a href="#" onClick={ this.onClickSignUp.bind(this) }>Create Account</a></li>
          <li><a href="#" onClick={ this.onClickSignIn.bind(this) }>Sign In</a></li>
        </ul>
      </div>
    );
  }

  render() {
    let syncStatus = this.props.email ? this.renderSignedIn() : this.renderSignedOut();
    return (
      <div id="profile" className="panel">
        <div className="avatar-container">
          <img className="avatar" src={ this.props.avatarurl } />
        </div>
        <h3>Name</h3>
        <input type="text" ref="nickname" defaultValue={ this.state.nickname }
          onChange={ this.onChangeName.bind(this )}
          onKeyPress={ this.onKeyPressName.bind(this) }
          placeholder="Pick a name for yourself" />
        <h3>Sync</h3>
        {syncStatus}
      </div>
    );
  }
};
