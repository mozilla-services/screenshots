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

function stripProtocol(url) {
  return url.replace(/^https?:\/\//i, "");
}

/** Renders the image of the clip inside the panel */
class ImageClip extends React.Component {
  render() {
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
}

/** Renders a the text of a text clip inside the panel */
class TextClip extends React.Component {
  render() {
    if (debugDisplayTextSource) {
      return <textarea readOnly="1" className="snippet-text" value={this.props.clip.text.html} />;
    }
    let html = {__html: this.props.clip.text.html};
    return <div className="snippet-text" dangerouslySetInnerHTML={html}></div>;
  }
}

/** Renders when no clips have yet been added to the shot */
class LoadingClip extends React.Component {
  render() {
    return <img src="icons/loading.png" />;
  }
}

class ShareButtons extends React.Component {
  render() {
    let size = this.props.large ? "32" : "16";
    return <div className="share-row">
      <a target="_blank" href={ "https://www.facebook.com/sharer/sharer.php?u=" + this.props.shot.viewUrl }>
        <img src={ `icons/facebook-${size}.png` } />
      </a>
      <a target="_blank" href={"https://twitter.com/home?status=" + this.props.shot.viewUrl }>
        <img src={ `icons/twitter-${size}.png` } />
      </a>
      <a target="_blank" href={"https://pinterest.com/pin/create/button/?url=" + this.props.shot.viewUrl + "&media=" + this.props.clipUrl + "&description=" }>
        <img src={ `icons/pinterest-${size}.png` } />
      </a>
      <a target="_blank" href={ "mailto:?subject=Check%20out%20this%20PageShot%20page&body=" + this.props.shot.viewUrl }>
        <img src={ `icons/email-${size}.png` } />
      </a>
      <a onClick={ this.props.onCopyClick }>
        <img src={ `icons/link-${size}.png` } />
      </a>
    </div>;
  }
}

class SimplifiedPanel extends React.Component {
  onClickLink(e) {
    self.port.emit("openLink", this.props.shot.viewUrl);
    e.preventDefault();
  }

  render() {
    return <div className="container">
      <div className="simplified-instructions">
        <div>
          Copy of page saved:
        </div>
        <a className="simplified-link" href="#" onClick={ this.onClickLink.bind(this) }>
          { stripProtocol(this.props.shot.viewUrl) }
        </a>
      </div>
      <div className="simplified-share-buttons">
        <div>
          Now go and share it!
        </div>
        <ShareButtons large={ true } { ...this.props } />
      </div>
      <div className="simplified-edit-container">
        <button className="simplified-edit-button" onClick={ this.props.onClickEdit }>
          Edit
        </button>
      </div>
      <img className="alpha-badge" src="icons/alpha-badge.png" />
    </div>;
  }
}

class ShootPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onCopyClick(e) {
    self.port.emit("copyLink", this.props.shot.viewUrl);
  }

  onLinkClick(e) {
    self.port.emit("openLink", this.props.shot.viewUrl);
    e.preventDefault();
  }

  onKeyUp(e) {
    let input = React.findDOMNode(this.refs.input);
    if (e.which == 13) { /* return key */
      input.blur();
    }
  }

  onBlur(e) {
    let input = React.findDOMNode(this.refs.input);
    if (! processDebugCommand(this, input.value)) {
      self.port.emit("addComment", input.value);
    }
    let id = this.props.activeClipName ? "comment_" + this.props.activeClipName : "globalComment";
    this.setState({
      [id]: null
    });
  }

  onChange(e) {
    let id = this.props.activeClipName ? "comment_" + this.props.activeClipName : "globalComment";
    this.setState({
      [id]: e.target.value
    });
  }

  render() {
    if (isAdding[this.props.shot.id] !== undefined ||
        (hasDeleted[this.props.shot.id] && ! this.props.activeClipName)) {
      return this.renderAddScreen();
    }
    let clip = null;
    let clipUrl = "";
    if (this.props.activeClipName) {
      clip = this.props.shot.getClip(this.props.activeClipName);
      clipUrl = this.props.backend + "/clip/" + this.props.shot.id + "/" + this.props.activeClipName;
    }

    if (!this.props.isEditing) {
      let onClickEdit = (e) => {
        e.preventDefault();
        self.port.emit("setEditing", true);
        lastData.isEditing = true;
        renderData();
      };
      return <SimplifiedPanel
        clipUrl={ clipUrl }
        onClickEdit={ onClickEdit }
        onCopyClick={ this.onCopyClick.bind(this) }
        { ...this.props }
      />;
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
        let selector = <span className={selectorClass} data-clip-id={clipNames[i]} onClick={this.selectClip.bind(this)} key={clipNames[i]}>{i+1}</span>;
        selectors.push(selector);
      }
    }

    let clipComponent;
    let deleter;
    if (! this.props.recall) {
      deleter = (
        <img className="delete" src="icons/delete-thumbnail.svg"
             title="Remove this clip" onClick={this.deleteClip.bind(this)} />);
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
      modesRow = <div className="modes-row">
        <span className={modeClasses.auto} onClick={this.setAuto.bind(this)}>
          Auto-detect
        </span>
        <span className={modeClasses.selection} onClick={this.setSelection.bind(this)}>
          Selection
        </span>
        <span className={modeClasses.visible} onClick={this.setVisible.bind(this)}>
          Visible
        </span>
      </div>;
    } else {
      modesRow = <div>
        <span className="recall-back" onClick={this.recallBack.bind(this)}>&lt; back</span>
        <span className="recall-title">{ this.props.shot.title }</span>
        <a className="recall-url" href={ this.props.shot.url }>{ this.props.shot.url }</a>
      </div>;
    }

    let adder;
    if (! this.props.recall) {
      adder = <span className="clip-selector" onClick={this.addClip.bind(this)}>+</span>;
    }

    return (<div className="container">
      <div className="link-row">
        <a className="link" target="_blank" href={ this.props.shot.viewUrl } onClick={ this.onLinkClick.bind(this) }>{ this.props.shot.viewUrl }</a>
      </div>
      <div className="share-row-container">
        <ShareButtons
          clipUrl={ clipUrl }
          onCopyClick={ this.onCopyClick.bind(this) }
          { ...this.props }
        />
      </div>
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
        <input className="comment-input" ref="input" type="text" value={ clipComment } placeholder="Say something about this clip" onKeyUp={ this.onKeyUp.bind(this) } onBlur={ this.onBlur.bind(this) } onChange={ this.onChange.bind(this) }/>
      </div>
      <div className="feedback-row">
        <a className="pageshot-footer" target="_blank" href="https://github.com/mozilla-services/pageshot">PageShot</a>
        <a className="feedback-footer" target="_blank" href={ "mailto:pageshot-feedback@mozilla.com?subject=Pageshot%20Feedback&body=" + this.props.shot.viewUrl }>Send Feedback</a>
      </div>
      <img className="alpha-badge" src="icons/alpha-badge.png" />
    </div>);
  }

  selectClip(event) {
    let clipId = event.target.getAttribute("data-clip-id");
    self.port.emit("selectClip", clipId);
  }

  deleteClip() {
    hasDeleted[this.props.shot.id] = true;
    self.port.emit("deleteClip", this.props.activeClipName);
  }

  addClip() {
    isAdding[this.props.shot.id] = this.props.shot.clipNames().length;
    setTimeout(renderData);
  }

  setAuto() {
    this.setCaptureType("auto");
  }

  setSelection() {
    this.setCaptureType("selection");
  }

  setVisible() {
    this.setCaptureType("visible");
  }

  setCaptureType(type) {
    self.port.emit("setCaptureType", type);
  }

  renderAddScreen() {
    return (<div className="container">
      <p className="add-screen-header">
        I want to select:
      </p>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addAuto.bind(this)}>Add Auto-Detect</button>
        </div>
      </div>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addSelection.bind(this)}>Add Selection</button>
        </div>
      </div>
      <div className="add-row">
        <div className="button-row">
          <button onClick={this.addVisible.bind(this)}>Add Visible</button>
        </div>
      </div>
      <div className="add-row cancel-row">
        <div className="button-row">
          <button onClick={this.addCancel.bind(this)}>Cancel</button>
        </div>
      </div>
    </div>);

    // The button for adding a text selection is currently commented out due to bug #515
/*
<div className="add-row">
  <div className="button-row">
    <button onClick={this.addText.bind(this)}>Add Text Selection</button>
  </div>
</div>
*/
  }

  addAuto() {
    self.port.emit("addClip", "auto");
  }

  addSelection() {
    self.port.emit("addClip", "selection");
  }

  addVisible() {
    self.port.emit("addClip", "visible");
  }

  addText() {
    self.port.emit("addClip", "text");
  }

  addCancel() {
    delete isAdding[this.props.shot.id];
    setTimeout(renderData);
    if (! this.props.shot.clipNames().length) {
      self.port.emit("hide");
    }
  }

  /* Recall-related functions */

  recallBack() {
    self.port.emit("viewRecallIndex");
  }

}

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
  // FIXME: this fixes a couple bugs, but doesn't fix them the right way, just covers them over:
  // https://github.com/mozilla-services/pageshot/issues/377
  // https://github.com/mozilla-services/pageshot/issues/436
  document.body.innerHTML = "";
  React.render(
    <ShootPanel activeClipName={ data.activeClipName } shot={ myShot } isEditing={ data.isEditing } />,
    document.body);
}

self.port.on("recallShot", err.watchFunction(function (data) {
  let myShot = new AbstractShot(data.backend, data.id, data.shot);
  React.render(
    React.createElement(ShootPanel, {activeClipName: data.activeClipName, shot: myShot, recall: true, isEditing: true}),
    document.body);
}));

class RecallPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {copying: null};
  }

  copy(event) {
    let url = event.target.getAttribute("data-url");
    this.setState({copying: url});
    setTimeout(() => {
      this.setState({copying: null});
    }, 1000);
    self.port.emit("copyLink", url);
  }

  openShot(event) {
    let el = event.target;
    while (! el.hasAttribute("data-id")) {
      el = el.parentNode;
    }
    let id = el.getAttribute("data-id");
    self.port.emit("viewShot", id);
  }

  render() {
    let history = [];
    for (let shot of this.props.shots) {
      let text = "";
      if (this.state.copying == shot.viewUrl) {
        text = "copied";
      }
      let favicon = <div className="empty-favicon"></div>;
      if (shot.favicon) {
        favicon = <div className="favicon"><img src={shot.favicon} alt="" /></div>;
      }
      history.push(
        <li key={shot.id}>
          <span className="copier" data-url={shot.viewUrl} onClick={this.copy.bind(this)}>{text}</span>
          <div className="title" data-id={shot.id} onClick={this.openShot.bind(this)}>
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
}

self.port.on("recallIndex", err.watchFunction(function (data) {
  renderRecall(data);
}));

function renderRecall(data) {
  let backend = data.backend;
  let shots = [];
  for (let shotJson of data.shots) {
    let shot;
    try {
      shot = new AbstractShot(backend, shotJson.id, shotJson.shot);
    } catch (e) {
      console.warn("Could not render shot", shotJson.id, "because of error (old data?):", e+"");
      continue;
    }
    shots.push(shot);
  }
  React.render(
    React.createElement(RecallPanel, {shots: shots, backend: backend}),
    document.body);
}

self.port.emit("ready");
