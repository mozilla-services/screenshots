const reactruntime = require("../../reactruntime");
const React = require("react");
const { Localized } = require("fluent-react/compat");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("/static/js/metrics-bundle.js")} async></script>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/metrics.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}

class Body extends React.Component {
  render() {
    let created = new Date(this.props.data.shotsCreatedByDay.created);
    created = created.toLocaleString();
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <Localized id="metricsPageHeader">
          <h1>Metrics</h1>
        </Localized>
        <Localized id="metricsPageGeneratedDateTime" $created={created}>
          <p>Generated at: {created}</p>
        </Localized>
        <GenericTable data={this.props.data.totals} />

        <GenericTable data={this.props.data.shotsCreatedByDay} />

        <GenericTable data={this.props.data.usersByDay} />

        <GenericTable data={this.props.data.shotsByUserHistogram} />

        <GenericTable data={this.props.data.retention} />

        <GenericTable data={this.props.data.retentionTotal} />
      </reactruntime.BodyTemplate>
    );
  }

}

class GenericTable extends React.Component {
  render() {
    let time = this.props.data.timeToExecute;
    return <div className="generic-table-section">
      <h2>{this.props.data.title}</h2>
      <p>{this.props.data.description}
        <Localized id="metricsPageDatabaseQueryTime" $time={time}>
          <span className="execution-time">(database time: {time}ms)</span>
        </Localized>
      </p>
      <table className="generic-table">
        <thead>
          {this.renderTableHeader()}
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>
    </div>;
  }

  renderTableHeader() {
    let headers = [];
    for (let column of this.props.data.columns) {
      headers.push(<th key={column.title}>{column.title}</th>);
    }
    return <tr>
      {headers}
    </tr>;
  }

  renderTableRows() {
    let rows = [];
    let n = 0;
    for (let row of this.props.data.rows) {
      n++;
      let columns = [];
      for (let i = 0; i < row.length; i++) {
        let value = row[i];
        let meta = this.props.data.columns[i];
        if (meta.type) {
          if (meta.type === "date") {
            value = (new Date(value));
            value = value.toLocaleString(
              "en-US", {year: 'numeric', month: 'short', day: 'numeric'});
          } else {
            console.warn("Unknown type:", meta.type);
          }
        }
        columns.push(<td key={i}>{value}</td>);
      }
      rows.push(<tr key={n}>{columns}</tr>);
    }
    return rows;
  }

}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
