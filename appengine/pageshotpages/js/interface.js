$(function () {
  if (window.IS_NEWPAGE) {
    return;
  }
  interfaceReady();
});

function interfaceReady() {
  $(document).focus(function (event) {
    $(this).blur();
  });
  activateHighlight();
  onLoadScroll();
}

function saveMeta() {
  var body = $("#pageshot-meta")[0].innerHTML;
  var head = "";
  var inHead = false;
  for (var i=0; i<document.head.childNodes.length; i++) {
    var el = document.head.childNodes[i];
    if (el.nodeType == document.COMMENT_NODE) {
      if (el.nodeValue.indexOf("METADATA") != -1) {
        inHead = true;
        continue;
      } else if (el.nodeValue.indexOf("ENDMETA") != -1) {
        break;
      }
    }
    if (inHead) {
      if (el.nodeType == document.TEXT_NODE) {
        head += el.nodeValue;
      } else if (el.nodeType == document.COMMENT_NODE) {
        head += '<!--' + el.nodeValue + '-->';
      } else if (el.nodeType == document.ELEMENT_NODE) {
        head += el.outerHTML;
      }
    }
  }
  var data = {
    body: body,
    head: head
  };
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", location.origin + "/meta" + location.pathname);
  xhr.send(JSON.stringify(data));
  xhr.onload = function () {
    console.log(JSON.stringify(data).length, "bytes of metadata saved");
  };
}

function activateHighlight() {

  var mousedownX, mousedownY;
  var cornerX, cornerY;
  var boxEl, oldBoxEl;

  function mousemove(event) {
    cornerX = event.pageX;
    cornerY = event.pageY;
    if (oldBoxEl) {
      $(oldBoxEl).remove();
      oldBoxEl = null;
    }
    render();
  }

  function mouseup(event) {
    cornerX = event.pageX;
    cornerY = event.pageY;
    if (boxEl) {
      render();
    }
    $(document).unbind("mousemove", mousemove);
    $(document).unbind("mouseup", mouseup);
    $(document).unbind("selectstart", selectoff);
    var hasBox = !! boxEl;
    boxEl = oldBoxEl = null;
    saveMeta();
    if (hasBox) {
      return false;
    }
    return undefined;
  }

  function selectoff() {
    return false;
  }

  function render() {
    // FIXME: might actually make sense to oversize the box a little
    var top = Math.min(mousedownY, cornerY);
    var height = Math.abs(mousedownY - cornerY);
    var left = Math.min(mousedownX, cornerX);
    var width = Math.abs(mousedownX - cornerX);
    if (! boxEl) {
      boxEl = $('<div class="pageshot-highlight"></div>');
      $("#pageshot-meta").append(boxEl);
    }
    boxEl.css({
      top: top + "px",
      left: left + "px",
      height: height + "px",
      width: width + "px"
    });
  }

  $(document).mousedown(function (event) {
    if (! event.shiftKey) {
      return undefined;
    }
    mousedownX = event.pageX;
    mousedownY = event.pageY;
    $(document).bind("mousemove", mousemove);
    $(document).bind("mouseup", mouseup);
    $(document).bind("selectstart", selectoff);
    oldBoxEl = $("#pageshot-meta .pageshot-highlight")[0];
    return false;
  });
}

function onLoadScroll() {
  if (window.scrollX > 10) {
    // Already scrolled, don't mess with it
    return;
  }
  var highlight = $(".pageshot-highlight");
  if (! highlight.length) {
    // No highlight to scroll to
    return;
  }
  var middle = highlight.offset().top + (highlight.height() / 2);
  window.scroll(0, middle - (window.innerHeight / 2));
}
