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

exports.setGitRevision = function (rev) {
  gitRevision = rev;
};

exports.getGitRevision = function () {
  return gitRevision;
};

exports.staticLink = function (resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/static")) {
    throw new Error("staticLink URL should not start with /static: " + resource);
  }
  return "/static" + resource + "?rev=" + gitRevision;
};

exports.staticLinkWithHost = function (req, resource) {
  return req.protocol + "://" + req.headers.host + exports.staticLink(resource);
};

exports.imageLink = function (urlBase, resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/images")) {
    throw new Error("imageLink URL should not start with /images: " + resource);
  }
  return urlBase + "/images" + resource;
};

exports.contentLink = function (urlBase, resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/content")) {
    throw new Error("imageLink URL should not start with /content: " + resource);
  }
  return urlBase + "/content" + resource;
};
