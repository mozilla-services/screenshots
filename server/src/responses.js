const config = require("./config").getProperties();
const { captureRavenException } = require("./ravenclient");
const mozlog = require("./logging").mozlog("server");

exports.simpleResponse = function(res, message, status) {
  status = status || 200;
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.status(status);
  res.send(message);
};

exports.jsResponse = function(res, jsstring) {
  res.header("Content-Type", "application/javascript; charset=utf-8")
  res.send(jsstring);
};

exports.errorResponse = function(res, message, err) {
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.status(500);
  if (config.showStackTraces) {
    if (err) {
      message += "\n" + err;
      if (err.stack) {
        message += "\n\n" + err.stack;
      }
    }
    res.send(message);
  } else {
    res.send("Server error");
  }
  mozlog.error("generic-error-response", {msg: message, error: err});
  captureRavenException(err, res.req);
};
