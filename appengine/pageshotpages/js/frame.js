$(function () {
  $("#readability-on").click(function () {
    $("#readability-on").addClass("active").removeClass("inactive");
    $("#readability-off").addClass("inactive").removeClass("active");
    setReadability(true);
  });
  $("#readability-off").click(function () {
    $("#readability-off").addClass("active").removeClass("inactive");
    $("#readability-on").addClass("inactive").removeClass("active");
    setReadability(false);
  });

  function setReadability(value) {
    if (value) {
      $("#frame").attr("src", $("#frame").attr("data-readable-src"));
    } else {
      $("#frame").attr("src", $("#frame").attr("data-normal-src"));
    }
  }

  $("#make-new-collection").click(function () {
    $("#add-to-label").hide();
    $("#new-collection").show();
  });

  $("#new-collection-name").keypress(function (event) {
    if (event.which == 13) {
      // Submit
      var name = $(event.target).val();
      setCollection(name);
      saveCollection(name);
      return false;
    }
    return undefined;
  });

  var collections = localStorage.getItem("collections");
  if (collections) {
    collections = JSON.parse(collections);
  } else {
    collections = [];
  }
  for (var i=0; i<collections.length; i++) {
    var el = $("<option>").text(collections[i]).attr("data-name", collections[i]);
    $("#make-new-collection").before(el);
    el.click(function (event) {
      var name = $(event.target).attr("data-name");
      setCollection(name);
      saveCollection(name);
    });
  }

  function setCollection(name) {
    if (collections.indexOf(name) == -1) {
      collections.push(name);
      localStorage.setItem("collections", JSON.stringify(collections));
    }
    $("#add-to-label").hide();
    $("#new-collection").hide();
    $("#part-of").show();
    $("#collection-link")
        .attr("href", location.origin + "/collection/" + encodeURIComponent(name))
        .text(name);
    localStorage.setItem("collection:" + encodeURIComponent(location.pathname),
                         name);
  }

  var currentCollection = localStorage.getItem("collection:" + encodeURIComponent(location.pathname));
  if (currentCollection) {
    setCollection(currentCollection);
  }

  function saveCollection(name) {
    var req = new XMLHttpRequest();
    req.open("GET", location.origin + "/collection-list/" + encodeURIComponent(name));
    req.onload = function () {
      var data = [];
      if (req.status != 404) {
        data = JSON.parse(req.responseText);
      }
      if (data.indexOf(location.pathname) == -1) {
        data.push(location.pathname);
      }
      var putter = new XMLHttpRequest();
      putter.open("PUT", location.origin + "/collection-list/" + encodeURIComponent(name));
      putter.onload = function () {
        if (putter.status >= 200 && putter.status < 300) {
          console.log("collection", name, "saved:", data);
        } else {
          console.log("collection", name, "failed:", putter);
        }
      };
      putter.send(JSON.stringify(data));
    };
    req.send();
  }
});
