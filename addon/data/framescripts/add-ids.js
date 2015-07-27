var idCount = 0;
/** makeId() creates new ids that we give to elements that don't already have an id */
function makeId() {
  idCount++;
  return 'psid-' + idCount;
}

function setIds() {
  var els = content.document.getElementsByTagName("*");
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
}

let isDisabled = false;
addMessageListener("pageshot@addIds:call", function (event) {
  if (isDisabled) {
    return;
  }
  let result;
  if (! content.document.body) {
    // A XUL page
    result = {isXul: true};
  } else {
    try {
      setIds();
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
