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
    let node = document.getElementById(m.data.show);

    if (node === null) {
      window.parent.postMessage({
        scrollX: m.data.location.left, scrollY: m.data.location.top,
        clipWidth: m.data.location.right - m.data.location.left,
        clipHeight: m.data.location.bottom - m.data.location.top
      },
      window.location.origin);
    } else {
      let boundingRect = node.getBoundingClientRect();

      window.parent.postMessage({
        scrollX: boundingRect.x, scrollY: boundingRect.y,
        clipWidth: boundingRect.width, clipHeight: boundingRect.height
      },
      window.location.origin);
    }
  }
);
