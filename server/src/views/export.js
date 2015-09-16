const React = require("react");
const { Shell } = require("./shell");
const { addReactScripts } = require("../reactutils");

class Confirm extends React.Component {

  render() {
    let body = this.renderBody();
    return <Shell title="Export your Shots" staticLink={this.props.staticLink} gaId={this.props.gaId}>
      <head></head>
      {body}
    </Shell>;
  }

  renderBody() {
    let deletedMsg;
    if (this.props.deleted) {
      deletedMsg = <p>
        Your shot export zip file has been deleted.
      </p>;
    }
    return <body>
      <div id="container">
        <h1>Start PageShot export/backup</h1>
        { deletedMsg }
        <p>This will create a zip file with all of your shots.</p>
        <div>
          <form action="./export" method="POST">
            <button type="submit" className="button">Start export process</button>
          </form>
        </div>
      </div>
    </body>;
  }
};

let ConfirmFactory = React.createFactory(Confirm);

class Status extends React.Component {

  render() {
    let body = this.renderBody();
    return <Shell title="Shot export" staticLink={this.props.staticLink} gaId={this.props.gaId}>
      <head></head>
      {body}
    </Shell>;
  }

  renderBody() {
    if (this.props.wgetStatus.zip) {
      return this.renderZip();
    } else {
      return this.renderWaiting();
    }
  }

  renderZip() {
    let size = Math.floor(this.props.wgetStatus.zip.size / 1000000);
    //let { TimeDiff } = require("./frame");
    let deleteTime = this.props.wgetStatus.zip.mtime + this.props.keepTime;
    let TimeDiff = require("./frame").TimeDiff;
    let diff = <TimeDiff date={deleteTime} simple={true} />;
    //deleteTime = <TimeDiff date={ deleteTime } />;
    return <body>
      <div id="container">
        <h1>Download Ready</h1>
        <p>
          Download: <a className="button" href="./download/pageshot-export.zip" download>pageshot-export.zip</a>
        </p>
        <p>
          The file is <strong>{size}MB</strong>
        </p>
        <div>
          <form action="/export/remove" method="POST">
            <button className="button" type="submit">Remove zip file from server</button>
          </form>
          <p>
            (This file will automatically be deleted one day after creation: { diff })
          </p>
        </div>
      </div>
    </body>;
  }

  renderWaiting() {
    return <body>
      <div id="container">
        <h1>Wait for export to be created...</h1>
        <p>Please stay on this page (which will keep checking for when your export is ready)</p>
        <script dangerouslySetInnerHTML={{__html: `
          setTimeout(function () {location.reload();}, 3000);
        `}} />
      </div>
    </body>
  }

};

let StatusFactory = React.createFactory(Status);

exports.render = function (req, res) {
  let params = {
    backend: req.backend,
    deleted: 'deleted' in req.query
  };
  let page = ConfirmFactory(Object.assign({}, params, {
    staticLink: req.staticLink
  }));
  let body = React.renderToString(page);
  body = addReactScripts(body);
  res.send(body);
};

exports.renderStatus = function (req, res) {
  let params = {
    backend: req.backend,
    wgetStatus: req.wgetStatus,
    keepTime: req.keepTime
  };
  let page = StatusFactory(Object.assign({}, params, {
    staticLink: req.staticLink
  }));
  let body = React.renderToString(page);
  body = addReactScripts(body);
  res.send(body);
};
