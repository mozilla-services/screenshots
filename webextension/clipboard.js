window.clipboard = (function () {
  let exports = {};

  exports.copy = function (text) {
    let el = document.createElement("textarea");
    document.body.appendChild(el);
    el.value = text;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return exports;
})();
