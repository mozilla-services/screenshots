const assert = require("assert");
const { getFirefoxVersion, isMobile } = require("../../../../../server/src/pages/homepage/model.js");

/* globals describe, it */

describe("homepage model", () => {
  describe("getFirefoxVersion User Agent string check", () => {
    it('should return "57" for Desktop Firefox 57 on Mac', () => {
      const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0";
      assert.equal(57, getFirefoxVersion(ua));
    });
    it("should return null for Chrome 60.0.3112.113 on Mac", () => {
      const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";
      assert.equal(null, getFirefoxVersion(ua));
    });
    it("should return null for Edge 40.15063.0.0 on Win 10", () => {
      const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063";
      assert.equal(null, getFirefoxVersion(ua));
    });
    it("should return null for IE 11 on Win 10", () => {
      const ua = "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko";
      assert.equal(null, getFirefoxVersion(ua));
    });
  });
  describe("isMobile User Agent string check", () => {
    it("should return false for Desktop Firefox 57", () => {
      const ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0";
      assert.equal(false, isMobile(ua));
    });
    it("should return true for Phone Fennec", () => {
      // from https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox#Android_(version_41_and_above)
      const ua = "Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0";
      assert.equal(true, isMobile(ua));
    });
    it("should return true for Tablet Fennec", () => {
      // from https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent/Firefox#Android_(version_41_and_above)
      const ua = "Mozilla/5.0 (Android 4.4; Tablet; rv:41.0) Gecko/41.0 Firefox/41.0";
      assert.equal(true, isMobile(ua));
    });
  });
});
