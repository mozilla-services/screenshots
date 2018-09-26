const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");
const { Selection } = require("../../../shared/selection");

const MIN_WIDTH = 10;
const MIN_HEIGHT = 10;
// This is how close (in pixels) you can get to the edge of the window and then
// it will scroll:
const scrollByEdge = 20;

let isMousedown;
let mousedownPosition;
let mousedownSelection;
let dragHandleLocation;
const SelectionState = { NONE: 0, CREATING: 1, RESIZING: 2, MOVING: 3};

exports.CropTool = class CropTool extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.state = {
      selectionState: SelectionState.NONE,
      cropSelection: null,
    };
    this.canvasCssWidth = props.canvasCssWidth;
    this.canvasCssHeight = props.canvasCssHeight;
  }

  componentDidMount() {
    if (this.props.toolbarOverrideCallback) {
      this.props.toolbarOverrideCallback();
    }
  }

  componentWillUnmount() {
    if (this.props.toolbarOverrideCallback) {
      this.props.toolbarOverrideCallback();
    }
  }

  render() {
    const cropSelectionBox = this.renderCropSelection();

    return <div
      ref={this.el}
      className="crop-container centered"
      onMouseDown={this.onMouseDown.bind(this)}
      style={{height: this.props.baseCanvas.style.height, width: this.props.baseCanvas.style.width}}>
      {cropSelectionBox}
    </div>;
  }

  renderCropSelection() {
    if (!this.state.cropSelection) {
      return null;
    }

    const zeroPx = "0px";
    const selectionTopPx = `${this.state.cropSelection.top}px`;
    const selectionLeftPx = `${this.state.cropSelection.left}px`;
    const selectionRightPx = `${this.state.cropSelection.right}px`;
    const selectionBottomPx = `${this.state.cropSelection.bottom}px`;
    const selectionHeightPx = `${this.state.cropSelection.height}px`;
    const selectionWidthPx = `${this.state.cropSelection.width}px`;
    const remainingRightSideWidthPx = `${this.canvasCssWidth - this.state.cropSelection.right}px`;
    const oneHundredPercent = "100%";

    const bgTopStyles = {
      top: zeroPx,
      height: selectionTopPx,
      left: zeroPx,
      width: oneHundredPercent,
    };
    const bgLeftStyles = {
      top: selectionTopPx,
      height: selectionHeightPx,
      left: zeroPx,
      width: selectionLeftPx,
    };
    const bgRightStyles = {
      top: selectionTopPx,
      height: selectionHeightPx,
      left: selectionRightPx,
      width: remainingRightSideWidthPx,
    };
    const bgBottomStyles = {
      top: selectionBottomPx,
      height: oneHundredPercent,
      left: zeroPx,
      width: oneHundredPercent,
    };
    const selectedStyles = {
      position: "absolute",
      top: selectionTopPx,
      left: selectionLeftPx,
      height: selectionHeightPx,
      width: selectionWidthPx,
    };

    let smallSelection = null;
    if (this.state.cropSelection.width < 78 || this.state.cropSelection.height < 78) {
      smallSelection = "small-selection";
    }

    return [
      <div className="bghighlight" key="top" style={bgTopStyles}></div>,
      <div className="bghighlight" key="left" style={bgLeftStyles}></div>,
      <div className="bghighlight" key="right" style={bgRightStyles}></div>,
      <div className="bghighlight" key="bottom" style={bgBottomStyles}></div>,
      <div className={`highlight  ${smallSelection}`} key="selected" style={selectedStyles}>
        <div className="mover-target direction-topLeft"><div className="mover"></div></div>
        <div className="mover-target direction-top"><div className="mover"></div></div>
        <div className="mover-target direction-topRight"><div className="mover"></div></div>
        <div className="mover-target direction-left"><div className="mover"></div></div>
        <div className="mover-target direction-right"><div className="mover"></div></div>
        <div className="mover-target direction-bottomLeft"><div className="mover"></div></div>
        <div className="mover-target direction-bottom"><div className="mover"></div></div>
        <div className="mover-target direction-bottomRight"><div className="mover"></div></div>
      </div>,
    ];
  }

  renderToolbar() {
    return <div className="editor-header"><div className="annotation-tools">
      <Localized id="annotationCropConfirmButton" attrs={{title: true}}>
        <button className={`button transparent confirm-crop`} id="confirm-crop" onClick={this.onClickConfirm.bind(this)} title="Confirm selection">Crop</button>
      </Localized>
      <Localized id="annotationCropCancelButton" attrs={{title: true}}>
        <button className={`button transparent cancel-crop`} id="cancel-crop" onClick={this.onClickCancel.bind(this)} title="Cancel selection">Cancel</button>
      </Localized>
    </div></div>;
  }

  reset() {
    this.setState({
      selectionState: SelectionState.NONE,
      cropSelection: null,
    });
  }

  onClickConfirm(e) {
    if (!this.state.cropSelection
        || !this.state.cropSelection.width || !this.state.cropSelection.height
        || (this.canvasCssWidth === this.state.cropSelection.width
            && this.canvasCssHeight === this.state.cropSelection.height)) {
      if (this.props.confirmCropHandler) {
        this.props.confirmCropHandler(null, null);
      }

      this.reset();
      return;
    }

    const croppedImage = document.createElement("canvas");
    croppedImage.width = this.state.cropSelection.width * this.props.canvasPixelRatio;
    croppedImage.height = this.state.cropSelection.height * this.props.canvasPixelRatio;
    const croppedContext = croppedImage.getContext("2d");
    croppedContext.drawImage(
      this.props.baseCanvas,
      this.state.cropSelection.left * this.props.canvasPixelRatio,
      this.state.cropSelection.top * this.props.canvasPixelRatio,
      croppedImage.width, croppedImage.height,
      0, 0, croppedImage.width, croppedImage.height);

    if (this.props.confirmCropHandler) {
      this.props.confirmCropHandler(this.state.cropSelection, croppedImage);
    }

    sendEvent("confirm-crop", "crop-toolbar");
    this.reset();
  }

  onClickCancel(e) {
    if (this.props.cancelCropHandler) {
      this.props.cancelCropHandler();
    }
    sendEvent("cancel-crop", "crop-toolbar");
    this.reset();
  }

  onMouseDown(e) {
    if (e.button !== 0 || isMousedown) {
      return;
    }

    isMousedown = true;
    mousedownPosition = this.captureMousePosition(e);
    e.preventDefault();

    if (!this.state.cropSelection) {
      this.setState({selectionState: SelectionState.CREATING});
      return;
    }

    const classes = e.target.classList;

    if (classes.contains("bghighlight")) {
      this.setState({cropSelection: null});
      return;
    }

    mousedownSelection = this.state.cropSelection.clone();

    if (classes.contains("highlight")) {
      this.setState({selectionState: SelectionState.MOVING});
      return;
    }

    if (classes.contains("mover-target")
        || classes.contains("mover")) {
      this.setState({selectionState: SelectionState.RESIZING});
      const dragHandle = classes.contains("mover") ? e.target.parentNode : e.target;
      const locationClass = dragHandle.classList[dragHandle.classList.length - 1];
      dragHandleLocation = locationClass.split("-")[1];
    }
  }

// TODO This also exist in drawing-tool.js and text-tool.js. Move it to a shared
// space.
  captureMousePosition(e) {
    const boundingRect = this.el.current.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    };
  }

  getDraggedSelection(e) {
    const currentMousePosition = this.captureMousePosition(e);
    return floorSelection(new Selection(
      clamp(mousedownPosition.x, 0, this.canvasCssWidth),
      clamp(mousedownPosition.y, 0, this.canvasCssHeight),
      clamp(currentMousePosition.x, 0, this.canvasCssWidth),
      clamp(currentMousePosition.y, 0, this.canvasCssHeight)
    ));
  }

  onMouseUp(e) {
    isMousedown = false;
    mousedownPosition = null;
    dragHandleLocation = null;
    mousedownSelection = null;
    this.setState({selectionState: SelectionState.NONE});
  }

  onMouseMove(e) {
    if (!isMousedown) {
      return false;
    }

    if (this.state.selectionState === SelectionState.CREATING) {
      const cropSelection = this.getDraggedSelection(e);

      if (cropSelection.width > MIN_WIDTH && cropSelection.height > MIN_HEIGHT) {
        this.setState({cropSelection});
      }
      return true;
    }

    let updatedSelection;
    const currentPosition = this.captureMousePosition(e);
    const xDelta = currentPosition.x - mousedownPosition.x;
    const yDelta = currentPosition.y - mousedownPosition.y;

    if (this.state.selectionState === SelectionState.RESIZING) {
      updatedSelection = mousedownSelection.clone();
      switch (dragHandleLocation) {
        case "topLeft":
          updatedSelection.top = clamp(mousedownSelection.top + yDelta, 0, this.canvasCssHeight);
          updatedSelection.left = clamp(mousedownSelection.left + xDelta, 0, this.canvasCssWidth);
          break;
        case "top":
          updatedSelection.top = clamp(mousedownSelection.top + yDelta, 0, this.canvasCssHeight);
          break;
        case "topRight":
          updatedSelection.right = clamp(mousedownSelection.right + xDelta, 0, this.canvasCssWidth);
          updatedSelection.top = clamp(mousedownSelection.top + yDelta, 0, this.canvasCssHeight);
          break;
        case "left":
          updatedSelection.left = clamp(mousedownSelection.left + xDelta, 0, this.canvasCssWidth);
          break;
        case "right":
          updatedSelection.right = clamp(mousedownSelection.right + xDelta, 0, this.canvasCssWidth);
          break;
        case "bottomLeft":
          updatedSelection.left = clamp(mousedownSelection.left + xDelta, 0, this.canvasCssWidth);
          updatedSelection.bottom = clamp(mousedownSelection.bottom + yDelta, 0, this.canvasCssHeight);
          break;
        case "bottom":
          updatedSelection.bottom = clamp(mousedownSelection.bottom + yDelta, 0, this.canvasCssHeight);
          break;
        case "bottomRight":
          updatedSelection.right = clamp(mousedownSelection.right + xDelta, 0, this.canvasCssWidth);
          updatedSelection.bottom = clamp(mousedownSelection.bottom + yDelta, 0, this.canvasCssHeight);
          break;
      }
    }

    if (this.state.selectionState === SelectionState.MOVING) {
      const maxLeft = this.canvasCssWidth - mousedownSelection.width;
      const maxTop = this.canvasCssHeight - mousedownSelection.height;
      const newLeft = clamp(mousedownSelection.left + xDelta, 0, maxLeft);
      const newTop = clamp(mousedownSelection.top + yDelta, 0, maxTop);

      updatedSelection = new Selection(
        newLeft,
        newTop,
        newLeft + this.state.cropSelection.width,
        newTop + this.state.cropSelection.height
      );
    }

    this.setState({cropSelection: floorSelection(updatedSelection)});
    this.scrollIfByEdge(e);
    return true;
  }

  scrollIfByEdge(e) {
    const top = window.scrollY;
    const bottom = top + window.innerHeight;
    const left = window.scrollX;
    const right = left + window.innerWidth;
    if (e.pageY + scrollByEdge >= bottom && bottom < document.body.scrollHeight) {
      window.scrollBy(0, scrollByEdge);
    } else if (e.pageY - scrollByEdge <= top) {
      window.scrollBy(0, -scrollByEdge);
    }
    if (e.pageX + scrollByEdge >= right && right < document.body.scrollWidth) {
      window.scrollBy(scrollByEdge, 0);
    } else if (e.pageX - scrollByEdge <= left) {
      window.scrollBy(-scrollByEdge, 0);
    }
  }
};

exports.CropTool.propTypes = {
  toolbarOverrideCallback: PropTypes.func,
  confirmCropHandler: PropTypes.func,
  cancelCropHandler: PropTypes.func,
  baseCanvas: PropTypes.object,
  canvasPixelRatio: PropTypes.number,
  canvasCssWidth: PropTypes.number,
  canvasCssHeight: PropTypes.number,
};

// TODO This also exist in text-tool.js.  Move it to a shared space.
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

// Decimals make for blurry images. This is a simple function to ensure whole
// numbers in a selection. It mutates and returns.
function floorSelection(selection) {
  selection.left = Math.floor(selection.left);
  selection.top = Math.floor(selection.top);
  selection.right = Math.floor(selection.right);
  selection.bottom = Math.floor(selection.bottom);
  return selection;
}
