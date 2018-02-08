const path = require("path");
const globby = require("globby");
require("fluent-intl-polyfill/compat");
const { negotiateLanguages } = require("fluent-langneg/compat");
const { MessageContext } = require("fluent/compat");
const mozlog = require("./logging").mozlog("l10n");

const rawStrings = {};
const messagesContexts = {};

let initPromise;
exports.init = function(localeStringMap) {
  if (initPromise) {
    return initPromise;
  }

  // this is mainly for passing in test data
  if (localeStringMap) {
    return useLocaleData(localeStringMap)
  }

  const localesGlob = path.join(__dirname, "static", "locales", "*.js");

  initPromise = globby(localesGlob).then(paths => {
    if (!paths.length) {
      const err = `No locales found at path glob ${localesGlob}`;
      mozlog.error("l10n-locale-globbing-error", {err});
      return Promise.reject(err);
    }
    return Promise.all(paths.map(path => {
      return new Promise((resolve, reject) => {
        // path is of the form "static/locales/en-US.js".
        // To get the locale, get the filename without the extension.
        const locale = path.split("/").slice(-1).toString().split(".")[0];
        if (!locale) {
          const err = `Unable to parse locale from path ${path}`;
          mozlog.error("l10n-locale-parsing-error", {err});
          reject(err);
          return;
        }
        rawStrings[locale] = require(`./static/locales/${locale}`).messages;
        resolve();
      });
    }));
  });
  return initPromise;
};

exports.getText = function(locales) {
  const contexts = {};
  const availableLocales = exports.getUserLocales(locales);

  availableLocales.forEach((locale) => {
    contexts[locale] = getMessageContext(locale);
  });

  return function(l10nID, args) {
    for (const locale of availableLocales) {
      if (contexts[locale].hasMessage(l10nID)) {
        const msg = contexts[locale].getMessage(l10nID);
        return contexts[locale].format(msg, args);
      }
    }
    return "";
  }
};

exports.getUserLocales = function(requestedLocales) {
  return negotiateLanguages(
    requestedLocales,
    Object.keys(rawStrings),
    { defaultLocale: "en-US" }
  );
};

exports.getStrings = function(locales) {
  const availableLocales = exports.getUserLocales(locales);
  const strings = {};
  availableLocales.forEach((locale) => {
    if (locale in rawStrings) {
      strings[locale] = rawStrings[locale];
    }
  });
  return strings;
};

function useLocaleData(localeStringMap) {
  Object.keys(localeStringMap).forEach(x => {
    rawStrings[x] = localeStringMap[x];
  });
  initPromise = Promise.resolve();
  return initPromise;
}

function getMessageContext(locale) {
  if (!messagesContexts[locale]) {
    const mc = new MessageContext(locale);
    mc.addMessages(rawStrings[locale]);
    messagesContexts[locale] = mc;
  }

  return messagesContexts[locale];
}
