const React = require("react");
const PropTypes = require("prop-types");
const { Selection } = require("../../../shared/selection");

exports.DrawingTool = class DrawingTool extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return <canvas
      ref={this.canvas}
      className={`image-holder centered ${this.state.classNames}`}
      onMouseDown={this.onMouseDown.bind(this)}
      width={this.state.baseCanvasWidth}
      height={this.state.baseCanvasHeight}
      style={{width: this.state.canvasCssWidth,
              height: this.state.canvasCssHeight}}></canvas>;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {
      strokeStyle: nextProps.color,
      lineWidth: nextProps.lineWidth,
      baseCanvasWidth: nextProps.canvasCssWidth * nextProps.canvasPixelRatio,
      baseCanvasHeight: nextProps.canvasCssHeight * nextProps.canvasPixelRatio,
      canvasCssWidth: nextProps.canvasCssWidth,
      canvasCssHeight: nextProps.canvasCssHeight
    };
    return newState;
  }

  componentDidMount() {
    this.drawingContext = this.canvas.current.getContext("2d");
    this.drawingContext.scale(this.props.canvasPixelRatio, this.props.canvasPixelRatio);
    this.setDrawingProperties();
  }

  setDrawingProperties() {
    console.warn("Please override setDrawingProperties in your component.");
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.baseCanvasWidth !== this.state.baseCanvasWidth
        || oldState.baseCanvasHeight !== this.state.baseCanvasHeight) {
      this.drawingContext.scale(this.props.canvasPixelRatio, this.props.canvasPixelRatio);
    }
    this.setDrawingProperties();
  }

// TODO This also exist in crop-tool.js and text-tool.js.  Move it to a shared space.
  captureMousePosition(e) {
    const boundingRect = this.canvas.current.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top
    };
  }

  onMouseDown(e) {
    if (e.button !== 0 || this.isMousedown) {
      return;
    }
    this.mousedownPosition = this.captureMousePosition(e);
    this.isMousedown = true;
    this.updateDrawnArea(this.mousedownPosition);
    this.draw(this.mousedownPosition);
  }

  onMouseMove(e) {
    if (!this.isMousedown) {
      return false;
    }
    e.preventDefault();
    const position = this.captureMousePosition(e);
    this.draw(position);
    this.updateDrawnArea(position);
    return true;
  }

  draw(position) {
    console.warn("Please override draw() in your component.");
  }

  updateDrawnArea(position) {
    if (!this.drawnArea) {
      this.drawnArea = new Selection(position.x, position.y, position.x, position.y);
      return;
    }
    const newSelection = this.drawnArea.clone();
    newSelection.left = position.x;
    newSelection.top = position.y;
    this.drawnArea = this.drawnArea.union(newSelection);
  }

  clearRect() {
    this.drawingContext.clearRect(
      Math.min(0, this.drawnArea.left - this.state.lineWidth),
      Math.min(0, this.drawnArea.top - this.state.lineWidth),
      Math.max(this.state.canvasCssWidth, this.drawnArea.width + this.state.lineWidth),
      Math.max(this.state.canvasCssHeight, this.drawnArea.width + this.state.lineWidth));
  }

  onMouseUp(e) {
    if (e.button !== 0 || !this.isMousedown) {
      return;
    }

    this.drawnArea.left = Math.ceil(Math.max(this.drawnArea.left - this.state.lineWidth, 0));
    this.drawnArea.top = Math.ceil(Math.max(this.drawnArea.top - this.state.lineWidth, 0));
    this.drawnArea.right = Math.ceil(Math.min(
      this.drawnArea.right + this.state.lineWidth,
      this.state.canvasCssWidth));
    this.drawnArea.bottom = Math.ceil(Math.min(
      this.drawnArea.bottom + this.state.lineWidth,
      this.state.canvasCssHeight));

    this.finalize();

    if (this.props.updateImageCallback) {
      this.props.updateImageCallback(
        this.drawnArea,
        this.canvas.current,
        this.globalCompositeOperation || "source-over");
    }

    this.sendMetrics();
    this.reset();
    this.isMousedown = false;
    this.mousedownPosition = null;
    this.drawnArea = null;
  }

  finalize() {
    // Optional step to finish up the drawing
  }

  reset() {
    console.warn("Please override reset() in your component.");
  }
};

exports.DrawingTool.propTypes = {
  baseCanvas: PropTypes.object,
  canvasPixelRatio: PropTypes.number,
  canvasCssWidth: PropTypes.number,
  canvasCssHeight: PropTypes.number,
  updateImageCallback: PropTypes.func,
  color: PropTypes.string,
  lineWidth: PropTypes.number,
};
