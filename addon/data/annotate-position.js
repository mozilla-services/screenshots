/** Takes a pixel position and gives a "full" location using element offsets */
/* exported annotatePosition */

function annotatePosition(pos) {
  function findElement(x, y) {
    let element = document.elementFromPoint(x, y);
    if (! element) {
      // FIXME: not sure if this is a reasonable fallback
      element = document.body;
    }
    if (! element.id) {
      throw new Error("Element has no id:", element);
    }
    let bodyRect = document.body.getBoundingClientRect();
    let elementRect = element.getBoundingClientRect();
    let elementTop = elementRect.top - bodyRect.top;
    let elementLeft = elementRect.left - bodyRect.left;
    return {
      element: "#" + element.id,
      x: x - elementLeft,
      y: y - elementTop,
      height: elementRect.height,
      width: elementRect.width
    };
  }
  let pos1 = findElement(pos.left, pos.top);
  pos.topLeftElement = pos1.element;
  pos.topLeftOffset = {x: pos1.x, y: pos1.y, height: pos1.height, width: pos1.width};
  if (typeof pos.bottom == "number") {
    let pos2 = findElement(pos.right, pos.bottom);
    pos.bottomRightElement = pos2.element;
    pos.bottomRightOffset = {x: pos2.x, y: pos2.y, height: pos2.height, width: pos2.width};
  }
}
