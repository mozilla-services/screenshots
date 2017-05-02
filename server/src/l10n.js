require("fluent-intl-polyfill/compat");
const { MessageContext } = require("fluent/compat");
const negotiateLanguages = require("fluent-langneg/compat");

// TODO: is there a less memory-intensive alternative, here?
// maybe lazily fetch separate properties files from a CDN?
function getStrings() {
  // TODO: generate an object of the form:
  // { 'en-US': { l10nKey: 'l10nString' },
  //   'foo': { l10Key: 'l10nStringFooed' } }
}

export function* generateMessages(userLocales) {
  const currentLocales = negotiateLanguages(
    userLocales,
    ['en-US'],
    { defaultLocale: 'en-US' }
  );

  const STRINGS = getStrings();

  for (const locale of currentLocales) {
    const cx = new MessageContext(locale);
    cx.addMessages(STRINGS[locale]);
    yield cx;
  }
}
