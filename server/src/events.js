module.exports = {
  signUp() {
    const event = new CustomEvent("request-sign-up");
    document.dispatchEvent(event);
  },

  signIn() {
    const event = new CustomEvent("request-sign-in");
    document.dispatchEvent(event);
  },

  requestProfile() {
    const event = new CustomEvent("request-profile");
    document.dispatchEvent(event);
  },

  setProfileState(profile) {
    const event = new CustomEvent("set-profile-state", {
      detail: profile,
    });
    document.dispatchEvent(event);
  },

  deleteEverything() {
    const event = new CustomEvent("delete-everything");
    document.dispatchEvent(event);
  },
};
