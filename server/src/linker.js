
let gitRevision;

exports.init = function() {
  gitRevision = require("./build-time").gitrevision;
  return Promise.resolve(gitRevision);
};

exports.setGitRevision = function(rev) {
  gitRevision = rev;
};

exports.getGitRevision = function() {
  return gitRevision;
};

exports.staticLink = function(req, resource) {
  if (!resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.endsWith(".css")) {
    resource = resource.replace(/\.css$/, `${req.isRtl ? ".rtl" : ".ltr"}.css`);
  }
  return `${req.cdn}${resource}?rev=${gitRevision}`;
};

exports.staticLink.simple = function(resource) {
  if (!resource.startsWith("/")) {
    resource = "/" + resource;
  }
  return resource;
};

exports.imageLink = function(urlBase, resource) {
  if (!resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/images")) {
    throw new Error("imageLink URL should not start with /images: " + resource);
  }
  return urlBase + "/images" + resource;
};
