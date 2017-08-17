const fs = require("fs");
const path = require("path");
const globby = require("globby");
require("fluent-intl-polyfill/compat");
const { negotiateLanguages } = require("fluent-langneg/compat");
const { MessageContext } = require("fluent/compat");
const mozlog = require("./logging").mozlog("l10n");

const rawStrings = {};

let initPromise;
exports.init = function() {
  if (initPromise) {
    return initPromise;
  }
  const localesGlob = path.join(__dirname, "..", "..", "locales") + path.normalize("/*/server.ftl");

  initPromise = globby(localesGlob).then(paths => {
    if (!paths.length) {
      let err = `No locales found at path glob ${localesGlob}`;
      mozlog.error("l10n-locale-globbing-error", {err});
      return Promise.reject(err);
    }
    return Promise.all(paths.map(path => {
      return new Promise((resolve, reject) => {
        // path is of the form "/path/to/screenshots/locales/en-US/server.ftl".
        // To get the locale, get the next-to-last piece of the path.
        let locale = path.split("/").slice(-2, -1);
        if (!locale) {
          let err = `Unable to parse locale from ftl path ${path}`;
          mozlog.error("l10n-locale-parsing-error", {err});
          reject(err);
          return;
        }
        fs.readFile(path, "utf-8", (err, data) => {
          if (err) {
            mozlog.error("l10n-ftl-loading-error", {err});
            reject(err);
            return;
          }
          rawStrings[locale] = data;
          resolve();
        });
      });
    }));
  });
  return initPromise;
};

exports.getText = function(locales) {
  let contexts = {};
  let availableLocales = exports.getUserLocales(locales);

  availableLocales.forEach((locale) => {
    let mc = new MessageContext(locale);
    mc.addMessages(rawStrings[locale]);
    contexts[locale] = (mc);
  });

  return function(l10nID, args) {
    for (let locale of availableLocales) {
      if (contexts[locale].hasMessage(l10nID)) {
        let msg = contexts[locale].getMessage(l10nID);
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
  let availableLocales = exports.getUserLocales(locales);
  let strings = {};
  availableLocales.forEach((locale) => {
    if (locale in rawStrings) {
      strings[locale] = rawStrings[locale];
    }
  });
  return strings;
};
