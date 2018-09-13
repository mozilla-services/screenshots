const { Page } = require("../../reactruntime");

exports.page = new Page({
  dir: __dirname,
  viewModule: require("./view.js"),
});
