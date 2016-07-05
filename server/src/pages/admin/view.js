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

        <fieldset>
          <legend>Retention:</legend>
          {this.renderRetention()}
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

  renderRetention() {
    return (
      <div>
        <h3>Total</h3>
        <table className="retention-stats">
          <tr>
            <td></td>
            <td>
              <RetentionLine retention={this.props.retention.total} />
            </td>
          </tr>
        </table>
        <h3>By month</h3>
        <RetentionByDate retentionDates={this.props.retention.byMonth} />
        <h3>By week</h3>
        <RetentionByDate retentionDates={this.props.retention.byWeek} />
      </div>
    );
  }
}

const bucketStyles = {
  0: {backgroundColor: "#000", color: "#fff"},
  1: {backgroundColor: "#333", color: "#fff"},
  2: {backgroundColor: "#363", color: "#fff"},
  3: {backgroundColor: "#393", color: "#fff"},
  5: {backgroundColor: "#f93", color: "#440"},
  7: {backgroundColor: "#f93", color: "#000"},
  14: {backgroundColor: "#ff0", color: "#440"},
  21: {backgroundColor: "#ff0", color: "#000"},
  30: {backgroundColor: "#9f0", color: "#440"},
  45: {backgroundColor: "#9f0", color: "#000"},
  60: {backgroundColor: "#4f0", color: "#440"},
  90: {backgroundColor: "#4f0", color: "#000"},
  120: {backgroundColor: "#0f0", color: "#440"},
  365: {backgroundColor: "#0f0", color: "#000"},
  3650: {backgroundColor: "#f00", color: "#000"}
};

class RetentionLine extends React.Component {
  render() {
    let width = 500;
    let keyWidth = 50;
    let total = 0;
    for (let key in this.props.retention) {
      total += this.props.retention[key];
    }
    let buckets = [];
    let keys = Object.keys(this.props.retention).map((n) => parseInt(n, 10));
    keys.sort((a, b) => a < b ? -1 : 1);
    for (let key of keys) {
      let value = this.props.retention[key];
      let px = Math.floor(width * value / total);
      let style = Object.assign({display: "inline-block"}, bucketStyles[key]);
      style.width = px + "px";
      buckets.push(
        <span key={key} style={style} title={`${key} days: ${value}`}>&nbsp;{value}</span>
      );
    }
    return (
      <div style={{width: (width + keyWidth) + "px"}}>
        <span style={{width: keyWidth + "px", display: "inline-block"}}>
          &nbsp;{total}:
        </span>
        {buckets}
      </div>
    );
  }
}

class RetentionByDate extends React.Component {
  render() {
    let dates = Object.keys(this.props.retentionDates);
    dates.sort().reverse();
    let renderedDates = [];
    function formatDate(dateString) {
      //let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //let thisYear = (new Date()).getYear();
      return dateString;
    }
    for (let date of dates) {
      renderedDates.push(<tr key={date}>
        <td>{formatDate(date)}</td>
        <td><RetentionLine retention={this.props.retentionDates[date]} /></td>
      </tr>);
    }
    return (
      <table className="retention-stats">
        {renderedDates}
      </table>
    );
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
