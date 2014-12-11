$(function () {
  $(document).on("click", ".closer", function (event) {
    var el = $(event.target).closest(".item");
    var path = el.attr("data-path");
    el.remove();
    var collectionName = $(document.body).attr("data-collection-name");
    var req = new XMLHttpRequest();
    localStorage.removeItem("collection:" + encodeURIComponent(path));
    req.open("GET", "/collection-list/" + encodeURIComponent(collectionName));
    req.onload = function () {
      var data = JSON.parse(req.responseText);
      var index = data.indexOf(path);
      if (index == -1) {
        console.warn("Could not find", path, "in existing collection data", data);
        return;
      }
      data.splice(index, 1);
      var putter = new XMLHttpRequest();
      putter.open("PUT", "/collection-list/" + encodeURIComponent(collectionName));
      putter.onload = function () {
        if (putter.status >= 200 && putter.status < 300) {
          console.log("Saved deletion of", path);
        } else {
          console.log("Error saving deletion of", path, ":", putter);
        }
      };
      putter.send(JSON.stringify(data));
    };
    req.send();
  });
});
