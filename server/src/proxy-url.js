const dbschema = require("./dbschema");
const config = require("./config").getProperties();
const { isValidClipImageUrl } = require("../shared/shot");
const { URL } = require("url");

exports.createProxyUrl = function(req, url, hash) {
  const base = `${req.protocol}://${config.contentOrigin}`;
  const sig = dbschema.getKeygrip("proxy-url").sign(new Buffer(url, "utf8"));
  let proxy = `${base}/proxy?url=${encodeURIComponent(url)}&sig=${encodeURIComponent(sig)}`;
  if (hash) {
    proxy += "#" + hash;
  }
  return proxy;
};

exports.createDownloadUrl = function(url, filename) {
  const path = (new URL(url)).pathname;
  const sig = dbschema.getKeygrip("download-url").sign(new Buffer(`${path} ${filename}`, "utf8"));
  if (!isValidClipImageUrl(url)) {
      return "";
  }
  return `${url}?download=${encodeURIComponent(filename)}&sig=${encodeURIComponent(sig)}`;
};
