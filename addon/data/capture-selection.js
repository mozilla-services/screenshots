/* jshint browser: true */
/* globals console */
/* exported extractSelection */

const SEL_ELEMENT_NODE = document.ELEMENT_NODE;
const SEL_TEXT_NODE = document.TEXT_NODE;

/** Returns a new DOM with the selection extracted
    The element is a <div class="ps-selection">
    (not taken from the selection, but an element to contain all the selected
    elements).

    It expands the selection to include the nearest block-level element
    containing the start and end of the selection.  If it starts at the beginning
    of a block-level element then it will select a preceeding sibling block-level
    element, or a parent block-level element.

    It places a `<span>` around any bare text that was selected, so that all
    selections are within a tag.

    All actually selected nodes have a class "ps-selected" added to them.

    Tags are copied over and specific attributes.
    */
function extractSelection(range) {
  var startContainer = range.startContainer;
  var startOffset = range.startOffset;
  var endContainer = range.endContainer;
  var endOffset = range.endOffset;
  var startBlock = findStartBlock(range);
  var startBlockClass = genSelectionId();
  startBlock.classList.add(startBlockClass);
  var endBlock = findEndBlock(range);
  var endBlockClass = genSelectionId();
  endBlock.classList.add(endBlockClass);
  var commonAncestor = findCommonAncestor([startBlock, endBlock, startContainer, endContainer]);
  var endSpan = insertMarker(endContainer, endOffset);
  var endClass = endSpan.className = genSelectionId();
  var startSpan = insertMarker(startContainer, startOffset);
  var startClass = startSpan.className = genSelectionId();
  range.setStartAfter(startSpan);
  range.setEndBefore(endSpan);
  var result = startBlock.ownerDocument.createElement("div");
  result.className = "ps-selection";
  result.appendChild(copyNode(commonAncestor, [startBlockClass, endBlockClass, startClass, endClass]));
  endSpan.parentNode.removeChild(endSpan);
  startSpan.parentNode.removeChild(startSpan);
  startBlock.classList.remove(startBlockClass);
  endBlock.classList.remove(endBlockClass);
  startBlock = result.getElementsByClassName(startBlockClass)[0];
  startBlock.classList.remove(startBlockClass);
  endBlock = result.getElementsByClassName(endBlockClass)[0];
  endBlock.classList.remove(endBlockClass);
  startSpan = result.getElementsByClassName(startClass)[0];
  endSpan = result.getElementsByClassName(endClass)[0];
  removeBefore(startBlock, result);
  removeAfter(endBlock, result);
  traverse(startSpan, endSpan);
  startSpan.parentNode.removeChild(startSpan);
  endSpan.parentNode.removeChild(endSpan);
  return result;
}

function genSelectionId() {
  var id = ++genSelectionId.id;
  return 'ps-' + genSelectionId.prefix + "-" + id;
}
genSelectionId.id = 0;
genSelectionId.prefix = Date.now() + "--" + Math.floor(Math.random() * 100000);

function getNode(node) {
  while (node.nodeType != SEL_ELEMENT_NODE) {
    node = node.parentNode;
  }
  return node;
}

function isBlock(el) {
  if (! isNode(el)) {
    console.trace();
    throw new Error("isBlock called with non-element: " + el);
  }
  var display = window.getComputedStyle(el).display;
  return !! isBlock.okDisplays[display];
}
isBlock.okDisplays = {
  flex: true,
  block: true,
  "inline-block": true,
  table: true,
  "list-item": true
};

function isText(el) {
  return el.nodeType == SEL_TEXT_NODE;
}

function isNode(el) {
  return el.nodeType == SEL_ELEMENT_NODE;
}

function isEmptyText(textNode) {
  return textNode.isElementContentWhitespace;
}

function isParent(parent, child) {
  while (child) {
    if (child === parent) {
      return true;
    }
    child = child.parentNode;
  }
  return false;
}

function moveNodeChildren(src, dest) {
  if (src.tagName == "TABLE") {
    dest.appendChild(src);
  } else {
    // FIXME: maybe I should always just append?
    while (src.childNodes.length) {
      dest.appendChild(src.childNodes[0]);
    }
  }
}

function replaceTextWithSpan(textNode) {
  var repl = textNode.ownerDocument.createElement("span");
  textNode.parentNode.replaceChild(repl, textNode);
  repl.appendChild(textNode);
  return repl;
}

function isAtStart(el) {
  var parent = el.parentNode;
  for (var i=0; i<parent.childNodes.length; i++) {
    var child = parent.childNodes[i];
    if (child == el) {
      return true;
    }
    if (isText(child) && isEmptyText(child)) {
      continue;
    }
    return false;
  }
}

function isAtEnd(el) {
  var parent = el.parentNode;
  for (var i=parent.childNodes.length-1; i>=0; i--) {
    var child = parent.childNodes[i];
    if (child == el) {
      return true;
    }
    if (isText(child) && isEmptyText(child)) {
      continue;
    }
    return false;
  }
}

function findStartBlock(range) {
  var pos = range.startContainer;
  pos = getNode(pos);
  var isStart = ! range.startOffset;
  while (! isBlock(pos)) {
    isStart = isStart && isAtStart(pos);
    pos = pos.parentNode;
  }
  if (! isStart) {
    // We don't need to look for previous nodes if the selection
    // wasn't at the beginning of the pos node
    return pos;
  }
  var fallbackPos = pos;
  while (pos) {
    var prev = getPreviousBlock(pos);
    if (prev) {
      return prev;
    }
    pos = pos.parentNode;
  }
  return fallbackPos;
}

function getPreviousBlock(el) {
  while (el) {
    el = el.previousSibling;
    if (el && isNode(el) && isBlock(el)) {
      return el;
    }
  }
  return null;
}

function findEndBlock(range) {
  var pos = range.endContainer;
  var isEnd = false;
  if (isNode(pos) && pos.childNodes.length == range.endOffset) {
    isEnd = true;
  } else if (isText(pos) && pos.nodeValue.length == range.endOffset) {
    isEnd = true;
  }
  pos = getNode(pos);
  while (! isBlock(pos)) {
    isEnd = isEnd && isAtEnd(pos);
    pos = pos.parentNode;
  }
  if (! isEnd) {
    // We don't need to look at following nodes if the selection
    // was not at the exact end of this node
    return pos;
  }
  var fallbackPos = pos;
  while (pos) {
    var next = getNextBlock(pos);
    if (next) {
      return next;
    }
    pos = pos.parentNode;
  }
  return fallbackPos;
}

function getNextBlock(el) {
  while (el) {
    el = el.nextSibling;
    if (el && isNode(el) && isBlock(el)) {
      return el;
    }
  }
  return null;
}

function findCommonAncestor(elements) {
  var parents = [];
  var pos = elements[0];
  while (pos) {
    parents.push(pos);
    pos = pos.parentNode;
  }
  var bestIndex = 0;
  for (var i=1; i<elements.length; i++) {
    var el = elements[i];
    pos = el;
    while (pos) {
      var parentIndex = parents.indexOf(pos);
      if (parentIndex != -1) {
        bestIndex = Math.max(bestIndex, parentIndex);
        break;
      }
      pos = pos.parentNode;
    }
    if (! pos) {
      throw new Error("No common parent");
    }
  }
  var parent = parents[bestIndex];
  while (findCommonAncestor.requireParent[parent.tagName]) {
    parent = parent.parentNode;
  }
  return parent;
}

findCommonAncestor.requireParent = {
  TR: true,
  TD: true,
  TBODY: true,
  LI: true,
  DT: true,
  DD: true
};

function insertMarker(container, offset) {
  var marker = container.ownerDocument.createElement("span");
  if (isText(container)) {
    var parent = container.parentNode;
    if (! parent) {
      console.error("weird no parent", container);
      console.trace();
    }
    if (offset === 0) {
      parent.insertBefore(marker, container);
    } else if (offset === container.nodeValue.length) {
      parent.insertBefore(marker, container.nextSibling);
    } else {
      var preText = container.nodeValue.substr(0, offset);
      var postNode = container.ownerDocument.createTextNode(
        container.nodeValue.substr(offset));
      parent.insertBefore(postNode, container.nextSibling);
      parent.insertBefore(marker, container.nextSibling);
      container.nodeValue = preText;
    }
  } else {
    var el = container.childNodes[offset];
    container.insertBefore(marker, el);
  }
  return marker;
}

function ignoreElement(node) {
  if (! node.offsetParent) {
    return true;
  }
  return false;
}

function copyNode(node, goodClasses) {
  var result = copyOneNode(node, goodClasses);
  for (var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (ignoreElement(child)) {
      continue;
    }
    if (isText(child)) {
      result.appendChild(node.ownerDocument.createTextNode(child.nodeValue));
    } else if (isNode(child)) {
      result.appendChild(copyNode(child, goodClasses));
    }
  }
  return result;
}

function copyOneNode(node, goodClasses) {
  var tagName = node.tagName;
  if (copyOneNode.translateElements[tagName]) {
    tagName = copyOneNode.translateElements[tagName];
  }
  var result = node.ownerDocument.createElement(tagName);
  if (node.id) {
    result.setAttribute("data-orig-id", node.id);
  }
  for (var i=0; i<goodClasses.length; i++) {
    if (node.classList.contains(goodClasses[i])) {
      result.classList.add(goodClasses[i]);
    }
  }
  var attrs = copyOneNode.copyAttrs[node.tagName];
  if (attrs) {
    for (i=0; i<attrs.length; i++) {
      if (["href", "value", "src"].indexOf(attrs[i]) != -1) {
        result[attrs[i]] = node[attrs[i]];
      } else {
        if (node.hasAttribute(attrs[i])) {
          result.setAttribute(attrs[i], node.getAttribute(attrs[i]));
        }
      }
    }
  }
  if (node.tagName == "IMG") {
    result.setAttribute("height", node.clientHeight);
    result.setAttribute("width", node.clientWidth);
  }
  if (node.tagName == "A") {
    result.setAttribute("target", "_blank");
  }
  return result;
}
copyOneNode.copyAttrs = {
  A: ["href"],
  IMG: ["src"],
  INPUT: ["type", "value", "checked"],
  SELECT: ["multiple"],
  OPTION: ["value", "selected"]
};
copyOneNode.translateElements = {
  BODY: "div"
};

function removeBefore(block, until) {
  var pos = block;
  while (pos != until) {
    while (pos.previousSibling) {
      pos.parentNode.removeChild(pos.previousSibling);
    }
    pos = pos.parentNode;
  }
}

function removeAfter(block, until) {
  var pos = block;
  while (pos != until) {
    while (pos.nextSibling) {
      pos.parentNode.removeChild(pos.nextSibling);
    }
    pos = pos.parentNode;
  }
}

function traverse(start, end) {
  var pos = start;
  while (true) {
    var next = pos.nextSibling;
    if (! next) {
      pos = pos.parentNode;
      continue;
    }
    if (next == end) {
      return;
    }
    if (isParent(next, end)) {
      break;
    }
    if (isText(next)) {
      next = replaceTextWithSpan(next);
    }
    next.classList.add("ps-selected");
    pos = next;
  }
  pos = next;
  while (pos != end) {
    if (isText(pos)) {
      pos = replaceTextWithSpan(pos);
      continue;
    }
    if (isParent(pos, end)) {
      pos = pos.childNodes[0];
      continue;
    }
    pos.classList.add("ps-selected");
    pos = pos.nextSibling;
  }
}
