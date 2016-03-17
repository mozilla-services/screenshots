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
            Users with shots made in the last <input type="number" min="1" ref="lastShotTime" onChange={this.onChangeLastShotTime.bind(this)} defaultValue={this.props.lastShotTimeDays} /> days: <strong>{this.props.lastShotCount}</strong>
          </div>
        </fieldset>

        <fieldset>
          <legend>Number of shots made:</legend>
          <div>
            Number of clients that have shots in the last <input type="number" min="1" ref="numberOfShotsTime" onChange={this.onChangeNumberOfShotsTime.bind(this)} defaultValue={this.props.numberOfShotsTime} /> days:
            {this.renderNumberOfShots()}
          </div>
        </fieldset>
      </reactruntime.BodyTemplate>
    );
  }

  renderNumberOfShots() {
    let buckets = this.props.numberOfShotsBuckets;
    let nums = Object.keys(buckets).map((n) => parseInt(n, 10)).sort((a, b) => a > b ? -1 : -1);
    let max = Math.max.apply(null, Object.keys(buckets).map((n) => buckets[n]));
    let bucketDivs = [];
    for (let num of nums) {
      bucketDivs.push(
        <div key={num}>
          <span style={{width: "8em", display: "inline-block"}}>at least {num}:</span>
          <span style={{width: "4em", display: "inline-block"}}>{buckets[num]}</span>
          <span style={{width: `${buckets[num]*200/max}px`, display: "inline-block", backgroundColor: "#d00", height: "0.8em"}}></span>
        </div>
      );
    }
    return <div style={{padding: "10px"}}>
      {bucketDivs}
    </div>;
  }

  onChangeLastShotTime(event) {
    let value = parseFloat(this.refs.lastShotTime.getDOMNode().value);
    window.controller.onChangeLastShotTime(value);
  }

  onChangeNumberOfShotsTime(event) {
    let value = parseFloat(this.refs.numberOfShotsTime.getDOMNode().value);
    window.controller.onChangeNumberOfShotsTime(value);
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
