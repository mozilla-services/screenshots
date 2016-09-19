/* globals location, controller, sendEvent */
const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
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
        <div className="column-space full-height default-color-scheme">
          <div id="shot-index-header" className="header">
            <h1><a href="/shots">Page Shot</a></h1>
            <form onSubmit={ this.onSubmitForm.bind(this) }>
              <span className="search-label" />
              <input type="text" id="search" ref="search" placeholder="search my shots" defaultValue={this.state.defaultSearch} onChange={this.onChangeSearch.bind(this)} />
              <button title="search"></button>
            </form>
          </div>
          <div id="shot-index" className="flex-1">
            <div className="responsive-wrapper row-wrap">
              {children}
            </div>
          </div>
          <Footer forUrl="shots" />
        </div>
      </reactruntime.BodyTemplate>
    );
  }

  renderNoShots(msg) {
    return (
      <div className="large-icon-message-container" key="no-shots-found">
        <div className="large-icon logo" />
        <div className="large-icon-message-string">{msg}</div>
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
          <div className="shot-url">
            {shot.urlDisplay}
          </div>
        </div>
        <div className="inner-border"/>
      </a>
    );
  }

  onOpen(url, event) {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      // Don't override what might be an open-in-another-tab click
      sendEvent("goto-shot", "myshots-tile-new-tab", {useBeacon: true});
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
      sendEvent("clear-search/submit");
    }
    controller.onChangeSearch(val);
  }

  onChangeSearch() {
    let val = ReactDOM.findDOMNode(this.refs.search).value;
    this.setState({defaultSearch: val});
    if (! val) {
      sendEvent("clear-search/keyboard");
      controller.onChangeSearch(val);
    }
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
