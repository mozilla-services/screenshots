$(function () {
  $(document).click(function (event) {
    var el = $("#read-line");
    el.show();
    el.css({
      top: event.pageY
    });
    scrollTo(event.pageY, function () {
      el.hide();
    });
  });

  function scrollTo(end, done) {
    var pos = window.scrollY;
    var dir = pos < end ? 1 : -1;
    var cancel = setInterval(function () {
      var diff = Math.abs(end - pos);
      if (diff < 50) {
        pos = end;
        clearTimeout(cancel);
        if (done) {
          done();
        }
      } else {
        pos = pos + dir*diff*0.2;
      }
      window.scroll(0, pos);
    }, 30);
  }

  var off = false;

  var localSave;

  $(window).scroll(function () {
    if (window.scrollY < 5) {
      $("#scroll-to-top").addClass("disabled");
      off = true;
    } else if (off) {
      $("#scroll-to-top").removeClass("disabled");
      off = false;
    }
    if (localSave) {
      clearTimeout(localSave);
    }
    // FIXME: shouldn't be pixel position:
    localSave = setTimeout(function () {
      localStorage.setItem("pos:" + location.pathname, window.scrollY);
    }, 500);
  });

  var lastPos = localStorage.getItem("pos:" + location.pathname);
  if (lastPos) {
    lastPos = parseInt(lastPos, 10);
    scrollTo(lastPos);
  }

  $(window).scroll();

  $("#scroll-to-top").click(function () {
    scrollTo(0);
    return false;
  });

});
