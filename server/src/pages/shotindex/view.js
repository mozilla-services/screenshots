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
        children = `No shots matching "${this.props.defaultSearch}" found.`
      } else {
        children = "You don't have any shots.";
      }
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <form style={{ position: "absolute", right: "25px" }} onSubmit={ this.onSubmitForm.bind(this) }>
          <input type="text" ref="search" placeholder="search" defaultValue={this.state.defaultSearch} onChange={this.onChangeSearch.bind(this)} />
          <button>Search</button>
        </form>
        <h1 style={{color: "#444", paddingLeft: "40px"}}>
          <img src={this.props.staticLink("img/pageshot.svg")} style={{height: "30px", width: "32px", marginRight: "10px"}} />
          PageShot: My Shots</h1>
        <div id="shot-index">
          {children}
        </div>
        <Footer>
          <a href="/delete-account">Delete account / delete all shots</a>
        </Footer>
      </reactruntime.BodyTemplate>
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
      <div className="shot" key={shot.id} onClick={this.onOpen.bind(this, shot.viewUrl)}>
        <a href={shot.viewUrl} className="shot-image-container" style={{
          backgroundImage: `url(${imageUrl})`
        }}></a>
        <div className="title-container">
          <h2><a href={shot.viewUrl}>{shot.title}</a></h2>
          <div className="link-container">
            {favicon}
            <a href={shot.url} onClick={ this.onClickOrigUrl.bind(this) }>
              {shot.urlDisplay}
            </a>
          </div>
        </div>
      </div>
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

  onClickOrigUrl() {
    sendEvent("goto-original-url", "myshots-tile", {useBeacon: true});
    // Allow default action
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
