function getDocument() {
  return content.document;
}

function getLocation() {
  return content.location;
}

function htmlQuote(s, leaveQuote) {
  /* Does minimal quoting of a string for embedding as a literal in HTML */
  if (! s) {
    return s;
  }
  // FIXME: my own stupid editor won't handle " in a regex, so replacing with
  // \042 which is equivalent:
  if (s.search(/[&<\042]/) == -1) {
    return s;
  }
  s = s.replace(/&/g, "&amp;").replace(/</g, '&lt;');
  if (! leaveQuote) {
    s = s.replace(/\042/g, "&quot;");
  }
  return s;
}

function encodeData(content_type, data) {
  /* Encodes the given data as a data: URL */
  // FIXME: utf8?
  return 'data:' + content_type + ';base64,' + btoa(data);
}

function skipElement(el) {
  /* true if this element should be skipped when sending to the mirror */
  var tag = el.tagName;
  if (skipElementsBadTags[tag]) {
    return true;
  }
  // Skip elements that can't be seen, and have no children, and are potentially
  // "visible" elements (e.g., not STYLE)
  // Note elements with children might have children with, e.g., absolute
  // positioning -- so they might not make the parent have any width, but
  // may still need to be displayed.
  if ((el.style && el.style.display == 'none') ||
      ((el.clientWidth === 0 && el.clientHeight === 0) &&
        (! skipElementsOKEmpty[tag]) &&
        (! el.childNodes.length))) {
    return true;
  }
  return false;
}

// These are elements that are empty, i.e., have no closing tag:
const voidElements = {
  AREA: true,
  BASE: true,
  BR: true,
  COL: true,
  COMMAND: true,
  EMBED: true,
  HR: true,
  IMG: true,
  INPUT: true,
  KEYGEN: true,
  LINK: true,
  META: true,
  PARAM: true,
  SOURCE: true,
  TRACK: true,
  WBR: true
};

// These elements can have e.g., clientWidth of 0 but still be relevant:
const skipElementsOKEmpty = {
  LINK: true,
  STYLE: true,
  HEAD: true,
  META: true,
  BODY: true,
  APPLET: true,
  BASE: true,
  BASEFONT: true,
  BDO: true,
  BR: true,
  OBJECT: true,
  TD: true,
  TR: true,
  TH: true,
  THEAD: true,
  TITLE: true
  // COL, COLGROUP?
};

// These elements are never sent:
const skipElementsBadTags = {
  SCRIPT: true,
  NOSCRIPT: true
};


/* This is quite a bit faster than creating intermediate objects: */
const TEXT_NODE = getDocument().TEXT_NODE;
const ELEMENT_NODE = getDocument().ELEMENT_NODE;

var idCount = 0;
function makeId() {
  idCount++;
  return 'psid-' + idCount;
}

function staticHTML(el) {
  /* Converts the element to static HTML, dropping anything that isn't static */
  if (el.tagName == 'CANVAS') {
    return '<IMG SRC="' + htmlQuote(el.toDataURL('image/png')) + '">';
  }
  var replSrc = null;
  if (el.tagName == 'IFRAME') {
    // FIXME: need to add <base> element
    try {
      var html = staticHTML(el.contentWindow.document.documentElement);
      replSrc = encodeData('text/html', html);
    } catch (e) {
      console.log('Had to skip iframe for permission reasons:', e+"");
    }
  }
  var s = '<' + el.tagName;
  if (! el.id) {
    s += ' id="' + makeId() + '"';
  }
  var attrs = el.attributes;
  if (attrs && attrs.length) {
    var l = attrs.length;
    for (var i=0; i<l; i++) {
      var name = attrs[i].name;
      if (name.substr(0, 2).toLowerCase() == "on") {
        continue;
      }
      var value;
      if (name == 'src' && replSrc) {
        value = replSrc;
      } else if (name == "href" || name == "src" || name == "value") {
        value = el[name];
      } else {
        value = attrs[i].value;
      }
      s += ' ' + name + '="' + htmlQuote(value) + '"';
    }
  }
  s += '>';
  if (! voidElements[el.tagName]) {
    s += staticChildren(el);
    s += '</' + el.tagName + '>';
  }
  return s;
}

function getAttributes(el) {
  var value;
  var result = [];
  var attrs = el.attributes;
  if (attrs && attrs.length) {
    var l = attrs.length;
    for (var i=0; i<l; i++) {
      var name = attrs[i].name;
      if (name.substr(0, 2).toLowerCase() == "on") {
        continue;
      }
      if (name == "href" || name == "src" || name == "value") {
        value = el[name];
      } else {
        value = attrs[i].nodeValue;
      }
      result.push([name, value]);
    }
  }
  return result;
}

function staticChildren(el) {
  /* Converts all the children of the given element to static HTML */
  var s = '';
  var children = el.childNodes;
  var l = children.length;
  for (var i=0; i<l; i++) {
    var child = children[i];
    if (skipElement(child)) {
      continue;
    }
    if (child.nodeType == TEXT_NODE) {
      var value = child.nodeValue;
      s += htmlQuote(value, true);
    } else if (child.nodeType == ELEMENT_NODE) {
      s += staticHTML(child);
    }
  }
  return s;
}

function documentStaticData() {
  var start = Date.now();
  // unsafeWindow is quite a bit faster than the proxied access:
  var body = getDocument().body;

  // Generally this only happens when the document hasn't really loaded
  // FIXME: that maybe should be an error
  var bodyAttrs = null;
  if (body) {
    bodyAttrs = getAttributes(body);
    body = staticChildren(body);
  }
  var head = getDocument().head;
  if (head) {
    head = staticChildren(head);
  }
  var htmlAttrs = null;
  if (getDocument().documentElement) {
    htmlAttrs = getAttributes(getDocument().documentElement);
  }
  var favicon = getDocument().querySelector("link[rel='shortcut icon'], link[rel='icon']");
  if (favicon) {
    favicon = favicon.href;
  } else {
    // FIXME: ideally test if this exists
    favicon = getLocation().origin + "/favicon.ico";
  }
  // FIXME: this is a bad estimate, we should use anchor-based scrolling
  var totalHeight = getDocument().body.clientHeight;
  var scrollFraction = content.scrollY / totalHeight;

  console.log("framescript serializing took " + (Date.now() - start) + " milliseconds");

  return {
    location: getLocation().href,
    origin: getLocation().origin,
    favicon: favicon,
    htmlAttrs: htmlAttrs,
    head: head,
    body: body,
    bodyAttrs: bodyAttrs,
    title: getDocument().title,
    initialScroll: scrollFraction,
    captured: Date.now()
  };
}

addMessageListener("pageshot@documentStaticData:call", function (event) {
  var result;
  try {
    result = documentStaticData();
  } catch (e) {
    console.log("Error getting static HTML:", e);
    console.trace();
    result = {
      error: {
        name: e.name,
        description: e+""
      }
    };
  }
  result.callId = event.data.callId;
  sendAsyncMessage("pageshot@documentStaticData:return", result);
});
