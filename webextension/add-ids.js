/* globals console, document */
/* exported addIds */

const addIds = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

  var idCount = 0;
  /** makeId() creates new ids that we give to elements that don't already have an id */

  function getDocument() {
    return document;
  }

  function makeId() {
    idCount++;
    return 'psid-' + idCount;
  }

  exports.setIds = function () {
    var els = getDocument().getElementsByTagName("*");
    var len = els.length;
    for (var i=0; i<len; i++) {
      var el = els[i];
      var curId = el.id;
      if (curId && curId.indexOf("psid-") === 0) {
        idCount = parseInt(curId.substr(5), 10);
      } else if (! curId) {
        el.id = makeId();
      }
    }
  };

return exports;
})();
