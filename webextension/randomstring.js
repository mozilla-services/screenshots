/** Similar to addon/lib/randomstring, but uses Math.random */
/* exported randomString */

function randomString(length, chars) { // eslint-disable-line no-unused-vars
  let randomStringChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  chars = chars || randomStringChars;
  let result = "";
  for (let i=0; i<length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
