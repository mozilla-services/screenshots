/* browser: true */

const page = require("./page").page;

let model;

exports.launch = function(m) {
  model = m;
  render();
}

exports.disconnectDevice = function() {
  let url = model.backend + "/api/disconnect-device";
  let req = new XMLHttpRequest();
  req.open("POST", url);
  req.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  req.onload = function() {
    if (req.status >= 300) {
      // FIXME: a lame way to do an error message
      window.alert("Error disconnecting: " + req.status + " " + req.statusText);
      window.Raven.captureException(new Error(`Error disconnecting: ${req.status} ${req.statusText}`));
    } else {
      location.reload();
    }
  };
  req.send(`_csrf=${encodeURIComponent(model.csrfToken)}`);
}

function render() {
  page.render(model);
}

window.controller = exports;
