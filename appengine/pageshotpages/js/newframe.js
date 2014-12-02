var IS_NEWPAGE = true;

function injectData(docData) {
  docData = JSON.parse(docData);
  document.title = docData.title;
  var linkText = docData["location"].replace(/^https?:\/\//i, "").replace(/\/*$/, "");
  $(".sitelink").attr("href", docData["location"]).text(linkText);
  history.pushState({}, "static page", location.origin + "/" + docData.id + "/" + docData.domain);
  tryInject(docData);
}

function tryInject(docData) {
  var frame = $("#frame")[0];
  if (frame.contentWindow.injectData) {
    frame.contentWindow.injectData(JSON.stringify(docData));
  } else {
    setTimeout(function () {
      tryInject(docData);
    }, 100);
  }
}
