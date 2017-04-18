// Note: these get turned into Test objects:
let allTests = {
  highlightButtonOnInstall: {
    description: "Highlight the toolbar button when extension is installed",
    gaField: "cd3",
    version: 1,
    exclude: ["styleMyShotsButton", "autoOpenSharePanel"],
    options: [
      {name: "badge", probability: 0.1}
    ]
  },
  styleMyShotsButton: {
    description: "Style the My Shots button in some different way",
    gaField: "cd4",
    version: 1,
    exclude: ["highlightButtonOnInstall", "autoOpenSharePanel"],
    options: [
      {name: "bright", probability: 0.111}
    ]
  },
  autoOpenSharePanel: {
    description: "Auto-open the share panel to see how it affects sharing",
    gaField: "cd5",
    shotField: "cd6",
    version: 1,
    exclude: ["styleMyShotsButton", "highlightButtonOnInstall"],
    options: [
      {name: "autoopen", probability: 0.125}
    ]
  }
};

/* Example of how this could be set (until we have real tests to serve as docs): */
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
    // who were previously in the control group may get put into a new group:
    version: 1,
    // Keep the user in control if they aren't in control in any of these tests:
    exclude: ["highlightButtonOnInstall", "myShotsDisplay"],
    // These are the actual allowed A/B options (control is never specified):
    options: [
      // The name of the option, and its probabilty (e.g., 10% chance of getting
      // into this group)
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
      // Note no one will end up in control in this example:
      {name: "intropopup", probability: 0.9},
      {name: "blink", probability: 0.1}
    ]
  }
};
*/

// Any test names listed here will get removed from the A/B tests.  Tests should
// be moved here once we are uninterested in any future data from the test:
let deprecatedTests = [];

class Test {
  constructor(options) {
    let requiredFields = ['name', 'gaField', 'description', 'version', 'options'];
    let allowedFields = requiredFields.concat(['shotField', 'exclude']);
    for (let required of requiredFields) {
      if (!(required in options)) {
        throw new Error(`Missing constructor field: ${required}`);
      }
    }
    for (let found in options) {
      if (!allowedFields.includes(found)) {
        throw new Error(`Unexpected constructor field: ${found}`);
      }
    }
    Object.assign(this, options);
  }

  updateTest(tests, forceValue) {
    if (forceValue) {
      tests[this.name] = this.testWithValue(forceValue);
    }
    if (tests[this.name] && tests[this.name].version >= this.version) {
      return;
    }
    if (this.shouldExclude(tests)) {
      tests[this.name] = this.testWithValue("control");
    } else {
      let prob = getRandom();
      let setAny = false;
      for (let option of this.options) {
        if (prob < option.probability) {
          tests[this.name] = this.testWithValue(option.name)
          setAny = true;
          break;
        }
        prob -= option.probability;
      }
      if (!setAny) {
        tests[this.name] = this.testWithValue("control");
      }
    }
  }

  testWithValue(value) {
    let result = {value, gaField: this.gaField, version: this.version};
    if (this.shotField) {
      result.shotField = this.shotField;
    }
    return result;
  }

  shouldExclude(tests) {
    for (let testName of this.exclude) {
      if (tests[testName] && tests[testName].value !== "control") {
        return true;
      }
    }
    return false;
  }

}

/** Update a user's abTests values.
    The optional forceTests looks like {aTests: "forceValue"} */
exports.updateAbTests = function(tests, forceTests) {
  for (let testName in allTests) {
    allTests[testName].updateTest(tests, forceTests && forceTests[testName]);
  }
  for (let testName of deprecatedTests) {
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
    for (let i of seq) {
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
  let seenFields = {};
  allTests = {};
  for (let testName in tests) {
    let test = new Test(Object.assign({name: testName}, tests[testName]));
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
let origAllTests = allTests;

function getRandom() {
  if (randomSeq) {
    if (!randomSeq.length) {
      throw new Error("Ran out of testing random numbers");
    }
    let next = randomSeq.shift();
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
  let test = allTests[testName];
  if (!test) {
    console.error("Test name", testName, "is not known");
    return null;
  }
  return test.shotField || null;
};
