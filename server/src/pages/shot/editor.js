const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");
const { PenTool } = require("./pen-tool");
const { HighlighterTool } = require("./highlighter-tool");
const { CropTool } = require("./crop-tool");
const { ColorPicker } = require("./color-picker");
const { EditorHistory, RecordType } = require("./editor-history");
const { Selection } = require("../../../shared/selection");

exports.Editor = class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.devicePixelRatio = window.devicePixelRatio;
    if (props.clip.image.captureType === "fullPage"
        || props.clip.image.captureType === "fullPageTruncated") {
      this.devicePixelRatio = 1;
    }
    this.state = {
      canvasWidth: Math.floor(this.props.clip.image.dimensions.x),
      canvasHeight: Math.floor(this.props.clip.image.dimensions.y),
      tool: "",
      color: "",
      lineWidth: "",
      actionsDisabled: true,
      canUndo: false,
      canRedo: false
    };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.selectedTool = React.createRef();
    this.history = new EditorHistory(this.devicePixelRatio);
  }

  render() {
    const toolContent = this.renderSelectedTool();
    const toolBar = this.renderToolBar();
    const display = this.loader || this.renderCanvas(toolContent);
    return <div className="inverse-color-scheme full-height column-space"
      onMouseMove={this.onMouseMove.bind(this)}>
      { toolBar }
      { display }
    </div>;
  }

  renderCanvas(toolContent) {
    const canvasWidth = Math.floor(this.state.canvasWidth * this.devicePixelRatio);
    const canvasHeight = Math.floor(this.state.canvasHeight * this.devicePixelRatio);
    return <div className="main-container">
      <div
        className={`inverse-color-scheme canvas-container ${this.state.tool}`}
        id="canvas-container"
        style={{ height: this.state.canvasHeight, width: this.state.canvasWidth }}>
        <canvas
          className="image-holder centered"
          id="image-holder"
          ref={(image) => { this.imageCanvas = image; }}
          height={canvasHeight} width={canvasWidth}
          style={{ height: this.state.canvasHeight, width: this.state.canvasWidth }}></canvas>
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

  deriveButtonStates() {
    this.setState({
      canUndo: this.history.canUndo(),
      canRedo: this.history.canRedo()
    });
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
    const undoButtonState = this.state.canUndo ? "active" : "inactive";
    const redoButtonState = this.state.canRedo ? "active" : "inactive";

    return <div className="editor-header default-color-scheme">
      <div className="shot-main-actions annotation-main-actions">
        <div className="annotation-tools">
          <Localized id="annotationCropButton">
            <button className={`button transparent crop-button`} id="crop" onClick={this.onClickCrop.bind(this)} title="Crop"></button>
          </Localized>
          <span className="annotation-divider"></span>
          <Localized id="annotationPenButton">
            <button className={`button transparent pen-button ${penState}`} id="pen" onClick={this.onClickPen.bind(this)} title="Pen"></button>
          </Localized>
          <Localized id="annotationHighlighterButton">
            <button className={`button transparent highlight-button ${highlighterState}`} id="highlight" onClick={this.onClickHighlight.bind(this)} title="Highlighter"></button>
          </Localized>
          <ColorPicker activeTool={this.state.tool}
            setColorCallback={this.setColor.bind(this)}
            color={this.state.color} />
          <span className="annotation-divider"></span>
          <Localized id="annotationUndoButton">
            <button className={`button transparent undo-button ${undoButtonState}`} id="undo"
              disabled={!this.state.canUndo} onClick={this.onUndo.bind(this)} title="Undo"></button>
          </Localized>
          <Localized id="annotationRedoButton">
            <button className={`button transparent redo-button ${redoButtonState}`} id="redo"
              disabled={!this.state.canRedo} onClick={this.onRedo.bind(this)} title="Redo"></button>
          </Localized>
          <Localized id="annotationClearButton">
            <button className={`button transparent clear-button ${undoButtonState}`} id="clear"
              disabled={!this.state.canUndo} onClick={this.onClickClear.bind(this)} title="Clear"></button>
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

    this.history.pushDiff(this.imageCanvas, affectedArea);

    this.imageContext.globalCompositeOperation = (compositeOp || "source-over");
    this.imageContext.drawImage(incomingCanvas,
      affectedArea.left * this.devicePixelRatio,
      affectedArea.top * this.devicePixelRatio,
      affectedArea.width * this.devicePixelRatio,
      affectedArea.height * this.devicePixelRatio,
      affectedArea.left, affectedArea.top, affectedArea.width, affectedArea.height);

    this.deriveButtonStates();
  }

  applyDiff(area, diffCanvas) {
    this.imageContext.globalCompositeOperation = "source-over";
    this.imageContext.drawImage(diffCanvas,
      0, 0, diffCanvas.width, diffCanvas.height,
      area.left, area.top, area.width, area.height);
  }

  onCropUpdate(affectedArea, incomingCanvas) {
    if (!affectedArea || !incomingCanvas) {
      this.setState({tool: this.previousTool});
      return;
    }

    this.history.pushFrame(this.imageCanvas, new Selection(
      0, 0, this.state.canvasWidth, this.state.canvasHeight
    ));
    this.applyFrame(affectedArea, incomingCanvas);
    this.setState({tool: this.previousTool});
    this.deriveButtonStates();
  }

  applyFrame(area, frameCanvas) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
      imageContext.drawImage(img, 0, 0, area.width, area.height);
    };
    const imageContext = this.imageCanvas.getContext("2d");
    this.imageContext = imageContext;
    img.src = frameCanvas.toDataURL("image/png");
    this.setState({canvasWidth: area.width, canvasHeight: area.height});
  }

  onClickCancelCrop() {
    this.setState({tool: this.previousTool});
  }

  onUndo(e) {
    if (!this.history.canUndo()) {
      return;
    }
    e.target.blur();
    this.applyHistory(this.history.undo(this.imageCanvas));
    this.deriveButtonStates();
  }

  onRedo(e) {
    if (!this.history.canRedo()) {
      return;
    }
    e.target.blur();
    this.applyHistory(this.history.redo(this.imageCanvas));
    this.deriveButtonStates();
  }

  applyHistory(record) {
    if (!record) {
      return;
    }
    if (record.recordType === RecordType.DIFF) {
      this.applyDiff(record.area, record.canvas);
    } else {
      this.applyFrame(record.area, record.canvas);
    }
  }

  onClickClear() {
    this.setState({
      canvasWidth: Math.floor(this.props.clip.image.dimensions.x),
      canvasHeight: Math.floor(this.props.clip.image.dimensions.y)
    });
    this.history = new EditorHistory(this.devicePixelRatio);
    this.deriveButtonStates();
    this.imageContext.clearRect(0, 0, this.imageCanvas.width, this.imageCanvas.height);
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

    const dimensions = {x: this.state.canvasWidth, y: this.state.canvasHeight};
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

  onMouseMove(e) {
    // This is here because we don't want whatever the tool action is to stop
    // completely as soon as the mouse cursor exits the canvas/tool area (it's
    // rather jarring).
    if (this.selectedTool.current
        && this.selectedTool.current.onMouseMove
        && this.selectedTool.current.onMouseMove(e)) {
      e.stopPropagation();
    }
  }

  renderImage() {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const width = this.props.clip.image.dimensions.x;
    const height = this.props.clip.image.dimensions.y;
    const imageContext = this.imageCanvas.getContext("2d");
    img.onload = () => {
      imageContext.drawImage(img, 0, 0, width, height);
      this.setState({actionsDisabled: false});
    };
    this.imageContext = imageContext;
    img.src = this.props.clip.image.url;
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    const imageContext = this.imageCanvas.getContext("2d");
    imageContext.scale(this.devicePixelRatio, this.devicePixelRatio);
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
