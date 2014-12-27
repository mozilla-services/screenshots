if (typeof shotPath == "undefined") {
  shotPath = location.pathname;
}
if (typeof shotUrl == "undefined") {
  shotUrl = location.href;
}

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
      try {
        history.replaceState({}, "to readable mode", location.origin + location.pathname + "?readable");
      } catch (e) {
        console.log("Error in replaceHistory, continuing anyway:", e+"");
      }
    } else {
      $("#frame").attr("src", $("#frame").attr("data-normal-src"));
      try {
        history.replaceState({}, "to normal mode", location.origin + location.pathname);
      } catch (e) {
        console.log("Error in replaceHistory, continuing anyway:", e+"");
      }
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
    localStorage.setItem("collection:" + encodeURIComponent(shotPath),
                         name);
  }

  var currentCollection = localStorage.getItem("collection:" + encodeURIComponent(shotPath));
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
      if (data.indexOf(shotPath) == -1) {
        data.push(shotPath);
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

  var $comment = $("#comment");
  var $commentContainer = $("#comment-container");
  var $editor = $("#comment-editor");
  var $editorContainer = $("#comment-editor-container");
  var $dispNone = $("#comment-instructions-no-comment");
  var $dispSome = $("#comment-instructions-comment");
  var $dispCollapse = $("#comment-instructions-collapse");
  var $instructions = $("#comment-instructions");

  $comment.click(function (event) {
    if (event.target.tagName == "A") {
      return;
    }
    showCommentEditor();
  });

  $editor.keypress(function (event) {
    if (event.keyCode == 27) { // escape
      $editorContainer.hide();
      $comment.show();
      return false;
    }
    if (event.keyCode == 13 && ! (event.shiftKey || event.ctrlKey)) {
      saveComment($editor.val());
      return false;
    }
    return undefined;
  });

  function saveComment(text) {
    $comment.html(htmlize(text));
    $editorContainer.hide();
    $comment.show();
    updateResource("/meta" + shotPath, function (data) {
      data.comment = $comment.text();
      return data;
    }, {}).then(function () {
      console.log("comment saved");
    }, function (err) {
      console.log("Error saving comments:", err);
    });
    updateTags(shotPath, $comment);
  }

  window.saveComment = saveComment;

  function showCommentView() {
    $comment.show();
    $editorContainer.hide();
  }

  function showCommentEditor() {
    $comment.hide();
    $editorContainer.show();
    var text = $comment.text();
    $editor.val(text);
    $editor.focus()[0].setSelectionRange(text.length, text.length);
  }

  $instructions.click(function () {
    if ($commentContainer.is(":visible")) {
      $commentContainer.hide();
      $dispNone.hide();
      $dispSome.hide();
      $("#comment-expand-indicator").show();
      $("#comment-collapse-indicator").hide();
      $dispCollapse.hide();
      if ($comment.text()) {
        $dispNone.hide();
        $dispSome.show();
      } else {
        $dispSome.show();
        $dispNone.hide();
      }
    } else {
      $commentContainer.show();
      $dispNone.hide();
      $dispSome.hide();
      $dispCollapse.show();
      var text = $comment.text();
      if (text) {
        showCommentView();
      } else {
        showCommentEditor();
      }
      $commentContainer.show();
      $("#comment-expand-indicator").hide();
      $("#comment-collapse-indicator").show();
    }
  });

  $("#clip").click(function () {
    var html = '<a href="' + shotUrl + '">' + htmlEscape(document.title) +
        '<br>\n' + shotUrl;
    if ($("#meta-snippet").length) {
      // FIXME: Gmail doesn't like pasted data: URLs
      html += ('<br>\n' +
               '<img src="' + (location.origin + "/snippet" + shotPath) + '">');
    }
    html += '</a>';
    var data = {
      text: shotUrl,
      html: html,
      confirmationMessage: "Share link copied",
      confirmationTitle: "Copied!"
    };
    var event = document.createEvent("CustomEvent");
    event.initCustomEvent("request-clipboard", true, true, data);
    document.dispatchEvent(event);
  });

  var hiInterval = setInterval(function () {
    var frame = $("#frame")[0];
    if (frame) {
      frame.contentWindow.postMessage("hi", location.origin);
    }
  }, 100);

  var pendingMessages = [];

  window.addEventListener("message", function (event) {
    if (event.origin == location.origin) {
      if (event.data == "hi") {
        clearTimeout(hiInterval);
        if (pendingMessages && pendingMessages.length) {
          pendingMessages.forEach(function (msg) {
            $("#frame")[0].contentWindow.postMessage(msg, location.origin);
          });
        }
        pendingMessages = null;
      }
      if (event.data.indexOf("{") == 0) {
        var data = JSON.parse(event.data);
        if (data.type == "set-snippet") {
          $("#meta-snippet").remove();
          var el = $('<meta id="meta-snippet" property="og:images">').attr("content", data.content);
          $(document.head).append(el);
        } else if (data.type == "add-selection") {
          console.log("data", data);
          var selEl = $('<div class="selection">');
          selEl.attr("data-info", JSON.stringify(data.selection));
          selEl.text(data.selection.text);
          selEl.prepend($('<span class="goto-selection">&gt;</span>'));
          $("#selections").append(selEl);
          $("#selections").show();
        } else {
          console.warn("Unknown child message:", data);
        }
      }
    }
  }, false);

  function sendChildMessage(msg) {
    if (typeof msg == "object") {
      msg = JSON.stringify(msg);
    }
    if (pendingMessages === null) {
      $("#frame")[0].contentWindow.postMessage(msg, location.origin);
    } else {
      pendingMessages.push(msg);
    }
  }

  if (window.SET_COMMENT_ON_LOAD) {
    saveComment(window.SET_COMMENT_ON_LOAD);
  }

  $(document).on("click", ".goto-selection", function (event) {
    var sel = $(event.target).closest(".selection");
    var data = JSON.parse(sel.attr("data-info"));
    sendChildMessage({
      type: "goto-anchor",
      anchor: "#" + data.start
    });
  });
});
