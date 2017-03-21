/* globals catcher */

window.clipboard = (function () {
  let exports = {};

  exports.copy = function (text) {
    if(!text) {
      catcher.unhandled(new Error("Screenshot could not be saved"));
      return false;
    }
    let el = document.createElement("textarea");
    document.body.appendChild(el);
    el.value = text;
    el.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(el);
    if (!copied) {
      catcher.unhandled(new Error("Clipboard copy failed"));
    }
    return copied;
  };

  return exports;
})();
null;
