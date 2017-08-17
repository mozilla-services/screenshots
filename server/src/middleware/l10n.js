require("../logging").installConsoleHandler();
const mozlog = require("../logging").mozlog("l10n-middleware");
const accepts = require("accepts");
const l10n = require("../l10n");

// Get an ordered list of user-preferred locales from the Accept-Language header
exports.getLanguages = function(req) {
  let languages = accepts(req).languages();
  // 'accepts' returns '*' if no Accept-Language header was passed. Use English
  // as a default instead. #3231
  if (languages[0] === '*') {
    languages = ['en-US'];
  }
  return languages;
};

exports.l10n = function(req, res, next) {
  l10n.init().then(() => {
    let languages = exports.getLanguages(req);
    req.getText = l10n.getText(languages);
    req.userLocales = l10n.getUserLocales(languages);
    req.messages = l10n.getStrings(languages);
    next();
  }).catch(err => {
    mozlog.error("l10n-middleware-error", {msg: "Error initializing l10n", description: err});
    process.exit(2);
  });
};
