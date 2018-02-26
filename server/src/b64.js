exports.b64EncodeJson = function(obj) {
  obj = JSON.stringify(obj);
  const buffer = new Buffer(obj, "binary");
  return buffer.toString("base64");
};

exports.b64DecodeJson = function(b64) {
  const string = new Buffer(b64, "base64").toString("binary");
  return JSON.parse(string);
};
