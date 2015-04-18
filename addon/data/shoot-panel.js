/* globals require, self */
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
let isAdding = {};
let lastData;

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
    if (isAdding[this.props.shot.id] !== undefined) {
      return this.renderAddScreen();
    }
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
    let selectors = [];
    let clipNames = this.props.shot.clipNames();
    if (clipNames.length > 1) {
      for (let i=0; i<clipNames.length; i++) {
        let selectorClass = "clip-selector";
        if (clipNames[i] == this.props.activeClipName) {
          selectorClass += " clip-selector-selected";
        }
        let selector = <span className={selectorClass} data-clip-id={clipNames[i]} onClick={this.selectClip}>{i+1}</span>;
        selectors.push(selector);
      }
    }

    return (<div className="container">
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
        {selectors}
        <span className="clip-selector" onClick={this.addClip}>+</span>
      </div>
      <div className="link-row">
        <a className="link" target="_blank" href={ this.props.shot.viewUrl } onClick={ this.onLinkClick }>{ this.props.shot.viewUrl }</a>
        <button className="copy" ref="copy" type="button" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>

      <div className="comment">{this.props.shot.comment}</div>
      <input className="comment-input" ref="input" type="text" placeholder="Say something" onKeyup={ this.onKeyup }/>
    </div>);
  },

  selectClip: function (event) {
    let clipId = event.target.getAttribute("data-clip-id");
    self.port.emit("selectClip", clipId);
  },

  addClip: function () {
    isAdding[this.props.shot.id] = this.props.shot.clipNames().length;
    setTimeout(function () {
      renderData(lastData);
    });
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
  },

  renderAddScreen: function () {
    return (<div className="container">
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addAuto}>Add Auto-Detect</button>
        </div>
      </div>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addSelection}>Add Selection</button>
        </div>
      </div>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addVisible}>Add Visible</button>
        </div>
      </div>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addCancel}>Cancel</button>
        </div>
      </div>
    </div>);
  },

  addAuto: function () {
    self.port.emit("addClip", "auto");
  },

  addSelection: function () {
    self.port.emit("addClip", "selection");
  },

  addVisible: function () {
    self.port.emit("addClip", "visible");
  },

  addCancel: function () {
    delete isAdding[this.props.shot.id];
    setTimeout(function () {
      renderData(lastData);
    });
  }

});

self.port.on("shotData", err.watchFunction(function (data) {
  renderData(data);
}));

function renderData(data) {
  lastData = data;
  console.log("shotData", Object.getOwnPropertyNames(data));
  let myShot = new shot.AbstractShot(data.backend, data.id, data.shot);
  if (isAdding[myShot.id] !== undefined) {
    if (myShot.clipNames().length > isAdding[myShot.id]) {
      delete isAdding[myShot.id];
    }
  }
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot}), document.body);
}
