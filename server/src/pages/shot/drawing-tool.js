const React = require("react");
const PropTypes = require("prop-types");
const { Selection } = require("../../../shared/selection");

exports.DrawingTool = class DrawingTool extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.canvasWidth = parseInt(props.baseCanvas.style.width, 10);
    this.canvasHeight = parseInt(props.baseCanvas.style.height, 10);
  }

  render() {
    return <canvas
      ref={this.canvas}
      className={`image-holder centered ${this.state.classNames}`}
      onMouseDown={this.onMouseDown.bind(this)}
      width={this.props.baseCanvas.width}
      height={this.props.baseCanvas.height}
      style={{width: this.props.baseCanvas.style.width,
              height: this.props.baseCanvas.style.height}}></canvas>;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {strokeStyle: nextProps.color, lineWidth: nextProps.lineWidth};
  }

  componentDidMount() {
    this.drawingContext = this.canvas.current.getContext("2d");
    this.drawingContext.scale(this.props.devicePixelRatio, this.props.devicePixelRatio);
    this.setDrawingProperties();
  }

  setDrawingProperties() {
    console.warn("Please override setDrawingProperties in your component.");
  }

  componentDidUpdate() {
    this.setDrawingProperties();
  }

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
    this.draw(this.mousedownPosition);
    this.updateDrawnArea(this.mousedownPosition);
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

  onMouseUp(e) {
    if (e.button !== 0 || !this.isMousedown) {
      return;
    }

    this.drawnArea.left = Math.max(this.drawnArea.left - this.state.lineWidth, 0);
    this.drawnArea.top = Math.max(this.drawnArea.top - this.state.lineWidth, 0);
    this.drawnArea.right = Math.min(
      this.drawnArea.right + this.state.lineWidth,
      this.canvasWidth);
    this.drawnArea.bottom = Math.min(
      this.drawnArea.bottom + this.state.lineWidth,
      this.canvasHeight);

    this.finalize();

    if (this.props.updateImageCallback) {
      this.props.updateImageCallback(
        this.drawnArea,
        this.canvas.current,
        this.globalCompositeOperation || "source-over");
    }

    this.isMousedown = false;
    this.mousedownPosition = null;
    this.drawnArea = null;
    this.sendMetrics();
    this.reset();
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
  devicePixelRatio: PropTypes.number,
  updateImageCallback: PropTypes.func,
  color: PropTypes.string,
  lineWidth: PropTypes.number,
};
