var IS_NEWPAGE = true;
var SET_COMMENT_ON_LOAD = null;
var shotUrl = location.href;
var shotPath;

function injectData(docData) {
  docData = JSON.parse(docData);
  document.title = docData.title;
  var linkText = docData["location"].replace(/^https?:\/\//i, "").replace(/\/*$/, "");
  $(".sitelink").attr("href", docData["location"]).text(linkText);
  if (! docData.readable) {
    $("#readable-toggler").hide();
  }
  shotPath = "/" + docData.id + "/" + docData.domain;
  var destUrl = location.origin + shotPath;
  try {
    history.replaceState({}, "static page", destUrl);
  } catch (e) {
    console.log("Error using replaceState, continuing anyway:", e+"");
  }
  shotUrl = destUrl;
  tryInject(docData);
  if (docData.autoTag) {
    if (window.saveComment) {
      window.saveComment("#" + docData.autoTag);
    } else {
      SET_COMMENT_ON_LOAD = "#" + docData.autoTag;
    }
    $("#comment-instructions").click();
  }
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent("has-url", true, true, destUrl);
  document.dispatchEvent(event);
}

function tryInject(docData) {
  var frame = $("#frame")[0];
  frame.setAttribute("data-normal-src", location.origin + "/content" + shotPath);
  frame.setAttribute("data-readable-src", location.origin + "/readable" + shotPath);
  if (frame.contentWindow.injectData) {
    frame.contentWindow.injectData(JSON.stringify(docData));
  } else {
    setTimeout(function () {
      tryInject(docData);
    }, 100);
  }
}
