/* Environmental variables that help control this test:

FIREFOX_CHANNEL = empty (default NIGHTLY)
                  NIGHTLY
                  AURORA (often Developer Edition)
                  BETA
                  RELEASE

NO_CLOSE = if not empty then when the test is finished, the browser will not be closed

*/

const backend = process.env.SCREENSHOTS_BACKEND || "http://localhost:10080";
const { URL } = require("url");
let backendUrl;

try {
  backendUrl = new URL(backend);
} catch (e) {
  throw new Error(`SCREENSHOTS_BACKEND is not a valid URL: ${e.message}`);
}

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
const PREVIEW_IFRAME_ID = "firefox-screenshots-preview-iframe";
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

function closeTab(driver) {
  return driver.close()
  .then(() => driver.getAllWindowHandles())
  .then((tabs) => driver.switchTo().window(tabs[tabs.length - 1]))
  .then(() => driver.switchTo().defaultContent());
}

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

async function startScreenshotsWithUrl(driver, url) {
  const req = await driver.get(url);
  const onboarding = await startScreenshots(driver);
  if (onboarding) {
    return skipOnboarding(driver);
  }

  return req;
}

function performAutoSelection(driver) {
  return driver.actions().move({x: 100, y: 100}).click().perform()
  .then(() => driver.switchTo().defaultContent())
  .then(() => driver.wait(until.ableToSwitchToFrame(By.id(SELECTION_IFRAME_ID))));
}

function startAutoSelectionShot(driver) {
  return driver.get(backend)
  .then(() => startScreenshots(driver))
  .then(() => performAutoSelection(driver));
}

/** Waits when ready, calls creator to create the shot, waits for the resulting
    promise to complete, then watches for the
    new tab to open and load, and returns the shot URL.  The new tab
    will be switched to by the driver */
function expectCreatedShot(driver, creator) {
  // We keep track of how many tabs we start with, so we can detect when
  // a new tab is added (which signals that the saving worked)
  let startingTabCount;
  return driver.getAllWindowHandles().then((tabs) => {
    startingTabCount = tabs.length;
    return creator();
  }).then(() => {
    return driver.wait(() => {
      return driver.getAllWindowHandles().then((tabs) => {
        // On CircleCI there is consistently one weird tab with the id "22"
        // It's not a normal tab, so we ignore it:
        tabs = tabs.filter((t) => t !== "22");
        return tabs.length > startingTabCount;
      });
    });
  }).then(() => {
    return driver.getAllWindowHandles();
  }).then((tabs) => {
    tabs = tabs.filter((t) => t !== "22");
    if (tabs.length < startingTabCount) {
      throw new Error("New tab did not open");
    }
    return driver.switchTo().window(tabs[tabs.length - 1]);
  }).then(() => {
    return driver.wait(() => {
      return driver.getCurrentUrl().then((url) => {
        return url !== "about:blank" && !url.includes("/creating/");
      });
    });
  }).then(() => {
    return driver.getCurrentUrl();
  });
}

function verifyShotUrl(shotUrl) {
  assert(shotUrl.startsWith(backend), `Got url ${shotUrl} that doesn't start with ${backend}`);
  const url = new URL(shotUrl);
  if (!url.pathname.endsWith(backendUrl.hostname)) {
    throw new Error(`Unexpected URL: ${shotUrl}`);
  }
}

describe("Test Screenshots", function() {
  this.timeout(120000);

  before(async function() {
    driver = await getDriver();
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

  it("should take a shot", function(done) {
    driver.get(backend).then(() => {
      return startScreenshots(driver);
    }).then((onboarding) => {
      if (!onboarding) {
        throw new Error("Expected to get onboarding");
      }
      return skipOnboarding(driver);
    }).then(() => {
      return driver.wait(
        until.ableToSwitchToFrame(By.id(PRESELECTION_IFRAME_ID))
      );
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css(".visible"))
      );
    }).then((visibleButton) => {
      return visibleButton.click();
    }).then(() => {
      return driver.switchTo().defaultContent();
    }).then(() => {
      return driver.wait(
        until.ableToSwitchToFrame(By.id(PREVIEW_IFRAME_ID))
      );
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css(".preview-button-save"))
      );
    }).then((saveButton) => {
      return driver.wait(
        until.elementIsVisible(saveButton)
      );
    }).then((saveButton) => {
      return expectCreatedShot(driver, () => {
        saveButton.click();
      });
    }).then((shotUrl) => {
      verifyShotUrl(shotUrl);
      done();
    }).catch(done);
  });

  it("should take an auto selection shot", function(done) {
    startAutoSelectionShot(driver).then(() => {
      return driver.wait(until.elementLocated(By.css(".highlight-button-save")));
    }).then((saveButton) => {
      return expectCreatedShot(driver, () => {
        saveButton.click();
      });
    }).then((shotUrl) => {
      verifyShotUrl(shotUrl);
      done();
    }).catch(done);
  });

  it("should navigate to My Shots", function(done) {
    let currentTabs, startingTabCount;
    driver.getAllWindowHandles().then(tabs => {
      startingTabCount = tabs.length;
    }).then(() => {
      return driver.get(backend);
    }).then(() => {
      return startScreenshots(driver);
    }).then(() => {
      return driver.wait(
        until.ableToSwitchToFrame(By.id(PRESELECTION_IFRAME_ID))
      );
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css(".myshots-button"))
      );
    }).then(myShotsButton => {
      return myShotsButton.click();
    }).then(() => {
      return driver.wait(
        () => {
          return driver.getAllWindowHandles().then(tabs => {
            currentTabs = tabs;
            return currentTabs.length > startingTabCount;
          });
        }
      );
    }).then(() => {
      return driver.switchTo().window(currentTabs[currentTabs.length - 1]);
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css("#shot-index-page"))
      );
    }).then(() => {
      return driver.getCurrentUrl();
    }).then(url => {
      assert.equal(url, `${backend}/shots`, `Navigated to ${url} instead of My Shots at ${backend}/shots`);
      done();
    }).catch(done);
  });

  it("should show onboarding with #hello", async function() {
    await driver.get(`${backend}/#hello`);
    await driver.setContext(firefox.Context.CONTENT);
    const slideFrame = await driver.wait(until.elementLocated(By.id(SLIDE_IFRAME_ID)));
    assert(slideFrame, "Navigating to #hello should show onboarding");
  });

  it("should download a shot", function(done) {
    const startingFileCount = fs.readdirSync(downloadDir).length;
    const filenameRegex = /^Screenshot.+ Firefox Screenshots\.png$/;
    let files;
    startAutoSelectionShot(driver)
    .then(() => driver.wait(until.elementLocated(By.css(".highlight-button-download"))))
    .then(downloadButton => downloadButton.click())
    .then(() => driver.wait(() => {
      return util.promisify(fs.readdir)(downloadDir).then(foundFiles => {
        files = foundFiles;
        return (files.length > startingFileCount);
      });
    }, 2000))
    .then(() => {
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
      files.forEach(filename => {
        filename !== ".gitignore" && unlinkPromise(path.join(downloadDir, filename));
      });
    })
    // Downloading seems to put the browser in a weird state that we can't reset
    // unless the tab is closed
    .then(() => closeTab(driver))
    .then(() => done())
    .catch(done);
  });

  it("should remain on original tab with UI overlay on save failure", function(done) {
    const badAddon = path.join(process.cwd(), "build", "screenshots-webextension-server-down.zip");
    driver.installAddon(badAddon)
    .then(() => startAutoSelectionShot(driver))
    .then(() => driver.wait(until.elementLocated(By.css(".highlight-button-save"))))
    .then((saveButton) => saveButton.click())
    .then(() => driver.getAllWindowHandles())
    .then((tabs) => driver.switchTo().window(tabs[tabs.length - 1]))
    .then(() => driver.switchTo().defaultContent())
    .then(() => driver.findElement(By.id(PRESELECTION_IFRAME_ID)))
    .then(selectionFrame => assert(selectionFrame.isDisplayed()))
    .then(() => driver.getCurrentUrl())
    .then((url) => {
      assert.equal(url, `${backend}/`, `Navigated away from ${backend}`);

      // Doing this in case there are tests after this one.
      driver.installAddon(addonFileLocation).then(() => done()).catch(done);
    }).catch(done);
  });

  it("should not display the Save button", async function() {
    const driver = await getDriver({"extensions.screenshots.upload-disabled": true});
    await startScreenshotsWithUrl(driver, backend);
    await performAutoSelection(driver);
    // There is a download-only button when there's no Save as the primary button.
    // No assert is necessary; if the element is found, then then the test
    // passed. A NoSuchElementError will be thrown if it's not found.
    await driver.findElement({className: "download-only-button"});
  });
});
