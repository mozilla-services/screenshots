const terms = {
  title: "Terms of Service",
  page: "terms"
}

const privacy = {
  title: "Privacy Notice",
  page: "privacy"
}

exports.createModel = function (req) {
  const base = req.baseUrl;
  if (base === "/terms") {
    return terms;
  }
  return privacy;
};
