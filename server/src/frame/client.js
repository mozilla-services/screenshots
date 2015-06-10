/* Client-specific helpers for communicating with the add-on. Fetches profile
 * info and initiates the FxA OAuth flow. If we wanted to be fancy, we could
 * have a separate, server-specific module that follows the same interface
 * and injects the user's info into the pre-rendered frame. */

let extRequestId = 1;
let extRequests = {};

function uniqueExtRequestId(type) {
  return type + extRequestId++;
}

function extRequest(type, options) {
  return new Promise((resolve, reject) => {
    let id = uniqueExtRequestId(type);
    let requestEvent = new CustomEvent(type, {
      detail: { id, options }
    });
    extRequests[id] = { resolve, reject };
    document.dispatchEvent(requestEvent);
  });
}

function onExtResponse(event) {
  let { id, response } = JSON.parse(event.detail);
  let request = extRequests[id];
  if (!request) {
    return;
  }
  if (response.ok) {
    request.resolve(response.result);
  } else {
    // TODO: Wrap in a rejection error.
    request.reject(response.error);
  }
  delete extRequests[id];
}

let resolveReady;

let readyPromise = new Promise(resolve => {
  resolveReady = resolve;
});

function onHelperReady(e) {
  document.removeEventListener("helper-ready", onHelperReady);
  resolveReady();
}

exports.ready = function () {
  return readyPromise;
};

exports.signUp = function () {
  return extRequest("request-account", { action: "signup" });
};

exports.signIn = function () {
  return extRequest("request-account", { action: "signin" });
};

exports.getProfile = function () {
  return extRequest("request-profile");
};

exports.updateProfile = function (options) {
  return extRequest("request-profile-update", options);
};

function main() {
  document.addEventListener("got-profile", onExtResponse);
  document.addEventListener("got-account", onExtResponse);
  document.addEventListener("got-profile-update", onExtResponse);
  document.addEventListener("helper-ready", onHelperReady);
}

// Attach the PageShot extension listeners on load.
main();
