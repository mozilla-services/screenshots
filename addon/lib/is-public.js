const { Request } = require("sdk/request");
const Components = require("chrome").components;

exports.checkIfPublic = function(url, info) {
  info = info || {};
  return new Promise((resolve, reject) => {
    try {
      if (url.indexOf("#") != -1) {
        url = url.split("#")[0];
      }
      Request({
        url,
        onComplete: function(resp) {
          if (resp.status != 200) {
            console.info("Page not public because gave response:", resp.status);
            resolve(false);
            return;
          }
          let body = resp.text;
          let parser = Components.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(
            Components.interfaces.nsIDOMParser
          );
          let contentType = resp.headers["Content-Type"] || "text/html";
          if (contentType.indexOf(";") != -1) {
            contentType = contentType.split(";")[0];
          }
          if (contentType === "text/html") {
            let doc = parser.parseFromString(body, contentType);
            let els = doc.querySelectorAll("input[type=password]");
            let passwordFields = info.passwordFields || [];
            for (let el of els) {
              let name = el.name || null;
              if (passwordFields.indexOf(name) == -1) {
                console.info(
                  "Page not public because it has password field:",
                  name,
                  passwordFields.length ? "(not one of: " + passwordFields.join(", ") + ")" : "(no passwords expected)"
                );
                resolve(false);
              }
            }
          }
          resolve(true);
        },
        anonymous: true
      }).get();
    } catch (e) {
      reject(e);
    }
  });
};
