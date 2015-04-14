/** Tracks the history of individual tabs

    Adds a `tab.history` attribute to SDK tabs, which is a list of:

        {url, title, time}

    Also adds `tab.openedFromHistory` which is a rough guess at any history
    that might have happened from a previous tab, when you do "open link in
    new tab"
    */
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
  history.push({url: tab.url, docTitle: tab.title, opened: Date.now()});
  tab.history = history;
});

for (let tab of tabs) {
  tab.history = tab.history || [];
  tab.history.push({url: tab.url, docTitle: tab.title, opened: Date.now()});
}
