var IS_NEWPAGE = true;

function injectData(docData) {
  docData = JSON.parse(docData);
  //var pre = document.createElement("pre");
  //pre.textContent = JSON.stringify(docData, null, "  ");
  //document.body.appendChild(pre);
  var head = '<base href="' + docData.location + '">\n';
  head += docData.head;
  document.head.innerHTML += head;
  document.body.innerHTML = docData.body;
  history.pushState({}, "static page", location.origin + "/" + docData.id + "/" + docData.domain);
  interfaceReady();
  var req = new XMLHttpRequest();
  req.open("PUT", location.origin + "/data/" + docData.id + "/" + docData.domain);
  req.onload = function () {
    console.log("Saved");
  };
  req.send(JSON.stringify(docData));
}
