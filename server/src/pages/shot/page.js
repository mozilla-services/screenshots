const { Page } = require("../../reactruntime");

exports.page = new Page({
  dir: __dirname,
  viewModule: require("./view.js"),
  extraBodyJavascript: `
(function () {
  var el = document.getElementById("clipImage");
  if (el) {
    el.addEventListener("load", function () {
      el.style.display = 'inline';
      var spinner = document.getElementById("spinner");
      if (spinner) {
        spinner.style.display = 'none';
      }
    }, false);
  }
})();
`
});
