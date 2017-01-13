// Note: these get turned into Test objects:
let allTests = {
  autoOpenSharePanel: {
    description: "Open the share panel immediately after shot creation",
    gaField: "cd3",
    shotField: "cd4",
    version: 2,
    exclude: ["highlightButtonOnInstall", "myShotsDisplay"],
    options: [
      {name: "autoopen", probability: 0.9}
    ]
  },
  highlightButtonOnInstall: {
    description: "Highlight the Page Shot button when Page Shot is installed",
    gaField: "cd5",
    version: 2,
    exclude: ["autoOpenSharePanel", "myShotsDisplay"],
    options: [
      {name: "uitour", probability: 0.9}
    ]
  },
  myShotsDisplay: {
    description: "Show My Shots button/CTA differently",
    gaField: "cd6",
    version: 2,
    exclude: ["highlightButtonOnInstall", "autoOpenSharePanel"],
    options: [
      {name: "intropopup", probability: 0.9},
      {name: "blink", probability: 0.1}
    ]
  }
};

let deprecatedTests = ["exampleTest"];

class Test {
  constructor(options) {
    let requiredFields = ['name', 'gaField', 'description', 'version', 'options'];
    let allowedFields = requiredFields.concat(['shotField', 'exclude']);
    for (let required of requiredFields) {
      if (! (required in options)) {
        throw new Error(`Missing constructor field: ${required}`);
      }
    }
    for (let found in options) {
      if (! allowedFields.includes(found)) {
        throw new Error(`Unexpected constructor field: ${found}`);
      }
    }
    Object.assign(this, options);
  }

  updateTest(tests) {
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
      if (! setAny) {
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

exports.updateAbTests = function (tests) {
  for (let testName in allTests) {
    allTests[testName].updateTest(tests);
  }
  for (let testName of deprecatedTests) {
    if (testName in tests) {
      delete tests[testName];
    }
  }
  return tests;
};

let randomSeq;

exports.setRandomSequenceForTesting = function (seq) {
  seq = seq || undefined;
  if (seq) {
    if (! Array.isArray(seq)) {
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

exports.setAllTestsForTesting = function (x) {
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
    if (! randomSeq.length) {
      throw new Error("Ran out of testing random numbers");
    }
    let next = randomSeq.shift();
    return next;
  }
  return Math.random();
}
