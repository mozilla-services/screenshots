/* globals location */
const reactruntime = require("../../reactruntime");
const React = require("react");

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

  render() {
    let children = [];
    for (let shot of this.props.shots) {
      children.push(this.renderShot(shot));
    }
    if (children.length === 0) {
      children = "You don't have any shots. Go create some.";
    }
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <form action="/shots" method="GET">
          <input type="text" name="q" placeholder="search" defaultValue={this.props.defaultSearch} style={{float: "right"}} />
        </form>
        <h1 style={{color: "#444", paddingLeft: "40px"}}>
          <img src={this.props.staticLink("img/pageshot.svg")} style={{height: "30px", width: "32px", marginRight: "10px"}} />
          PageShot</h1>
        <div id="shot-index">
          {children}
        </div>
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
        <div className="shot-image-container" style={{
          backgroundImage: `url(${imageUrl})`
        }}></div>
        <div className="title-container">
          <h2><a href={shot.viewUrl}>{shot.title}</a></h2>
          <div className="link-container">
            {favicon}
            <a href={shot.url}>
              {shot.urlDisplay}
            </a>
          </div>
        </div>
      </div>
    );
  }

  onOpen(url) {
    location.href = url;
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
