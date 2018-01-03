const React = require("react");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.state = {
      tool: 'pen',
      color: '#000000',
      size: '5'
    };
  }

  render() {
    let penState = this.state.tool == "pen" ? 'active' : 'inactive';
    let highlighterState = this.state.tool == "highlighter" ? 'active' : 'inactive';
    let canvasHeight = this.props.clip.image.dimensions.y;
    let canvasWidth = this.props.clip.image.dimensions.x;
    return <div>
      <div className="editor-header default-color-scheme">
        <div className="shot-main-actions annotation-actions">
          <div className="annotation-tools">
            <Localized id="annotationPenButton">
              <button className={`button transparent pen-button ${penState}`} id="pen" onClick={this.onClickPen.bind(this)} title="pen"></button>
            </Localized>
            <Localized id="annotationHighlighterButton">
              <button className={`button transparent highlight-button ${highlighterState}`} id="highlight" onClick={this.onClickHighlight.bind(this)} title="highlighter"></button>
            </Localized>
            <ColorPicker setColor={this.setColor.bind(this)} />
            <Localized id="annotationClearButton">
              <button className={`button transparent clear-button`} id="clear" onClick={this.onClickClear.bind(this)} title="clear"></button>
            </Localized>
          </div>
        </div>
        <div className="shot-alt-actions annotation-alt-actions">
          <Localized id="annotationSaveButton">
            <button className="button primary save" id="save" onClick={ this.onClickSave.bind(this) }>Save</button>
          </Localized>
          <Localized id="annotationCancelButton">
            <button className="button secondary cancel" id="cancel" onClick={this.onClickCancel.bind(this)}>Cancel</button>
          </Localized>
        </div>
      </div>
      <div className="main-container inverse-color-scheme">
        <div className={`canvas-container ${this.state.tool}`} id="canvas-container" ref={(canvasContainer) => this.canvasContainer = canvasContainer}>
          <canvas className="image-holder centered" id="image-holder" ref={(image) => { this.imageCanvas = image }} height={ canvasHeight } width={ canvasWidth } style={{height: canvasHeight, width: canvasWidth}}></canvas>
          <canvas className="temp-highlighter centered" id="highlighter" ref={(highlighter) => { this.highlighter = highlighter }} height={ canvasHeight } width={ canvasWidth }></canvas>
        </div>
      </div>
    </div>
  }

  setColor(color) {
    this.setState({color});
  }

  componentDidUpdate() {
    this.edit();
  }

  onClickClear() {
    this.setState({tool: this.state.tool});
    this.imageContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.renderImage();
    sendEvent("clear-select", "annotation-toolbar");
  }

  onClickCancel() {
    this.props.onCancelEdit(false);
    sendEvent("cancel", "annotation-toolbar");
  }

  onClickSave() {
    sendEvent("save", "annotation-toolbar");
    this.imageContext.globalCompositeOperation = 'multiply';
    this.imageContext.drawImage(this.highlighter, 0, 0);
    this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    let dataUrl = this.imageCanvas.toDataURL();
    this.props.onClickSave(dataUrl);
  }

  onClickHighlight() {
    if (this.state.tool != 'highlighter') {
      this.setState({tool: 'highlighter'});
      sendEvent("highlighter-select", "annotation-toolbar");
    }
  }

  onClickPen() {
    if (this.state.tool != 'pen') {
      this.setState({tool: 'pen'});
      sendEvent("pen-select", "annotation-toolbar");
    }
  }

  renderImage() {
    let imageContext = this.imageCanvas.getContext('2d');
    let img = new Image();
    img.crossOrigin = 'use-credentials';
    let width = this.props.clip.image.dimensions.x;
    let height = this.props.clip.image.dimensions.y;
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
    }
    this.imageContext = imageContext;
    img.src = this.props.clip.image.url;
  }

  componentDidMount() {
    this.highlightContext = this.highlighter.getContext('2d');
    this.renderImage();
    this.edit();
  }

  edit() {
    this.imageContext.drawImage(this.highlighter, 0, 0);
    this.imageContext.globalCompositeOperation = 'multiply';
    this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.pos = { x: 0, y: 0 };
    if (this.state.tool == 'highlighter') {
      this.drawContext = this.highlightContext;
      this.highlightContext.lineWidth = 20;
      this.highlightContext.strokeStyle = this.state.color;
    } else if (this.state.tool == 'pen') {
      this.drawContext = this.imageContext;
      this.imageContext.globalCompositeOperation = 'source-over';
      this.imageContext.strokeStyle = this.state.color;
      this.imageContext.lineWidth = this.state.size;
    }
    if (this.state.tool == 'none') {
      this.canvasContainer.removeEventListener("mousemove", this.draw);
      this.canvasContainer.removeEventListener("mousedown", this.setPosition);
    } else {
      this.canvasContainer.addEventListener("mousemove", this.draw);
      this.canvasContainer.addEventListener("mousedown", this.setPosition);
    }
  }

  setPosition(e) {
    var rect = this.imageCanvas.getBoundingClientRect();
    this.pos.x = e.clientX - rect.left,
    this.pos.y = e.clientY - rect.top
  }

  draw(e) {
    if (e.buttons !== 1) {
      return null;
    }
    this.drawContext.beginPath();

    this.drawContext.lineCap = this.state.tool == 'highlighter' ? 'square' : 'round';
    this.drawContext.moveTo(this.pos.x, this.pos.y);
    let rect = this.imageCanvas.getBoundingClientRect();
    this.pos.x = e.clientX - rect.left,
    this.pos.y = e.clientY - rect.top
    this.drawContext.lineTo(this.pos.x, this.pos.y);

    this.drawContext.stroke();
  }
}

class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pickerActive: false,
      color: '#000'
    };
  }

  render() {
    let border = this.state.color == 'rgb(255, 255, 255)' ? '#000' : this.state.color;
    return <div><button className="color-button" id="color-picker" onClick={this.onClickColorPicker.bind(this)} title="Color Picker" style={{"backgroundColor": this.state.color, "border": `1px solid ${border}`}}></button>
      {this.state.pickerActive ? this.renderColorBoard() : null}
    </div>
  }

  renderColorBoard() {
    return <div className="color-board">
      <div className="row">
        <div className="swatch" title="White" style={{backgroundColor: "#FFF", border: "1px solid #000"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Black" style={{backgroundColor: "#000"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Red" style={{backgroundColor: "#E74C3C"}} onClick={this.onClickSwatch.bind(this)}></div>
      </div>
        <div className="row">
        <div className="swatch" title="Green" style={{backgroundColor: "#2ECC71"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Blue" style={{backgroundColor: "#3498DB"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Yellow" style={{backgroundColor: "#FF0"}} onClick={this.onClickSwatch.bind(this)}></div>
      </div>
      <div className="row">
        <div className="swatch" title="Purple" style={{backgroundColor: "#8E44AD"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Sea Green" style={{backgroundColor: "#1ABC9C"}} onClick={this.onClickSwatch.bind(this)}></div>
        <div className="swatch" title="Grey" style={{backgroundColor: "#34495E"}} onClick={this.onClickSwatch.bind(this)}></div>
      </div>
    </div>
  }

  onClickSwatch(e) {
    let color = e.target.style.backgroundColor
    this.setState({color, pickerActive: false});
    this.props.setColor(color);
  }

  onClickColorPicker() {
    let pickerActive = !this.state.pickerActive;
    this.setState({pickerActive});
  }
}
