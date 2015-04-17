let React = require("react");

exports.Frame = React.createClass({
  render: function () {
    if (this.props.data === null) {
      return <div>Not Found</div>;
    }

    let favicon = "";
    if (this.props.shot.favicon) {
      favicon = <link rel="shortcut icon" href={this.props.shot.favicon} />;
    }

    let snippet = "",
      clipNames = this.props.shot.clipNames();

    if (clipNames.length) {
      snippet = this.props.shot.getClip(clipNames[0]).image.url;
    }

    let linkTextShort = "";
    if (this.props.shot.url) {
      let txt = this.props.shot.url;
      if (txt.length > 50) {
        txt = txt.slice(0, 50) + '...';
      }
      linkTextShort = txt;
    }

    return <div id="container">
      <script src={ this.props.linkify("/js/parent-helper.js") } />
      { favicon }
      <div id="toolbar">
        <div className="logged-out" id="login-widget">
          <div id="login-dropdown" className="login-collapsed">
            <div id="login-compact">
              <img src="https://pageshotpages.appspot.com/static/default-profile.svg" id="login-drop" className="user-avatar" style={{height: "20px", width: "20px"}} />
            </div>
            <div id="login-dropped">
              <img src="https://pageshotpages.appspot.com/static/default-profile.svg" className="user-avatar" style={{height: "50px", width: "50px"}} />
              <div className="if-logged-in">
                <span className="user-email">-</span>
                <br />
                <span id="logout">logout</span>
              </div>
              <div className="if-logged-out">
                Log in:
                <input id="log-in-email" placeholder="email" type="text" />
              </div>
            </div>
          </div>
        </div>
        <a className="main-link" href={ this.props.shot.url }>
          { linkTextShort }
          <img src={ this.props.linkify("/img/clipboard-8-xl.png") } />
        </a>
      </div>
      <h1 id="main-title">{this.props.shot.docTitle || this.props.shot.url}</h1>
      <img src={snippet} style={{width: "100%"}} />
      <iframe width="100%" id="frame" src={"/content/" + this.props.identifier} />
    </div>;
  }
});

