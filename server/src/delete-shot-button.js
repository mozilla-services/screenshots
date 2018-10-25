const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");

exports.DeleteShotButton = class DeleteShotButton extends React.Component {
  constructor(props) {
    super(props);
    this.elRef = React.createRef();
    this.trashButtonRef = React.createRef();
    this.state = {confirmationPanelOpen: false};
    this.maybeCloseDeleteConfirmation = this.maybeCloseDeleteConfirmation.bind(this);
  }

  componentDidUpdate() {
    if (this.state.confirmationPanelOpen) {
      document.addEventListener("mousedown", this.maybeCloseDeleteConfirmation);
    } else {
      document.removeEventListener("mousedown", this.maybeCloseDeleteConfirmation);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.maybeCloseDeleteConfirmation);
  }

  onClickDelete(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.clickDeleteHandler && this.props.clickDeleteHandler();
    this.setState({confirmationPanelOpen: true});
  }

  onConfirmDelete(e) {
    e.stopPropagation();
    this.props.confirmDeleteHandler && this.props.confirmDeleteHandler();
    this.setState({confirmationPanelOpen: false});
  }

  onCancelDelete(e) {
    e.stopPropagation();
    this.props.cancelDeleteHandler && this.props.cancelDeleteHandler();
    this.setState({confirmationPanelOpen: false});
  }

  maybeCloseDeleteConfirmation(e) {
    if (this.elRef.current === e.target || this.elRef.current.contains(e.target)) {
      return;
    }

    this.onCancelDelete(e);
  }

  render() {
    let rightAlign = "";
    if (this.trashButtonRef.current) {
      const boundingRect = this.trashButtonRef.current.getBoundingClientRect();
      if (document.dir === "rtl" && boundingRect.right < 320 ||
          document.dir === "ltr" && boundingRect.left + 320 > document.body.scrollWidth) {
        rightAlign = "right-align";
      }
    }

    let confirmationPanel = null, deletePanelOpenClass = null;
    if (this.state.confirmationPanelOpen) {
      confirmationPanel = <div className={`delete-confirmation-dialog ${rightAlign}`} ref={this.elRef}>
        <div className="triangle"><div className="triangle-inner"></div></div>
        <Localized id="shotDeleteConfirmationMessage">
        <div className="delete-confirmation-message">Are you sure you want to delete this shot?</div>
        </Localized>
        <div className="delete-confirmation-buttons">
          <Localized id="shotDeleteCancel" attrs={{title: true}}>
          <button className="button secondary" title="Cancel" onClick={ this.onCancelDelete.bind(this) }>Cancel</button>
          </Localized>
          <Localized id="shotDeleteConfirm" attrs={{title: true}}>
          <button className="button warning" title="Delete" onClick={ this.onConfirmDelete.bind(this) }>Delete</button>
          </Localized>
        </div>
      </div>;
      deletePanelOpenClass = "active";
    }

    let deleteButtonStyle = null;
    if (this.props.isIcon) {
      deleteButtonStyle = `button transparent icon-trash ${deletePanelOpenClass}`;
    } else {
      deleteButtonStyle = `button nav-button transparent ${deletePanelOpenClass}`;
    }

    return (
      <div className="delete-shot-button">
        <Localized id="shotPageDeleteButton" attrs={{title: true}}>
          <button className={deleteButtonStyle}
            title="Delete this shot permanently"
            onClick={this.onClickDelete.bind(this)}
            ref={this.trashButtonRef}>
            <img src={this.props.staticLink("/static/img/icon-trash.svg")} />
          </button>
        </Localized>
        { confirmationPanel }
      </div>
    );
  }
};

exports.DeleteShotButton.propTypes = {
  clickDeleteHandler: PropTypes.func,
  confirmDeleteHandler: PropTypes.func,
  cancelDeleteHandler: PropTypes.func,
  isIcon: PropTypes.bool,
  staticLink: PropTypes.func,
};
