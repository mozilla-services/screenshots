
let React = require("react"),
  Router = require("react-router"),
  RouteHandler = Router.RouteHandler;

export class Shell extends React.Component {
  render() {
    let ogImage = [];
    if (this.props.shot) {
      for (let clipId in this.props.shot.clips) {
        let clip = this.props.shot.clips[clipId];
        if (clip.image) {
          let clipUrl = this.props.backend + "/clip/" + this.props.id + "/" + clipId;
          ogImage.push(<meta property="og:image" content={clipUrl} />);
          if (clip.image.dimensions) {
            ogImage.push(<meta property="og:image:width" content={clip.image.dimensions.x} />);
            ogImage.push(<meta property="og:image:height" content={clip.image.dimensions.y} />);
          }
        }
      }
    }
    let ogTitle = "";
    if (this.props.shot.ogTitle) {
      ogTitle = <meta propery="og:title" content={this.props.shot.ogTitle} />;
    }
    return <html prefix="og: http://ogp.me/ns#">
      <head>
        <title>
          PageShot
        </title>
        <meta property="og:type" content="website" />
        {ogTitle}
        {ogImage}
        <script src={ this.props.linkify("/js/server-bundle.js") } />
        <link rel="stylesheet" href={ this.props.linkify("/css/styles.css") } />
        <link rel="stylesheet" href={ this.props.linkify("/css/login.css") }/>
      </head>
      <body>
        <RouteHandler {...this.props} />
      </body>
    </html>;
  }
}
