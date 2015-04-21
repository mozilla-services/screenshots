let React = require("react");

exports.Main = React.createClass({
  render: function () {
    return (
      <div className="frontpage">
        <h1>Pageshot</h1>

        <p>
          PageShot is an experiment
          by <a href="https://blog.mozilla.org/services/">Mozilla Cloud
          Services</a> and <a href="mailto:ibicking@mozilla.com">Ian
          Bicking</a>.  It will take shots of the webpage you are on -
          creating a static and stable version of the page that you can
          share with anyone.  The original page can disappear, you can
          take shots of dynamic web applications, you can take shots of
          sites that require authentication or are personalized, and
          whoever you share with will see the page the same way you do.
        </p>

        <p>
          To use this service, download the <a href="https://pageshot.dev.mozaws.net/xpi/pageshot.xpi">Firefox Add On</a>
        </p>

        <p>
          You should be using Firefox <b>Nightly or Aurora (Developer Edition)</b>.
        </p>

        <p>
          This is on <a href="https://github.com/mozilla-services/pageshot">Github</a>
        </p>
      </div>);
  }
});
