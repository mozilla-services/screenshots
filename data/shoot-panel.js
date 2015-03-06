/* jshint browser: true */
/* globals self, watchFunction */
/* exported FILENAME */
var shot;
var FILENAME = "shoot-panel.js";

self.port.on("shotData", function (data) {
  shot = data;
  watchFunction(render)();
});

function render() {
  var el = document.createElement("div");
  el.innerHTML = document.getElementById("template").textContent;
  var copy = el.querySelector(".copy");
  copy.addEventListener("click", watchFunction(function () {
    self.port.emit("copyLink");
    copy.textContent = copy.getAttribute("data-copied-text");
    setTimeout(watchFunction(function () {
      copy.textContent = copy.getAttribute("data-normal-text");
    }), 3000);
  }), false);
  var snippet = shot.snippet;
  if (! snippet) {
    snippet = shot.screenshot;
  }
  if (snippet) {
    el.querySelector(".snippet").src = snippet;
  } else {
    el.querySelector(".snippet").style.display = "none";
  }
  var input = el.querySelector(".comment-input");
  input.addEventListener("keyup", watchFunction(function (event) {
    if (event.which == 13) {
      self.port.emit("addComment", input.value);
      input.value = "";
    }
  }), false);
  if (shot.comment) {
    el.querySelector(".comment").textContent = shot.comment;
  } else {
    el.querySelector(".comment").style.display = "none";
  }
  var link = el.querySelector(".link");
  link.href = link.textContent = shot.viewUrl;
  link.addEventListener("click", watchFunction(function (event) {
    self.port.emit("openLink", shot.viewUrl);
    event.preventDefault();
  }), false);
  document.body.innerHTML = "";
  document.body.appendChild(el);
}
