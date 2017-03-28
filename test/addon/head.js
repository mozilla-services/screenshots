// Currently Screenshots is disabled in tests.  We want these tests to work under
// either case that Screenshots is disabled or enabled on startup of the browser,
// and that at the end we're reset to the correct state.
let enabledOnStartup = false;

// ScreenshotsEnabled/Disabled promises return true if it was already
// Enabled/Disabled, and false if it need to Enable/Disable.
function promiseScreenshotsEnabled() {
  if (Services.prefs.getPrefType("extensions.screenshots.disabled") == Services.prefs.PREF_INVALID ||
      !Services.prefs.getBoolPref("extensions.screenshots.disabled")) {
    info("Screenshots was already enabled, assuming enabled by default for tests");
    enabledOnStartup = true;
    return Promise.resolve(true);
  }
  info("Screenshots is not enabled");
  return new Promise((resolve, reject) => {
    let listener = {
      onWidgetAfterCreation(widgetid) {
        if (widgetid == "screenshots_mozilla_org-browser-action") {
          info("screenshots_mozilla_org-browser-action button created");
          CustomizableUI.removeListener(listener);
          resolve(false);
        }
      }
    }
    CustomizableUI.addListener(listener);
    Services.prefs.setBoolPref("extensions.screenshots.disabled", false);
  });
}

function promiseScreenshotsDisabled() {
  if (Services.prefs.getPrefType("extensions.screenshots.disabled") != Services.prefs.PREF_INVALID &&
      Services.prefs.getBoolPref("extensions.screenshots.disabled")) {
    info("Screenshots already disabled");
    return Promise.resolve(true);
  }
  return new Promise((resolve, reject) => {
    let listener = {
      onWidgetDestroyed(widgetid) {
        if (widgetid == "screenshots_mozilla_org-browser-action") {
          CustomizableUI.removeListener(listener);
          info("screenshots_mozilla_org-browser-action destroyed");
          resolve(false);
        }
      }
    }
    CustomizableUI.addListener(listener);
    info("Set Screenshots disabled pref");
    // testing/profiles/prefs_general.js uses user_pref to disable pocket, set
    // back to false.
    Services.prefs.setBoolPref("extensions.screenshots.disabled", true);
  });
}

function promiseScreenshotsReset() {
  if (enabledOnStartup) {
    info("Reset is enabling Screenshots addon");
    return promiseScreenshotsEnabled();
  }
  info("Reset is disabling Screenshots addon");
  return promiseScreenshotsDisabled();
}
