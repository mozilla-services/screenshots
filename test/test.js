/* globals describe, it, before, after */

const assert = require("assert");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
//const FxRunnerUtils = require("fx-runner/lib/utils");
//const Fs = require("fs-promise");
const path = require("path");

const SHOOTER_BUTTON_ID = "action-button--jid1-neeaf3sahdkhpajetpack-pageshot-shooter";

function addAddonToDriver(driver, location) {
  return driver.executeAsyncScript(`
const FileUtils = Components.utils.import('resource://gre/modules/FileUtils.jsm').FileUtils;
const { console } = Components.utils.import("resource://gre/modules/Console.jsm", {});
const { AddonManager } = Components.utils.import("resource://gre/modules/AddonManager.jsm", {});
const callback = arguments[arguments.length - 1];

class AddonListener {
  onInstallEnded(install, addon) {
    callback([addon.id, 0]);
  }

  onInstallFailed(install) {
    callback([null, install.error]);
  }

  onInstalled(addon) {
    AddonManager.removeAddonListener(this);
    callback([addon.id, 0]);
  }
}

AddonManager.addAddonListener(new AddonListener());
AddonManager.installTemporaryAddon(new FileUtils.File(arguments[0]))
  .catch((error) => {
    callback([null, error]);
  });

`, location).then(([result, err]) => {
    if (!result[0] && result[1]) {
      throw new Error(`Failed to install add-on: ${result[1]}`);
    }
    return driver;
  });
}

function promiseDriver() {
  const profile = new firefox.Profile();
  const options = new firefox.Options();
  options.setProfile(profile);

  const builder = new webdriver.Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(options);
  return builder.buildAsync().then((driver) => {
    driver.setContext(firefox.Context.CHROME);
    let fileLocation = path.join(process.cwd(), "build", "mozilla-pageshot.xpi");
    return addAddonToDriver(driver, fileLocation);
  });
}

function getElementById(driver, id) {
  driver.setContext(firefox.Context.CHROME);
  return driver.wait(
    webdriver.until.elementLocated(
      webdriver.By.id(id)), 1000);
}

describe("Test Page Shot", function () {
  this.timeout(10000);
  let driver;

  before(function() {
    return promiseDriver().then((theDriver) => {
      driver = theDriver;
    });
  });

  after(function() {
    return driver.quit();
  });

  it("should find the add-on button", function() {
    return getElementById(driver, SHOOTER_BUTTON_ID)
      .then((button) => button.getAttribute("label"))
      .then((label) => assert.equal(label, "Make shot"));
  });
});
