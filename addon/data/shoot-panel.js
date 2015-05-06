/* globals require, self, unescape */
/* exported FILENAME */
/** The worker for shoot-panel.html
    This is setup and directly communicated to by main.js
    The shot comes from `lib/shooter.js:ShotContext` (and the `Shot` model)
    The outgoing messages are routed to `ShotContext.panelHandlers)
    */


let err = require("./error-utils.js"),
  React = require("react"),
  {AbstractShot} = require("../lib/shared/shot.js");

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
    self.port.emit("copyLink", this.props.shot.viewUrl);
    let node = React.findDOMNode(this.refs.copy);
    node.textContent = node.getAttribute("data-copied-text");
    // FIXME: this causes a (harmless) warning if you do something like click
    // the copy button, then click the title so that this element isn't showing
    // in 1sec when we try to reset the copy text:
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
    let deleter;
    if (! this.props.recall) {
      deleter = (
        <img className="delete" src="icons/delete-thumbnail.svg"
             title="Remove this clip" onClick={this.deleteClip} />);
    }
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

    let modesRow;
    if (! this.props.recall) {
      modesRow = [
        <span className={modeClasses.auto} onClick={this.setAuto}>
          Auto-detect
        </span>,
        <span className={modeClasses.selection} onClick={this.setSelection}>
          Selection
        </span>,
        <span className={modeClasses.visible} onClick={this.setVisible}>
          Visible
        </span>
      ];
    } else {
      modesRow = (
        <span className="mode" onClick={this.recallBack}>&lt; back</span>
      );
    }

    let adder;
    if (! this.props.recall) {
      adder = <span className="clip-selector" onClick={this.addClip}>+</span>;
    }

    return (<div className="container">
      <div className="modes-row">
        {modesRow}
      </div>
      {deleter}
      <div className="snippet-container">
        {clipComponent}
      </div>
      <div className="snippets-row">
        {selectors}
        {adder}
      </div>
      <div className="comment-area">
        <input className="comment-input" ref="input" type="text" value={ clipComment } placeholder="Say something about this clip" onKeyUp={ this.onKeyUp } onChange={ this.onChange }/>
      </div>
      <div className="link-row">
        <a className="link" target="_blank" href={ this.props.shot.viewUrl } onClick={ this.onLinkClick }>{ this.props.shot.viewUrl }</a>
        <button className="copy" ref="copy" type="button" data-normal-text="Copy Link" data-copied-text="Copied!" onClick={ this.onCopyClick }>Copy Link</button>
      </div>
      <div className="feedback-row">
        <a className="pageshot-footer" target="_blank" href="https://github.com/mozilla-services/pageshot">PageShot</a>
        <a className="feedback-footer" target="_blank" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + this.props.shot.viewUrl }>Send Feedback</a>
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
      <p className="add-screen-header">
        I want to select:
      </p>
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
      <div className="add-row cancel-row">
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
  },

  /* Recall-related functions */

  recallBack: function () {
    self.port.emit("viewRecallIndex");
  }

});

const debugCommandHelp = `Debug commands available in comments:
/source
  Replaces a text clip with a textarea containing the text clip's source
/viewsource
  Opens the HTML of the text clip in a new tab
/data
  Opens the JSON data in a new tab
`;

function unicodeBtoa(s) {
  return btoa(unescape(encodeURIComponent(s)));
}

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
      let url = "view-source:data:text/html;charset=UTF-8;base64," + unicodeBtoa(html);
      self.port.emit("openLink", url);
    }
    return true;
  } else if (command == "/data") {
    let text = JSON.stringify(truncatedCopy(component.props.shot.asJson()), null, "  ");
    let url = "data:text/plain;charset=UTF-8;base64," + unicodeBtoa(text);
    self.port.emit("openLink", url);
    return true;
  } else if (command.search(/^\/help/i) != -1) {
    let url = "data:text/plain;base64," + btoa(debugCommandHelp);
    self.port.emit("openLink", url);
    return true;
  }
  return false;
}

/** Copy the object, truncating any very long string values (for nicer display of JSON) */
function truncatedCopy(obj) {
  if (typeof obj == "string") {
    if (obj.length > 70) {
      return obj.substr(0, 30) + "..." + obj.substr(obj.length-30);
    }
    return obj;
  }
  if (obj === null || typeof obj != "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => truncatedCopy(item));
  }
  let result = {};
  for (let attr in obj) {
    result[attr] = truncatedCopy(obj[attr]);
  }
  return result;
}

self.port.on("shotData", err.watchFunction(function (data) {
  renderData(data);
}));

function renderData(data) {
  if (! data) {
    data = lastData;
  }
  lastData = data;
  let myShot = new AbstractShot(data.backend, data.id, data.shot);
  if (isAdding[myShot.id] !== undefined) {
    if (myShot.clipNames().length > isAdding[myShot.id]) {
      delete isAdding[myShot.id];
    }
  }
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot}), document.body);
}

self.port.on("recallShot", err.watchFunction(function (data) {
  let myShot = new AbstractShot(data.backend, data.id, data.shot);
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot, recall: true}),
    document.body);
}));

let RecallPanel = React.createClass({

  getInitialState: function () {
    return {copying: null};
  },

  copy: function (event) {
    let url = event.target.getAttribute("data-url");
    this.setState({copying: url});
    setTimeout(() => {
      this.setState({copying: null});
    }, 1000);
    self.port.emit("copyLink", url);
  },

  openShot: function (event) {
    let el = event.target;
    while (! el.hasAttribute("data-id")) {
      el = el.parentNode;
    }
    let id = el.getAttribute("data-id");
    self.port.emit("viewShot", id);
  },

  render: function () {
    let history = [];
    for (let shot of this.props.shots) {
      let text = "copy";
      if (this.state.copying == shot.viewUrl) {
        text = "copied";
      }
      let favicon = <div className="empty-favicon"></div>;
      if (shot.favicon) {
        favicon = <div className="favicon"><img src={shot.favicon} alt="" /></div>;
      }
      history.push(
        <li key={shot.id}>
          <span className="copier" data-url={shot.viewUrl} onClick={this.copy}>{text}</span>
          <div className="title" data-id={shot.id} onClick={this.openShot}>
            {favicon}
            {shot.title}
          </div>
        </li>
      );
    }
    return (
      <div className="container">
        <ul className="recall-list">
          {history}
        </ul>
        <div className="see-more-row">
          <a href={ this.props.backend } target="_blank">View more on { this.props.backend }</a>
        </div>
      </div>);
  }
});

self.port.on("recallIndex", err.watchFunction(function (data) {
  renderRecall(data);
}));

function renderRecall(data) {
  let backend = data.backend;
  let shots = [];
  for (let shotJson of data.shots) {
    shots.push(new AbstractShot(backend, shotJson.id, shotJson.shot));
  }
  React.render(
    React.createElement(RecallPanel, {shots: shots, backend: backend}),
    document.body);
}

self.port.emit("ready");
