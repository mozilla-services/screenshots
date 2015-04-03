let React = require("react");

exports.Content = React.createClass({
  render: function () {

    return <div>
      <script src={"/js/content-helper.js?git_revision=" + this.props.git_revision } />
      <div dangerouslySetInnerHTML={{__html: this.props.data.head}}>
      </div>
      <div className="white-background" dangerouslySetInnerHTML={{__html: this.props.data.body}}>
      </div>
    </div>;
  }
});


