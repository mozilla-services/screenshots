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
});
