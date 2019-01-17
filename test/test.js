/* Environmental variables that help control this test:

FIREFOX_CHANNEL = empty (default NIGHTLY)
                  NIGHTLY
                  AURORA (often Developer Edition)
                  BETA
                  RELEASE

NO_CLOSE = if not empty then when the test is finished, the browser will not be closed

*/

const backend = process.env.SCREENSHOTS_BACKEND || "http://localhost:10080";
const assert = require("assert");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;
// Uncomment the next line and others with `ServiceBuilder` to enable trace logs from Firefox and Geckodriver
// const { ServiceBuilder } = firefox;
const path = require("path");
const fs = require("fs");
const util = require("util");

const PAGE_ACTION_BUTTON_ID = "pageActionButton";
// ID of WebExtension page action button
const SHOOTER_BUTTON_ID = "pageAction-panel-screenshots_mozilla_org";
// Applies to the old-style toolbar button:
const TOOLBAR_SHOOTER_BUTTON_ID = "screenshots_mozilla_org-browser-action";
const pageActionButtonSelector = By.id(PAGE_ACTION_BUTTON_ID);
const shooterSelector = By.css(`#${SHOOTER_BUTTON_ID}, #${TOOLBAR_SHOOTER_BUTTON_ID}`);
const SLIDE_IFRAME_ID = "firefox-screenshots-onboarding-iframe";
const PRESELECTION_IFRAME_ID = "firefox-screenshots-preselection-iframe";
const SELECTION_IFRAME_ID = "firefox-screenshots-selection-iframe";
const addonFileLocation = path.join(process.cwd(), "build", "screenshots.zip");
const downloadDir = path.join(process.cwd(), "test", "addon", ".artifacts");

const channel = process.env.FIREFOX_CHANNEL || "NIGHTLY";
if (!(channel in firefox.Channel)) {
  throw new Error(`Unknown channel: "${channel}"`);
}

let driver;

async function getDriver(preferences) {
  if (driver) {
    await driver.quit();
  }

  // const servicebuilder = new ServiceBuilder().enableVerboseLogging(true).setStdio("inherit");
  let options = new firefox.Options()
    .setBinary(firefox.Channel[channel])
    .setPreference("extensions.legacy.enabled", true)
    .setPreference("xpinstall.signatures.required", false)
    .setPreference("browser.download.folderList", 2)
    .setPreference("browser.download.dir", downloadDir);

  if (preferences) {
    for (const k of Object.keys(preferences)) {
      options = options.setPreference(k, preferences[k]);
    }
  }

  // FIXME: should assert somehow that we have Firefox 54+

  driver = new webdriver.Builder()
    // .setFirefoxService(servicebuilder)
    .withCapabilities({"moz:webdriverClick": true})
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  driver.installAddon(addonFileLocation);

  return driver;
}

function getChromeElement(driver, selector) {
  return driver.setContext(firefox.Context.CHROME)
    .then(() => driver.wait(until.elementLocated(selector)));
}

/** Calls finallyCallback() after the promise completes, successfully or not,
    returning the resolved or rejected promise as normal */
function promiseFinally(promise, finallyCallback) {
  return promise.then((result) => {
    finallyCallback();
    return result;
  }, (error) => {
    finallyCallback();
    throw error;
  });
}

/** This will start Screenshots, and return a promise that
    will be true if the onboarding slides are active, or false
    if not.  An error will be returned if it does not start
    successfully. */
function startScreenshots(driver) {
  return promiseFinally(
    getChromeElement(driver, pageActionButtonSelector)
    .then(pageActionButton => pageActionButton.click())
    .then(() => getChromeElement(driver, shooterSelector))
    .then(screenshotsButton => screenshotsButton.click())
    ,
    () => {
      driver.setContext(firefox.Context.CONTENT);
    }
  ).then(() => {
    return driver.wait(() => {
      return Promise.all([
        driver.findElements(By.id(SLIDE_IFRAME_ID)),
        driver.findElements(By.id(PRESELECTION_IFRAME_ID)),
      ]).then((results) => {
        return results[0].length || results[1].length;
      });
    });
  }).then(() => {
    return driver.findElements(By.id(SLIDE_IFRAME_ID));
  }).then((elements) => {
    return !!elements.length;
  });
}

function focusIframe(driver, iframeId) {
  return driver.switchTo().defaultContent().then(() => {
    return driver.findElement(By.id(iframeId));
  }).then((iframe) => {
    return driver.switchTo().frame(iframe);
  });
}

// FIXME: I feel like this routine *should* get used somewhere in the tests, but at the moment
// it is not being used.
// eslint-disable-next-line no-unused-vars
function skipOnboarding(driver) {
  return focusIframe(driver, SLIDE_IFRAME_ID).then(() => {
    return driver.findElement(By.id("skip"));
  }).then((skipLink) => {
    return skipLink.click();
  }).then(() => {
    return driver.switchTo().defaultContent();
  }).then(() => {
    return driver.wait(until.elementLocated(By.id(PRESELECTION_IFRAME_ID)));
  });
}

async function performAutoSelection(driver, tries = 3) {
  await driver.switchTo().defaultContent();
  await driver.actions().move({x: 100 + Math.floor(Math.random() * 20), y: 100}).click().perform();
  await driver.switchTo().defaultContent();
  await driver.wait(until.ableToSwitchToFrame(By.id(SELECTION_IFRAME_ID)));
  try {
    await driver.wait(until.elementLocated(By.css(".highlight-button-copy")), 500);
  } catch (error) {
    if (tries <= 0) {
      throw error;
    }
    return performAutoSelection(driver, tries - 1);
  }
  return null;
}

function startAutoSelectionShot(driver) {
  return driver.get(backend)
  .then(() => startScreenshots(driver))
  .then(() => performAutoSelection(driver));
}

describe("Test Screenshots", function() {
  this.timeout(120000);

  before(async function() {
    driver = await getDriver();
    // await driver.switchTo().defaultContent();
  });

  after(function() {
    if (!process.env.NO_CLOSE) {
      return driver.quit();
    }
    console.info("Note: leaving browser open");
    return null;
  });

  it("should find the add-on button", function(done) {
    this.timeout(15000);
    promiseFinally(
      driver.get(backend)
      .then(() => getChromeElement(driver, pageActionButtonSelector))
      .then(pageActionButton => pageActionButton.click())
      .then(() => getChromeElement(driver, shooterSelector))
      .then(screenshotsButton => screenshotsButton.getAttribute("label"))
      .then((label) => {
        if (label === "Take a Screenshot") {
          assert.equal(label, "Take a Screenshot");
        } else {
          assert.equal(label, "Firefox Screenshots");
        }
        done();
      }),
      () => {
        return driver.setContext(firefox.Context.CONTENT)
          .then(() => driver.getAllWindowHandles())
          .then((tabs) => driver.switchTo().window(tabs[tabs.length - 1]))
          .then(() => driver.switchTo().defaultContent());
      }).catch(done);
  });

  it("should take an auto selection shot", function(done) {
    startAutoSelectionShot(driver).then(() => {
      return driver.wait(until.elementLocated(By.css(".highlight-button-copy")));
    }).then((copyButton) => {
      return copyButton.click();
    }).then(() => {
      // FIXME: somehow verify an image was copied
      done();
    }).catch(done);
  });

  it("should show onboarding with #hello", async function() {
    await driver.setContext(firefox.Context.CONTENT);
    await driver.switchTo().defaultContent();
    await driver.get(`http://example.org`);
    await driver.get(`${backend}/#hello`);
    await driver.setContext(firefox.Context.CONTENT);
    const slideFrame = await driver.wait(until.elementLocated(By.id(SLIDE_IFRAME_ID)));
    assert(slideFrame, "Navigating to #hello should show onboarding");
  });

  it("should download a shot", async function() {
    const startingFileCount = fs.readdirSync(downloadDir).length;
    const filenameRegex = /^Screenshot.+ Firefox Screenshots\.png$/;
    let files;
    await startAutoSelectionShot(driver);
    const downloadButton = await driver.wait(until.elementLocated(By.css(".highlight-button-download")));
    await downloadButton.click();
    await driver.wait(() => {
      return util.promisify(fs.readdir)(downloadDir).then(foundFiles => {
        files = foundFiles;
        return (files.length > startingFileCount);
      });
    }, 2000);
    // check for a file created within a couple seconds
    // @TODO maybe check the dimensions of the image if we wanna get fancy
    const matches = files.filter(filename => {
      if (!filenameRegex.test(filename)) {
        return false;
      }
      const stat = fs.statSync(path.join(downloadDir, filename));
      return ((stat.mtime.getTime() - Date.now()) < 2000);
    });
    assert(matches.length, `Shot was not downloaded to ${downloadDir}`);
    // clean up the dir
    const unlinkPromise = util.promisify(fs.unlink);
    for (const filename of files) {
      if (filename !== ".gitignore") {
        await unlinkPromise(path.join(downloadDir, filename));
      }
    }
    // Downloading seems to put the browser in a weird state that we can't reset
    // unless the tab is closed (except lately this has been *breaking* the tests instead of fixing them)
    // await closeTab(driver);
  });

});
