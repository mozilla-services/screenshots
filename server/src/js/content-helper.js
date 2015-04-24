/*jslint browser: true */


window.addEventListener(
  "load",
  () => window.parent.postMessage(
    {height: document.body.scrollHeight},
    window.location.origin)
);

window.addEventListener(
  "message",
  (m) => {
    if (m.origin !== location.origin) {
      return;
    }
    let node = document.getElementById(m.data.show),
      boundingRect = node.getBoundingClientRect();

    window.parent.postMessage({
      scrollX: boundingRect.x, scrollY: boundingRect.y,
      clipWidth: boundingRect.width, clipHeight: boundingRect.height
    },
    window.location.origin);
  }
)
