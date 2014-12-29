var self = require("sdk/self");
var tabs = require("sdk/tabs");
var { captureTab } = require("./screenshot.js");
var notifications = require("sdk/notifications");
var { Page } =require("sdk/page-worker");
var Request = require("sdk/request").Request;

var MIN_PAGE_VISIT_TIME = 5000; // 5 seconds

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

function processHistory(tab) {
  var seen = {};
  var history = [];

  function addHistory(histList, previousTab) {
    if (! histList) {
      return;
    }
    for (var i=0; i<histList.length; i++) {
      var item = histList[i];
      var next = histList[i+1];
      if (previousTab) {
        item = {};
        for (var name in histList[i]) {
          item[name] = histList[i][name];
        }
        item.previousTab = true;
      }
      if (item.url.indexOf("about:") == 0) {
        continue;
      }
      if (item.url == tab.url) {
        continue;
      }
      if (next && next.time - item.time < MIN_PAGE_VISIT_TIME) {
        continue;
      }
      if (item.title == item.url) {
        // Probably an item without a title
        // often this is a redirect of some sort, not a real page
        continue;
      }
      if (seen[item.url]) {
        continue;
      }
      seen[item.url] = true;
      history.push(item);
    }
  }

  addHistory(tab.openedFromHistory, true);
  addHistory(tab.history, false);
  return history;
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
    data.history = processHistory(sourceTab);
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
    // FIXME: it's crazy we use a worker, since we could do this all without any
    // HTML, just take the make-static-html output and send it to the server
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

// FIXME: Lame I'm doing this as a global, but eh
var inlineShotHistory = {};

// FIXME: this copies a lot of code from makeShot()
function inlineShot(backend, autoTag) {
  var sourceTab = tabs.activeTab;
  var sourceUrl = sourceTab.url;
  if (inlineShotHistory[sourceUrl]) {
    showPagePanel(inlineShotHistory[sourceUrl] + "?panel");
    return;
  }
  var worker = sourceTab.attach({
    contentScriptFile: [self.data.url("make-static-html.js"),
                        self.data.url("Readability.js"),
                        self.data.url("inline-extract.js")]
  });
  worker.port.on("hello", function () {
    worker.port.emit("config", {
      css: self.data.url("interface.css")
    });
  });
  var extractedData;
  var screenshot = captureTab(sourceTab, null, {h: 200, w: 350});
  var metaData = {};
  worker.port.on("requestSnippet", function (info) {
    metaData.snippet = captureTab(sourceTab, info);
    worker.port.emit("snippetCaptured", metaData.snippet);
  });
  worker.port.on("data", function (data) {
    data.screenshot = screenshot;
    data.history = processHistory(sourceTab);
    extractedData = data;
    sendData();
  });

  function sendData() {
    var url = backend + "/data/" + extractedData.id + "/" + extractedData.domain;
    Request({
      url: url,
      content: JSON.stringify(extractedData),
      onComplete: function (resp) {
        var url = backend + "/summary/" + extractedData.id + "/" + extractedData.domain;
        inlineShotHistory[sourceUrl] = url;
        // For some reason even though this has completed, the page will 404 without
        // a small pause:
        require("sdk/timers").setTimeout(function () {
          showPagePanel(url + "?panel");
        }, 100);
      }
    }).put();
    Request({
      url: backend + "/meta/" + extractedData.id + "/" + extractedData.domain,
      content: JSON.stringify(metaData)
    }).put();
  }

}

function showPagePanel(url) {
  var panel = require("sdk/panel").Panel({
    contentURL: url + "?panel"
  });
  panel.show({
    position: require("main").inlineButton
  });
}

exports.makeShot = makeShot;
exports.inlineShot = inlineShot;
