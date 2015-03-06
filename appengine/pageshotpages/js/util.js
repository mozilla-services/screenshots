function updateResource(url, callback, defaultValue) {
  var def = $.Deferred();
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function () {
    var value = defaultValue;
    if (req.status != 200) {
      if (defaultValue === undefined) {
        def.reject(req);
        return;
      }
    } else {
      try {
        value = JSON.parse(req.responseText);
      } catch (e) {
        console.log("JSON parse failed:", e+"", req.responseText);
        def.reject(e);
        return;
      }
    }
    var newValue;
    try {
      newValue = callback(value);
    } catch (e) {
      def.reject(e);
      return;
    }
    if (newValue === undefined) {
      def.resolve();
      return;
    }
    var putter = new XMLHttpRequest();
    putter.open("PUT", url);
    putter.onload = function () {
      if (putter.status >= 300) {
        def.reject(putter);
        return;
      }
      def.resolve(newValue);
    };
    putter.send(JSON.stringify(newValue));
  };
  req.send();
  return def;
}

function htmlize(text) {
  text = text.replace(/&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  text = text.replace(/"/g, "&quot;");
  text = text.replace(/https?:\/\/[^\s\]\)]+/gi, function (match) {
    return '<a href="' + match + '">' + match + '</a>';
  });
  text = text.replace(/\#[a-zA-Z0-9_\-]+/g, function (match) {
    var link = match.replace(/^\#/, "");
    link = link.toLowerCase();
    link = link.replace(/[_]/g, "-");
    return '<a class="tag" href="/tag/' + link + '">' + match + '</a>';
  });
  text = text.replace(/\n/g, "<br>\n");
  return text;
}

function updateTags(pagePath, el) {
  // Update the page at pagePath to use the tags in the element el
  // (using the links referred to in that element)
  var tags = [];
  el.find(".tag").each(function () {
    var link = this.href.replace(/.*\//, "");
    tags.push(link);
  });
  updateResource("/tags-for" + pagePath, function (existing) {
    var newTags = [];
    for (var i=0; i<tags.length; i++) {
      if (existing.indexOf(tags[i]) == -1) {
        newTags.push(tags[i]);
      }
    }
    if (newTags.length) {
      console.log("notifying of new tags:", newTags);
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent("add-tags", true, true, newTags);
      document.dispatchEvent(event);
    }
    return tags;
  }).then(function () {
    console.log("tags saved", tags);
  }, function (err) {
    console.log("Error saving tags", err);
  });
}

function htmlEscape(t) {
  t = t.replace(/&/g, "&amp;");
  t = t.replace(/</g, "&lt;");
  t = t.replace(/>/g, "&gt;");
  t = t.replace(/"/g, "&quot;");
  return t;
}

function sendAddonEvent(eventType, detail) {
  var event = document.createEvent("CustomEvent");
  event.initCustomEvent(eventType, true, true, detail);
  document.dispatchEvent(event);
  console.log("sent", event);
}
