$(function () {

  $(document).on("click", ".closer", function (event) {
    // FIXME: need to change to use the new pattern
    var item = $(event.target).closest(".item");
    var path = item.attr("data-path");
    var comment = item.find(".comment").text();
    var collectionName = $(document.body).attr("data-collection-name");
    comment = comment.replace(new RegExp("\\s*\\#" + collectionName, "ig"), "");
    item.find(".comment").html(htmlize(comment));
    updateTags(path, item.find(".comment"));
    item.remove();
    updateResource("/meta" + path, function (data) {
      data.comment = comment;
      return data;
    }, {}).then(function () {
      console.log("Removed #" + collectionName + " from comment");
    }, function (err) {
      console.log("Error removing #" + collectionName + ":", err);
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
    }, {}).then(function () {
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
      updateResource("/meta" + path, function (data) {
        data.userTitle = newTitle;
        return data;
      }, {}).then(function () {
        console.log("Saved new title");
      }, function (err) {
        console.log("Error putting meta:", err);
      });
    }
    return false;
  });

  $(document).on("click", ".add-comment, .comment", function (event) {
    var item = $(event.target).closest(".item");
    item.find(".comment-container").removeClass("comment-collapsed");
    item.find(".comment").hide();
    item.find(".add-comment").hide();
    item.find(".comment-editor-container").show();
    var text = item.find(".comment").text();
    var $editor = item.find(".comment-editor");
    $editor.val(text).focus()[0].setSelectionRange(text.length, text.length);
  });

  $(document).on("keypress", ".comment-editor", function (event) {
    var item = $(event.target).closest(".item");
    if (event.keyCode == 27) {
      closeEditor(item);
      return false;
    } else if (event.keyCode == 13 && ! (event.shiftKey || event.ctrlKey)) {
      var text = item.find(".comment-editor").val();
      item.find(".comment").html(htmlize(text));
      closeEditor(item);
      updateResource("/meta" + item.attr("data-path"), function (data) {
        data.comment = text;
        return data;
      }, {}).then(function () {
        console.log("comment saved");
      }, function (err) {
        console.log("comment could not be saved:", err);
      });
      updateTags(item.attr("data-path"), item.find(".comment"));
      // FIXME: should detect if tag is removed (or I could refused to remove the tag?)
      return false;
    }
    return undefined;
  });

  function closeEditor(item) {
    item.find(".comment-editor-container").hide();
    var text = item.find(".comment").text();
    if (text) {
      item.find(".comment").show();
    } else {
      item.find(".add-comment").show();
      item.addClass("commen-collapsed");
    }
  }

  $("#search").change(search);
  $("#search").keyup(function (event) {
    if (event.keyCode == 13) {
      var select = $(".item.enter-to-select");
      if (select.length) {
        var href = select.find(".item-title a").attr("href");
        location.href = href;
        return;
      }
      doSearch();
    } else if (event.keyCode == 27) {
      $("#search").blur().val("");
      search();
    } else {
      search();
    }
  });

  var searchTimeout;

  function search() {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setTimeout(doSearch, 300);
  }

  var searchMatch = /q=([^&]+)/.exec(location.hash);
  if (searchMatch) {
    $("#search").val(decodeURIComponent(searchMatch[1]));
    doSearch();
  }

  function doSearch() {
    clearTimeout(searchTimeout);
    var term = $("#search").val();
    if (term) {
      location.hash = '#q=' + encodeURIComponent(term);
    } else {
      location.hash = "";
    }
    if (! term) {
      $(".item").show();
      $("#search-summary").text("");
      return;
    }
    var terms = parseTerms(term);
    var found = 0;
    var total = 0;
    var items = $(".item");
    var curItem = 0;

    function searchNext() {
      searchItem(curItem);
      curItem++;
      if (curItem < items.length) {
        setTimeout(searchNext);
      } else {
        finish();
      }
    }

    function searchItem(n) {
      var item = $(items[n]);
      var searchText = item.data("search-text");
      if (! searchText) {
        var extra = [
          item.attr("data-readable"),
          objectValues(item.attr("data-images")).join(" "),
          item.find(".direct-link").attr("href")
        ];
        searchText = extra.join(" ").toLowerCase();
        item.data("search-text", searchText);
      }
      total++;
      var text = item.text().toLowerCase();
      if (searchMatches(text, terms) || searchMatches(searchText, terms)) {
        item.show();
        found++;
      } else {
        item.hide();
      }
      item.removeClass("enter-to-select");
    }

    function finish() {
      var $summary = $("#search-summary");
      if (! found) {
        // FIXME: this causes jitter, because a bunch of stuff is hidden, then
        // all shown at the end.  Maybe we shouldn't show anything?
        $(".item").show();
        $summary.text("no results");
      } else {
        $summary.text("showing " + found + " of " + total);
        if (found == 1) {
          $summary.text($summary.text() + " enter to open");
          $(".item:visible").addClass("enter-to-select");
        }
      }
    }

    setTimeout(searchNext);

  }

  function parseTerms(term) {
    var terms = [];
    term = term.replace(/"([^"]*)"/g, function (match, word) {
      terms.push(word.toLowerCase());
      return "";
    });
    term = term.replace(/"/g, "");
    term = term.split(/\s+/g);
    for (var i=0; i<term.length; i++) {
      var t = term[i];
      if (t) {
        terms.push(t.toLowerCase());
      }
    }
    return terms;
  }

  function objectValues(obj) {
    var result = [];
    for (var attr in obj) {
      result.push(obj[attr]);
    }
    return result;
  }

  function searchMatches(text, terms) {
    for (var i=0; i<terms.length; i++) {
      if (text.indexOf(terms[i]) == -1) {
        return false;
      }
    }
    return true;
  }

  $("#search-clear").click(function () {
    $("#search").val("").focus();
    doSearch();
  });

  $(document).keydown(function (event) {
    if (event.key == "/" && ! $(event.target).is("#search")) {
      $("#search").focus();
      var val = $("#search").val();
      $("#search")[0].setSelectionRange(val.length, val.length);
      return false;
    }
    return undefined;
  });

  $(document).on("click", ".remove-history", function (event) {
    var item = $(event.target).closest(".item");
    var path = item.attr("data-path");
    var url = $(event.target).closest("li").find("a").attr("href");
    updateResource("/data" + path, function (data) {
      for (var i=data.history.length; i--; i>= 0) {
        if (data.history[i].url == url) {
          data.history.splice(i, 1);
        }
      }
      return data;
    });
    item.find(".link").each(function () {
      var el = $(this);
      if (el.attr("href") == url) {
        el.closest("li").remove();
      }
    });
  });

  $(document).on("click", ".private, .public", function (event) {
    var makePublic = $(event.target).is(".private");
    var item = $(event.target).closest(".item");
    var path = item.attr("data-path");
    var url = $(event.target).closest("li").find("a").attr("href");
    console.log("click", path, url);
    updateResource("/data" + path, function (data) {
      data.history.forEach(function (link) {
        if (link.url == url) {
          if (makePublic) {
            link.pub = true;
          } else {
            delete link.pub;
          }
        }
      });
      return data;
    });
    item.find(".link").each(function () {
      var el = $(this);
      if (el.attr("href") == url) {
        var pub = el.closest("li").find(".public");
        var priv = el.closest("li").find(".private");
        if (makePublic) {
          pub.show();
          priv.hide();
        } else {
          pub.hide();
          priv.show();
        }
      }
    });
  });

  $("#clip").click(function () {
    var html = '<h3><a href="' + location.href + '">' + htmlEscape(document.title) + '</a></h3>\n';
    $(".item").each(function () {
      var el = $(this);
      html += "<hr>\n";
      html += '<h4><a href="' + location.origin + el.attr("data-path") + '">' +
          el.find(".item-title").text() + '</a></h4>\n';
      var excerpt = el.find(".excerpt").text();
      if (excerpt) {
        html += '<blockquote>' + htmlEscape(excerpt) + '</blockquote>\n';
      }
      var itemSrc = el.find(".item-shot")[0].src;
      if (itemSrc.indexOf("data:") !== 0) {
        // FIXME: right now data: urls don't work well with some
        // pasting, so we leave them out, but like snippets we should
        // have a way of getting a URL for the image
        html += '<img src="' + itemSrc + '"><br>\n';
      }
      var comment = el.find(".comment").text();
      comment = comment.replace(new RegExp("#" + $(document.body).attr("data-collection-name"), "ig"), "");
      comment = comment.replace(/^\s+/, "").replace(/\s+$/, "");
      if (comment) {
        html += comment + '<br>\n';
      }
      if (el.find(".snippet-container img").length) {
        html += '<img src="' + (location.origin + "/snippet" + el.attr("data-path")) + '"><br>\n';
      }
    });
    var data = {
      html: html,
      confirmationMessage: "List of pages copied",
      confirmationTitle: "Copied!"
    };
    sendAddonEvent("request-clipboard", data);
  });

  document.addEventListener("helper-ready", function () {
    $(".item").each(function () {
      var item = $(this);
      var path = item.attr("data-path");
      var url = item.attr("data-original-url");
      var captured = parseInt(item.attr("data-captured"), 10);
      if (! captured) {
        return;
      }
      console.log("sending event re:", url, captured);
      sendAddonEvent("check-captured", {
        captured: captured,
        path: path,
        url: url
      });
    });
  }, false);

  document.addEventListener("check-captured-result", function (event) {
    var detail = JSON.parse(event.detail);
    var path = detail.path;
    var status = detail.status;
    var hasUpdated = status != 304;
    var item = $(".item").filter(function () {
      return this.getAttribute("data-path") == path;
    });
    console.log("result", path, status, item[0]);
    item.addClass(hasUpdated ? "has-updated" : "has-not-updated");
  }, false);

});
