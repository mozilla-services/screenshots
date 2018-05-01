/** A/B test assignment support

This assigns users to tests using the `abTests.updateAbTests(obj)` function

Tests are defined directly in this file, in the `allTests` variable.  A comment
below shows what these test objects look like.
*/
// Note: these get turned into Test objects:
let allTests = {
  shotShareIcon: {
    description: "Use a different share icon",
    gaField: "cd7",
    version: 1,
    options: [
      {name: "newicon", probability: 0.1}
    ],
    exclude: ["*"]
  },
  downloadText: {
    description: "Test the effect of removing the word 'Download' from the download button on the shot page",
    gaField: "cd9",
    version: 1,
    options: [
      {name: "no-download-text", probability: 0.1}
    ],
    exclude: ["*"],
    appliesToPublic: true
  }
};

/* Example of how this could be set: */
/*
let allTests = {
  autoOpenSharePanel: {
    description: "Open the share panel immediately after shot creation",
    // Any actions the user does will have this GA field set:
    gaField: "cd3",
    // If the user creates a shot, and then someone else VIEWS that shot, then
    // this field will be set in the viewers events:
    shotField: "cd4",
    // If you make updates (like add an option) and increment this, then users
    // who were previously excluded may get put into a new group:
    version: 1,
    // Exclude the user if they are in any of these tests:
    exclude: ["highlightButtonOnInstall", "myShotsDisplay"],
    // Or exclude them if they are in any test:
    // exclude: ["*"],
    // If you want this A/B test to apply to unauthenticated users:
    appliesToPublic: true,
    // These are the actual allowed A/B options (control is never specified):
    options: [
      // The name of the option, and its probabilty (e.g., 10% chance of getting
      // into this group). This will cause 5% of people to be in autoopen, 5% of
      // people to be in control, and 90% to be in exclude:
      {name: "autoopen", probability: 0.1}
    ]
  },
  highlightButtonOnInstall: {
    description: "Highlight the toolbar button when extension is installed",
    gaField: "cd5",
    version: 1,
    exclude: ["autoOpenSharePanel", "myShotsDisplay"],
    options: [
      {name: "uitour", probability: 0.1}
    ]
  },
  myShotsDisplay: {
    description: "Show My Shots button/CTA differently",
    gaField: "cd6",
    version: 1,
    exclude: ["highlightButtonOnInstall", "autoOpenSharePanel"],
    options: [
      // Note no one will end up in exclude in this example (but 50% will still
      // be control):
      {name: "intropopup", probability: 0.9},
      {name: "blink", probability: 0.1}
    ]
  }
};
*/

// Any test names listed here will get removed from the A/B tests.  Tests should
// be moved here once we are uninterested in any future data from the test:
const deprecatedTests = ["highlightButtonOnInstall", "styleMyShotsButton", "autoOpenSharePanel"];

class Test {
  constructor(options) {
    const requiredFields = ["name", "gaField", "description", "version", "options"];
    const allowedFields = requiredFields.concat(["shotField", "exclude", "appliesToPublic"]);
    for (const required of requiredFields) {
      if (!(required in options)) {
        throw new Error(`Missing constructor field: ${required}`);
      }
    }
    for (const found in options) {
      if (!allowedFields.includes(found)) {
        throw new Error(`Unexpected constructor field: ${found}`);
      }
    }
    Object.assign(this, options);
  }

  updateTest(tests, forceValue, unauthed) {
    if (unauthed && !this.appliesToPublic) {
      return;
    }
    if (forceValue) {
      tests[this.name] = this.testWithValue(forceValue);
    }
    if (tests[this.name] && tests[this.name].version >= this.version) {
      return;
    }
    if (this.shouldExclude(tests)) {
      tests[this.name] = this.testWithValue("exclude");
    } else {
      let prob = getRandom();
      let setAny = false;
      for (const option of this.options) {
        if (prob < option.probability) {
          const controlProb = getRandom();
          if (controlProb < 0.5) {
            tests[this.name] = this.testWithValue("control");
          } else {
            tests[this.name] = this.testWithValue(option.name);
          }
          setAny = true;
          break;
        }
        prob -= option.probability;
      }
      if (!setAny) {
        tests[this.name] = this.testWithValue("exclude");
      }
    }
  }

  testWithValue(value) {
    const result = {value, gaField: this.gaField, version: this.version};
    if (this.shotField) {
      result.shotField = this.shotField;
    }
    return result;
  }

  shouldExclude(tests) {
    const excludes = this.exclude || [];
    for (const testName of excludes) {
      if (tests[testName] && tests[testName].value !== "exclude") {
        return true;
      }
    }
    if (excludes.includes("*")) {
      for (const testName in tests) {
        if (testName !== this.name && tests[testName].value !== "exclude") {
          return true;
        }
      }
    }
    return false;
  }

}

/** Update a user's abTests values.
    The optional forceTests looks like {aTests: "forceValue"} */
exports.updateAbTests = function(tests, forceTests, unauthed) {
  for (const testName in allTests) {
    allTests[testName].updateTest(tests, forceTests && forceTests[testName], unauthed);
  }
  for (const testName of deprecatedTests) {
    if (testName in tests) {
      delete tests[testName];
    }
  }
  return tests;
};

let randomSeq;

exports.setRandomSequenceForTesting = function(seq) {
  seq = seq || undefined;
  if (seq) {
    if (!Array.isArray(seq)) {
      throw new Error("setRandomSequenceForTesting([]) can only take an Array");
    }
    for (const i of seq) {
      if (typeof i !== "number" || i < 0 || i >= 1) {
        throw new Error(`Bad item in array: ${JSON.stringify(i)}`);
      }
    }
  }
  randomSeq = seq;
};

exports.setAllTestsForTesting = function(x) {
  if (x === undefined) {
    allTests = origAllTests;
    return;
  }
  setTests(x);
};

function setTests(tests) {
  const seenFields = {};
  allTests = {};
  for (const testName in tests) {
    const test = new Test(Object.assign({name: testName}, tests[testName]));
    allTests[testName] = test;
    if (seenFields[test.gaField]) {
      throw new Error(`Two tests with field ${test.gaField}`);
    }
    seenFields[test.gaField] = true;
    if (test.shotField) {
      if (seenFields[test.shotField]) {
        throw new Error(`Two tests with field ${test.shotField}`);
      }
      seenFields[test.shotField] = true;
    }
  }
}

setTests(allTests);
const origAllTests = allTests;

function getRandom() {
  if (randomSeq) {
    if (!randomSeq.length) {
      throw new Error("Ran out of testing random numbers");
    }
    const next = randomSeq.shift();
    return next;
  }
  return Math.random();
}

/** Given a test name and test value that were set when a Shot was created (not
    set on the user), return the GA field that should be set for someone viewing
    the shot (or null if nothing should be set) */
exports.shotGaFieldForValue = function(testName, testValue) {
  if (deprecatedTests.includes(testName)) {
    // Silently ignore deprecated tests
    return null;
  }
  const test = allTests[testName];
  if (!test) {
    console.error("Test name", testName, "is not known");
    return null;
  }
  return test.shotField || null;
};
