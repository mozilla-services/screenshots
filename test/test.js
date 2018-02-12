/* Environmental variables that help control this test:

FIREFOX_CHANNEL = empty (default NIGHTLY)
                  NIGHTLY
                  AURORA (often Developer Edition)
                  BETA
                  RELEASE

NO_CLOSE = if not empty then when the test is finished, the browser will not be closed

*/

const assert = require("assert");
const firefox = require("selenium-webdriver/firefox");
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver;
// Uncomment the next line and others with `ServiceBuilder` to enable trace logs from Firefox and Geckodriver
// const { ServiceBuilder } = firefox;
const path = require("path");

const SHOOTER_BUTTON_ID = "pageAction-panel-screenshots";
// Applies to the old-style toolbar button:
const TOOLBAR_SHOOTER_BUTTON_ID = "screenshots_mozilla_org-browser-action";
const shooterSelector = By.css(`#${SHOOTER_BUTTON_ID}, #${TOOLBAR_SHOOTER_BUTTON_ID}`);
const SLIDE_IFRAME_ID = "firefox-screenshots-onboarding-iframe";
const PRESELECTION_IFRAME_ID = "firefox-screenshots-preselection-iframe";
const SELECTION_IFRAME_ID = "firefox-screenshots-selection-iframe";
const PREVIEW_IFRAME_ID = "firefox-screenshots-preview-iframe";
const backend = "http://localhost:10080";

function getDriver() {
  const channel = process.env.FIREFOX_CHANNEL || "NIGHTLY";
  if (!(channel in firefox.Channel)) {
    throw new Error(`Unknown channel: "${channel}"`);
  }

  // const servicebuilder = new ServiceBuilder().enableVerboseLogging(true).setStdio("inherit");

  const options = new firefox.Options()
    .setBinary(firefox.Channel[channel])
    .setPreference("extensions.legacy.enabled", true)
    .setPreference("xpinstall.signatures.required", false);

  // FIXME: should assert somehow that we have Firefox 54+

  const driver = new webdriver.Builder()
    // .setFirefoxService(servicebuilder)
    .withCapabilities({"moz:webdriverClick": false})
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  const fileLocation = path.join(process.cwd(), "build", "screenshots-bootstrap.zip");
  driver.installAddon(fileLocation);

  return driver;
}

function getChromeElement(driver, selector) {
  driver.setContext(firefox.Context.CHROME);
  return driver.wait(
    webdriver.until.elementLocated(selector), 1000);
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

function setTimeoutPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}

/** This will start Screenshots, and return a promise that
    will be true if the onboarding slides are active, or false
    if not.  An error will be returned if it does not start
    successfully. */
function startScreenshots(driver) {
  return promiseFinally(
    getChromeElement(driver, shooterSelector).then((button) => {
      return button.click();
    }),
    () => {
      driver.setContext(firefox.Context.CONTENT);
    }
  ).then(() => {
    return driver.wait(() => {
      return Promise.all([
        driver.findElements(By.id(SLIDE_IFRAME_ID)),
        driver.findElements(By.id(PRESELECTION_IFRAME_ID))
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
    return driver.findElement(By.id(iframeId))
  }).then((iframe) => {
    return driver.switchTo().frame(iframe);
  });
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
        return url !== "about:blank" && !url.includes("/creating/")
      });
    });
  }).then(() => {
    return driver.getCurrentUrl();
  });
}

describe("Test Screenshots", function() {
  this.timeout(120000);
  let driver;

  before(function() {
    return getDriver().then((aDriver) => {
      driver = aDriver;
    });
  });

  after(function() {
    if (!process.env.NO_CLOSE) {
      return driver.quit();
    }
    console.info("Note: leaving browser open");
    return null;
  });

  it("should find the add-on button", function() {
    this.timeout(15000);
    return promiseFinally(
      getChromeElement(driver, shooterSelector)
      .then((button) => button.getAttribute("label"))
      .then((label) => {
        if (label === "Take a Screenshot") {
          assert.equal(label, "Take a Screenshot");
        } else {
          assert.equal(label, "Firefox Screenshots");
        }
      }),
      () => {
        driver.setContext(firefox.Context.CONTENT);
      });
  });

  it("should take a shot", function() {
    return driver.get(backend).then(() => {
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
      visibleButton.click();
      // We'll get a stale element error (!?) if the next line is removed
      return setTimeoutPromise(1000);
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
      return expectCreatedShot(driver, () => {
        saveButton.click();
      });
    }).then((shotUrl) => {
      assert(shotUrl.startsWith(backend), `Got url ${shotUrl} that doesn't start with ${backend}`);
      const restUrl = shotUrl.substr(backend.length);
      if (!/^\/[^/]+\/localhost$/.test(restUrl)) {
        throw new Error(`Unexpected URL: ${shotUrl}`);
      }
    });
  });

  it("should take an auto selection shot", function() {
    return driver.get(backend).then(() => {
      return startScreenshots(driver);
    }).then(() => {
      return driver.wait(
        until.ableToSwitchToFrame(By.id(PRESELECTION_IFRAME_ID))
      );
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css(".visible"))
      );
    }).then(() => {
      return driver.actions().move({x: 100, y: 100}).click().perform();
    }).then(() => {
      return driver.switchTo().defaultContent();
    }).then(() => {
      return driver.wait(
        until.ableToSwitchToFrame(By.id(SELECTION_IFRAME_ID))
      );
    }).then(() => {
      return driver.wait(
        until.elementLocated(By.css(".highlight-button-save"))
      );
    }).then((saveButton) => {
      return expectCreatedShot(driver, () => {
        saveButton.click();
      });
    }).then((shotUrl) => {
      assert(shotUrl.startsWith(backend), `Got url ${shotUrl} that doesn't start with ${backend}`);
      const restUrl = shotUrl.substr(backend.length);
      if (!/^\/[^/]+\/localhost$/.test(restUrl)) {
        throw new Error(`Unexpected URL: ${shotUrl}`);
      }
    });
  });

});
