const { getAbTests } = require("./user");
const { storage } = require("sdk/simple-storage");
const req = require("./req");

const storageKey = "ab-highlight-button-on-install";

const SHOW_BADGE_LIMIT = 1000 * 60 * 60 * 24; // 1 day

function shouldShowBadge() {
  let abTests = getAbTests();
  return abTests.highlightButtonOnInstall && abTests.highlightButtonOnInstall.value == "badge";
}

exports.mainCalled = function (loadReason) {
  console.log("mainCalled", loadReason, shouldShowBadge());
  let timestamp, hasCreatedShot;
  if (shouldShowBadge()) {
    if (loadReason == "install") {
      timestamp = storage[storageKey + "-timestamp"] = Date.now();
      hasCreatedShot = storage[storageKey + "-has-created-shot"] = false;
    } else if (storage[storageKey + "-timestamp"] === undefined) {
      // Someone who is not a new user got opted in to this test
      timestamp = 0;
      hasCreatedShot = true;
    } else {
      timestamp = storage[storageKey + "-timestamp"];
      hasCreatedShot = storage[storageKey + "-has-created-shot"];
    }
    refreshBadge(timestamp, hasCreatedShot);
  }
};

exports.buttonClicked = function () {
  if (shouldShowBadge()) {
    storage[storageKey + "-has-created-shot"] = true;
    refreshBadge(0, true);
  }
};

function refreshBadge(timestamp, hasCreatedShot) {
  console.log("refreshBadge", timestamp, hasCreatedShot);
  if ((! hasCreatedShot) && (Date.now() - timestamp < SHOW_BADGE_LIMIT)) {
    req.sendEvent("ab-highlight-button-shown", {ni: true});
    require("./main").shootButton.badge = " ! ";
  } else {
    require("./main").shootButton.badge = "";
  }
}
