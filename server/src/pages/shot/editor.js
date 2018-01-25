const React = require("react");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");

let mousedown = false;
let selectionState;
let resizeDirection;
let resizeStartPos;
let resizeStartSelected;
let selectedPos = {};
let mousedownPos = {};
const minWidth = 10;
const minHeight = 10;

const movements = ["topLeft", "top", "topRight", "left", "right", "bottomLeft", "bottom", "bottomRight"];
const movementPositions = {
  topLeft: ["x1", "y1"],
  top: [null, "y1"],
  topRight: ["x2", "y1"],
  left: ["x1", null],
  right: ["x2", null],
  bottomLeft: ["x1", "y2"],
  bottom: [null, "y2"],
  bottomRight: ["x2", "y2"],
  move: ["*", "*"]
};

class Selection {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get top() {
    return Math.min(this.y1, this.y2);
  }
  set top(val) {
    this.sortCoords();
    this.y1 = val;
  }

  get bottom() {
    return Math.max(this.y1, this.y2);
  }
  set bottom(val) {
    this.sortCoords();
    this.y2 = val;
  }

  get left() {
    return Math.min(this.x1, this.x2);
  }
  set left(val) {
    this.sortCoords();
    this.x1 = val;
  }

  get right() {
    return Math.max(this.x1, this.x2);
  }
  set right(val) {
    this.sortCoords();
    this.x2 = val;
  }

  get width() {
    return Math.abs(this.x1 - this.x2);
  }
  get height() {
    return Math.abs(this.y1 - this.y2);
  }

  /** Sort x1/x2 and y1/y2 so x1<x2, y1<y2 */
  sortCoords() {
    if (this.x1 > this.x2) {
      [this.x1, this.x2] = [this.x2, this.x1];
    }
    if (this.y1 > this.y2) {
      [this.y1, this.y2] = [this.y2, this.y1];
    }
  }

  clone() {
    return new Selection(this.x1, this.y1, this.x2, this.y2);
  }
}

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.canvasWidth = this.props.clip.image.dimensions.x;
    this.canvasHeight = this.props.clip.image.dimensions.y;
    this.state = {
      tool: 'pen',
      color: '#000',
      size: '5'
    };
  }

  render() {
    let toolBar = this.cropToolBar || this.renderToolBar();
    return <div>
      { toolBar }
      <div className="main-container inverse-color-scheme">
        <div className={`canvas-container ${this.state.tool}`} id="canvas-container" ref={(canvasContainer) => this.canvasContainer = canvasContainer}>
          <canvas className="image-holder centered" id="image-holder" ref={(image) => { this.imageCanvas = image }} height={ this.canvasHeight } width={ this.canvasWidth } style={{height: this.canvasHeight, width: this.canvasWidth}}></canvas>
          <canvas className="temp-highlighter centered" id="highlighter" ref={(highlighter) => { this.highlighter = highlighter }} height={ this.canvasHeight } width={ this.canvasWidth }></canvas>
          <canvas className="crop-tool centered" id="crop-tool" ref={(cropper) => { this.cropper = cropper }} height={this.canvasHeight} width={this.canvasWidth}></canvas>
          <div className="crop-container centered" ref={(cropContainer) => this.cropContainer = cropContainer} style={{height: this.canvasHeight, width: this.canvasWidth}}></div>
        </div>
      </div>
    </div>
  }

  renderToolBar() {
    let penState = this.state.tool == "pen" ? 'active' : 'inactive';
    let highlighterState = this.state.tool == "highlighter" ? 'active' : 'inactive';
    return <div className="editor-header default-color-scheme">
      <div className="shot-main-actions annotation-actions">
        <div className="annotation-tools">
          <Localized id="annotationCropButton">
            <button className={`button transparent crop-button`} id="crop" onClick={this.onClickCrop.bind(this)} title="Crop"></button>
          </Localized>
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
          <button className="button primary save" id="save" onClick={ this.onClickSave.bind(this) } disabled = { this.state.saveDisabled }>Save</button>
        </Localized>
        <Localized id="annotationCancelButton">
          <button className="button secondary cancel" id="cancel" onClick={this.onClickCancel.bind(this)}>Cancel</button>
        </Localized>
      </div>
    </div>
  }

  setColor(color) {
    this.setState({color});
  }

  componentDidUpdate() {
    this.edit();
  }

  onClickCrop() {
    this.setState({tool: 'crop'});
    this.cropToolBar = <div className="editor-header default-color-scheme"><div className="annotation-tools">
      <Localized id="annotationConfirmCropButton">
        <button className={`button transparent confirm-crop`} id="confirm-crop" onClick={this.onClickConfirmCrop.bind(this)} title="Confirm selection">Crop</button>
      </Localized>
      <Localized id="annotationCancelCropButton">
        <button className={`button transparent cancel-crop`} id="cancel-crop" onClick={this.onClickCancelCrop.bind(this)} title="Cancel selection">Cancel</button>
      </Localized>
    </div></div>;
  }

  onClickConfirmCrop() {
    if (!selectedPos.width || !selectedPos.height) {
      this.onClickCancelCrop();
      return;
    }
    let x1 = Math.max(selectedPos.left, 0);
    let x2 = Math.min(selectedPos.right, this.canvasWidth);
    let y1 = Math.max(selectedPos.top, 0);
    let y2 = Math.min(selectedPos.bottom, this.canvasHeight);
    let cropWidth = Math.floor(x2 - x1);
    let cropHeight = Math.floor(y2 - y1);
    let croppedImage = document.createElement('canvas');
    croppedImage.width = cropWidth
    croppedImage.height = cropHeight
    let croppedContext = croppedImage.getContext("2d");
    croppedContext.drawImage(this.imageCanvas, x1, y1, croppedImage.width, croppedImage.height, 0, 0, croppedImage.width, croppedImage.height);
    croppedContext.globalCompositeOperation = 'multiply';
    croppedContext.drawImage(this.highlighter, x1, y1, croppedImage.width, croppedImage.height, 0, 0, croppedImage.width, croppedImage.height);
    let img = new Image();
    let imageContext = this.imageCanvas.getContext('2d');
    img.crossOrigin = 'Anonymous';
    let width = cropWidth;
    let height = cropHeight;
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
    }
    this.imageContext = imageContext;
    img.src = croppedImage.toDataURL("image/png");
    this.canvasWidth = cropWidth;
    this.canvasHeight = cropHeight;
    this.onClickCancelCrop();
  }

  onClickCancelCrop() {
    this.removeCropBox();
    this.cropToolBar = null;
    this.setState({tool: 'pen'});
  }

  mouseup(e) {
    e.preventDefault();
    if (!selectedPos.width || !selectedPos.height) {
      this.removeCropBox();
    }
    mousedown = false;
    selectionState = "none";
  }

  mousedown(e) {
    e.preventDefault();
    mousedown = true;
    let rect = this.cropContainer.getBoundingClientRect();
    if (!this.cropBox) {
      selectionState = "creating";
      mousedownPos.top = e.clientY - rect.top;
      mousedownPos.left = e.clientX - rect.left;
    } else {
      selectedPos.sortCoords();
      let direction = this.findClickedArea(e);
      if (direction) {
        selectionState = "resizing";
        resizeDirection = direction;
        resizeStartPos = {y: e.clientY - rect.top, x: e.clientX - rect.left}
        resizeStartSelected = selectedPos.clone()
        this.resizeCropBox(e);
      }
    }
  }

  mousemove(e) {
    e.preventDefault();
    let rect = this.cropContainer.getBoundingClientRect();
    if (mousedown && selectionState == "creating") {
      selectedPos = new Selection(
        this.truncateX(mousedownPos.left),
        this.truncateY(mousedownPos.top),
        this.truncateX(e.clientX - rect.left),
        this.truncateY(e.clientY - rect.top)
      )
      selectedPos.x2 = this.truncateX(selectedPos.x2);
      selectedPos.y2 = this.truncateY(selectedPos.y2);
      if (selectedPos.width > minWidth && selectedPos.height > minHeight) {
        this.displayCropBox(selectedPos);
      }
    }
    if (mousedown && selectionState == "resizing") {
      this.resizeCropBox(e);
    }
  }

  resizeCropBox(event, direction) {
    let rect = this.cropContainer.getBoundingClientRect();
    let diffX = event.clientX - rect.left - resizeStartPos.x;
    let diffY = event.clientY - rect.top - resizeStartPos.y;
    let movement = movementPositions[resizeDirection];
    if (movement[0]) {
        let moveX = movement[0];
        moveX = moveX == "*" ? ["x1", "x2"] : [moveX];
        for (let moveDir of moveX) {
          selectedPos[moveDir] = this.truncateX(resizeStartSelected[moveDir] + diffX);
        }
      }
      if (movement[1]) {
        let moveY = movement[1];
        moveY = moveY == "*" ? ["y1", "y2"] : [moveY];
        for (let moveDir of moveY) {
          selectedPos[moveDir] = this.truncateY(resizeStartSelected[moveDir] + diffY);
        }
      }
    this.displayCropBox(selectedPos);
  }

  truncateX(x) {
    let max = this.canvasWidth;
    if (x < 0) {
      return 0;
    } else if (x > max) {
      return max;
    }
    return x;
  }

  truncateY(y) {
    let max = this.canvasHeight;
    if (y < 0) {
      return 0;
    } else if (y > max) {
      return max;
    }
    return y;
  }

  findClickedArea(e) {
    let target = e.target;
    if (target.classList.contains("mover-target") || target.classList.contains("mover")) {
      for (let name of movements) {
        if (target.classList.contains("direction-" + name) || target.parentNode.classList.contains("direction-" + name)) {
          return name;
        }
      }
    } else if (target.classList.contains("highlight")) {
      return "move";
    }
    if (target.classList.contains("bghighlight")) {
      this.removeCropBox();
    }
    return null;
  }

  removeCropBox() {
    while (this.cropContainer.firstChild) {
      this.cropContainer.firstChild.remove();
    }
    this.cropBox = null;
    selectedPos = {};
    resizeStartSelected = null;
    resizeStartPos = {};
    resizeDirection = null;
    selectionState = 'none';
  }

  displayCropBox(pos) {
    this.createCropBox();
    if ((pos.right - pos.left) < 78 || (pos.bottom - pos.top) < 78) {
        this.cropBox.classList.add("small-selection");
    } else {
        this.cropBox.classList.remove("small-selection");
    }
    this.cropBox.style.position = "absolute";
    this.cropBox.style.top = pos.top + "px";
    this.cropBox.style.left = pos.left + "px";
    this.cropBox.style.height = pos.bottom - pos.top + "px";
    this.cropBox.style.width = pos.right - pos.left + "px";
    this.bgTop.style.top = "0px";
    this.bgTop.style.height = pos.top + "px";
    this.bgTop.style.left = "0px";
    this.bgTop.style.width = "100%";
    this.bgBottom.style.top = pos.bottom + "px";
    this.bgBottom.style.height = "100%";
    this.bgBottom.style.left = "0px";
    this.bgBottom.style.width = "100%";
    this.bgLeft.style.top = pos.top + "px";
    this.bgLeft.style.height = pos.bottom - pos.top + "px";
    this.bgLeft.style.left = "0px";
    this.bgLeft.style.width = pos.left + "px";
    this.bgRight.style.top = pos.top + "px";
    this.bgRight.style.height = pos.bottom - pos.top + "px";
    this.bgRight.style.left = pos.right + "px";
    this.bgRight.style.width = "100%";
  }

  createCropBox() {
    if (this.cropBox) {
      return;
    }
    let cropBox = document.createElement('div')
    cropBox.className = 'highlight';
    for (let name of movements) {
      let elTarget = document.createElement("div");
      elTarget.className = "mover-target direction-" + name;
      let elMover = document.createElement("div");
      elMover.className = "mover";
      elTarget.appendChild(elMover);
      cropBox.appendChild(elTarget);
    }
    this.bgTop = document.createElement("div");
    this.bgTop.className = "bghighlight";
    this.cropContainer.appendChild(this.bgTop);
    this.bgLeft = document.createElement("div");
    this.bgLeft.className = "bghighlight";
    this.cropContainer.appendChild(this.bgLeft);
    this.bgRight = document.createElement("div");
    this.bgRight.className = "bghighlight";
    this.cropContainer.appendChild(this.bgRight);
    this.bgBottom = document.createElement("div");
    this.bgBottom.className = "bghighlight";
    this.cropContainer.appendChild(this.bgBottom);
    this.cropContainer.appendChild(cropBox);
    this.cropBox = cropBox;
  }


  onClickClear() {
    this.setState({tool: this.state.tool});
    this.imageContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    this.canvasHeight = this.props.clip.image.dimensions.y;
    this.canvasWidth = this.props.clip.image.dimensions.x;
    this.renderImage();
    sendEvent("clear-select", "annotation-toolbar");
  }

  onClickCancel() {
    this.props.onCancelEdit(false);
    sendEvent("cancel", "annotation-toolbar");
  }

  onClickSave() {
    sendEvent("save", "annotation-toolbar");
    let saveDisabled = true;
    this.setState({saveDisabled});
    this.imageContext.globalCompositeOperation = 'multiply';
    this.imageContext.drawImage(this.highlighter, 0, 0);
    this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    let dataUrl = this.imageCanvas.toDataURL();
    let dimensions = {x: this.canvasWidth, y: this.canvasHeight};
    this.props.onClickSave(dataUrl, dimensions);
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
    img.crossOrigin = 'Anonymous';
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
    if (this.state.tool != 'crop') {
      this.cropToolBar = null;
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mousedown", this.mousedown);
      document.removeEventListener("mouseup", this.mouseup);
    }
    this.pos = { x: 0, y: 0 };
    if (this.state.tool == 'highlighter') {
      this.drawContext = this.highlightContext;
      this.highlightContext.lineWidth = 20;
      this.highlightContext.strokeStyle = this.state.color;
      document.addEventListener("mousemove", this.draw);
      document.addEventListener("mousedown", this.setPosition);
    } else if (this.state.tool == 'pen') {
      this.drawContext = this.imageContext;
      this.imageContext.globalCompositeOperation = 'source-over';
      this.imageContext.strokeStyle = this.state.color;
      this.imageContext.lineWidth = this.state.size;
      document.addEventListener("mousemove", this.draw);
      document.addEventListener("mousedown", this.setPosition);
    } else if (this.state.tool == 'crop') {
      document.removeEventListener("mousemove", this.draw);
      document.removeEventListener("mousedown", this.setPosition);
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mousedown", this.mousedown);
      document.addEventListener("mouseup", this.mouseup);
    }
  }

  setPosition(e) {
    let rect = this.imageCanvas.getBoundingClientRect();
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
    let color = e.target.style.backgroundColor;
    this.setState({color, pickerActive: false});
    this.props.setColor(color);
  }

  onClickColorPicker() {
    let pickerActive = !this.state.pickerActive;
    this.setState({pickerActive});
  }
}
