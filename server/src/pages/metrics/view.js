const reactruntime = require("../../reactruntime");
const React = require("react");
const PropTypes = require("prop-types");
const { Localized } = require("fluent-react/compat");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("/static/css/metrics.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}

Head.propTypes = {
  staticLink: PropTypes.func
};

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
      </reactruntime.BodyTemplate>
    );
  }

}

Body.propTypes = {
  data: PropTypes.object
};

class GenericTable extends React.Component {
  render() {
    const time = this.props.data.timeToExecute;
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
    const headers = [];
    for (const column of this.props.data.columns) {
      headers.push(<th key={column.title}>{column.title}</th>);
    }
    return <tr>
      {headers}
    </tr>;
  }

  renderTableRows() {
    const rows = [];
    let n = 0;
    for (const row of this.props.data.rows) {
      n++;
      const columns = [];
      for (let i = 0; i < row.length; i++) {
        let value = row[i];
        const meta = this.props.data.columns[i];
        if (meta.type) {
          if (meta.type === "date") {
            value = (new Date(value));
            value = value.toLocaleString(
              "en-US", {year: "numeric", month: "short", day: "numeric"});
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

GenericTable.propTypes = {
  data: PropTypes.object
};

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
