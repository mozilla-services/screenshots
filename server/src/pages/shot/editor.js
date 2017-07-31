const React = require("react");
const sendEvent = require("../../browser-send-event.js");

let pos;

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.state = {
      tool: 'none',
      color: '#000000',
      size: '5'
    };
  }

  render() {
    let penState;
    let highlighterState;
    let canvasHeight = this.props.clip.image.dimensions.y;
    let canvasWidth = this.props.clip.image.dimensions.x;
    if (this.state.tool == 'highlighter') {
      highlighterState = 'active';
      penState = 'inactive';
    } else if (this.state.tool == 'pen') {
      highlighterState = 'inactive';
      penState = 'active';
    } else {
      penState = 'inactive';
      highlighterState = 'inactive';
    }
    return <div>
      <div className="editor-header default-color-scheme">
        <div className="shot-main-actions">
          <a className={`button pen-button ${penState}`} id="pen" onClick={this.onClickPen.bind(this)} title="pen"></a>
          <a className={`button highlight-button ${highlighterState}`} id="highlight" onClick={this.onClickHighlight.bind(this)} title="highlighter"></a>
        </div>
        <div className="shot-alt-actions">
          <a className="button primary save" id="save" onClick={ this.onClickSave.bind(this) }>Save</a>
          <a className="button secondary cancel" id="cancel" onClick={this.onClickCancel.bind(this)}>Cancel</a>
        </div>
      </div>
      <div className="main-container">
        <div className="canvas-container" id="canvas-container" ref={(canvasContainer) => this.canvasContainer = canvasContainer}>
          <canvas className="image-holder centered" id="image-holder" ref={(image) => { this.imageCanvas = image }} height={ 2 * canvasHeight } width={ 2 * canvasWidth } style={{height: canvasHeight, width: canvasWidth}}></canvas>
          <canvas className="highlighter centered" id="highlighter" ref={(highlighter) => { this.highlighter = highlighter }} height={canvasHeight} width={canvasWidth}></canvas>
          <canvas className="editor centered" id="editor" ref={(editor) => { this.editor = editor }} height={canvasHeight} width={canvasWidth}></canvas>
        </div>
      </div>
    </div>
  }

  componentDidUpdate() {
    this.edit();
  }

  onClickCancel() {
    this.props.onCancelEdit(false);
    sendEvent("cancel", "annotation-toolbar");
  }

  onClickSave() {
    sendEvent("save", "annotation-toolbar");
    this.imageContext.drawImage(this.editor, 0, 0);
    this.imageContext.globalCompositeOperation = 'multiply';
    this.imageContext.drawImage(this.highlighter, 0, 0);
    let dataUrl = this.imageCanvas.toDataURL();
    this.props.onClickSave(dataUrl);
  }

  onClickHighlight() {
    if (this.state.tool != 'highlighter') {
      this.setState({tool: 'highlighter'});
      sendEvent("highlighter-select", "annotation-toolbar");
    } else {
      this.setState({tool: 'none'});
      sendEvent("highlighter-deselect", "annotation-toolbar");
    }
  }

  onClickPen() {
    if (this.state.tool != 'pen') {
      this.setState({tool: 'pen'});
      sendEvent("pen-select", "annotation-toolbar");
    } else {
      this.setState({tool: 'none'});
      sendEvent("pen-deselect", "annotation-toolbar");
    }
  }

  componentDidMount() {
    this.context = this.editor.getContext('2d');
    this.highlightContext = this.highlighter.getContext('2d');
    let imageContext = this.imageCanvas.getContext('2d');
    this.imageContext = imageContext;
    // From https://blog.headspin.com/?p=464, we oversample the canvas for improved image quality
    let img = new Image();
    img.src = this.props.clip.image.url;
    let width = this.props.clip.image.dimensions.x;
    let height = this.props.clip.image.dimensions.y;
    this.imageContext.scale(2, 2);
    this.imageContext.drawImage(img, 0, 0, width, height);
  }

  edit() {
    pos = { x: 0, y: 0 };
    if (this.state.tool == 'highlighter') {
      this.highlightContext.lineWidth = 20;
      this.highlightContext.strokeStyle = '#ff0';
      this.drawContext = this.highlightContext;
    } else if (this.state.tool == 'pen') {
      this.context.strokeStyle = this.state.color;
      this.context.globalCompositeOperation = 'source-over';
      this.drawContext = this.context;
    }
    this.context.lineWidth = this.state.size;
    if (this.state.tool == 'none') {
      this.canvasContainer.removeEventListener("mousemove", this.draw);
      this.canvasContainer.removeEventListener("mousedown", this.setPosition);
      this.canvasContainer.removeEventListener("mouseenter", this.setPosition);
    } else {
      this.canvasContainer.addEventListener("mousemove", this.draw);
      this.canvasContainer.addEventListener("mousedown", this.setPosition);
      this.canvasContainer.addEventListener("mouseenter", this.setPosition);
    }
  }

  setPosition(e) {
    var rect = this.editor.getBoundingClientRect();
    pos.x = e.clientX - rect.left,
    pos.y = e.clientY - rect.top
  }

  draw(e) {
    if (e.buttons !== 1) {
      return null;
    }
    this.drawContext.beginPath();

    this.drawContext.lineCap = 'square';
    this.drawContext.moveTo(pos.x, pos.y);
    let rect = this.editor.getBoundingClientRect();
    pos.x = e.clientX - rect.left,
    pos.y = e.clientY - rect.top
    this.drawContext.lineTo(pos.x, pos.y);

    this.drawContext.stroke();
  }
}
