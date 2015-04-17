/* globals watchFunction */
/* exported FILENAME */
/** The worker for shoot-panel.html
    This is setup and directly communicated to by main.js
    The shot comes from `lib/shooter.js:ShotContext` (and the `Shot` model)
    The outgoing messages are routed to `ShotContext.panelHandlers)
    */


let err = require("./error-utils.js"),
  React = require("react"),
  shot = require("../lib/shot.js");

// For error messages:
let FILENAME = "shoot-panel.js";

let ShootPanel = React.createClass({
  onCopyClick: function (e) {
    self.port.emit("copyLink");
    let node = React.findDOMNode(this.refs.copy);
    node.textContent = node.getAttribute("data-copied-text");
    setTimeout(err.watchFunction(function () {
      node.textContent = node.getAttribute("data-normal-text");
    }), 3000);
  },

  onLinkClick: function (e) {
    self.port.emit("openLink", this.props.shot.viewUrl);
    e.preventDefault();
  },

  onKeyup: function (e) {
    console.log("onKeyup");
    let input = React.findDOMNode(this.refs.input);
    if (e.which == 13) {
      self.port.emit("addComment", input.value);
      input.value = "";
    }
  },

  render: function () {
    let clipNames = this.props.shot.clipNames();
    console.log("render panel", this.props.shot.viewUrl);
    console.log("clipnames", clipNames);
    let snippet = "";
    if (clipNames) {
      snippet = this.props.shot.getClip(clipNames[0]).image.url;
    }
    //console.log("snippet", Object.getOwnPropertyNames(snippet));

    return <div className="container">
      <div className="modes-row">
        <span className="mode mode-selected">
          Auto-detect
        </span>
        <span className="mode">
          Selection
        </span>
        <span className="mode">
          Visible
        </span>
      </div>
      <img className="snippet" src={ snippet }/>
      <div className="snippets-row">
        <a href="#">+</a>
      </div>
      <div className="link-row">
        <a className="link" target="_blank" href={ this.props.shot.viewUrl } onClick={ this.onLinkClick }>{ this.props.shot.viewUrl }</a>
        <button className="copy" ref="copy" type="button" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>

      <div className="comment">{ this.props.shot.comment}</div>
      <input className="comment-input" ref="input" type="text" placeholder="Say something" onKeyup={ this.onKeyup }/>
    </div>;
  }
});

self.port.on("shotData", err.watchFunction(function (data) {
  console.log("shotData", Object.getOwnPropertyNames(data));
  let myShot = new shot.AbstractShot(data.backend, data.id, data.shot);
  React.render(
    React.createElement(ShootPanel, {shot: myShot}), document.body);
}));



