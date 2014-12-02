var self = require("sdk/self");
var tabs = require("sdk/tabs");

function newPageURL(backend, sourceURL) {
  var http = sourceURL.search(/^http:/i) != -1;
  var url = backend;
  url = url.replace(/\/*$/, "");
  url = url + "/newframe.html";
  if (http) {
    url = url.replace(/^https:/i, "http:");
  }
  return url;
}

function makeShot(backend) {
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
    url: newPageURL(backend, sourceTab.url),
    onOpen: function (destTab) {
      destTab.once("ready", function () {
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
