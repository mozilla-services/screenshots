/* jshint browser:true */

module.exports = {
  signUp() {
    let event = new CustomEvent("request-sign-up");
    document.dispatchEvent(event);
  },

  signIn() {
    let event = new CustomEvent("request-sign-in");
    document.dispatchEvent(event);
  },

  requestProfile() {
    let event = new CustomEvent("request-profile");
    document.dispatchEvent(event);
  },

  setProfileState(profile) {
    let event = new CustomEvent("set-profile-state", {
      detail: profile
    });
    document.dispatchEvent(event);
  },

  deleteEverything() {
    let event = new CustomEvent("delete-everything");
    document.dispatchEvent(event);
  }
};
