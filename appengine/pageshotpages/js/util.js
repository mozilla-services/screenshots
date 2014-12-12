function updateResource(url, callback, defaultValue) {
  var def = $.Deferred();
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onload = function () {
    var value = defaultValue;
    if (req.status != 200) {
      if (defaultValue !== undefined) {
        def.reject(req);
        return;
      }
    } else {
      value = JSON.parse(req.responseText);
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
