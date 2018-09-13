const { DrawingTool } = require("./drawing-tool");
const sendEvent = require("../../browser-send-event.js");

let previousPosition;
let points = [];

exports.HighlighterTool = class HighlighterTool extends DrawingTool {
  constructor(props) {
    super(props);
    this.state = {
      strokeStyle: props.color || "#000",
      lineWidth: props.lineWidth || 20,
      classNames: "highlighter",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return Object.assign(
      super.getDerivedStateFromProps(nextProps, prevState),
      {classNames: getClassNamesByColor(nextProps.color)}
    );
  }

  setDrawingProperties() {
    this.drawingContext.strokeStyle = this.state.strokeStyle;
    this.drawingContext.lineWidth = this.state.lineWidth;
    this.drawingContext.lineCap = "square";
    this.drawingContext.lineJoin = "round";
  }

  draw(position) {
    if (!previousPosition) {
      previousPosition = position;
    }
    points.push(position);

    if (points.length < 3) {
      this.drawingContext.beginPath();
      this.drawingContext.moveTo(previousPosition.x, previousPosition.y);
      this.drawingContext.lineTo(position.x, position.y);
      this.drawingContext.stroke();
      previousPosition = position;
      return;
    }

    this.drawingContext.moveTo(previousPosition.x, previousPosition.y);
    this.drawingContext.lineTo(position.x, position.y);
    this.clearRect();
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(points[0].x, points[0].y);
    let i;
    for (i = 1; i < points.length - 2; i++) {
      const endX = (points[i].x + points[i + 1].x) / 2;
      const endY = (points[i].y + points[i + 1].y) / 2;
      this.drawingContext.quadraticCurveTo(points[i].x, points[i].y, endX, endY);
    }
    this.drawingContext.quadraticCurveTo(
      points[i].x,
      points[i].y,
      points[i + 1].x,
      points[i + 1].y
    );
    this.drawingContext.stroke();
    previousPosition = position;
  }

  finalize() {
    if (isWhite(this.state.strokeStyle)) {
      this.globalCompositeOperation = "soft-light";
    } else {
      this.globalCompositeOperation = "multiply";
    }
  }

  sendMetrics() {
    sendEvent("draw", "highlight");
  }

  reset() {
    this.clearRect();
    previousPosition = null;
    points = [];
  }
};

function isWhite(color) {
  if (color === "rgb(255, 255, 255)"
      || color === "#FFF") {
    return true;
  }
  return false;
}

function getClassNamesByColor(color) {
  if (isWhite(color)) {
    return "highlighter white";
  }
  return "highlighter";
}
