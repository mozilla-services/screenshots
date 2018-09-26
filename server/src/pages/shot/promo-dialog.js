const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");
const sendEvent = require("../../browser-send-event.js");

exports.PromoDialog = class PromoDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.display) {
      return <div id="promo-dialog-panel" className="promo-panel" >
        <Localized id="promoCloseButton" attrs={{title: true}}>
          <a className="box-close" title="Close notification" onClick={this.closePanel.bind(this)}></a>
        </Localized>
        <Localized id="promoTitle">
          <h4 className="title">Take Note!</h4>
        </Localized>
        <Localized id="promoMessage">
          <p className="message">
            Updated editing tools let you crop, highlight, and even add text to your shot.
          </p>
        </Localized>
        <p className="message">✨<Localized id="promoLink"><span className="message-text">Give them a try</span></Localized>✨</p>
      </div>;
    }
    return null;
  }

  closePanel(event) {
    this.props.promoClose();
    sendEvent("promo-closed");
  }
};

exports.PromoDialog.propTypes = {
  display: PropTypes.bool,
  promoClose: PropTypes.func,
};
