const assert = require("assert");
const csrf = require("csurf");
const mozlog = require("../logging").mozlog("csrf-middleware");
const { captureRavenException } = require("../ravenclient");
const { simpleResponse } = require("../responses");

const config = require("../config").getProperties();

const useSecureCsrfCookie = (config.expectProtocol && /^https$/.test(config.expectProtocol));

exports.csrfProtection = csrf({cookie: {httpOnly: true, secure: useSecureCsrfCookie}});

exports.csrf = function(req, res, next) {
  // The cookies library doesn't detect duplicates; check manually
  let rawCookies = req.get("cookie") || "";
  let pairs = rawCookies.split(";");
  let csrfTokens = pairs.filter(item => item.match(/_csrf=/));
  if (csrfTokens.length > 1) {
    let exc = new Error("Duplicate CSRF cookies");
    exc.headerValue = rawCookies;
    captureRavenException(exc);
    simpleResponse(res, "Bad request", 400);
  }
  req.cookies._csrf = req.cookies.get("_csrf"); // csurf expects a property
  next();
};

exports.csrfErrorResponse = function(err, req, res) {
  assert(err.code === "EBADCSRFTOKEN", "Returning csrf response for non-csrf error code.");
  mozlog.info("bad-csrf", {id: req.ip, url: req.url});
  res.status(403);
  res.type("text");
  res.send("Bad CSRF Token");
};
