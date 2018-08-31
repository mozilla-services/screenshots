const { DrawingTool } = require("./drawing-tool");
const sendEvent = require("../../browser-send-event.js");

let previousPosition;

exports.PenTool = class PenTool extends DrawingTool {
  constructor(props) {
    super(props);
    this.state = {
      strokeStyle: props.color || "#000",
      lineWidth: props.lineWidth || 5,
      classNames: "pen",
    };
  }

  setDrawingProperties() {
    this.drawingContext.globalCompositeOperation = "source-over";
    this.drawingContext.strokeStyle = this.state.strokeStyle;
    this.drawingContext.lineWidth = this.state.lineWidth;
    this.drawingContext.lineCap = "round";
  }

  draw(position) {
    if (!previousPosition) {
      previousPosition = position;
    }
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(previousPosition.x, previousPosition.y);
    this.drawingContext.lineTo(position.x, position.y);
    this.drawingContext.stroke();
    previousPosition = position;
  }

  sendMetrics() {
    sendEvent("draw", "pen");
  }

  reset() {
    this.clearRect();
    previousPosition = null;
  }
};
