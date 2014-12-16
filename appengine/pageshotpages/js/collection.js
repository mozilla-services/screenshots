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
      updateResource("/meta", function (data) {
        data.userTitle = newTitle;
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
    $(".item").each(function () {
      var item = $(this);
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
    });
    var $summary = $("#search-summary");
    if (! found) {
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
    console.log("keyup", event, event.key == "/");
    if (event.key == "/" && ! $(event.target).is("#search")) {
      $("#search").focus();
      var val = $("#search").val();
      $("#search")[0].setSelectionRange(val.length, val.length);
      return false;
    }
    return undefined;
  });

});
