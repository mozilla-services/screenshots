let React = require("react");

exports.Content = React.createClass({
  render: function () {

    return <div>
      <script src={ this.props.linkify("/js/content-helper.js") } />
      <div dangerouslySetInnerHTML={{__html: this.props.data.head}}>
      </div>
      <div className="white-background" dangerouslySetInnerHTML={{__html: this.props.data.body}}>
      </div>
    </div>;
  }
});


