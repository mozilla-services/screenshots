const fs = require("fs");
const path = require("path");
const globby = require("globby");
require("fluent-intl-polyfill/compat");
const negotiateLanguages = require("fluent-langneg/compat");
const { MessageContext } = require("fluent/compat");
const mozlog = require("./logging").mozlog("l10n");

let userLangs;
exports.userLangs = userLangs;
const contexts = [];
let inited = false;

exports.init = function(userLocales = []) {
  if (inited) {
    return Promise.resolve();
  }
  inited = true;
  exports.userLangs = userLocales;
  return _getLocales(userLocales).then(locales => {
    // module-global assignment
    exports.userLangs = locales;

    const mcPromises = [];
    exports.userLangs.forEach(lang => {
      const mc = new MessageContext(lang);
      mcPromises.push(new Promise((resolve, reject) => {
        const filename = path.join(__dirname, '..', '..', 'locales', lang, 'server.ftl');
        fs.readFile(filename, 'utf-8', (err, data) => {
          if (err) { return reject(err); }
          mc.addMessages(data);
          contexts[lang] = mc;
          resolve(mc);
        });
      }));
    });
    return Promise.all(mcPromises);
  }).catch(err => {
    mozlog.error('l10n-init-failed', {err});
  });
};

exports.getText = function(l10nID, args) {
  if (!inited) { exports.init(); }
  // Find the first MessageContext with the l10n ID, in order of user preference.
  for (let lang of exports.userLangs) {
    if (contexts[lang].hasMessage(l10nID)) {
      let msg = contexts[lang].getMessage(l10nID);
      return contexts[lang].format(msg, args);
    }
  }
  return null;
};

exports.getStrings = function(userLocales) {
  return _getLocales(userLocales).then(locales => {
    const ftlPromises = [];
    locales.forEach(locale => {
      ftlPromises.push(new Promise((resolve, reject) => {
        const filename = path.join(__dirname, '..', '..', 'locales', locale, 'server.ftl');
        fs.readFile(filename, 'utf-8', (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve({locale, data});
        });
      }));
    });
    return Promise.all(ftlPromises);
  }).then(ftls => {
    let strings = {};
    ftls.forEach(ftl => {
      strings[ftl.locale] = ftl.data;
    });
    return strings;
  });
};

function _getLocales(requestedLocales) {
  return _getAvailableLocales().then(availableLocales => {
    const locales = negotiateLanguages(
      exports.userLangs,
      availableLocales,
      { defaultLocale: 'en-US' }
    );
    return locales;
  });
}

// Returns a Promise that resolves to a list of languages for which
// there exists a 'server.ftl' file inside the top-level 'locales' dir.
function _getAvailableLocales() {
  const localesGlob = path.join(__dirname, '..', '..', 'locales') + path.normalize('/*/server.ftl');
  return globby(localesGlob).then(paths => {
    // paths contains strings of the form '/path/to/screenshots/locales/en-US/server.ftl'.
    // To get the locale, get the next-to-last piece of the path.
    return paths.map(path => {
      const locale = path.split('/').slice(-2, -1);
      return locale;
    });
  });
}

