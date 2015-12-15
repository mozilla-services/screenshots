/* Headless server, for use with Pageshot:
 * https://github.com/mozilla-services/pageshot
 * relies on the server module from mozilla testing
 * TODO: add link
 *
 * Accepts requests on the assigned port, from allowed IPs, and runs the given
 * function
 * usage to send a URL: 
 * TODO update this
 * curl 'localhost:7777/?http://www.asdf.com' 
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
const { nsHttpServer } = Cu.import("file:///home/ben/dev/repos/pageshot/addon/lib/httpd.js");


var backend;
var port = 7777;

exports.init = function init(prefs) {
  console.info("starting headless server");
  // set global backend, processTab needs it
  backend = prefs.backend;
  var server = new nsHttpServer();
  server.start(port);
  server.registerPathHandler('/', handleRequest);
  server.registerPathHandler('/readable/', handleReadableRequest);
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function handleReadableRequest(request, response) {
  var fired = false;        // Assign local variable fired, because onload gets tricky
  response.processAsync();  // Tell response handler this is going to take a while
  var url = request._queryString; // Grab the passed URL 
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url); // Create backend url, usually happens in shooter.js
  console.log('recieved request: URL -> BACK'   // Log both URLs
                .replace('URL', url).replace('BACK', backendUrl));

  tabs.open({   // Open a tab
    "url": url,
    "onOpen": function (tab) {  // When the tab opens, run this on it
      tab.on("load", function (tab) { 
        if (!fired) {           // If it hasn't fired, click on readable button
          fired = true;
          var wm = Cc["@mozilla.org/appshell/window-mediator;1"]
                             .getService(Ci.nsIWindowMediator);
          var browserWindow = wm.getMostRecentWindow("navigator:browser");
          browserWindow.document.getElementById("reader-mode-button").click();
        } else {                // If it has fired, remove the toolbar
          var worker = tab.attach({
            contentScript:
              'var toolbar = document.getElementById("reader-toolbar");\n' +
              'toolbar.parentElement.removeChild(toolbar);\n' +
              'self.port.emit("done");'
          });
          worker.port.on("done", function () { // When the worker emits done, wait a bit then fire autoshot
            console.log('readability should be finished');
            sleep(500000);
            autoShot(tab, backend, backendUrl);
          });
        }
      });

      tab.on("close", function () {     // When the tab is closed we know autoshot is done, so return the URL
        console.log('completed processing BACK'.replace('BACK', backendUrl));
        response.setStatusLine("1.1", 200, "OK");
        response.write(contentServerString + backendUrl + '\n');
        response.finish();
      });
    }
  });
}

function handleRequest(request, response) {
  // Opens a tab and registers extractTab to the load event
  response.processAsync();
  var url = request._queryString;
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url);
  console.log('recieved request: URL -> BACK'
                .replace('URL', url).replace('BACK', backendUrl));
  tabs.open({
    "url": url,
    "onLoad": function (tab) {
      autoShot(tab, backend, backendUrl);
      tab.on("close", function (a) {
        console.log('completed processing BACK'.replace('BACK', backendUrl));
        response.setStatusLine("1.1", 200, "OK");
        response.write(contentServerString + backendUrl + '\n');
        response.finish();
      });
    }
  });
}
