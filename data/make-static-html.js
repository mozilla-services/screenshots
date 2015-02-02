// Note, these are also contained in lib/quoting.js:

function htmlQuote(s) {
  /* Does minimal quoting of a string for embedding as a literal in HTML */
  if (! s) {
    return s;
  }
  if (s.search(/[&<"]/) == -1) {
    return s;
  }
  return s.replace(/&/g, "&amp;").replace(/</g, '&lt;').replace(/"/g, "&quot;");
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
  if ((el.style && el.style.display == 'none')
      || ((el.clientWidth === 0 && el.clientHeight === 0) &&
          (! skipElementsOKEmpty[tag]) &&
          (! el.childNodes.length))) {
    return true;
  }
  return false;
};

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
const TEXT_NODE = document.TEXT_NODE;
const ELEMENT_NODE = document.ELEMENT_NODE;

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
        var value = el[name];
      } else {
        var value = attrs[i].nodeValue;
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
      s += htmlQuote(value);
    } else if (child.nodeType == ELEMENT_NODE) {
      s += staticHTML(child);
    }
  }
  return s;
}

function documentStaticData() {
  var start = Date.now();
  // unsafeWindow is quite a bit faster than the proxied access:
  var body = unsafeWindow.document.body;

  var newDiv = document.createElement("div");
  newDiv.innerHTML = body.innerHTML;
  // FIXME: location.href isn't what Readability expects (but I am
  // working around the parts of the code that seem to expect
  // something different)
  var reader = new Readability(location.href, newDiv);
  var readable = reader.parse();
  var microdata = microformats.getItems();
  var MIN_IMAGE_WIDTH = 250;
  var MIN_IMAGE_HEIGHT = 200;
  var images = [];
  var imageMap = {};

  function scanImage(img) {
    if (img.width >= MIN_IMAGE_WIDTH
        && img.height >= MIN_IMAGE_HEIGHT
        && ! imageMap[img.src]) {
      // FIXME: would be nice to search for a caption
      images.push({
        title: img.getAttribute("title") || img.getAttribute("alt"),
        src: img.src,
        width: img.width,
        height: img.height
      });
      imageMap[img.src] = true;
    }
  }

  var options = newDiv.getElementsByTagName("img");
  for (var i=0; i<options.length; i++) {
    scanImage(options[i]);
  }
  options = document.body.getElementsByTagName("img");
  for (var i=0; i<options.length; i++) {
    scanImage(options[i]);
  }

  reader = options = newDiv = null;

  // Generally this only happens when the document hasn't really loaded
  // FIXME: that maybe should be an error
  var bodyAttrs = null;
  if (body) {
    bodyAttrs = getAttributes(body);
    body = staticChildren(body);
  }
  var head = unsafeWindow.document.head;
  if (head) {
    head = staticChildren(head);
  }
  var htmlAttrs = null;
  if (document.documentElement) {
    htmlAttrs = getAttributes(document.documentElement);
  }
  var favicon = document.querySelector("link[rel='shortcut icon'], link[rel='icon']");
  if (favicon) {
    favicon = favicon.href;
  } else {
    // FIXME: ideally test if this exists
    favicon = location.origin + "/favicon.ico";
  }
  // FIXME: this is a bad estimate, we should use anchor-based scrolling
  var totalHeight = document.body.clientHeight;
  var scrollFraction = window.scrollY / totalHeight;

  return {
    location: location.href,
    origin: location.origin,
    favicon: favicon,
    htmlAttrs: htmlAttrs,
    head: head,
    body: body,
    bodyAttrs: bodyAttrs,
    title: document.title,
    initialScroll: scrollFraction,
    readable: readable,
    microdata: microdata,
    images: images,
    captured: Date.now()
  };
  console.log("serializing took " + (Date.now() - start) + " milliseconds");
}
