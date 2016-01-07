/* globals setTimeout */
/** This file is used to turn the document into static HTML with no scripts

    As a framescript this can access the document and its iframes without
    cross-domain permission issues.

    documentStaticData() is the main function that collects all the information
    and returns a JSONable object.

    This script also contains the infrastructure for communicating as a framescript
    with lib/framescripter
    */

// Provides setTimeout:
Components.utils.import("resource://gre/modules/Timer.jsm");
const uuidGenerator = Components.classes["@mozilla.org/uuid-generator;1"]
                      .getService(Components.interfaces.nsIUUIDGenerator);


function makeUuid() {
  var uuid = uuidGenerator.generateUUID();
  uuid = uuid.toString();
  // Strips off {}:
  return uuid.substr(1, uuid.length-2);
}

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

// FIXME: this is a global that is reset on each run, and then added to by
// rewriteResource (so we don't have to add another parameter to the functions
// that traverse the tree).  But that's kind of icky.
let resources;

function rewriteResource(el, attr, url) {
  if (url.startsWith("#")) {
    return url;
  }
  if (url.search(/^[a-z]+:/i) !== -1 && url.search(/^https?:/i) === -1) {
    // FIXME: not sure if resources should ever have funny protocols?
    return url;
  }
  let hash = null;
  if (url.includes("#")) {
    [url, hash] = url.split("#")[1];
  }
  let repl = makeUuid();
  let match = (/\.(jpg|jpeg|gif|png|webm|css|html)$/).exec(url);
  if (match) {
    repl += "." + match[1];
  }
  // Note this object is checked in shot.js:
  resources[repl] = {
    url,
    hash,
    tag: el.tagName,
    elId: el.id,
    attr,
    rel: el.getAttribute("rel") || undefined
  };
  return repl;
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
  SOURCE: true,
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
  if (el.id == "pageshot-stylesheet" || el.className.startsWith("pageshot-")) {
    return true;
  }
  // Skip elements that can't be seen, and have no children, and are potentially
  // "visible" elements (e.g., not STYLE)
  // Note elements with children might have children with, e.g., absolute
  // positioning -- so they might not make the parent have any width, but
  // may still need to be displayed.
  // FIXME: should use el.offsetParent whose presence indicates the element is visible
  if (el.style && el.style.display == 'none') {
    return true;
  }
  if (content.getComputedStyle(el).display == 'none') {
    return true;
  }
  if ((el.clientWidth === 0 && el.clientHeight === 0) &&
      (! skipElementsOKEmpty[tag]) &&
      (! el.childNodes.length)) {
    if (! (el instanceof content.SVGElement)) {
      return true;
    }
  }
  if (el.tagName == "IFRAME" && ! el.contentWindow) {
    // FIXME: I'm not sure why this happens, but when it does we can't serialize
    // the iframe usefully
    return true;
  }
  if (el.tagName == "LINK") {
    let rel = (el.getAttribute("rel") || "").toLowerCase();
    if (rel == "prefetch" || rel == "dns-prefetch") {
      return true;
    }
  }
  if (el.tagName == "INPUT" && (el.getAttribute("type") || '').search(/hidden/i) !== -1) {
    // Probably hidden fields will get eliminated because they aren't visible
    // but just to be double sure...
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

function staticHTMLDocument(doc) {
  let html = staticHTML(doc.documentElement);
  let parts = html.split(/<\/head>/i);
  let base = `<base href="${htmlQuote(doc.location.href)}">`;
  let rules = '';
  if (prefInlineCss) {
    rules = createStyle(doc);
  }
  html = `${parts[0]}\n${base}${rules}</head>${parts[1]}`;
  return html;
}

/** Converts the element to static HTML, dropping anything that isn't static
    The element must not be one that should be skipped.
    */
function staticHTML(el, childLimit) {
  if (el.tagName == 'CANVAS') {
    return '<IMG SRC="' + htmlQuote(el.toDataURL('image/png')) + '">';
  }
  var replSrc = null;
  if (el.tagName == 'IFRAME') {
    try {
      var html = staticHTMLDocument(el.contentWindow.document);
      replSrc = encodeData('text/html', html);
    } catch (e) {
      if (e.name !== "InvalidCharacterError") {
        console.warn('Had to skip iframe for permission reasons:', e+"", "(" + e.name + ")");
      }
      replSrc = encodeData('text/html', NULL_IFRAME);
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
      if (name == 'rel' && el.tagName == "LINK") {
        // Remove any attempt to mark something as prefetch
        value = attrs[i].value;
        value = value.replace(/(dns-)?prefetch/ig, "");
      } else if (name == 'src' && replSrc) {
        value = replSrc;
      } else if (name == 'srcset') {
        let parts = attrs[i].value.split(/\s+/);
        let link = rewriteResource(el, name, parts[0]);
        value = link + " " + (parts[1] || "");
      } else if (name == "href" || name == "src" || name == "action" || name == "value" || name == "checked" || name == "selected") {
        value = el[name] + "";
        if (name === "href" || name === "src") {
          value = checkLink(value);
        }
        if (el.tagName != "A" && (name === "href" || name === "src")) {
          value = rewriteResource(el, name, value);
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
    if (elType.search(/password/) !== -1) {
      // do nothing, don't save value
    } else if (elType === "checkbox" || elType == "radio") {
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
  if (voidElements[el.tagName]) {
    return s;
  }
  let childrenHTML = staticChildren(el, childLimit);
  if (typeof childrenHTML == "string") {
    s += childrenHTML;
    s += '</' + el.tagName + '>';
    return s;
  } else {
    return childrenHTML.then(function (html) {
      return s + html + '</' + el.tagName + '>';
    });
  }
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
function staticChildren(el, childLimit) {
  var children = el.childNodes;
  var l = children.length;
  let pieces = [];
  let promises = [];
  for (let i=0; i<l; i++) {
    let child = children[i];
    if (child.nodeType == TEXT_NODE) {
      pieces.push(htmlQuote(child.nodeValue, true));
    } else if (child.nodeType == ELEMENT_NODE) {
      if (skipElement(child)) {
        continue;
      }
      if (l >= childLimit) {
        pieces.push("");
        promises.push(insertInto(doSoon(staticHTML, child, childLimit), pieces, pieces.length-1));
      } else {
        let result = staticHTML(child, childLimit);
        if (typeof result == "string") {
          pieces.push(result);
        } else {
          pieces.push("");
          promises.push(insertInto(result, pieces, pieces.length-1));
        }
      }
    }
  }
  return Promise.all(promises).then(() => {
    return pieces.join("");
  });
}

function doSoon(func, ...args) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      try {
        let result = func.apply(null, args);
        if (result.then) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  });
}

function insertInto(promise, array, index) {
  return promise.then((result) => {
    array[index] = result;
  });
}

function asyncStaticChildren(el) {
  return new Promise((resolve, reject) => {
    let result = staticChildren(el, 5);
    if (typeof result == "string") {
      resolve(result);
    } else {
      result.then(resolve, reject);
    }
  });
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
    if (stylesheet.media && stylesheet.media.length) {
      let anyFound = false;
      for (let media of stylesheet.media) {
        media = media.toLowerCase();
        if (media == "*" || media == "screen" || media == "all") {
          anyFound = true;
          break;
        }
      }
      // Print- or speech-only stylesheet
      // FIXME: these should be included except with the appropriate media restriction
      if (! anyFound) {
        continue;
      }
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
  let rules;
  try {
    rules = stylesheet.cssRules;
  } catch (e) {
    console.warn("Could not access stylesheet rules: " + e);
  }
  if (rules) {
    traverseRules(rules);
  }
  for (let rule of allRules) {
    let sel = rule.cssText.split("{")[0].trim();
    if (sel.startsWith(".pageshot-")) {
      continue;
    }
    // Crude attempt to get rid of pseudo-selectors which
    // (like a:visited) won't be applicable to the next test:
    let matchesElements = true;
    let origSel = sel;
    sel = sel.replace(/:?:[a-z]+/g, "");
    try {
      matchesElements = !!doc.querySelector(sel);
    } catch (e) {
      matchesElements = !!doc.querySelector(origSel);
    }
    if (! matchesElements) {
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
  var result = {};
  var body = getDocument().body;
  resources = {};
  result.bodyAttrs = null;
  if (body) {
    result.bodyAttrs = getAttributes(body);
  }
  result.headAttrs = null;
  var head = getDocument().head;
  if (head) {
    result.headAttrs = getAttributes(head);
  }
  result.htmlAttrs = null;
  if (getDocument().documentElement) {
    result.htmlAttrs = getAttributes(getDocument().documentElement);
  }
  result.favicon = getDocument().querySelector("link[rel='shortcut icon'], link[rel='icon']");
  if (result.favicon) {
    result.favicon = checkLink(result.favicon.href);
  } else {
    // FIXME: ideally test if this exists
    let origin = getLocation().origin;
    if (origin && origin != "null") {
      result.favicon = origin + "/favicon.ico";
    }
  }

  result.documentSize = {
    width: Math.max(getDocument().documentElement.clientWidth, getDocument().body.clientWidth),
    height: Math.max(getDocument().documentElement.clientHeight, getDocument().body.clientHeight)
  };

  console.info("framescript serializing took " + (Date.now() - start) + " milliseconds");

  result.url = getLocation().href;
  result.docTitle = getDocument().title;
  result.openGraph = getOpenGraph();
  result.twitterCard = getTwitterCard();
  result.resources = resources;

  let promises = [];
  if (body) {
    promises.push(asyncStaticChildren(body).then((bodyHtml) => {
      result.body = bodyHtml;
    }));
  }
  if (head) {
    promises.push(asyncStaticChildren(head).then((headHtml) => {
      if (prefInlineCss) {
        let style = createStyle(getDocument());
        headHtml = style + headHtml;
      }
      result.head = headHtml;
    }));
  }
  return Promise.all(promises).then(function () {
    return result;
  });
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
  function send(result) {
    result.callId = event.data.callId;
    sendAsyncMessage("pageshot@documentStaticData:return", result);
  }
  function sendError(error) {
    console.error("Error getting static HTML:", error);
    console.error(error.stack);
    send({
      error: {
        name: error.name,
        description: error+""
      }
    });
  }
  if (isDisabled) {
    return;
  }
  try {
    prefInlineCss = event.data.prefInlineCss;
    documentStaticData().then((result) => {
      send(result);
    }).catch((error) => {
      sendError(error);
    });
  } catch (error) {
    sendError(error);
  }
});

addMessageListener("pageshot@disable", function (event) {
  isDisabled = true;
});
