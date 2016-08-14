/* globals location, controller, sendEvent */
const reactruntime = require("../../reactruntime");
const React = require("react");
const ReactDOM = require("react-dom");

class Head extends React.Component {

  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <script src={this.props.staticLink("js/shotindex-bundle.js")}></script>
        <link rel="stylesheet" href={this.props.staticLink("css/shot-index.css")} />
      </reactruntime.HeadTemplate>
    );
  }

}


class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {defaultSearch: props.defaultSearch};
  }

  render() {
    let children = [];
    for (let shot of this.props.shots) {
      children.push(this.renderShot(shot));
    }
    if (children.length === 0) {
      if (this.props.defaultSearch) {
        children.push(this.renderNoShots(`No shots matching "${this.props.defaultSearch}" found.`));
      } else {
        children.push(this.renderNoShots("Go forth and take shots!"));
      }
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-wrapper full-height">
          <div id="shot-index-header">
            <h1><a href="/shots">Page Shot</a></h1>
            <form onSubmit={ this.onSubmitForm.bind(this) }>
              <span className="search-label" />
              <input type="text" ref="search" placeholder="search my shots" defaultValue={this.state.defaultSearch} onChange={this.onChangeSearch.bind(this)} />
              <button title="search"></button>
            </form>
          </div>
          <div id="shot-index">
            <div className="responsive-wrapper row-wrap">
              {children}
            </div>
          </div>
          <div id="shot-index-footer">
            <div className="responsive-wrapper row-wrap">
              <a href="/terms">Terms of Service</a>
              <a href="/privacy">Privacy Notice</a>
            </div>
          </div>
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderNoShots(msg) {
    return (
      <div className="no-shots">
        <div className="large-icon" />
        <div className="no-shots-string">{msg}</div>
      </div>
    );
  }

  renderShot(shot) {
    let imageUrl;
    let clip = shot.clipNames().length ? shot.getClip(shot.clipNames()[0]) : null;
    if (clip && clip.image && clip.image.url) {
      imageUrl = clip.image.url;
    } else if (shot.images.length) {
      imageUrl = shot.images[0].url;
    } else if (shot.fullScreenThumbnail) {
      imageUrl = shot.fullScreenThumbnail;
    } else {
      imageUrl = this.props.staticLinkWithHost("img/question-mark.svg");
    }
    let favicon = null;
    if (shot.favicon) {
      // We use background-image so if the image is broken it just doesn't show:
      favicon = <div style={{backgroundImage: `url("${shot.favicon}")`}} className="favicon" />;
    }

    return (
      <a href={shot.viewUrl}  className="shot" key={shot.id} onClick={this.onOpen.bind(this, shot.viewUrl)}>
        <div className="shot-image-container" style={{
          backgroundImage: `url(${imageUrl})`
        }}></div>
        <div className="title-container">
          <h4>{shot.title}</h4>
        </div>
        <div className="link-container">
          {favicon}
          <div>
            {shot.urlDisplay}
          </div>
        </div>
        <div className="inner-border"/>
      </a>
    );
  }

  onOpen(url, event) {
    if (event.ctrlKey || event.metaKey) {
      // Don't override what might be an open-in-another-tab click
      return;
    }

    sendEvent("goto-shot", "myshots-tile", {useBeacon: true});
    location.href = url;
  }

  onSubmitForm(e) {
    e.preventDefault();
    let val = ReactDOM.findDOMNode(this.refs.search).value;
    if (val) {
      sendEvent("search");
    } else {
      sendEvent("clear-search");
    }
    controller.onChangeSearch(val);
  }

  onChangeSearch() {
    let val = ReactDOM.findDOMNode(this.refs.search).value;
    this.setState({defaultSearch: val});
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
