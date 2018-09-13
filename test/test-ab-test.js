const assert = require("assert");
const abTests = require("../server/src/ab-tests.js");

describe("Test Screenshots", function() {

  before(() => {
    abTests.setAllTestsForTesting({
      simpleTest: {
        gaField: "cd3",
        description: "Test without conflicts",
        version: 1,
        exclude: [],
        options: [
          {
            name: "bright",
            probability: 0.3,
          },
          {
            name: "dark",
            probability: 0.3,
          },
        ],
      },
      breakEverythingTest: {
        gaField: "cd4",
        shotField: "cd5",
        description: "Test with conflicts",
        version: 2,
        exclude: ["*"],
        options: [
          {
            name: "fireworks",
            probability: 0.1,
          },
          {
            name: "strobe",
            probability: 0.1,
          },
        ],
      },
    });
    abTests.setRandomSequenceForTesting([]);
  });

  after(() => {
    abTests.setAllTestsForTesting(undefined);
    abTests.setRandomSequenceForTesting(undefined);
  });

  it("should set all to exclude when low probability", () => {
    abTests.setRandomSequenceForTesting([0.9, 0.9]);
    const tests = abTests.updateAbTests({});
    assert.deepEqual(tests, {
      simpleTest: {value: "exclude", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "exclude", gaField: "cd4", shotField: "cd5", version: 2},
    });
  });

  it("should set some to control instead of a test", () => {
    abTests.setRandomSequenceForTesting([0.1, 0.1]);
    const tests = abTests.updateAbTests({});
    assert.deepEqual(tests, {
      simpleTest: {value: "control", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "exclude", gaField: "cd4", shotField: "cd5", version: 2},
    });
  });


  it("should not overwrite existing values", () => {
    const tests = abTests.updateAbTests({
      simpleTest: {value: "control", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "control", gaField: "cd4", shotField: "cd5", version: 2},
    });
    assert.deepEqual(tests, {
      simpleTest: {value: "control", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "control", gaField: "cd4", shotField: "cd5", version: 2},
    });
  });

  it("should exclude the second test when the first is selected", () => {
    let tests = abTests.updateAbTests({
      simpleTest: {value: "bright", gaField: "cd3", version: 1},
    });
    assert.deepEqual(tests, {
      simpleTest: {value: "bright", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "exclude", gaField: "cd4", shotField: "cd5", version: 2},
    });
    abTests.setRandomSequenceForTesting([0.35, 0.75]);
    tests = abTests.updateAbTests({});
    assert.deepEqual(tests, {
      simpleTest: {value: "dark", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "exclude", gaField: "cd4", shotField: "cd5", version: 2},
    });
  });

  it("should try to take someone out of exclude when version is bumped", () => {
    abTests.setRandomSequenceForTesting([0.15, 0.75]);
    const tests = abTests.updateAbTests({
      simpleTest: {value: "exclude", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "exclude", gaField: "cd4", shotField: "cd5", version: 1},
    });
    assert.deepEqual(tests, {
      simpleTest: {value: "exclude", gaField: "cd3", version: 1},
      breakEverythingTest: {value: "strobe", gaField: "cd4", shotField: "cd5", version: 2},
    });
  });

});
