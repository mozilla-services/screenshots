$(function () {

  $(document).on("click", ".closer", function (event) {
    // FIXME: need to change to use the new pattern
    return;
    var el = $(event.target).closest(".item");
    var path = el.attr("data-path");
    el.remove();
    var collectionName = $(document.body).attr("data-collection-name");
    localStorage.removeItem("collection:" + encodeURIComponent(path));
    updateResource(
      "/collection-list/" + encodeURIComponent(collectionName),
      function (data) {
        var index = data.indexOf(path);
        if (index == -1) {
          console.warn("Could not find", path, "in existing collection data", data);
          return undefined;
        }
        data.splice(index, 1);
        return data;
      }, []).then(function () {
        console.log("Saved deletion of", path);
      }, function (error) {
        console.log("Error saving deletion of", path, ":", error);
      });
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
    updateResource("/meta" + path, function (data) {
      data['activeImage'] = next;
      return data;
    }).then(function () {
      console.log("Image change saved");
    }, function (err) {
      console.log("Image change failed:", err);
    });
  });

  $(document).on("click", ".item-title", function (event) {
    if (! event.shiftKey) {
      return undefined;
    }
    var title = $(event.target);
    var path = title.closest(".item").attr("data-path");
    var el = $('<input type="text" class="title-replacement" style="width: 400px">');
    el.val(title.text());
    title.after(el);
    title.hide();
    el.keypress(function (event) {
      if (event.which == 13) {
        submit();
        return false;
      }
      if (event.keyCode == 27) {
        el.remove();
        title.show();
        return false;
      }
      return undefined;
    });
    el.focus();
    el[0].setSelectionRange(el.val().length, el.val().length);
    function submit() {
      var newTitle = el.val();
      el.remove();
      title.text(newTitle);
      title.show();
      updateResource("/meta", function (data) {
        data.userTitle = newTitle;
      }).then(function () {
        console.log("Saved new title");
      }, function (err) {
        console.log("Error putting meta:", err);
      });
    }
    return false;
  });
});
