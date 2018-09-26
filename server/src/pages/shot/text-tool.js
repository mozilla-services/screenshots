const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");
const { Selection } = require("../../../shared/selection");
const { ColorPicker } = require("./color-picker");

// Text input height is determined by text size and padding
// See frame.scss mixin type-box($size)
const TEXT_INPUT_PADDING = 4;

// Padding used by draggable div
const DRAG_DIV_PADDING = 10;

// Editor header height in pixel
const EDITOR_HEADER_HEIGHT = 100;

const FONT_STYLE = "sans-serif";
const FONT_WEIGHT = 900;
const INIT_FONT_SIZE = 36;

// Text Input drag limit from the edge of the canvas
const TEXT_DRAG_EDGE_LIMIT = 5;

let previousTextInputWidth;
let hasFirstInput;

let dragMouseDown = false;
let prevDragMousePos = null;

exports.TextTool = class TextTool extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
    this.textInput = React.createRef();

    this.canvasCssWidth = props.canvasCssWidth;
    this.canvasCssHeight = props.canvasCssHeight;

    const VISIBLE_HEIGHT = this.canvasCssHeight > window.innerHeight ? window.innerHeight - EDITOR_HEADER_HEIGHT :
                                                                       this.canvasCssHeight;

    const INIT_LEFT = Math.floor(this.canvasCssWidth / 2);
    const INIT_TOP = window.scrollY + Math.floor((VISIBLE_HEIGHT / 2) - ((INIT_FONT_SIZE) / 2) - TEXT_INPUT_PADDING);

    this.state = {
      left: INIT_LEFT,
      top: INIT_TOP,
      color: this.props.color,
      colorName: this.props.colorName,
      textSize: "large-text",
    };
  }

  componentDidMount() {
    // Set hidden div to placeholder text and has first input happened flag to false. hasFirstInput
    // is used in adjustX to avoid setting hidden div textContent to empty textInput value
    hasFirstInput = false;
    this.textInput.current.nextSibling.textContent = this.textInput.current.placeholder;
    this.textInput.current.focus();
    this.textInput.current.nextSibling.style.maxWidth = `${this.canvasCssWidth - 2 * TEXT_DRAG_EDGE_LIMIT}px`;
    this.adjustWidth();
    const maxLeft = this.getInputMaxLeft();
    const newLeft = clamp(this.state.left - this.textInput.current.clientWidth / 2 + TEXT_DRAG_EDGE_LIMIT, TEXT_DRAG_EDGE_LIMIT, maxLeft);
    this.setState({left: newLeft});

    previousTextInputWidth = this.textInput.current.clientWidth;
    if (this.props.toolbarOverrideCallback) {
      this.props.toolbarOverrideCallback();
    }
  }

  componentDidUpdate(oldProps, oldState) {
    if (oldState.textSize !== this.state.textSize) {
      this.props.toolbarOverrideCallback();
      this.adjustX();
    }
  }

  componentWillUnmount() {
    if (this.props.toolbarOverrideCallback) {
      this.props.toolbarOverrideCallback();
    }
  }

  render() {
    const textToolBox = this.renderTextBox();
    return <div
      ref={this.el}
      className={`text-tool-container centered`}
      style={{height: this.props.baseCanvas.style.height, width: this.props.baseCanvas.style.width}}>
      {textToolBox}
    </div>;
  }

  renderTextBox() {
    const dragDivTopPx = `${this.state.top - DRAG_DIV_PADDING}px`;
    const dragDivLeftPx = `${this.state.left - DRAG_DIV_PADDING}px`;
    const dragDivPadding = `${DRAG_DIV_PADDING}px`;

    const dragDivStyles = {
      position: "absolute",
      top: dragDivTopPx,
      left: dragDivLeftPx,
      padding: dragDivPadding,
      cursor: "move",
    };

    // Styles used by hidden div that is used to compute width of input
    // text for respective font-size
    const hiddenDivStyles = {
      position: "absolute",
      zIndex: "-999",
      visibility: "hidden",
    };

    return [
      <div key="drag" style={dragDivStyles} onMouseDown={this.onDragMouseDown.bind(this)}>
        <Localized id="textToolInputPlaceholder" attrs={{placeholder: true}}>
          <input type="text" id="text-input" ref={this.textInput} key="text" maxLength="1000" placeholder="Hello"
             onInput={this.onInput.bind(this)} className={`${this.state.textSize} ${this.state.colorName} text`}>
          </input>
        </Localized>
        <div id="text-width" style={hiddenDivStyles} className={`${this.state.textSize} text`} key="text-width"></div>
      </div>,
    ];
  }

  renderToolbar() {
    return <div className="editor-header"><div className="annotation-tools">
      <Localized id="annotationTextSize" attrs={{title: true}}>
        <select className={`text-select`} title="Text Size" onChange={this.onChangeTextSize.bind(this)} value={this.state.textSize}>
          <Localized id="textSizeSmall"><option value="small-text">Small</option></Localized>
          <Localized id="textSizeMedium"><option value="medium-text">Medium</option></Localized>
          <Localized id="textSizeLarge"><option value="large-text">Large</option></Localized>
        </select>
      </Localized>
      <ColorPicker activeTool={this.state.tool}
        setColorCallback={this.setColor.bind(this)}
        color={this.state.color} />
      <span className="annotation-divider"></span>
      <Localized id="textToolConfirmButton" attrs={{title: true}}>
        <button className={`button transparent confirm-text`} id="confirm-text" onClick={this.onClickConfirm.bind(this)} title="Confirm Text">Confirm</button>
      </Localized>
      <Localized id="textToolCancelButton" attrs={{title: true}}>
        <button className={`button transparent cancel-text`} id="cancel-text" onClick={this.onClickCancel.bind(this)} title="Cancel Text">Cancel</button>
      </Localized>
    </div></div>;
  }

  setColor(color, colorName) {
    this.setState({color, colorName});

    const txtInput = this.textInput.current;
    if (!this.isElementInViewPort(txtInput)) {
       txtInput.scrollIntoView({block: "center"});
    }
    txtInput.focus();
  }

  onDragMouseDown(e) {
    if (e.target === this.textInput.current) {
      return;
    }
    dragMouseDown = true;
    prevDragMousePos = this.captureMousePosition(e);
  }

  onMouseMove(e) {
    if (!dragMouseDown) {
      return;
    }

    const mousePos = this.captureMousePosition(e);
    const xDelta = mousePos.x - prevDragMousePos.x;
    const yDelta = mousePos.y - prevDragMousePos.y;

    const maxLeft = this.getInputMaxLeft();
    const maxTop =  this.canvasCssHeight - this.textInput.current.clientHeight - TEXT_DRAG_EDGE_LIMIT;

    const newLeft = clamp(this.state.left + xDelta, TEXT_DRAG_EDGE_LIMIT, maxLeft);
    const newTop = clamp(this.state.top + yDelta, TEXT_DRAG_EDGE_LIMIT, maxTop);
    this.setState({
      left: newLeft,
      top: newTop,
    });

    prevDragMousePos = mousePos;
  }

  onMouseUp(e) {
    dragMouseDown = false;
    prevDragMousePos = null;
  }

// TODO This also exist in drawing-tool.js and crop-tool.js. Move it to a shared
// space.
  captureMousePosition(e) {
    const boundingRect = this.el.current.getBoundingClientRect();
    return {
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    };
  }

  onClickConfirm(e) {
    // Exit if user doesn't enter any text
    if (!this.textInput.current.value) {
       if (this.props.cancelTextHandler) {
          this.props.cancelTextHandler();
        }
        sendEvent("cancel-text", "text-toolbar");
        return;
    }
    const styles = window.getComputedStyle(this.textInput.current);
    const FONT_SIZE = parseInt(styles["font-size"], 10);

    // Due to line-height differences of how fonts are rendered across platforms
    // adjust text y position to one-third of difference of line-height and font-size
    const ADJUST_VERTICAL_SHIFT = (parseFloat(styles["line-height"]) - FONT_SIZE) / 3;
    const x = this.state.left + parseFloat(styles["padding-left"]);
    const y = this.state.top + TEXT_INPUT_PADDING + parseFloat(styles["line-height"]) / 2 + ADJUST_VERTICAL_SHIFT;

    const textCanvas = document.createElement("canvas");
    textCanvas.width = this.props.baseCanvas.width;
    textCanvas.height = this.props.baseCanvas.height;
    const drawingContext = textCanvas.getContext("2d");

    drawingContext.scale(this.props.canvasPixelRatio, this.props.canvasPixelRatio);
    drawingContext.textBaseline = "middle";
    drawingContext.fillStyle = styles.backgroundColor;
    drawingContext.fillRect(this.state.left,
                            this.state.top,
                            this.textInput.current.clientWidth,
                            this.textInput.current.clientHeight);
    drawingContext.fillStyle = styles.color;
    drawingContext.font = `${FONT_WEIGHT} ${FONT_SIZE}px ${FONT_STYLE}`;
    drawingContext.fillText(this.textInput.current.value, x, y);

    const textSelection = new Selection(this.state.left,
                                        this.state.top,
                                        this.state.left + this.textInput.current.clientWidth,
                                        this.state.top + this.textInput.current.clientHeight);

    if (this.props.confirmTextHandler) {
      this.props.confirmTextHandler(textSelection, textCanvas);
    }
    sendEvent("confirm-text", "text-toolbar");
  }

  onClickCancel(e) {
    if (this.props.cancelTextHandler) {
      this.props.cancelTextHandler();
    }
    sendEvent("cancel-text", "text-toolbar");
  }

  onChangeTextSize(event) {
    const size = event.target.value;
    const txtInput = this.textInput.current;

    this.setState({textSize: size});
    if (!this.isElementInViewPort(txtInput)) {
       txtInput.scrollIntoView({block: "center"});
    }
    txtInput.focus();
  }

  onInput() {
    const txtInput = this.textInput.current;

    hasFirstInput = true;
    this.adjustX();
    if (!this.isElementInViewPort(txtInput)) {
       txtInput.scrollIntoView({block: "center"});
    }
  }

  adjustWidth() {
    const width = this.textInput.current.nextSibling.clientWidth;
    this.textInput.current.style.width = `${width}px`;
  }

  adjustX() {
    const styles = window.getComputedStyle(this.textInput.current);
    // Check for text input width not to exceed canvas width, if yes constraint
    // text input value to hidden div text content to stop additional text in the input box
    if ((this.textInput.current.value.length > this.textInput.current.nextSibling.textContent.length) &&
        (this.textInput.current.nextSibling.clientWidth >=
          this.canvasCssWidth - (2 * parseFloat(styles.paddingLeft)))) {
      this.textInput.current.value = this.textInput.current.nextSibling.textContent;
    } else if (hasFirstInput) {
        this.textInput.current.nextSibling.textContent = this.textInput.current.value;
    }

    this.adjustWidth();
    const widthDiff = this.textInput.current.clientWidth - previousTextInputWidth;
    const maxLeft = this.getInputMaxLeft();
    const newLeft = clamp(this.state.left - widthDiff / 2, TEXT_DRAG_EDGE_LIMIT, maxLeft);
    this.setState({left: newLeft});
    previousTextInputWidth = this.textInput.current.clientWidth;
  }

  isElementInViewPort(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= (EDITOR_HEADER_HEIGHT + rect.height) &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
  }

  getInputMaxLeft() {
    return this.canvasCssWidth - this.textInput.current.clientWidth - TEXT_DRAG_EDGE_LIMIT;
  }
};

exports.TextTool.propTypes = {
  baseCanvas: PropTypes.object,
  color: PropTypes.string,
  colorName: PropTypes.string,
  toolbarOverrideCallback: PropTypes.func,
  confirmTextHandler: PropTypes.func,
  cancelTextHandler: PropTypes.func,
  canvasPixelRatio: PropTypes.number,
  canvasCssWidth: PropTypes.number,
  canvasCssHeight: PropTypes.number,
};

// TODO This also exist in crop-tool.js.  Move it to a shared space.
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
