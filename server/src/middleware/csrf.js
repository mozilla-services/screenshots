const csrf = require("csurf");
const mozlog = require("../logging").mozlog("csrf-middleware");
const { captureRavenException } = require("../ravenclient");
const { simpleResponse } = require("../responses");

exports.csrfProtection = csrf({cookie: {httpOnly: true, secure: true, sameSite: 'lax', key: '__Host-csrf'}});

exports.csrf = function(req, res, next) {
  // The cookies library doesn't detect duplicates; check manually
  let rawCookies = req.get("cookie") || "";
  let pairs = rawCookies.split(";");
  let csrfTokens = pairs.filter(item => item.match(/__Host-csrf=/));
  if (csrfTokens.length > 1) {
    let exc = new Error("Duplicate CSRF cookies");
    exc.headerValue = rawCookies;
    captureRavenException(exc);
    simpleResponse(res, "Bad request", 400);
  }
  req.cookies._csrf = req.cookies.get("__Host-csrf"); // csurf expects a property
  next();
};

exports.csrfErrorHandler = function(err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") {
    next();
  }
  mozlog.info("bad-csrf", {id: req.ip, url: req.url});
  res.status(403);
  res.type("text");
  res.send("Bad CSRF Token")
};
