/* Headless server, for use with Pageshot:
 * https://github.com/mozilla-services/pageshot
 * relies on the server module from mozilla testing
 * TODO: add link
 *
 * Accepts requests on the assigned port, from allowed IPs, and runs the given
 * function
 * usage to send a URL: 
 * TODO update this
 * curl --data 'http://www.asdf.com' -H 'Expect:' localhost:7777
 *
 * The server takes the following args, more info can be found in server.js:
 *    port:        port to listen on, integer
 *    allowedIPs   list of IPs to allow to talk to the server, space or comma separated string
 *    callback     function to be called on the data passed to the
 *    let blah = new Server(port, allowedIPs, callback)
 */

const { Cu } = require("chrome");
const tabs = require("sdk/tabs");
const { randomString } = require("./randomstring");

const { autoShot, RANDOM_STRING_LENGTH, urlDomainForId } = require("./shooter");
const { nsHttpServer } = Cu.import("file:///home/ben/dev/repos/xss/pageshot/addon/lib/httpd.js");


var backend;
var port = 7777;

exports.init = function init(prefs) {
  console.info("starting headless server");
  // set global backend, extractTab needs it
  backend = prefs.backend;
  var server = new nsHttpServer();
  server.start(port);
  server.registerPathHandler('/', handleRequest);
  console.info("headless server listening on PORT".replace('PORT', port));
};

function handleRequest(request, response)
{
  response.setStatusLine("1.1", 200, "OK");
  response.setHeader("Connection", "KeepAlive", false);

  var url = request._queryString;
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url);
  console.log('recieved request: URL -> BACK'
                .replace('URL', url)
                .replace('BACK', backendUrl)
              );

  response.write(backendUrl);
  processTab(url, backendUrl);
}

function processTab(url, backendUrl) {
  // Opens a tab and registers extractTab to the load event
  tabs.open({
    "url": url,
    "onLoad": function (tab) {
      autoShot(tab, backend, backendUrl);
      tab.on("close", function (a) {
        console.log('completed processing BACK'.replace('BACK', backendUrl));
      });
    }
  });
}
