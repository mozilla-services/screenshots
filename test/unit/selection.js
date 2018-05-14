const assert = require("assert");
const { Selection } = require("../../shared/selection");

/* globals describe, it */

describe("Selection", () => {
  describe("constructor", () => {
    it("should take four arguments in the form of x1, y1, x2, y2", () => {
      const x1 = 0, y1 = 0, x2 = 100, y2 = 100;
      const selection = new Selection(x1, y1, x2, y2);
      assert.strictEqual(selection.top, 0);
      assert.strictEqual(selection.left, 0);
    });
    it("should take the two points in either order", () => {
      const x2 = 0, y2 = 0, x1 = 100, y1 = 100;
      const selection = new Selection(x1, y1, x2, y2);
      assert.strictEqual(selection.top, 0);
      assert.strictEqual(selection.left, 0);
    });
  });

  describe("setters and getters", () => {
    let selection;
    const x1 = 64, y1 = 64, x2 = 256, y2 = 256;

    beforeEach(() => {
      selection = new Selection(x1, y1, x2, y2);
    });

    it("should set and return a correct top value", () => {
      assert.strictEqual(selection.top, 64);
      selection.top = 128;
      assert.strictEqual(selection.top, 128);
      selection.top = 1024;
      assert.strictEqual(selection.top, 256);
    });

    it("should set and return a correct bottom value", () => {
      assert.strictEqual(selection.bottom, 256);
      selection.bottom = 1024;
      assert.strictEqual(selection.bottom, 1024);
      selection.bottom = 8;
      assert.strictEqual(selection.bottom, 64);
    });

    it("should set and return a correct left value", () => {
      assert.strictEqual(selection.left, 64);
      selection.left = 128;
      assert.strictEqual(selection.left, 128);
      selection.left = 512;
      assert.strictEqual(selection.left, 256);
    });

    it("should set and return a correct right value", () => {
      assert.strictEqual(selection.right, 256);
      selection.right = 512;
      assert.strictEqual(selection.right, 512);
      selection.right = 8;
      assert.strictEqual(selection.right, 64);
    });

    it("should return the correct width", () => {
      assert.strictEqual(selection.width, 192);
      selection.right = 192;
      assert.strictEqual(selection.width, 128);
      selection.left = 128;
      assert.strictEqual(selection.width, 64);
    });

    it("should return the correct height", () => {
      assert.strictEqual(selection.height, 192);
      selection.bottom = 192;
      assert.strictEqual(selection.height, 128);
      selection.top = 128;
      assert.strictEqual(selection.height, 64);
    });
  });

  describe("rect", () => {
    it("should return a {top, left, bottom, right} object", () => {
      const selection = new Selection(0, 0, 100, 100);
      const {top, left, bottom, right} = selection.rect();
      assert.strictEqual(top, 0);
      assert.strictEqual(left, 0);
      assert.strictEqual(bottom, 100);
      assert.strictEqual(right, 100);
    });
  });

  describe("union", () => {
    it("should create a Selection that encloses the two original selections", () => {
      const a = new Selection(0, 0, 100, 100);
      const b = new Selection(50, 50, 300, 300);
      const c = a.union(b);
      assert.strictEqual(c.top, 0);
      assert.strictEqual(c.left, 0);
      assert.strictEqual(c.bottom, 300);
      assert.strictEqual(c.right, 300);
    });
  });

  describe("clone", () => {
    it("should a cloned instance of the Selection object", () => {
      const original = new Selection(0, 0, 1, 1);
      const clone = original.clone();
      assert.deepStrictEqual(original, clone);
    });
  });

  describe("toJSON", () => {
    it("should return a {left, right, top, bottom} object", () => {
      const selection = new Selection(0, 0, 10, 10);
      const json = selection.toJSON();
      assert.deepEqual(json, {left: 0, right: 10, top: 0, bottom: 10});
    });
  });

  describe("getBoundingClientRect", () => {
    it("should create a Selection from the argument's bounding rect", () => {
      assert.strictEqual(Selection.getBoundingClientRect({}), null);

      const noBoundingRect = {getBoundingClientRect: () => false};
      assert.strictEqual(Selection.getBoundingClientRect(noBoundingRect), null);

      const mockEl = {getBoundingClientRect: () => ({ left: 0, top: 0, right: 128, bottom: 128 })};
      const selection = Selection.getBoundingClientRect(mockEl);
      assert.strictEqual(selection.left, 0);
      assert.strictEqual(selection.top, 0);
      assert.strictEqual(selection.right, 128);
      assert.strictEqual(selection.bottom, 128);
    });
  });
});
