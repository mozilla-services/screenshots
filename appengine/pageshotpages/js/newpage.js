var IS_NEWPAGE = true;

function injectData(docData) {
  docData = JSON.parse(docData);
  //var pre = document.createElement("pre");
  //pre.textContent = JSON.stringify(docData, null, "  ");
  //document.body.appendChild(pre);
  var head = '<base href="' + docData.location + '">\n';
  head += '<!--METADATA--><!--ENDMETA-->';
  head += docData.head;
  document.head.innerHTML += head;
  document.body.innerHTML = docData.body + '<div id="pageshot-meta"></div>';
  setAttributes(document.documentElement, docData.htmlAttrs);
  setAttributes(document.body, docData.bodyAttrs);
  history.pushState({}, "static page", location.origin + "/content/" + docData.id + "/" + docData.domain);
  interfaceReady();
  var req = new XMLHttpRequest();
  req.open("PUT", location.origin + "/data/" + docData.id + "/" + docData.domain);
  req.onload = function () {
    console.log("Saved");
  };
  req.send(JSON.stringify(docData));
}

function setAttributes(el, attrs) {
  for (var i=0; i<attrs.length; i++) {
    el.setAttribute(attrs[i][0], attrs[i][1]);
  }
}
