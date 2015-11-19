/* Headless server, for use with Pageshot:
 * https://github.com/mozilla-services/pageshot
 * relies on the server module from AutoInstaller
 * https://github.com/palant/autoinstaller/blob/master/lib/server.js
 *
 * Accepts requests on the assigned port, from allowed IPs, and runs the given
 * function
 * usage to send a URL: 
 * curl --data 'http://www.asdf.com' -H 'Expect:' localhost:7777
 *
 * The server takes the following args, more info can be found in server.js:
 *    port:        port to listen on, integer
 *    allowedIPs   list of IPs to allow to talk to the server, space or comma separated string
 *    callback     function to be called on the data passed to the
 *    let blah = new Server(port, allowedIPs, callback)
 */

var port = 7777;
var allowedIPs = "127.0.0.1";
var callback = openTab;

const tabs = require("sdk/tabs");

const { Server } = require("./server");
const { autoShot } = require("./shooter");

var backend;


exports.init = function init(prefs) {
  console.info("starting headless server");
  // set global backend, extractTab needs it
  backend = prefs.backend;
  let server = new Server(port, allowedIPs, callback);
  console.info("headless server listening on PORT".replace('PORT', port));
};


function openTab(url) {
  // Opens a tab and registers extractTab to the load event
  tabs.open({
    "url": url,
    "onLoad": function (tab) {
      autoShot(tab, backend);
    }
  });
}
