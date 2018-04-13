const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");

let mousedown = false;
let selectionState;
let resizeDirection;
let resizeStartPos;
let resizeStartSelected;
let selectedPos = {};
const mousedownPos = {};
// These are the minimum width and height of the crop selection Tool
const minWidth = 10;
const minHeight = 10;
// This is how close (in pixels) you can get to the edge of the window and then
// it will scroll:
const scrollByEdge = 20;
let points = [];
let drawMousedown = false;
let imageIsCropped = false;
let activeColor;

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
    this.devicePixelRatio = window.devicePixelRatio || 1;
    this.mousedown = this.mousedown.bind(this);
    this.mouseup = this.mouseup.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.draw = this.draw.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.drawMouseup = this.drawMouseup.bind(this);
    this.canvasWidth = Math.floor(this.props.clip.image.dimensions.x);
    this.canvasHeight = Math.floor(this.props.clip.image.dimensions.y);
    this.state = {
      tool: "pen",
      color: activeColor || "#000",
      size: "5",
      actionsDisabled: true
    };
  }

  render() {
    const color = this.isColorWhite(this.state.color);
    const toolBar = this.cropToolBar || this.renderToolBar();
    const display = this.loader || this.renderCanvas(color, toolBar);
    return <div className="inverse-color-scheme full-height column-space">
      { toolBar }
      { display }
    </div>
  }

  renderCanvas(color, toolBar) {
    return <div className="main-container">
      <div
        className={`inverse-color-scheme canvas-container ${this.state.tool}`}
        id="canvas-container"
        ref={(canvasContainer) => this.canvasContainer = canvasContainer}
        style={{ height: this.canvasHeight, width: this.canvasWidth }}>
        <canvas
          className="image-holder centered"
          id="image-holder"
          ref={(image) => { this.imageCanvas = image }}
          height={this.canvasHeight * this.devicePixelRatio} width={this.canvasWidth * this.devicePixelRatio}
          style={{ height: this.canvasHeight, width: this.canvasWidth }}></canvas>
        <canvas
          className={`temp-highlighter centered ${color}`}
          id="highlighter"
          ref={(highlighter) => { this.highlighter = highlighter }}
          height={this.canvasHeight} width={this.canvasWidth}></canvas>
        <div
          className="crop-container centered"
          ref={(cropContainer) => this.cropContainer = cropContainer}
          style={{ height: this.canvasHeight, width: this.canvasWidth }}></div>
      </div>
    </div>
  }

  renderToolBar() {
    const penState = this.state.tool === "pen" ? "active" : "inactive";
    const highlighterState = this.state.tool === "highlighter" ? "active" : "inactive";
    return <div className="editor-header default-color-scheme">
      <div className="shot-main-actions annotation-main-actions">
        <div className="annotation-tools">
          <Localized id="annotationCropButton">
            <button className={`button transparent crop-button`} id="crop" onClick={this.onClickCrop.bind(this)} title="Crop"></button>
          </Localized>
          <Localized id="annotationPenButton">
            <button className={`button transparent pen-button ${penState}`} id="pen" onClick={this.onClickPen.bind(this)} title="Pen"></button>
          </Localized>
          <Localized id="annotationHighlighterButton">
            <button className={`button transparent highlight-button ${highlighterState}`} id="highlight" onClick={this.onClickHighlight.bind(this)} title="Highlighter"></button>
          </Localized>
          <ColorPicker activeTool={this.state.tool} setColor={this.setColor.bind(this)} />
          <Localized id="annotationClearButton">
            <button className={`button transparent clear-button`} id="clear" onClick={this.onClickClear.bind(this)} title="Clear"></button>
          </Localized>
        </div>
      </div>
      <div className="shot-alt-actions">
        <Localized id="annotationSaveEditButton">
          <button className="button primary save" id="save" onClick={ this.onClickSave.bind(this) } disabled = { this.state.actionsDisabled } title="Save edit">Save</button>
        </Localized>
        <Localized id="annotationCancelEditButton">
          <button className="button secondary cancel" id="cancel" onClick={this.onClickCancel.bind(this)} title="Cancel editing" disabled = { this.state.actionsDisabled }>Cancel</button>
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

  isColorWhite(color) {
    if (color === "rgb(255, 255, 255)" || color === "#FFF") {
      return "white"
    }
    return null;
  }

  renderShotsLoading() {
    return <div className="column-center flex-1">
      <div className="loader">
        <div className="loader-inner" />
      </div>
    </div>;
  }

  onClickCrop() {
    this.previousTool = this.state.tool;
    this.setState({tool: "crop"});
    this.cropToolBar = <div className="editor-header default-color-scheme"><div className="annotation-tools">
      <Localized id="annotationCropConfirmButton">
        <button className={`button transparent confirm-crop`} id="confirm-crop" onClick={this.onClickConfirmCrop.bind(this)} title="Confirm selection">Crop</button>
      </Localized>
      <Localized id="annotationCropCancelButton">
        <button className={`button transparent cancel-crop`} id="cancel-crop" onClick={this.onClickCancelCrop.bind(this)} title="Cancel selection">Cancel</button>
      </Localized>
    </div></div>;
    sendEvent("crop-select", "annotation-toolbar");
  }

  onClickConfirmCrop() {
    const x1 = Math.max(selectedPos.left, 0);
    const x2 = Math.min(selectedPos.right, this.canvasWidth);
    const y1 = Math.max(selectedPos.top, 0);
    const y2 = Math.min(selectedPos.bottom, this.canvasHeight);
    const cropWidth = Math.floor(x2 - x1);
    const cropHeight = Math.floor(y2 - y1);
    if (!selectedPos.width || !selectedPos.height || (this.canvasHeight === cropHeight) && (this.canvasWidth === cropWidth)) {
      this.removeCropBox();
      this.cropToolBar = null;
      this.setState({tool: this.previousTool});
      return;
    }
    const croppedImage = document.createElement("canvas");
    croppedImage.width = cropWidth * this.devicePixelRatio;
    croppedImage.height = cropHeight * this.devicePixelRatio;
    const croppedContext = croppedImage.getContext("2d");
    croppedContext.drawImage(this.imageCanvas, x1 * this.devicePixelRatio, y1 * this.devicePixelRatio, croppedImage.width, croppedImage.height, 0, 0, croppedImage.width, croppedImage.height);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const width = cropWidth;
    const height = cropHeight;
    img.onload = () => {
      imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
      imageContext.drawImage(img, 0, 0, width, height);
    }
    this.canvasWidth = cropWidth;
    this.canvasHeight = cropHeight;
    const imageContext = this.imageCanvas.getContext("2d");
    this.imageContext = imageContext;
    img.src = croppedImage.toDataURL("image/png");
    this.removeCropBox();
    this.cropToolBar = null;
    this.setState({tool: this.previousTool});
    imageIsCropped = true;
    sendEvent("confirm-crop", "crop-toolbar");
  }

  onClickCancelCrop() {
    this.removeCropBox();
    this.cropToolBar = null;
    this.setState({tool: this.previousTool});
    sendEvent("cancel-crop", "crop-toolbar");
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
    if (e.button !== 0) {
      return;
    }
    mousedown = true;
    const rect = this.cropContainer.getBoundingClientRect();
    if (!this.cropBox) {
      selectionState = "creating";
      mousedownPos.top = e.clientY - rect.top;
      mousedownPos.left = e.clientX - rect.left;
    } else {
      selectedPos.sortCoords();
      const direction = this.findClickedArea(e);
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
    if (e.button !== 0) {
      return;
    }
    const rect = this.cropContainer.getBoundingClientRect();
    if (mousedown && selectionState === "creating") {
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
        this.scrollIfByEdge(e.pageX, e.pageY);
      }
    }
    if (mousedown && selectionState === "resizing") {
      this.resizeCropBox(e);
      this.scrollIfByEdge(e.pageX, e.pageY);
    }
  }

  scrollIfByEdge(pageX, pageY) {
    const top = window.scrollY;
    const bottom = top + window.innerHeight;
    const left = window.scrollX;
    const right = left + window.innerWidth;
    if (pageY + scrollByEdge >= bottom && bottom < document.body.scrollHeight) {
      window.scrollBy(0, scrollByEdge);
    } else if (pageY - scrollByEdge <= top) {
      window.scrollBy(0, -scrollByEdge);
    }
    if (pageX + scrollByEdge >= right && right < document.body.scrollWidth) {
      window.scrollBy(scrollByEdge, 0);
    } else if (pageX - scrollByEdge <= left) {
      window.scrollBy(-scrollByEdge, 0);
    }
  }

  resizeCropBox(event, direction) {
    const width = selectedPos.width;
    const height = selectedPos.height;
    const rect = this.cropContainer.getBoundingClientRect();
    const diffX = event.clientX - rect.left - resizeStartPos.x;
    const diffY = event.clientY - rect.top - resizeStartPos.y;
    const movement = movementPositions[resizeDirection];
    const isLeftBorder = selectedPos.left === 0 && resizeStartSelected.left + diffX <= 0;
    const isRightBorder = selectedPos.right === this.canvasWidth && resizeStartSelected.right + diffX >= this.canvasWidth;
    const isTopBorder = selectedPos.top === 0 && resizeStartSelected.top + diffY <= 0;
    const isBottomBorder = selectedPos.bottom === this.canvasHeight && resizeStartSelected.bottom + diffY >= this.canvasHeight;
    const isMove = resizeDirection === "move";
    if (movement[0] && !(isMove && (isLeftBorder || isRightBorder))) {
      let moveX = movement[0];
      moveX = moveX === "*" ? ["x1", "x2"] : [moveX];
      for (const moveDir of moveX) {
        selectedPos[moveDir] = this.truncateX(resizeStartSelected[moveDir] + diffX);
      }
    }
    if (movement[1] && !(isMove && (isTopBorder || isBottomBorder))) {
      let moveY = movement[1];
      moveY = moveY === "*" ? ["y1", "y2"] : [moveY];
      for (const moveDir of moveY) {
        selectedPos[moveDir] = this.truncateY(resizeStartSelected[moveDir] + diffY);
      }
    }
    this.preserveDimensions(width, height);
    this.displayCropBox(selectedPos);
  }

  // Preserves correct dimensions of crop box if the user hits borders
  preserveDimensions(width, height) {
    if (resizeDirection === "move") {
      if (selectedPos.left === 0) {
        selectedPos.right = width;
      }
      if (selectedPos.top === 0) {
        selectedPos.bottom = height;
      }
      if (selectedPos.right === this.canvasWidth) {
        selectedPos.left = this.canvasWidth - width;
      }
      if (selectedPos.bottom === this.canvasHeight) {
        selectedPos.top = this.canvasHeight - height;
      }
    }
  }

  truncateX(x) {
    const max = this.canvasWidth;
    if (x < 0) {
      return 0;
    } else if (x > max) {
      return Math.floor(max);
    }
    return Math.floor(x);
  }

  truncateY(y) {
    const max = this.canvasHeight;
    if (y < 0) {
      return 0;
    } else if (y > max) {
      return Math.floor(max);
    }
    return Math.floor(y);
  }

  findClickedArea(e) {
    const target = e.target;
    if (target.classList.contains("mover-target") || target.classList.contains("mover")) {
      for (const name of movements) {
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
    selectionState = "none";
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
    const cropBox = document.createElement("div")
    cropBox.className = "highlight";
    for (const name of movements) {
      const elTarget = document.createElement("div");
      elTarget.className = "mover-target direction-" + name;
      const elMover = document.createElement("div");
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
    document.removeEventListener("mouseup", this.drawMouseup);
    document.removeEventListener("mousemove", this.draw);
    document.removeEventListener("mousedown", this.setPosition);
    this.props.onCancelEdit(false);
    sendEvent("cancel", "annotation-toolbar");
  }

  onClickSave() {
    this.loader = this.renderShotsLoading();
    const actionsDisabled = true;
    this.setState({actionsDisabled});
    let dataUrl = this.imageCanvas.toDataURL();

    if (this.props.pngToJpegCutoff && dataUrl.length > this.props.pngToJpegCutoff) {
      const jpegDataUrl = this.imageCanvas.toDataURL("image/jpeg");
      if (jpegDataUrl.length < dataUrl.length) {
        dataUrl = jpegDataUrl;
      }
    }

    const dimensions = {x: this.canvasWidth, y: this.canvasHeight};
    this.props.onClickSave(dataUrl, dimensions);
    sendEvent("save", "annotation-toolbar");
  }

  onClickHighlight() {
    if (this.state.tool !== "highlighter") {
      this.setState({tool: "highlighter"});
      sendEvent("highlighter-select", "annotation-toolbar");
    }
  }

  onClickPen() {
    if (this.state.tool !== "pen") {
      this.setState({tool: "pen"});
      sendEvent("pen-select", "annotation-toolbar");
    }
  }

  renderImage() {
    const imageContext = this.imageCanvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const width = this.props.clip.image.dimensions.x;
    const height = this.props.clip.image.dimensions.y;
    img.onload = () => {
      if (imageIsCropped) {
        imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
        imageIsCropped = false;
      }
      imageContext.drawImage(img, 0, 0, width, height);
      this.setState({actionsDisabled: false});
    }
    this.imageContext = imageContext;
    img.src = this.props.clip.image.url;
  }

  componentDidMount() {
    this.imageContext = this.imageCanvas.getContext("2d");
    this.imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
    this.highlightContext = this.highlighter.getContext("2d");
    this.renderImage();
    this.edit();
  }

  edit() {
    if (this.state.tool !== "crop") {
      this.cropToolBar = null;
      document.removeEventListener("mousemove", this.mousemove);
      document.removeEventListener("mousedown", this.mousedown);
      document.removeEventListener("mouseup", this.mouseup);
    }
    this.pos = { x: 0, y: 0 };
    if (this.state.tool === "highlighter") {
      this.drawContext = this.highlightContext;
      this.highlightContext.lineWidth = 20;
      this.highlightContext.strokeStyle = this.state.color;
      document.addEventListener("mousemove", this.draw);
      document.addEventListener("mousedown", this.setPosition);
      document.addEventListener("mouseup", this.drawMouseup);
    } else if (this.state.tool === "pen") {
      this.drawContext = this.imageContext;
      this.imageContext.globalCompositeOperation = "source-over";
      this.imageContext.strokeStyle = this.state.color;
      this.imageContext.lineWidth = this.state.size;
      document.addEventListener("mousemove", this.draw);
      document.addEventListener("mousedown", this.setPosition);
      document.addEventListener("mouseup", this.drawMouseup);
    } else if (this.state.tool === "crop") {
      document.removeEventListener("mouseup", this.drawMouseup);
      document.removeEventListener("mousemove", this.draw);
      document.removeEventListener("mousedown", this.setPosition);
      document.addEventListener("mousemove", this.mousemove);
      document.addEventListener("mousedown", this.mousedown);
      document.addEventListener("mouseup", this.mouseup);
    }
  }

  drawMouseup(e) {
    e.preventDefault();
    drawMousedown = false;
    points = [];
    if (this.state.tool === "highlighter") {
      sendEvent("draw", "highlight");
      if (this.isColorWhite(this.state.color)) {
        this.imageContext.globalCompositeOperation = "soft-light";
      } else {
        this.imageContext.globalCompositeOperation = "multiply";
      }
      this.imageContext.drawImage(this.highlighter, 0, 0);
      this.highlightContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
    } else {
      sendEvent("draw", "pen");
    }
  }

  setPosition(e) {
    e.preventDefault();
    const rect = this.imageCanvas.getBoundingClientRect();
    this.pos.x = e.clientX - rect.left,
    this.pos.y = e.clientY - rect.top
    drawMousedown = true;
    if (this.isOnUndrawableArea(e) || e.button !== 0) {
      drawMousedown = false;
    }
    this.draw(e);
  }

  draw(e) {
    e.preventDefault();
    if (!drawMousedown) {
      return;
    }
    if (this.state.tool === "highlighter") {
      this.drawHighlight(e);
    } else {
      this.drawPen(e);
    }
  }

  isOnUndrawableArea(e) {
    const header = document.querySelector(".editor-header");
    return (header.contains(e.target) || header === e.target);
  }

  drawPen(e) {
    this.drawContext.lineCap = "round";
    this.drawContext.beginPath();
    this.drawContext.moveTo(this.pos.x, this.pos.y);
    const rect = this.imageCanvas.getBoundingClientRect();
    this.pos.x = e.clientX - rect.left,
    this.pos.y = e.clientY - rect.top
    this.drawContext.lineTo(this.pos.x, this.pos.y);
    this.drawContext.stroke();
  }

  drawHighlight(e) {
    this.drawContext.lineCap = "square";
    this.drawContext.lineJoin = "round";
    points.push({x: this.pos.x, y: this.pos.y});
    if (points.length < 3) {
      this.drawContext.beginPath();
      this.drawContext.moveTo(this.pos.x, this.pos.y);
      const rect = this.imageCanvas.getBoundingClientRect();
      this.pos.x = e.clientX - rect.left,
      this.pos.y = e.clientY - rect.top
      this.drawContext.lineTo(this.pos.x, this.pos.y);
      this.drawContext.stroke();
      return;
    }
    this.drawContext.moveTo(this.pos.x, this.pos.y);
    const rect = this.imageCanvas.getBoundingClientRect();
    this.pos.x = e.clientX - rect.left,
    this.pos.y = e.clientY - rect.top
    this.drawContext.lineTo(this.pos.x, this.pos.y);
    this.drawContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawContext.beginPath();
    this.drawContext.moveTo(points[0].x, points[0].y);
    let i;
    for (i = 1; i < points.length - 2; i++) {
      const endX = (points[i].x + points[i + 1].x) / 2;
      const endY = (points[i].y + points[i + 1].y) / 2;
      this.drawContext.quadraticCurveTo(points[i].x, points[i].y, endX, endY);
    }
    this.drawContext.quadraticCurveTo(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y
    );
    this.drawContext.stroke();
  }
}

exports.Editor.propTypes = {
  clip: PropTypes.object,
  onCancelEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  pngToJpegCutoff: PropTypes.number
};

class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.clickMaybeClose = this.clickMaybeClose.bind(this);
    this.keyMaybeClose = this.keyMaybeClose.bind(this);
    this.state = {
      pickerActive: false,
      color: activeColor || "#000"
    };
  }

  render() {
    return <div id="color-button-container">
      <button className="color-button" id="color-picker" onClick={this.onClickColorPicker.bind(this)} title="Color Picker" style={{"backgroundColor": this.state.color, "border": "2px solid #D4D4D4"}}></button>
      <div id="color-button-highlight" />
      {this.state.pickerActive ? this.renderColorBoard() : null}
    </div>
  }

  componentDidUpdate() {
    if (this.state.pickerActive) {
      document.addEventListener("mousedown", this.clickMaybeClose);
      document.addEventListener("keyup", this.keyMaybeClose);
    } else {
      document.removeEventListener("mousedown", this.clickMaybeClose);
      document.removeEventListener("keyup", this.keyMaybeClose);
    }
  }

  componentWillReceiveProps() {
    this.setState({pickerActive: false});
  }

  componentWillUnmount() {
    activeColor = this.state.color;
    document.removeEventListener("mousedown", this.clickMaybeClose);
    document.removeEventListener("keyup", this.keyMaybeClose);
  }

  clickMaybeClose(event) {
    if (!this.isColorBoard(event.target)) {
      this.setState({pickerActive: false});
    }
  }

  keyMaybeClose(event) {
    if ((event.key || event.code) === "Escape") {
      this.setState({pickerActive: false});
    }
  }

  isColorBoard(el) {
    while (el) {
      if (el.className === "color-board" || el.className === "color-button") {
        return true;
      }
      el = el.parentNode;
    }
    return false;
  }

  renderColorBoard() {
    return <div className="color-board">
      <div className="triangle">
        <div className="triangle-inner"></div>
      </div>
      <div className="color-row">
        <Localized id="annotationColorWhite"><div className="swatch" title="White"
          style={{ backgroundColor: "#FFF", border: "1px solid #000" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorBlack"><div className="swatch" title="Black"
          style={{ backgroundColor: "#000" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorRed"><div className="swatch" title="Red"
          style={{ backgroundColor: "#E74C3C" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
      </div>
      <div className="color-row">
        <Localized id="annotationColorGreen"><div className="swatch" title="Green"
          style={{ backgroundColor: "#2ECC71" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorBlue"><div className="swatch" title="Blue"
          style={{ backgroundColor: "#3498DB" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorYellow"><div className="swatch" title="Yellow"
          style={{ backgroundColor: "#FF0" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
      </div>
      <div className="color-row">
        <Localized id="annotationColorPurple"><div className="swatch" title="Purple"
          style={{ backgroundColor: "#8E44AD" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorSeaGreen"><div className="swatch" title="Sea Green"
          style={{ backgroundColor: "#1ABC9C" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
        <Localized id="annotationColorGrey"><div className="swatch" title="Grey"
          style={{ backgroundColor: "#34495E" }}
          onClick={this.onClickSwatch.bind(this)}></div></Localized>
      </div>
    </div>
  }

  onClickSwatch(e) {
    const color = e.target.style.backgroundColor;
    const title = e.target.title.toLowerCase().replace(/\s/g, "-");
    this.setState({color, pickerActive: false});
    this.props.setColor(color);
    sendEvent(`${title}-select`, "annotation-color-board");
  }

  onClickColorPicker() {
    const pickerActive = !this.state.pickerActive;
    this.setState({pickerActive});
    sendEvent("color-picker-select", "annotation-toolbar");
  }
}

ColorPicker.propTypes = {
  setColor: PropTypes.func
};
