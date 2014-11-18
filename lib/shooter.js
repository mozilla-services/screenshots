var self = require("sdk/self");
var tabs = require("sdk/tabs");
var { prefs } = require('sdk/simple-prefs');

function newPageURL() {
  var url = prefs.backend;
  url = url.replace(/\/*$/, "");
  url = url + "/newpage.html";
  return url;
}

function makeShot() {
  var sourceTab = tabs.activeTab;
  var worker = sourceTab.attach({
    contentScriptFile: [self.data.url("make-static-html.js"), self.data.url("extract.js")]
  });
  var extractedData;
  worker.port.on("data", function (data) {
    extractedData = data;
    sendData();
  });
  var destWorker;
  var destWorkerReady = false;
  tabs.open({
    url: newPageURL(),
    onOpen: function (destTab) {
      destTab.on("ready", function () {
        destWorker = destTab.attach({
          contentScriptFile: [self.data.url("inject.js")]
        });
        destWorker.port.on("ready", function () {
          destWorkerReady = true;
          sendData();
        });
      });
    }
  });
  function sendData() {
    if (extractedData && destWorker && destWorkerReady) {
      destWorker.port.emit("data", extractedData);
    }
  }
}

exports.makeShot = makeShot;
