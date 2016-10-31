/** Takes a pixel position and gives a "full" location using element offsets */
/* exported annotatePosition */

function annotatePosition(pos) { // eslint-disable-line no-unused-vars
  function findElement(x, y, offsetX, offsetY) {
    let element = document.elementFromPoint(x - window.pageXOffset + offsetX, y - window.pageYOffset + offsetY);
    if ((! element) || (! element.id)) {
      element = document.body;
    }
    let id;
    if (element == document.body) {
      id = "body";
    } else {
      id = "#" + element.id;
    }
    if (! id) {
      throw new Error("Element has no id: " + element + " " + element.tagName + "." + (element.className || "(no class)"));
    }
    let bodyRect = document.body.getBoundingClientRect();
    let elementRect = element.getBoundingClientRect();
    let elementTop = elementRect.top - bodyRect.top;
    let elementLeft = elementRect.left - bodyRect.left;
    return {
      element: id,
      x: x - elementLeft,
      y: y - elementTop,
      height: elementRect.height,
      width: elementRect.width
    };
  }
  let iframe = document.getElementById("pageshot-iframe");
  if (iframe) {
    iframe.style.display = "none";
  }
  try {
    let pos1 = findElement(pos.left, pos.top, 5, 5);
    pos.topLeftElement = pos1.element;
    pos.topLeftOffset = {x: pos1.x, y: pos1.y, height: pos1.height, width: pos1.width};
    if (typeof pos.bottom == "number") {
      let pos2 = findElement(pos.right, pos.bottom, -5, -5);
      pos.bottomRightElement = pos2.element;
      pos.bottomRightOffset = {x: pos2.x, y: pos2.y, height: pos2.height, width: pos2.width};
    }
  } finally {
    if (iframe) {
      iframe.style.display = "";
    }
  }
}
