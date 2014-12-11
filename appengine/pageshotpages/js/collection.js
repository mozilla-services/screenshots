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

  $(document).on("click", ".image-up, .image-down", function (event) {
    var isUp = $(event.target).hasClass("image-up");
    var el = $(event.target).closest(".item");
    var path = el.attr("data-path");
    var current = el.find(".item-shot");
    var images = JSON.parse(el.attr("data-images"));
    var index;
    for (var i=0; i<images.length; i++) {
      var imageItem = images[i];
      if (imageItem.src == current.attr("src")) {
        index = i;
        break;
      }
    }
    var next;
    if (isUp) {
      next = index + 1;
      if (next >= images.length) {
        next = 0;
      }
    } else {
      next = index - 1;
      if (next < 0) {
        next = images.length - 1;
      }
    }
    var nextImage = images[next];
    current.attr("src", nextImage.src).attr("title", nextImage.title || "");
    var req = new XMLHttpRequest();
    req.open("GET", "/meta" + path);
    req.onload = function () {
      if (req.status != 200) {
        console.log("failed to get meta", req);
        return;
      }
      var data = JSON.parse(req.responseText);
      data['activeImage'] = next;
      var putter = new XMLHttpRequest();
      putter.open("PUT", "/meta" + path);
      putter.onload = function () {
        if (putter.status >= 200 && putter.status < 300) {
          console.log("Image change saved");
        } else {
          console.log("Image change failed:", putter);
        }
      };
      putter.send(JSON.stringify(data));
    };
    req.send();
  });

});
