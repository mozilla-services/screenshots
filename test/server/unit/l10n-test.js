const assert = require("assert");
const l10n = require("../../../server/src/l10n.js");

const localeData = {
  "al-GO": "abc = 123\n",
  "bb-MO": "abc = 321\nsoccer = football\n",
  "cb-gb": "abc = ABC\n",
  "en-US": "abc = abc\n",
  "he": "abc = abc\n",
};

/* globals describe, it */

describe("l10n", () => {
  before(() => {
    return l10n.init(localeData);
  });
  describe("getUserLocales", () => {
    it("should fall back to en-US if requested language has no localization", () => {
      const locales = l10n.getUserLocales(["yo-LO"]);
      assert.ok(locales.includes("en-US"));
    });
    it("should fall back to en-US if requested language is missing", () => {
      const locales = l10n.getUserLocales([]);
      assert.ok(locales.includes("en-US"));
    });
    it("should include default en-US locale if requested locales exist", () => {
      const locales = l10n.getUserLocales(["al-GO", "bb-MO"]);
      assert.ok(locales.includes("en-US"));
    });
  });
  describe("getText", () => {
    it("should return the first available formatted message for the given L10n ID", () => {
      const getText = l10n.getText(["al-GO", "bb-MO"]);
      assert.equal(getText("abc"), "123");
      assert.equal(getText("soccer"), "football");
    });
    it("should return an empty string when a L10n ID is not found", () => {
      const getText = l10n.getText(["al-GO", "bb-MO"]);
      assert.equal(getText("xyz"), "");
    });
  });
  describe("getString", () => {
    it("should return the L10n strings of available locales", () => {
      const given = l10n.getStrings(["no-PE", "bb-MO"]);
      assert.equal(given["bb-MO"], localeData["bb-MO"]);
    });
    it("should always return the default en-US L10n string", () => {
      const given = l10n.getStrings(["no-PE", "go-TO"]);
      assert.deepEqual(given, {"en-US": localeData["en-US"]});
    });
  });
  describe("getIsRtl", () => {
    it("should be truthy for he, ar, fa, ur", () => {
      assert(l10n.getIsRtl(["he-IL", "en-US"]));
    });
    it("should be falsy for other locales", () => {
      assert(!l10n.getIsRtl(["en-US", "he-il"]));
    });
  });
});
