const { Cc, Ci } = require("chrome");

exports.randomStringChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

exports.randomString = function (length, chars) {
  chars = chars || exports.randomStringChars;
  let rng = Cc["@mozilla.org/security/random-generator;1"]
              .createInstance(Ci.nsIRandomGenerator);
  let bytes = rng.generateRandomBytes(length);
  let result = "";
  for (let i=0; i<bytes.length; i++) {
    result += chars.charAt(bytes[i] % chars.length);
  }
  return result;
};
