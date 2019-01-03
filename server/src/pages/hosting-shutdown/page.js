const { Page } = require("../../reactruntime");
const viewModule = require("./view");

exports.page = new Page({
  dir: __dirname,
  viewModule,
  noBrowserJavascript: true,
});
