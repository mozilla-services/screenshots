const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");
const { PenTool } = require("./pen-tool");
const { HighlighterTool } = require("./highlighter-tool");
const { CropTool } = require("./crop-tool");
const { ColorPicker } = require("./color-picker");

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.devicePixelRatio = window.devicePixelRatio;
    if (props.clip.image.captureType === "fullPage"
        || props.clip.image.captureType === "fullPageTruncated") {
      this.devicePixelRatio = 1;
    }
    this.canvasWidth = Math.floor(this.props.clip.image.dimensions.x);
    this.canvasHeight = Math.floor(this.props.clip.image.dimensions.y);
    this.state = {
      tool: "",
      color: "",
      lineWidth: "",
      actionsDisabled: true
    };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.selectedTool = React.createRef();
  }

  render() {
    const toolContent = this.renderSelectedTool();
    const toolBar = this.renderToolBar();
    const display = this.loader || this.renderCanvas(toolContent);
    return <div className="inverse-color-scheme full-height column-space">
      { toolBar }
      { display }
    </div>;
  }

  renderCanvas(toolContent) {
    return <div className="main-container">
      <div
        className={`inverse-color-scheme canvas-container ${this.state.tool}`}
        id="canvas-container"
        style={{ height: this.canvasHeight, width: this.canvasWidth }}>
        <canvas
          className="image-holder centered"
          id="image-holder"
          ref={(image) => { this.imageCanvas = image; }}
          height={this.canvasHeight * this.devicePixelRatio} width={this.canvasWidth * this.devicePixelRatio}
          style={{ height: this.canvasHeight, width: this.canvasWidth }}></canvas>
        {toolContent}
      </div>
    </div>;
  }

  renderSelectedTool() {
    switch (this.state.tool) {
      case "pen":
        return <PenTool
          ref={this.selectedTool}
          color={this.state.color}
          lineWidth={this.state.lineWidth}
          baseCanvas={this.imageCanvas}
          devicePixelRatio={this.devicePixelRatio}
          updateImageCallback={this.onDrawingUpdate.bind(this)} />;
      case "highlighter":
        return <HighlighterTool
          ref={this.selectedTool}
          color={this.state.color}
          lineWidth={this.state.lineWidth}
          baseCanvas={this.imageCanvas}
          devicePixelRatio={this.devicePixelRatio}
          updateImageCallback={this.onDrawingUpdate.bind(this)} />;
      case "cropTool":
        return <CropTool
          ref={this.selectedTool}
          baseCanvas={this.imageCanvas}
          devicePixelRatio={this.devicePixelRatio}
          cancelCropHandler={this.onClickCancelCrop.bind(this)}
          confirmCropHandler={this.onCropUpdate.bind(this)}
          toolbarOverrideCallback={this.overrideToolbar.bind(this)} />;
      default:
        return null;
    }
  }

  overrideToolbar() {
    this.setState({overrideToolbar: this.state.tool});
  }

  isToolActive(tool) {
    return this.state.tool === tool;
  }

  renderToolBar() {
    if (this.selectedTool.current && this.selectedTool.current.renderToolbar) {
      return this.selectedTool.current.renderToolbar();
    }
    const penState = this.isToolActive("pen") ? "active" : "inactive";
    const highlighterState = this.isToolActive("highlighter") ? "active" : "inactive";
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
          <ColorPicker activeTool={this.state.tool}
            setColorCallback={this.setColor.bind(this)}
            color={this.state.color} />
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
    </div>;
  }

  setColor(color) {
    this.setState({color});
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
    this.setState({tool: "cropTool"});
    sendEvent("crop-select", "annotation-toolbar");
  }

  onDrawingUpdate(affectedArea, incomingCanvas, compositeOp) {
    if (!affectedArea || !incomingCanvas) {
      return;
    }

    this.imageContext.globalCompositeOperation = (compositeOp || "source-over");
    this.imageContext.drawImage(incomingCanvas,
      affectedArea.left * this.devicePixelRatio,
      affectedArea.top * this.devicePixelRatio,
      affectedArea.width * this.devicePixelRatio,
      affectedArea.height * this.devicePixelRatio,
      affectedArea.left, affectedArea.top, affectedArea.width, affectedArea.height);
  }

  onCropUpdate(affectedArea, incomingCanvas) {
    if (!affectedArea || !incomingCanvas) {
      this.setState({tool: this.previousTool});
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
      imageContext.drawImage(img, 0, 0, affectedArea.width, affectedArea.height);
    };
    this.canvasWidth = affectedArea.width;
    this.canvasHeight = affectedArea.height;
    const imageContext = this.imageCanvas.getContext("2d");
    this.imageContext = imageContext;
    img.src = incomingCanvas.toDataURL("image/png");
    this.setState({tool: this.previousTool});
  }

  onClickCancelCrop() {
    this.setState({tool: this.previousTool});
  }

  onClickClear() {
    this.setState({tool: this.state.tool});
    this.imageContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
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
    this.loader = this.renderShotsLoading();
    this.setState({actionsDisabled: true});
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
      this.setState({tool: "highlighter", lineWidth: 20});
      sendEvent("highlighter-select", "annotation-toolbar");
    }
  }

  onClickPen() {
    if (this.state.tool !== "pen") {
      this.setState({tool: "pen", lineWidth: 5});
      sendEvent("pen-select", "annotation-toolbar");
    }
  }

  onMouseUp(e) {
    // This is here so that when the user releases the mouse button outside of
    // the canvas area, the drawing will stop.
    if (this.selectedTool.current
        && this.selectedTool.current.onMouseUp) {
      e.stopPropagation();
      this.selectedTool.current.onMouseUp(e);
    }
  }

  renderImage() {
    const imageContext = this.imageCanvas.getContext("2d");
    imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const width = this.props.clip.image.dimensions.x;
    const height = this.props.clip.image.dimensions.y;
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
      this.setState({actionsDisabled: false});
    };
    this.imageContext = imageContext;
    img.src = this.props.clip.image.url;
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    this.renderImage();
    this.setState({
      tool: "pen",
      color: "#000",
      lineWidth: 5,
      actionsDisabled: true
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
  }

};

exports.Editor.propTypes = {
  clip: PropTypes.object,
  onCancelEdit: PropTypes.func,
  onClickSave: PropTypes.func,
  pngToJpegCutoff: PropTypes.number
};
