/* globals window */
const reactruntime = require("../../reactruntime");
const React = require("react");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("js/admin-bundle.js")}></script>
        <link rel="stylesheet" href={this.props.staticLink("css/admin.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {
  render() {
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <h1>Admin</h1>
        <fieldset>
          <legend>Recent users:</legend>
          <div>
            Users with shots made in the last <input type="number" ref="lastShotTime" onChange={this.onChangeLastShotTime.bind(this)} defaultValue={this.props.lastShotTimeDays} /> days: <strong>{this.props.lastShotCount}</strong>
          </div>
        </fieldset>
      </reactruntime.BodyTemplate>
    );
  }

  onChangeLastShotTime(event) {
    let value = parseFloat(this.refs.lastShotTime.getDOMNode().value);
    window.controller.onChangeLastShotTime(value);
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
