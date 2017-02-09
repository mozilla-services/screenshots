/* globals console, document, content, addMessageListener, sendAsyncMessage */
/* exported addIds */

var isChrome = false;

const addIds = (function () { // eslint-disable-line no-unused-vars
  let exports = {};

  var idCount = 0;
  /** makeId() creates new ids that we give to elements that don't already have an id */

  function getDocument() {
    if (isChrome) {
      return document;
    } else {
      return content.document;
    }
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

  if (! isChrome) {
    let isDisabled = false;
    addMessageListener("pageshot@addIds:call", function (event) {
      if (isDisabled) {
        return;
      }
      let result;
      if (! (getDocument().body && getDocument().head)) {
        // A XUL page
        result = {isXul: true};
      } else if (getDocument().body.tagName == "FRAMESET") {
        // Frame documents also can't be captured
        result = {isFrame: true};
      } else {
        try {
          if (event.data.annotateForPage) {
            exports.setIds();
          }
          result = {isXul: false};
        } catch (e) {
          console.error("Error getting static HTML:", e);
          console.trace();
          result = {
            error: {
              name: e.name,
              description: e+""
            }
          };
        }
      }
      result.callId = event.data.callId;
      sendAsyncMessage("pageshot@addIds:return", result);
    });

    addMessageListener("pageshot@disable", function (event) {
      isDisabled = true;
    });
  }

return exports;
})();
