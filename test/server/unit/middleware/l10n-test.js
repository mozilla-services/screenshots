const assert = require('assert');
const l10n = require('../../../../server/src/middleware/l10n.js');

/* globals describe, it */

describe('l10n middleware', () => {
  describe('getLanguage function (Accept-Language header parsing)', () => {
    it('should return ["en-US"] if Accept-Language header is missing', () => {
      let mockRequest = { headers: {} };
      let results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
    it('should return ["en-US"] if Accept-Language header value is "*"', () => {
      let mockRequest = { headers: { 'Accept-Language': '*' }};
      let results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
    it('should return ["en-US"] if Accept-Language header value is "en-CA"', () => {
      let mockRequest = { headers: { 'Accept-Language': 'en-CA' }};
      let results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
    it('should return ["en-US"] if Accept-Language header value is "en"', () => {
      let mockRequest = { headers: { 'Accept-Language': 'en' }};
      let results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
  });
});
