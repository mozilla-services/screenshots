window.addEventListener("click", function (event) {
  if (event.target.tagName == "A") {
    event.stopPropagation();
    event.preventDefault();
    self.port.emit("open", event.target.href);
  }
}, true);
