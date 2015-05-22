const git = require('git-rev');

let gitRevision;

exports.init = function () {
  return new Promise((resolve, reject) => {
    git.long((rev) => {
      gitRevision = rev;
      resolve(rev);
    });
  });
};

exports.staticLink = function (req, resource) {
  if (resource.charAt(0) != "/") {
    resource = "/" + resource;
  }
  if (resource.startsWith("/static")) {
    throw new Error("staticLink URL should not start with /static: " + resource);
  }
  return "//" + req.headers.host + "/static" + resource + "?rev=" + gitRevision;
};
