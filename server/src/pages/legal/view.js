/* globals location*/
const reactruntime = require("../../reactruntime");
const { Footer } = require("../../footer-view.js");
const React = require("react");

class Head extends React.Component {
  render() {
    return (
      <reactruntime.HeadTemplate {...this.props}>
        <link rel="stylesheet" href={this.props.staticLink("css/legal.css")} />
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
    return (
      <reactruntime.BodyTemplate {...this.props}>
        <div className="column-space full-height default-color-scheme">
          <div className="header">
            <h1><a href="/shots">Page Shot</a></h1>
          </div>
          <div className="responsive-wrapper flex-1">
            <h2>{this.props.title}</h2>
            <div dangerouslySetInnerHTML={{__html: this.props.content}} />
          </div>
          <Footer/>
        </div>
      </reactruntime.BodyTemplate>
    )
  }
}

exports.HeadFactory = React.createFactory(Head);
exports.BodyFactory = React.createFactory(Body);
