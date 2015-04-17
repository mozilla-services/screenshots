/* globals watchFunction, require */
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
    let snippet = "icons/loading.png";
    let clip = null;
    if (this.props.activeClipName) {
      clip = this.props.shot.getClip(this.props.activeClipName);
      snippet = clip.image.url;
    }
    //console.log("snippet", Object.getOwnPropertyNames(snippet));
    let modeClasses = {
      auto: "mode",
      selection: "mode",
      visible: "mode"
    };
    let clipType = (clip ? clip.image.captureType : null) || "auto";
    modeClasses[clipType] += " mode-selected";

    return <div className="container">
      <div className="modes-row">
        <span className={modeClasses.auto} onClick={this.setAuto}>
          Auto-detect
        </span>
        <span className={modeClasses.selection} onClick={this.setSelection}>
          Selection
        </span>
        <span className={modeClasses.visible} onClick={this.setVisible}>
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

      <div className="comment">{this.props.shot.comment}</div>
      <input className="comment-input" ref="input" type="text" placeholder="Say something" onKeyup={ this.onKeyup }/>
    </div>;
  },

  setAuto: function () {
    this.setCaptureType("auto");
  },
  setSelection: function () {
    this.setCaptureType("selection");
  },
  setVisible: function () {
    this.setCaptureType("visible");
  },

  setCaptureType: function (type) {
    self.port.emit("setCaptureType", type);
  }
});

self.port.on("shotData", err.watchFunction(function (data) {
  console.log("shotData", Object.getOwnPropertyNames(data));
  let myShot = new shot.AbstractShot(data.backend, data.id, data.shot);
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot}), document.body);
}));
