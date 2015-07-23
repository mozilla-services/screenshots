/** Framescript attached to documents to make a screenshot

    This is written to be handled by `lib/framescripter.js`
    */


// FIXME: this is a hack to take a shot of the iframe in the viewer
// instead of the container
function getWindow() {
  if (content.document.getElementById("frame")) {
    return content.document.getElementById("frame").contentWindow;
  }
  return content;
}

/** Takes a screenshot of the position, which is like:
      {x: absX, y: absY, w: width, h: height}

    maxSize is optionally {w: width, h: height}

    Returns a data: URL version of a png of the screenshot */
function makeScreenShot(pos, maxSize, backgroundColor) {
  let win = getWindow();
  if (! pos) {
    pos = {};
    pos.w = win.innerWidth;
    pos.h = win.innerHeight;
    pos.x = win.scrollX;
    pos.y = win.scrollY;
  }
  if (maxSize && (pos.w > maxSize.w || pos.h > maxSize.h)) {
    if (pos.w / pos.h > maxSize.w / maxSize.h) {
      // Wider than tall
      maxSize.w = (maxSize.h / pos.h) * pos.w;
    } else {
      // Taller than wide
      maxSize.h = (maxSize.w / pos.w) * pos.h;
    }
  } else {
    maxSize = null;
  }
  win.document.body.classList.add("pageshot-hide-selection");
  try {
    console.info("shooting area", pos.x, pos.y, "w/h", pos.w, pos.h, !!maxSize);
    var canvas = win.document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    if (maxSize) {
      canvas.width = maxSize.w;
      canvas.height = maxSize.h;
    } else {
      canvas.width = pos.w;
      canvas.height = pos.h;
    }
    let ctx = canvas.getContext('2d');
    if (maxSize) {
      ctx.scale(maxSize.w / pos.w, maxSize.h / pos.h);
    }
    backgroundColor = backgroundColor || "#000";
    ctx.drawWindow(win, pos.x, pos.y, pos.w, pos.h, backgroundColor);
    return canvas.toDataURL();
  } finally {
    win.document.body.classList.remove("pageshot-hide-selection");
  }
}

// framescripter infrastructure:
let isDisabled = false;
addMessageListener("pageshot@screenshot:call", function handler(event) {
  if (isDisabled) {
    return;
  }
  var result;
  try {
    result = {
      imageUrl: makeScreenShot(event.data.pos, event.data.maxSize, event.data.backgroundColor)
    };
  } catch (e) {
    console.error("Error making shot:", e);
    console.trace();
    result = {
      error: {
        name: e.name,
        description: e+""
      }
    };
  }
  result.callId = event.data.callId;
  sendAsyncMessage("pageshot@screenshot:return", result);
});

addMessageListener("pageshot@disable", function (event) {
  isDisabled = true;
});
