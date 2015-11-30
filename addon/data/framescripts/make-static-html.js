/** This file is used to turn the document into static HTML with no scripts

    As a framescript this can access the document and its iframes without
    cross-domain permission issues.

    documentStaticData() is the main function that collects all the information
    and returns a JSONable object.

    This script also contains the infrastructure for communicating as a framescript
    with lib/framescripter
    */

// This is an option that gets set by the caller of this module, but
// we store it in a global:
var prefInlineCss = false;

function getDocument() {
  return content.document;
}

function getLocation() {
  return content.location;
}

/** Does standard HTML quoting, if `leaveQuote` is true it doesn't do &quot; */
function htmlQuote(s, leaveQuote) {
  /* Does minimal quoting of a string for embedding as a literal in HTML */
  if (! s) {
    return s;
  }
  if (s.search(/[&<"]/) == -1) {
    return s;
  }
  s = s.replace(/&/g, "&amp;").replace(/</g, '&lt;');
  if (! leaveQuote) {
    s = s.replace(/\042/g, "&quot;");
  }
  return s;
}

/** Encodes the given data as a data: URL */
function encodeData(contentType, data) {
  // FIXME: utf8?
  return 'data:' + contentType + ';base64,' + btoa(data);
}

function checkLink(link) {
  if (link.search(/^javascript:/i) !== -1) {
    return "#";
  }
  return link;
}

/** These are elements that are empty, i.e., have no closing tag: */
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

/** These elements can have e.g., clientWidth of 0 but still be relevant: */
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

/** These elements are never sent: */
const skipElementsBadTags = {
  SCRIPT: true,
  NOSCRIPT: true
};

/** true if this element should be skipped when sending to the mirror */
function skipElement(el) {
  var tag = el.tagName;
  if (skipElementsBadTags[tag]) {
    return true;
  }
  // Skip elements that can't be seen, and have no children, and are potentially
  // "visible" elements (e.g., not STYLE)
  // Note elements with children might have children with, e.g., absolute
  // positioning -- so they might not make the parent have any width, but
  // may still need to be displayed.
  // FIXME: should use el.offsetParent whose presence indicates the element is visible
  if ((el.style && el.style.display == 'none') ||
      ((el.clientWidth === 0 && el.clientHeight === 0) &&
        (! skipElementsOKEmpty[tag]) &&
        (! el.childNodes.length))) {
    return true;
  }
  if (prefInlineCss) {
    if (el.tagName == "STYLE") {
      return true;
    }
    if (el.tagName == "LINK" && (el.getAttribute("rel") || "").toLowerCase() == "stylesheet") {
      return true;
    }
  }
  return false;
}

// This is quite a bit faster than looking up these numbers all the time:
const TEXT_NODE = getDocument().TEXT_NODE;
const ELEMENT_NODE = getDocument().ELEMENT_NODE;

// Used when an iframe fails to serialize:
var NULL_IFRAME = '<html></html>';

/** Converts the element to static HTML, dropping anything that isn't static
    The element must not be one that should be skipped.
    */
function staticHTML(el) {
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
      if (e.name == "InvalidCharacterError") {
        replSrc = encodeData('text/html', NULL_IFRAME);
      } else {
        console.warn('Had to skip iframe for permission reasons:', e+"", "(" + e.name + ")");
      }
    }
  }
  var s = '<' + el.tagName;
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
      } else if (name == "href" || name == "src" || name == "value" || name == "checked" || name == "selected") {
        value = el[name] + "";
        if (name === "href" || name === "src") {
          value = checkLink(value);
        }
      } else {
        value = attrs[i].value;
      }
      if (value === false || value === null || value === undefined) {
        continue;
      } else if (value === true) {
        s += ' ' + name;
      } else {
        s += ' ' + name + '="' + htmlQuote(value) + '"';
      }
    }
  }
  if (el.tagName === "INPUT") {
    var elType = (el.getAttribute("type") || "text").toLowerCase();
    if (elType === "checkbox" || elType == "radio") {
      if ((! el.hasAttribute("checked")) && el.checked) {
        s += " checked";
      }
    } else if ((! el.hasAttribute("value")) && el.value) {
      s += ' value="' + htmlQuote(el.value) + '"';
    }
  } else if (el.tagName == "OPTION") {
    if ((! el.hasAttribute("selected")) && el.selected) {
      s += " selected";
    }
  }
  s += '>';
  if (prefInlineCss && el.tagName == "HEAD") {
    s += createStyle(el.contentWindow.document);
  }
  if (el.tagName == "TEXTAREA") {
    s += htmlQuote(el.value);
  }
  if (! voidElements[el.tagName]) {
    s += staticChildren(el);
    s += '</' + el.tagName + '>';
  }
  return s;
}

/** Returns a list of [[attrName, attrValue]] */
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
        if (name === "href" || name === "src") {
          value = checkLink(value);
        }
      } else {
        value = attrs[i].value;
      }
      result.push([name, value]);
    }
  }
  return result;
}

/** Traverses the children of an element and serializes that to text */
function staticChildren(el) {
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

function createStyle(doc) {
  let result = {
    hrefs: [],
    rulesKept: 0,
    rulesOmitted: 0,
    charsOmitted: 0,
    rules: [],
    addRule: function (rule) {
      this.rulesKept++;
      this.rules.push(rule.cssText);
    },
    mediaRules: {},
    addMediaRule: function (media, rule) {
      this.rulesKept++;
      let mediaText = media.cssText.split("{")[0].trim();
      if (! this.mediaRules[mediaText]) {
        this.mediaRules[mediaText] = [];
      }
      this.mediaRules[mediaText].push(rule.cssText);
    },
    skipRule: function (rule) {
      this.rulesOmitted++;
      this.charsOmitted += rule.cssText.length;
    },
    toString: function () {
      let styles = [];
      for (let rule of this.rules) {
        styles.push(rule);
      }
      for (let media in this.mediaRules) {
        styles.push(media + " {");
        for (let rule of this.mediaRules[media]) {
          styles.push("  " + rule);
        }
        styles.push("}");
      }
      styles = styles.join("\n");
      let header = [];
      header.push("/* Styles from:");
      for (let href of this.hrefs) {
        header.push("       " + href);
      }
      header.push(`   Kept ${this.rulesKept}/${this.rulesKept + this.rulesOmitted} rules`);
      header.push(`   Omitted ${this.charsOmitted} characters; kept ${styles.length} (saved ${Math.floor(100*this.charsOmitted/(this.charsOmitted + styles.length))}%)`);
      header = htmlQuote(header.join("\n"), true) + " */";
      return `<style type="text/css">\n${header}\n${htmlQuote(styles, true)}\n</style>`;
    }
  };
  for (let stylesheet of doc.styleSheets) {
    if (stylesheet.href && stylesheet.href.startsWith("resource:")) {
      continue;
    }
    result.hrefs.push(stylesheet.href || "inline");
    getStyleRules(result, doc, stylesheet);
  }
  return result.toString();
}

function getStyleRules(result, doc, stylesheet) {
  let allRules = [];
  function traverseRules(list) {
    for (let rule of list) {
      if (rule.type == rule.MEDIA_RULE) {
        traverseRules(rule.cssRules);
      } else if (rule.type == rule.STYLE_RULE) {
        allRules.push(rule);
      }
    }
  }
  traverseRules(stylesheet.cssRules);
  for (let rule of allRules) {
    let sel = rule.cssText.split("{")[0].trim();
    if (sel.startsWith(".pageshot-")) {
      continue;
    }
    if ((! doc.querySelector(sel)) && sel.indexOf("a:visited") == -1) {
      // Note, a:visited will never return an element, but is useful
      result.skipRule(rule);
      continue;
    }
    if (rule.parentRule && rule.parentRule.type == rule.MEDIA_RULE) {
      result.addMediaRule(rule.parentRule, rule);
    } else {
      if (rule.parentRule) {
        console.info("rule has parent rule:");
        console.info("  Rule:", rule.cssText);
        console.info("  Parent:", rule.parentRule.type, rule.parentRule.cssText);
      }
      result.addRule(rule);
    }
  }
}

/** Creates an object that represents a frozen version of the document */
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
  var headAttrs = null;
  var head = getDocument().head;
  if (head) {
    headAttrs = getAttributes(head);
    head = staticChildren(head);
    if (prefInlineCss) {
      let style = createStyle(getDocument());
      head = style + head;
    }
  }
  var htmlAttrs = null;
  if (getDocument().documentElement) {
    htmlAttrs = getAttributes(getDocument().documentElement);
  }
  var favicon = getDocument().querySelector("link[rel='shortcut icon'], link[rel='icon']");
  if (favicon) {
    favicon = checkLink(favicon.href);
  } else {
    // FIXME: ideally test if this exists
    let origin = getLocation().origin;
    if (origin && origin != "null") {
      favicon = origin + "/favicon.ico";
    }
  }

  let documentSize = {
    width: Math.max(getDocument().documentElement.clientWidth, getDocument().body.clientWidth),
    height: Math.max(getDocument().documentElement.clientHeight, getDocument().body.clientHeight)
  };

  console.info("framescript serializing took " + (Date.now() - start) + " milliseconds");

  // FIXME: figure out if we still want things like origin:
  return {
    url: getLocation().href,
    //origin: getLocation().origin,
    favicon,
    htmlAttrs,
    head,
    headAttrs,
    body,
    bodyAttrs,
    docTitle: getDocument().title,
    documentSize,
    openGraph: getOpenGraph(),
    twitterCard: getTwitterCard()
    //initialScroll: scrollFraction,
    //captured: Date.now()
  };
}

function getOpenGraph() {
  let openGraph = {};
  // If you update this, also update _OPENGRAPH_PROPERTIES in shot.js:
  let openGraphProperties = `
  title type url image audio description determiner locale site_name video
  image:secure_url image:type image:width image:height
  video:secure_url video:type video:width image:height
  audio:secure_url audio:type
  article:published_time article:modified_time article:expiration_time article:author article:section article:tag
  book:author book:isbn book:release_date book:tag
  profile:first_name profile:last_name profile:username profile:gender
  `.split(/\s+/g);
  for (let prop of openGraphProperties) {
    let elems = getDocument().querySelectorAll(`meta[property='og:${prop}']`);
    let value;
    if (elems.length > 1) {
      value = [];
      for (let i=0; i<elems.length; i++) {
        let v = elems[i].getAttribute("content");
        if (v) {
          value.push(v);
        }
      }
      if (! value.length) {
        value = null;
      }
    } else if (elems.length === 1) {
      value = elems[0].getAttribute("content");
    }
    if (value) {
      openGraph[prop] = value;
    }
  }
  return openGraph;
}

function getTwitterCard() {
  let twitterCard = {};
  // If you update this, also update _TWITTERCARD_PROPERTIES in shot.js:
  let properties = `
  card site title description image
  player player:width player:height player:stream player:stream:content_type
  `.split(/\s+/g);
  for (let prop of properties) {
    let elem = getDocument().querySelector(`meta[name='twitter:${prop}']`);
    if (elem) {
      let value = elem.getAttribute("content");
      if (value) {
        twitterCard[prop] = value;
      }
    }
  }
  return twitterCard;
}

let isDisabled = false;
addMessageListener("pageshot@documentStaticData:call", function (event) {
  if (isDisabled) {
    return;
  }
  var result;
  try {
    prefInlineCss = event.data.prefInlineCss;
    result = documentStaticData();
  } catch (e) {
    console.error("Error getting static HTML:", e);
    console.error(e.stack);
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

addMessageListener("pageshot@disable", function (event) {
  isDisabled = true;
});
