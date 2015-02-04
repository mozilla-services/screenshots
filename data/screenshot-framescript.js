var canvas = content.document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
//document.documentElement.appendChild(canvas);

function makeScreenShot(pos, maxSize, backgroundColor) {
  console.log("shooting area", pos.x, pos.y, "w/h", pos.w, pos.h, !!maxSize);
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
  ctx.drawWindow(content, pos.x, pos.y, pos.w, pos.h, backgroundColor);
  return canvas.toDataURL();
}

addMessageListener("pageshot@pageshot:request-screenshot", function (event) {
  var result;
  try {
    result = {
      imageUrl: makeScreenShot(event.data.pos, event.data.maxSize, event.data.backgroundColor)
    };
  } catch (e) {
    result = {
      error: {
        name: e.name,
        description: e+""
      }
    };
  }
  sendAsyncMessage("pageshot@pageshot:get-screenshot", result);
});
