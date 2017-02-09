/** Framescript attached to documents to make a screenshot

    This is written to be handled by `lib/framescripter.js`
    */

/* globals addMessageListener, sendAsyncMessage, content */

function getWindow() {
  return content;
}

/** Takes a screenshot of the position, which is like:
      {x: absX, y: absY, w: width, h: height}

    maxSize is optionally {w: width, h: height}

    Returns a data: URL version of a png of the screenshot */
function makeScreenShot(pos, maxSize, backgroundColor) {
  let win = getWindow();
  if (!pos) {
    pos = {};
    pos.w = win.innerWidth;
    pos.h = win.innerHeight;
    pos.x = win.scrollX;
    pos.y = win.scrollY;
  }
  if (pos.h === "full") {
    pos.h = Math.max(win.document.body.clientHeight, win.document.documentElement.clientHeight);
  }
  if (pos.w == "full") {
    pos.w = Math.max(win.document.body.clientWidth, win.document.documentElement.clientWidth);
  }
  if (maxSize && !maxSize.h) {
    maxSize.h = maxSize.w / pos.w * pos.h;
  } else if (maxSize && !maxSize.w) {
    maxSize.w = maxSize.h / pos.h * pos.w;
  } else if (maxSize && (pos.w > maxSize.w || pos.h > maxSize.h)) {
    if (pos.w / pos.h > maxSize.w / maxSize.h) {
      // Wider than tall
      maxSize.w = maxSize.h / pos.h * pos.w;
    } else {
      // Taller than wide
      maxSize.h = maxSize.w / pos.w * pos.h;
    }
  } else {
    maxSize = null;
  }
  let iframe = win.document.getElementById("pageshot-iframe");
  if (iframe) {
    iframe.style.display = "none";
  }
  try {
    console.info(
      "shooting area",
      pos.x,
      pos.y,
      "w/h",
      pos.w,
      pos.h,
      maxSize ? "to " + maxSize.w + ", " + maxSize.h : "no max"
    );
    var canvas = win.document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
    if (maxSize) {
      canvas.width = maxSize.w;
      canvas.height = maxSize.h;
    } else {
      canvas.width = pos.w * win.devicePixelRatio;
      canvas.height = pos.h * win.devicePixelRatio;
    }
    let ctx = canvas.getContext("2d");
    if (maxSize) {
      ctx.scale(maxSize.w / pos.w, maxSize.h / pos.h);
    } else if (win.devicePixelRatio !== 1) {
      ctx.scale(win.devicePixelRatio, win.devicePixelRatio);
    }
    backgroundColor = backgroundColor || "#fff";
    ctx.drawWindow(win, pos.x, pos.y, pos.w, pos.h, backgroundColor);
    return canvas.toDataURL();
  } finally {
    if (iframe) {
      iframe.style.display = "";
    }
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
        description: e + ""
      }
    };
  }
  result.callId = event.data.callId;
  sendAsyncMessage("pageshot@screenshot:return", result);
});

addMessageListener("pageshot@disable", function(event) {
  isDisabled = true;
});
