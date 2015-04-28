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
let hasDeleted = {};
let lastData;
let debugDisplayTextSource = false;


const MAX_WIDTH = 375,
  MAX_HEIGHT = 238;

/** Renders the image of the clip inside the panel */
let ImageClip = React.createClass({
  render: function () {
    var width = this.props.clip.image.dimensions.x,
      height = this.props.clip.image.dimensions.y;

    if (width > MAX_WIDTH) {
      let factor = MAX_WIDTH / width;
      width = MAX_WIDTH;
      height = height * factor;
    } else if (height > MAX_HEIGHT) {
      let factor =  MAX_HEIGHT / height;
      height = MAX_HEIGHT;
      width = width * factor;
    }

    height = height + 'px';
    width = width + 'px';

    return <img className="snippet-image" src={this.props.clip.image.url} style={{ height: height, width: width }} />;
  }
});

/** Renders a the text of a text clip inside the panel */
let TextClip = React.createClass({
  render: function () {
    if (debugDisplayTextSource) {
      return <textarea readOnly="1" className="snippet-text" value={this.props.clip.text.html} />;
    }
    let html = {__html: this.props.clip.text.html};
    return <div className="snippet-text" dangerouslySetInnerHTML={html}></div>;
  }
});

/** Renders when no clips have yet been added to the shot */
let LoadingClip = React.createClass({
  render: function () {
    return <img src="icons/loading.png" />;
  }
});

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

  onKeyUp: function (e) {
    let input = React.findDOMNode(this.refs.input);
    if (e.which == 13) {
      if (! processDebugCommand(this, input.value)) {
        self.port.emit("addComment", input.value);
      }
      input.blur();
      let id = this.props.activeClipName ? "comment_" + this.props.activeClipName : "globalComment";
      this.setState({
        [id]: null
      });
    }
  },

  onChange: function (e) {
    let id = this.props.activeClipName ? "comment_" + this.props.activeClipName : "globalComment";
    this.setState({
      [id]: e.target.value
    });
  },

  getInitialState: function () {
    return {};
  },

  render: function () {
    if (isAdding[this.props.shot.id] !== undefined ||
        (hasDeleted[this.props.shot.id] && ! this.props.activeClipName)) {
      return this.renderAddScreen();
    }
    let clip = null;
    if (this.props.activeClipName) {
      clip = this.props.shot.getClip(this.props.activeClipName);
    }
    let modeClasses = {
      auto: "mode",
      selection: "mode",
      visible: "mode"
    };
    let clipType = clip && clip.image && clip.image.captureType;
    if (clipType) {
      modeClasses[clipType] += " mode-selected";
    }
    let selectors = [];
    let clipNames = this.props.shot.clipNames();
    if (clipNames.length > 1) {
      for (let i=0; i<clipNames.length; i++) {
        let selectorClass = "clip-selector";
        if (clipNames[i] == this.props.activeClipName) {
          selectorClass += " clip-selector-selected";
        }
        let selector = <span className={selectorClass} data-clip-id={clipNames[i]} onClick={this.selectClip} key={clipNames[i]}>{i+1}</span>;
        selectors.push(selector);
      }
    }

    let clipComponent;
    let deleter = (
      <img className="delete" src="icons/delete-thumbnail.svg"
           title="Remove this clip" onClick={this.deleteClip} />);
    if (! clip) {
      clipComponent = <LoadingClip />;
      deleter = null;
    } else if (clip.image) {
      clipComponent = <ImageClip clip={clip} />;
    } else if (clip.text) {
      clipComponent = <TextClip clip={clip} />;
    } else {
      throw new Error("Weird clip, no .text or .image");
    }
    let clipComment = "";
    let commentId = this.props.activeClipName ? "comment_" + this.props.activeClipName : "globalComment";
    if (typeof this.state[commentId] == "string") {
      clipComment = this.state[commentId];
    } else if (clip) {
      if (clip.comments.length) {
        // FIXME: need to find the first comment *by this user*
        clipComment = clip.comments[0].text;
      }
    } else {
      if (this.props.shot.comments.length) {
        // FIXME: first comment for this user
        clipComment = this.props.shot.comments[0].text;
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
      <div className="snippet-container">
        {clipComponent}
        {deleter}
      </div>
      <div className="snippets-row">
        {selectors}
        <span className="clip-selector" onClick={this.addClip}>+</span>
      </div>
      <div className="link-row">
        <a className="link" target="_blank" href={ this.props.shot.viewUrl } onClick={ this.onLinkClick }>{ this.props.shot.viewUrl }</a>
        <button className="copy" ref="copy" type="button" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>

      <div className="comment-area">
        <input className="comment-input" ref="input" type="text" value={ clipComment } placeholder="Say something" onKeyUp={ this.onKeyUp } onChange={ this.onChange }/>
      </div>
    </div>);
  },

  selectClip: function (event) {
    let clipId = event.target.getAttribute("data-clip-id");
    self.port.emit("selectClip", clipId);
  },

  deleteClip: function () {
    hasDeleted[this.props.shot.id] = true;
    self.port.emit("deleteClip", this.props.activeClipName);
  },

  addClip: function () {
    isAdding[this.props.shot.id] = this.props.shot.clipNames().length;
    setTimeout(renderData);
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
    if (! this.props.shot.clipNames().length) {
      self.port.emit("hide");
    }
  }

});

const debugCommandHelp = `
Debug commands available in comments:
/source
  Replaces a text clip with a textarea containing the text clip's source
/viewsource
  Opens the HTML of the text clip in a new tab
`;

function processDebugCommand(component, command) {
  command = command.replace(/^\s*/, "").replace(/\s*$/, "");
  if (command == "/source") {
    debugDisplayTextSource = ! debugDisplayTextSource;
    setTimeout(renderData);
    return true;
  } else if (command == "/viewsource") {
    let clip = component.props.shot.getClip(component.props.activeClipName);
    if (clip && clip.text) {
      let html = clip.text.html;
      html = '<!DOCTYPE html><html><body><!-- text selection: -->' + html + '</body></html>';
      html = html.replace(/>/g, '>\n');
      let url = "view-source:data:text/html;base64," + btoa(html);
      self.port.emit("openLink", url);
    }
    return true;
  } else if (command.search(/^\/help/i) != -1) {
    let url = "data:text/plain;base64," + btoa(debugCommandHelp);
    self.port.emit("openLink", url);
    return true;
  }
  return false;
}

self.port.on("shotData", err.watchFunction(function (data) {
  renderData(data);
}));

function renderData(data) {
  if (! data) {
    data = lastData;
  }
  lastData = data;
  let myShot = new shot.AbstractShot(data.backend, data.id, data.shot);
  if (isAdding[myShot.id] !== undefined) {
    if (myShot.clipNames().length > isAdding[myShot.id]) {
      delete isAdding[myShot.id];
    }
  }
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot}), document.body);
}
