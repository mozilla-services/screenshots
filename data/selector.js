self.port.on("set-list", function (list) {
  var container = document.getElementById("list");
  var nothing = document.getElementById("nothing-here");
  container.innerHTML = "";
  list.forEach(function (item) {
    var el = document.createElement("div");
    el.textContent = "Add to #" + item;
    el.setAttribute("title", "Add this page to #" + item);
    var span = document.createElement("span");
    span.className = "viewer";
    span.textContent = "view";
    span.addEventListener("click", function (event) {
      event.stopPropagation();
      self.port.emit("view", item);
    }, false);
    el.appendChild(span);
    container.appendChild(el);
    el.addEventListener("click", function () {
      self.port.emit("click", item);
    }, false);
  });
  if (! list.length) {
    nothing.style.display = "";
  } else {
    nothing.style.display = "none";
  }
});

self.port.emit("hello");
