/* globals module */
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
 *    Add preference for whether or not headless should run
 *    Reimplement contentServerString?
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
 *   curl 'http://localhost:10082/?http://www.asdf.com'
 *
 * You can also get the JSON without creating a resource, like:
 *   curl 'http://localhost:10082/data?url=http://yahoo.com'
 * This endpoint allows the query string arguments:
 *   url (make sure you URL-encode the URL!)
 *   inlineCss (=true to force inline CSS instead of loading external CSS)
 *   useReadability (=true to include the Readability extraction)
 *   allowUnknownAttributes (=true to not scrub data-*, etc, attributes)
 *   delayAfterLoad (=milliseconds to pause before capture)
 *   thumbnailWidth (=pixels of the fullscreenThumbnail width, 0 to not take a thumbnail)
 *
 * Usage without X:
 * To use this without X, start the server as normal. Then, in the bin/
 * directory, run `sh ephemeral-x.sh ./run-addon`.
 */

const { Cc, Ci, Cu } = require("chrome");
const tabs = require("sdk/tabs");

const HTTPD_MOD_URL = module.uri.replace("/headless.js", "/httpd.jsm");
const { nsHttpServer } = Cu.import(HTTPD_MOD_URL);

const { randomString } = require("./randomstring");
const { autoShot, RANDOM_STRING_LENGTH, urlDomainForId } = require("./shooter");
const { prefs } = require("sdk/simple-prefs");
const { setTimeout, clearTimeout } = require("sdk/timers");
const querystringParse = require("sdk/querystring").parse;

const DEFAULT_TIMEOUT = 30000; // 30 seconds

var ip = prefs.httpServerIp;
var port = prefs.httpServerPort;
var backend = prefs.backend;    // set global backend, handleRequest needs it

exports.init = function init() {
  /* Initializes the backend server, which listens for requests made to / and
   * passes them to the handleRequest function below
   */
  if (!prefs.startHttpServer) { return; }
  console.info(`starting headless server on http://${ip}:${port}`);
  var server = new nsHttpServer();
  if (ip != "localhost") { server.identity.add("http", ip, port); }
  server.start(port);
  server.registerPathHandler('/', handleRequest);
  server.registerPathHandler('/readable/', handleReadableRequest);
  server.registerPathHandler('/data/', handleDataRequest);
};

function handleRequest(request, response) {
  /* Takes a request from the server, makes the response asynchronous so the
   * client waits for a response, processes the query string from the request
   * as a URL with the function autoShot from shooter.js and finally returns a
   * URL which the processed content may be found at
   */
  response.processAsync();
  var url = request._queryString;
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url);
  console.log('recieved request: URL -> BACK'
                .replace('URL', url).replace('BACK', backendUrl));
  tabs.open({
    url: url,
    onLoad: function (tab) {
      autoShot({tab, backend, backendUrl, save: true});
      tab.on("close", function (a) {
        console.log(`completed processing ${backendUrl}`);
        response.setStatusLine("1.1", 200, "OK");
        response.write(backendUrl + '\n');
        response.finish();
      });
    }
  });
}

function toBool(value, defaultValue) {
  if (value === undefined) {
    return defaultValue;
  }
  if (value === 'false' || value === 'no' || value === '0' || value === 'off') {
    value = false;
  }
  return !! value;
}

function handleDataRequest(request, response) {
  /* Takes a request from the server, makes the response asynchronous so the
   * client waits for a response, processes the query string from the request
   * as a URL with the function autoShot from shooter.js and finally returns
   * the JSON for the shot (this does NOT save the shot)
   */
  let prefs = require("sdk/simple-prefs").prefs;
  response.processAsync();
  let query = querystringParse(request._queryString);
  let url = query.url;
  if (! url) {
    response.setStatusLine("1.1", 400, "Bad Request");
    response.write("No ?url= parameter");
    response.finish();
    return;
  }
  let inlineCss = toBool(query.inlineCss, prefs.inlineCss);
  let debugInlineCss = toBool(query.debugInlineCss, false);
  let useReadability = toBool(query.useReadability, prefs.useReadability);
  let allowUnknownAttributes = toBool(query.allowUnknownAttributes, false);
  let delayAfterLoad = query.delayAfterLoad ? parseInt(query.delayAfterLoad, 10) : 0;
  let timeout = query.timeout ? parseInt(query.timeout, 10) : DEFAULT_TIMEOUT;
  let thumbnailWidth = query.thumbnailWidth ? parseInt(query.thumbnailWidth, 10) : undefined;
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url);
  console.log('recieved request: URL -> BACK'
                .replace('URL', url).replace('BACK', backendUrl));
  let failed = false;
  let timeoutId;
  if (timeout) {
    timeoutId = setTimeout(() => {
      response.setStatusLine("1.1", 502, "Bad Gateway");
      response.write("Error: timed out after " + (delayAfterLoad + timeout));
      response.finish();
      failed = true;
    }, delayAfterLoad + timeout);
  }
  tabs.open({
    url: url,
    onLoad: function (tab) {
      if (failed) {
        tab.close();
        return;
      }
      clearTimeout(timeoutId);
      sleep(delayAfterLoad).then(() => {
        return autoShot({
          tab,
          backend,
          backendUrl,
          inlineCss,
          debugInlineCss,
          useReadability,
          thumbnailWidth,
          allowUnknownAttributes,
          save: false
        });
      }).then((shot) => {
        console.log(`completed processing ${backendUrl}`);
        response.setStatusLine("1.1", 200, "OK");
        let data = JSON.stringify(shot.asJson());
        data = data.replace(
          /[\u0080-\uffff]/g,
          function (s) {
            let n = s.charCodeAt(0).toString(16);
            while (n.length < 4) {
              n = "0" + n;
            }
            return "\\u" + n;
          }
        );
        response.write(data);
        response.finish();
      }).catch((e) => {
        response.setStatusLine("1.1", 500, "Error");
        response.write("Error: " + e);
        response.finish();
      });
    }
  });
}

function sleep(milliseconds) {
  if (! milliseconds) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

function handleReadableRequest(request, response) {
  var fired = false;        // Assign local variable fired, because onload gets tricky
  response.processAsync();  // Tell response handler this is going to take a while
  var url = request._queryString; // Grab the passed URL
  var backendUrl = randomString(RANDOM_STRING_LENGTH) + "/" + urlDomainForId(url); // Create backend url, usually happens in shooter.js
  console.log(`recieved request: ${url} -> ${backendUrl}`);
  tabs.open({                   // Open a tab
    url: url,
    onOpen: function (tab) {  // When the tab opens, run this on it
      tab.on("load", function (tab) {
        if (!fired) {           // If it hasn't fired, click on readable button
          fired = true;
          var wm = Cc["@mozilla.org/appshell/window-mediator;1"]
                             .getService(Ci.nsIWindowMediator);
          var browserWindow = wm.getMostRecentWindow("navigator:browser");
          browserWindow.document.getElementById("reader-mode-button").click();
        } else {                // If it has fired, remove the toolbar
          var worker = tab.attach({
            contentScript: `
              var toolbar = document.getElementById("reader-toolbar");
              toolbar.parentElement.removeChild(toolbar);
              self.port.emit("done");`
          });
          worker.port.on("done", function () { // When the worker emits done, wait a bit then fire autoshot
            console.log('readability should be finished');
            // Sleep is required because if you fire autoShot immediately the DOM comes up empty
            sleep(prefs.readableSleep).then(() => {
              autoShot({tab, backend, backendUrl, save: true});
            });
          });
        }
      });

      tab.on("close", function () {     // When the tab is closed we know autoshot is done, so return the URL
        console.log(`completed processing ${backendUrl}`);
        response.setStatusLine("1.1", 200, "OK");
        response.write(backendUrl + '\n');
        response.finish();
      });
    }
  });
}
