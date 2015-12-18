/* Headless server, for use with Pageshot:
 *  https://github.com/mozilla-services/pageshot
 * Relies on the server module from mozilla testing:
 *  http://mxr.mozilla.org/mozilla-central/source/netwerk/test/httpserver/
 *
 * Listening IP address may be assigned to httpd, by default it is localhost. 
 * The default is used in this implementation.
 *    For more info:
 *    http://mxr.mozilla.org/mozilla-central/source/netwerk/test/httpserver/nsIHttpServer.idl#282
 *
 * TODO:
 *    Documentation
 *    Check URL before opening
 *    Fix autoShot - currently it leaves some errors about attrs
 * 
 * General usage: 
 * When you make an HTTP request to this server on the appropriate port it will
 * look for a query string and attempt to open the string as a URL, return a
 * URL of where to find it when processing is done, and process the tab with
 * an automatic shot function.
 *
 * Generally CSS parsing is enabled on this branch, which is EXPERIMENTAL.
 *
 * Syntax, assuming default IP, PORT, and target URL of asdf.com:
 *    curl 'http://localhost:10082/?http://www.asdf.com' 
 *
 */

const { Cc, Ci, Cu } = require("chrome");
const tabs = require("sdk/tabs");

const { randomString } = require("./randomstring");
const { autoShot, RANDOM_STRING_LENGTH, urlDomainForId } = require("./shooter");

console.log("IMPORTING HTTPD");
const self = require("sdk/self");
const httpdUri = self.data.url("../lib/httpd.js"); //http://mxr.mozilla.org/mozilla-central/source/netwerk/test/httpserver/httpd.js
console.log(httpdUri);
// Loads find in a new tab, displaying contents
tabs.open(httpdUri);
// Works
const { nsHttpServer } = Cu.import("file:///home/ben/dev/repos/pageshot/addon/lib/httpd.js");
// Doesn't work
//const { nsHttpServer } = Cu.import(httpdUri); //resource://jid1-neeaf3sahdkhpa-at-jetpack/lib/httpd.js


var backend;
var port = 10082;
var contentServerString = "http://localhost:10081/content/";

exports.init = function init(prefs) {
  console.info("starting headless server on PORT".replace('PORT', port));
  backend = prefs.backend;          // set global backend, processTab needs it
  //var server = Components.classes["@mozilla.org/server/jshttp;1"]
                         //.createInstance(Components.interfaces.nsIHttpServer);
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

  tabs.open({                   // Open a tab
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
