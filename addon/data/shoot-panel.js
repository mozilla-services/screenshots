/* globals watchFunction */
/* exported FILENAME */
/** The worker for shoot-panel.html
    This is setup and directly communicated to by main.js
    The shot comes from `lib/shooter.js:ShotContext` (and the `Shot` model)
    The outgoing messages are routed to `ShotContext.panelHandlers)
    */

let err = require("./error-utils.js"),
  React = require("react");

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
    self.port.emit("openLink", this.props.viewUrl);
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
    var snippet = this.props.snippet;
    if (! snippet) {
      snippet = this.props.screenshot;
    }

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
        <a className="link" target="_blank" href={ this.props.viewUrl } onClick={ this.onLinkClick }>{ this.props.viewUrl }</a>
        <button className="copy" ref="copy" type="button" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>


      <div className="text">{ this.props.textSelection }</div>
      <div className="comment">{ this.props.comment}</div>
      <input className="comment-input" ref="input" type="text" placeholder="Say something" onKeyup={ this.onKeyup }/>
    </div>;
  }
});

self.port.on("shotData", err.watchFunction(function (data) {
  React.render(React.createElement(ShootPanel, data), document.body);
}));


