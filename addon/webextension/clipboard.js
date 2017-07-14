/* globals catcher, assertIsBlankDocumentUrl */

"use strict";

this.clipboard = (function() {
  let exports = {};

  exports.copy = function(text) {
    return new Promise((resolve, reject) => {
      let element = document.createElement("iframe");
      element.src = browser.extension.getURL("blank.html");
      // We can't actually hide the iframe while copying, but we can make
      // it close to invisible:
      element.style.opacity = "0";
      element.style.width = "1px";
      element.style.height = "1px";
      element.onload = catcher.watchFunction(() => {
        try {
          element.onload = null;
          let doc = element.contentDocument;
          assertIsBlankDocumentUrl(doc.URL);
          let el = doc.createElement("textarea");
          doc.body.appendChild(el);
          el.value = text;
          el.select();
          const copied = doc.execCommand("copy");
          if (!copied) {
            catcher.unhandled(new Error("Clipboard copy failed"));
          }
          doc.body.removeChild(el);
          resolve(copied);
        } finally {
          document.body.removeChild(element);
        }
      });
      document.body.appendChild(element);
    });
  };

  return exports;
})();
null;
