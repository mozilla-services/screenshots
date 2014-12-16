if (typeof shotPath == "undefined") {
  shotPath = location.pathname;
}
if (typeof shotUrl == "undefined") {
  shotUrl = location.href;
}

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
  var snippet = null;
  if ($("#meta-snippet").length) {
    snippet = $("#meta-snippet").attr("content");
  }
  var data = {
    body: body,
    head: head,
    snippet: snippet
  };
  var metaPath = location.origin + "/meta";
  metaPath += shotPath.replace(/^\/content/, "");
  updateResource(metaPath, function (data) {
    data.body = body;
    data.head = head;
    data.snippet = snippet;
    return data;
  }, {}).then(function () {
    console.log("saved meta", snippet ? "with snippet" : "without snippet");
  }, function (err) {
    console.log("error saving meta:", err);
  });
}

function requestShot() {
  document.body.classList.add("prepare-screenshot");
  var event = document.createEvent('CustomEvent');
  var el = $(".pageshot-highlight");
  event.initCustomEvent("request-screenshot", true, true, {
    x: parseInt(el.css("left")),
    y: parseInt(el.css("top")),
    h: parseInt(el.css("height")),
    w: parseInt(el.css("width"))
  });
  document.dispatchEvent(event);
}

document.addEventListener("got-screenshot", function (event) {
  document.body.classList.remove("prepare-screenshot");
  var detail = JSON.parse(event.detail);
  var shot = detail.image;
  $("#meta-snippet").remove();
  var el = $('<meta property="og:image" id="meta-snippet">').attr("content", shot);
  $(document.head).append(el);
  saveMeta();
  sendParentMessage({
    type: "set-snippet",
    content: shot
  });
}, false);

var parentWindow;
var pendingMessages = [];

window.addEventListener("message", function (event) {
  if (event.origin == location.origin) {
    parentWindow = event.source;
    if (pendingMessages.length) {
      pendingMessages.forEach(function (msg) {
        parentWindow.postMessage(msg, location.origin);
      });
    }
  }
  if (event.data == "hi") {
    event.source.postMessage("hi", location.origin);
  }
}, false);

function sendParentMessage(msg) {
  if (typeof msg != "string") {
    msg = JSON.stringify(msg);
  }
  if (parentWindow) {
    parentWindow.postMessage(msg, location.origin);
  } else {
    pendingMessages.push(msg);
  }
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
    requestShot();
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
