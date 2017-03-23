/* exported randomString */

window.randomString = function randomString(length, chars) {
  let randomStringChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  chars = chars || randomStringChars;
  let result = "";
  for (let i=0; i<length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};
null;
