self.port.on("set-list", function (list) {
  var container = document.getElementById("list");
  container.innerHTML = "";
  list.forEach(function (item) {
    var el = document.createElement("div");
    el.textContent = "Add to #" + item;
    el.setAttribute("title", "Add this page to #" + item);
    container.appendChild(el);
    el.addEventListener("click", function () {
      self.port.emit("click", item);
    }, false);
  });
});

self.port.emit("hello");
