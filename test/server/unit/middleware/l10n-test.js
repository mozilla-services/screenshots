const assert = require('assert');
const l10n = require('../../../../server/src/middleware/l10n.js');

/* globals describe, it */

describe('l10n middleware', () => {
  describe('getLanguage function (Accept-Language header parsing)', () => {
    it('should return ["en-US"] if Accept-Language header is missing', () => {
      const mockRequest = { headers: {} };
      const results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
    it('should return ["en-US"] if Accept-Language header value is "*"', () => {
      const mockRequest = { headers: { 'accept-language': '*' }};
      const results = l10n.getLanguages(mockRequest);
      assert(results.length === 1);
      assert.equal('en-US', results[0]);
    });
  });
});
