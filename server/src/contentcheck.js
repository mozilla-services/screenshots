const domino = require("domino");

/** These elements are never sent: */
const skipElementsBadTags = {
  SCRIPT: true,
  NOSCRIPT: true
};

const checkAttrsForLinks = {
  src: true,
  href: true,
  content: true
};

exports.checkContent = function (htmlString) {
  let window = domino.createWindow(htmlString);
  let errors = [];
  let els = window.document.getElementsByTagName("*");
  let elLength = els.length;
  for (let i=0; i<elLength; i++) {
    let el = els[i];
    if (skipElementsBadTags[el.tagName]) {
      errors.push(`Bad element: ${describeTag(el)}`);
    }
    if (el.attributes) {
      let attrList = [];
      // FIXME: working around a bug in domino: https://github.com/fgnass/domino/issues/53
      for (let name in el.attributes) {
        if (name == "element") {
          // Internal/private variable
          continue;
        }
        let value = el.attributes[name].data;
        attrList.push([name, value]);
      }
      errors = errors.concat(exports.checkAttributes(attrList, el));
    }
  }
  // FIXME: should confirm <base href> is correct
  return errors;
};

exports.checkAttributes = function (attrList, el) {
  if (! (attrList && attrList.length)) {
    return [];
  }
  let errors = [];
  for (let i=0; i<attrList.length; i++) {
    let name = attrList[i][0].toLowerCase();
    let value = attrList[i][1];
    if (name.startsWith("on")) {
      errors.push(`Bad attribute ${safeString(name)} on ${describeTag(el)}`);
    }
    if (checkAttrsForLinks[name]) {
      if (value.search(/^javascript:/i) !== -1) {
        errors.push(`Bad attribute ${safeString(name)} with javascript link on ${describeTag(el)}`);
      }
    }
  }
  return errors;
};

function describeTag(el) {
  if (typeof el == "string") {
    return `<${safeString(el)}>`;
  }
  let s = el.tagName;
  if (el.className) {
    s += safeString("." + el.className.split().join("."));
  }
  if (el.id) {
    s += safeString("#" + el.id);
  }
  return s;
}

/** Return a string that contains only identifier-ish characters.  Because we
 ** are creating potentially loggable error messages with user-created content, we
 ** want to resist any XSS attacks against our logs themselves */
function safeString(s) {
  return s.replace(/[^a-zA-Z0-9_\-.,#]/, "");
}
