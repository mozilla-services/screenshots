const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");

exports.ColorPicker = class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.clickMaybeClose = this.clickMaybeClose.bind(this);
    this.keyMaybeClose = this.keyMaybeClose.bind(this);
    this.state = {
      pickerActive: false,
      color: props.color || "#000"
    };
    this.elRef = React.createRef();
  }

  render() {
    return <div id="color-button-container" ref={this.elRef}>
      <button className="color-button" id="color-picker"
        onClick={this.onClickColorPicker.bind(this)} title="Color Picker"
        style={{ backgroundColor: this.state.color, border: "2px solid #D4D4D4" }}></button>
      <div id="color-button-highlight" />
      {this.state.pickerActive ? this.renderColorBoard() : null}
    </div>;
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

  UNSAFE_componentWillReceiveProps() {
    this.setState({pickerActive: false});
  }

  componentWillUnmount() {
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
    if (this.elRef.current
        && (this.elRef.current === el || this.elRef.current.contains(el))) {
      return true;
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
    </div>;
  }

  onClickSwatch(e) {
    const color = e.target.style.backgroundColor;
    const title = e.target.title.toLowerCase().replace(/\s/g, "-");
    this.setState({color, pickerActive: false});
    this.props.setColorCallback && this.props.setColorCallback(color);
    sendEvent(`${title}-select`, "annotation-color-board");
  }

  onClickColorPicker() {
    const pickerActive = !this.state.pickerActive;
    this.setState({pickerActive});
    sendEvent("color-picker-select", "annotation-toolbar");
  }
};

exports.ColorPicker.propTypes = {
  color: PropTypes.string,
  setColorCallback: PropTypes.func
};
