var tabs = require("sdk/tabs");

var lastActives = [];

tabs.on('open', function (tab) {
  var last;
  if (lastActives[1] && lastActives[1] != tab) {
    last = lastActives[1];
  } else if (lastActives[0] && lastActives[0] != tab) {
    last = lastActives[0];
  }
  if (last) {
    tab.openedFrom = last.id;
    tab.openedFromHistory = last.history.slice();
  }
});

tabs.on("activate", function (tab) {
  lastActives[0] = lastActives[1];
  lastActives[1] = tab;
});

tabs.on("ready", function (tab) {
  var history = tab.history || [];
  // FIXME: would be nice to get favicon (but it's not a property):
  // See: https://developer.mozilla.org/en-US/Add-ons/SDK/Low-Level_APIs/places_faviconx
  if (history.length && history[history.length-1].url == tab.url) {
    // Duplicate item in history
    return;
  }
  history.push({url: tab.url, title: tab.title, time: Date.now()});
  tab.history = history;
});

for (let tab of tabs) {
  tab.history = tab.history || [];
  tab.history.push({url: tab.url, title: tab.title, time: Date.now()});
}
