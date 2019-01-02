const reactrender = require("../../reactrender");

exports.app = function(req, res) {
  const page = require("./page").page;
  reactrender.render(req, res, page);
};
