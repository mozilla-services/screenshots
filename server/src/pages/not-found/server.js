const reactrender = require("../../reactrender");

exports.notFound = function(req, res) {
  const page = require("./page").page;
  res.status(404);
  reactrender.render(req, res, page);
};
