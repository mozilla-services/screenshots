let React = require("react");
const { Shell } = require("./shell");

class Main extends React.Component {
  render() {
    let productName = this.props.productName;
    return (
      <Shell title={productName} staticLink={this.props.staticLink}>
        <head>
        </head>
        <body>
          <div className="frontpage">
            <h1>{productName} <em>alpha</em></h1>

            <p>
              {productName} is an experiment
              by <a href="https://blog.mozilla.org/services/">Mozilla Cloud
              Services</a> and: <a href="mailto:ibicking@mozilla.com">Ian
              Bicking</a>, <a href="http://www.brampitoyo.com/">Bram Pitoyo</a>,
              and <a href="http://donovanpreston.blogspot.com/">Donovan Preston</a>.
              It takes shots of the webpage you are on -
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
          </div>
        </body>
      </Shell>);
  }
}

let MainFactory = React.createFactory(Main);

exports.render = function (req, res) {
  let page = MainFactory({staticLink: req.staticLink, productName: req.config.productName});
  let body = React.renderToString(page);
  body = '<!DOCTYPE html>\n' + body;
  res.send(body);
};
