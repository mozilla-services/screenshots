/* globals watchFunction */
/* exported FILENAME */
/** The worker for shoot-panel.html
    This is setup and directly communicated to by main.js
    The shot comes from `lib/shooter.js:ShotContext` (and the `Shot` model)
    The outgoing messages are routed to `ShotContext.panelHandlers)
    */

let err = require("./error-utils.js"),
  React = require("react");

// The shot variable holds the JSONable version of a Shot
let shot;
// For error messages:
let FILENAME = "shoot-panel.js";

self.port.on("shotData", err.watchFunction(function (data) {
  shot = data;
  render();
}));

let ShootPanel = React.createClass({
  onCopyClick: function (e) {
    self.port.emit("copyLink");
    let node = this.refs.copy.getDOMNode();
    node.textContent = node.getAttribute("data-copied-text");
    setTimeout(err.watchFunction(function () {
      node.textContent = node.getAttribute("data-normal-text");
    }), 3000);
  },

  onLinkClick: function (e) {
    self.port.emit("openLink", this.props.viewUrl);
    e.preventDefault();
  },

  onKeyup: function (e) {
    console.log("onKeyup");
    let input = this.refs.input.getDOMNode();
    if (e.which == 13) {
      self.port.emit("addComment", input.value);
      input.value = "";
    }
  },

  render: function () {
    var snippet = this.props.snippet;
    if (! snippet) {
      snippet = this.props.screenshot;
    }
    return <div class="container">
      <div class="row">
        <a class="link" target="_blank" href={ this.props.viewUrl } onClick={ this.onLinkClick }>{ this.props.viewUrl }</a>
        <button ref="copy" type="button" class="copy" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>
      <div class="row">
        <img class="snippet" src={ snippet }/>
      </div>
      <div class="text-container row">
        <div class="text">{ this.props.textSelection }</div>
      </div>
      <div class="comment row">{ this.props.comment}</div>
      <div class="row">
        <input ref="input" type="text" placeholder="Say something" class="comment-input" onKeyup={ this.onKeyup }/>
      </div>
    </div>;
  }
});

/** render() is called everytime the shot is updated, and updates everything
    from scratch given that data */
function render() {
  React.render(React.createElement(ShootPanel, shot), document.getElementById("container"));
  return;

  var snippet = shot.snippet;
  if (! snippet) {
    snippet = shot.screenshot;
  }
  if (snippet) {
    el.querySelector(".snippet").src = snippet;
  } else {
    el.querySelector(".snippet").style.display = "none";
  }
  var text = shot.textSelection;
  if (! text) {
    var textContainer = el.querySelector(".text-container");
    textContainer.parentNode.removeChild(textContainer);
  } else {
    el.querySelector(".text").innerHTML = text;
  }
  var input = el.querySelector(".comment-input");
  input.addEventListener("keyup", err.watchFunction(function (event) {
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
  link.addEventListener("click", err.watchFunction(function (event) {
    self.port.emit("openLink", shot.viewUrl);
    event.preventDefault();
  }), false);
  document.body.innerHTML = "";
  document.body.appendChild(el);
}
