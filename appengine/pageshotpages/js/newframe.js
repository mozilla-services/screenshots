var IS_NEWPAGE = true;
var docName;

function injectData(docData) {
  docData = JSON.parse(docData);
  document.title = docData.title;
  var linkText = docData["location"].replace(/^https?:\/\//i, "").replace(/\/*$/, "");
  $(".sitelink").attr("href", docData["location"]).text(linkText);
  if (! docData.readable) {
    $("#readable-toggler").hide();
  }
  docName = "/" + docData.id + "/" + docData.domain;
  history.pushState({}, "static page", location.origin + docName);
  tryInject(docData);
}

function tryInject(docData) {
  var frame = $("#frame")[0];
  frame.setAttribute("data-normal-src", location.origin + "/content" + docName);
  frame.setAttribute("data-readable-src", location.origin + "/readable" + docName);
  if (frame.contentWindow.injectData) {
    frame.contentWindow.injectData(JSON.stringify(docData));
  } else {
    setTimeout(function () {
      tryInject(docData);
    }, 100);
  }
}
