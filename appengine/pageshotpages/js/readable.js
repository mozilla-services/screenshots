$(function () {
  $(document).click(function (event) {
    var el = $("#read-line");
    el.show();
    el.css({
      top: event.pageY
    });
    var start = window.scrollY;
    var end = event.pageY;
    var pos = start;
    var cancel = setInterval(function () {
      if (end - pos < 50) {
        pos = end;
        clearTimeout(cancel);
        el.hide();
      } else {
        pos = pos + (end-pos)*0.2;
      }
      window.scroll(0, pos);
    }, 30);
  });
});
