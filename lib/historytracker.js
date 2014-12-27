var tabs = require("sdk/tabs");

var lastActive;

tabs.on('open', function (tab) {
  tab.openedFrom = lastActive.id;
  tab.openedFromHistory = Array.prototype.slice(lastActive.history);
});

tabs.on("activate", function (tab) {
  lastActive = tab;
});

tabs.on("ready", function (tab) {
  var history = tab.history || [];
  // FIXME: would be nice to get favicon (but it's not a property):
  // See: https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/places_faviconx
  history.push({url: tab.url, title: tab.title});
  tab.history = history;
});
