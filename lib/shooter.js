var self = require("sdk/self");
var tabs = require("sdk/tabs");
var { captureTab } = require("./screenshot.js");
var notifications = require("sdk/notifications");
var { Page } =require("sdk/page-worker");

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

function makeShot(backend, autoTag) {
  var sourceTab = tabs.activeTab;
  var worker = sourceTab.attach({
    contentScriptFile: [self.data.url("make-static-html.js"),
                        self.data.url("Readability.js"),
                        self.data.url("extract.js")]
  });
  var extractedData;
  var screenshot = captureTab(sourceTab, null, {h: 200, w: 350});
  worker.port.on("data", function (data) {
    data.screenshot = screenshot;
    data.autoTag = autoTag;
    extractedData = data;
    sendData();
  });
  var destWorker;
  var destWorkerReady = false;
  var newFrameUrl = newPageURL(backend, sourceTab.url);
  var destUrl;
  if (autoTag) {
    destWorker = Page({
      contentURL: newFrameUrl,
      contentScriptFile: [self.data.url("inject.js")],
      contentScriptWhen: "ready"
    });
    destWorker.port.on("ready", function() {
      destWorkerReady = true;
      sendData();
    });
    destWorker.port.on("hasUrl", function (url) {
      destUrl = url;
      notifications.notify({
        title: "Saved to #" + autoTag,
        text: "Click to open page",
        iconURL: self.data.url("icon.png"),
        onClick: function () {
          tabs.open({
            url: destUrl
          });
        }
      });
    });
    // FIXME: kill background worker
  } else {
    tabs.open({
      url: newFrameUrl,
      inBackground: !!autoTag,
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
  }
  function sendData() {
    if (extractedData && destWorker && destWorkerReady) {
      destWorker.port.emit("data", extractedData);
    }
  }
}

exports.makeShot = makeShot;
