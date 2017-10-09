const assert = require('assert');
const l10n = require('../../../server/src/l10n.js');

/* globals describe, it */

describe('l10n', () => {
  describe('getUserLocales', () => {
    it('should fall back to en-US if requested language has no localization', () => {
      let locales = l10n.getUserLocales(['yo-LO']);
      assert.ok(locales.includes('en-US'));
    });
    it('should fall back to en-US if requested language is missing', () => {
      let locales = l10n.getUserLocales([]);
      assert.ok(locales.includes('en-US'));
    });
  });
});
