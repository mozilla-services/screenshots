const self = require("sdk/self");
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require("sdk/panel");
const { watchFunction, watchWorker, unhandled } = require("./errors");
const ss = require("sdk/simple-storage");
const clipboard = require("sdk/clipboard");
const { AbstractShot } = require("./shared/shot");
const notifications = require("sdk/notifications");
const req = require("./req");

let hideInfoPanel = null;
let showTour = null;

const recallButton = ToggleButton({
  id: "pageshot-recall",
  label: "View your shots",
  icon: self.data.url("icons/library-empty.svg"),
  onChange: function (state) {
    if (state.checked) {
      hideInfoPanel();
      recallPanel.show();
    }
    req.sendEvent("addon", "click-recall-button");
  }
});

const recallPanel = Panel({
  contentURL: self.data.url("shoot-panel.html"),
  contentScriptFile: [self.data.url("panel-bundle.js")],
  contentScriptOptions: {
    type: "recall"
  },
  position: recallButton,
  height: 450,
  width: 400,
  onHide: function () {
    recallButton.state("window", {checked: false});
  }
});

watchWorker(recallPanel);

let panelReady = false;
let panelViewingId = null;
let panelViewingClips = {};

recallPanel.port.on("ready", watchFunction(function () {
  panelReady = true;
  sendIndex();
}));

recallPanel.port.on("showTour", watchFunction(function () {
  recallPanel.hide();
  showTour(true);
}));

recallPanel.port.on("copyLink", watchFunction(function (url) {
  if (typeof url != "string") {
    throw new Error("Got copyLink with non-string argument: " + url);
  }
  clipboard.set(url, "text");
  notifications.notify({
    title: "Link Copied",
    text: "The link to your shot has been copied to the clipboard.",
    iconURL: self.data.url("../data/copy.png")
  });
  req.sendEvent("addon", "click-recall-copy-link");
}));

recallPanel.port.on("openLink", watchFunction(function (url) {
  require("sdk/tabs").open(url);
  recallPanel.hide();
  req.sendEvent("addon", "click-recall-open-all-shot-list");
}));

recallPanel.port.on("selectClip", watchFunction(function (clipId) {
  panelViewingClips[panelViewingId] = clipId;
  sendShot();
  req.sendEvent("addon", "click-recall-select-clip");
}));

recallPanel.port.on("viewShot", watchFunction(function (id) {
  if (! id) {
    throw new Error("Bad viewShot id: " + id);
  }
  req.sendEvent("addon", "click-recall-panel-shot-detail");
  let backend = require("./main").getBackend();
  let url = backend + "/data/" + id;
  console.info("requesting", url);
  require("./req").request(url, {
  }).then((response) => {
    if (response.status === 404) {
      let origUrl = getOrigUrlForId(id) || backend + id;
      origUrl = origUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      unhandled({
        title: "Shot not found",
        message: "The shot has been lost",
        helpHtml: `
        We are sorry, the shot has been lost from the server.
        Go to <a target="_blank" href="${origUrl}">${origUrl}</a> to see the original page.
        `
      });
      return;
    }
    let json = response.json;
    if (! json) {
      console.error("No/null JSON received from server at:", url, "status:", response.status);
    }
    console.info("got viewShot data", Object.keys(json));
    console.info("clips:", Object.keys(json.clips));
    let clipId = Object.keys(json.clips)[0];
    if (clipId) {
      let clip = json.clips[clipId];
      console.info("clip", clipId, clip.image.url.length);
    }
    let shot = new AbstractShot(backend, id, json);
    panelViewingId = shot.id;
    panelViewingClips[shot.id] = shot.clipNames()[0];
    sendShot(shot);
  });
}));

recallPanel.port.on("viewRecallIndex", watchFunction(function () {
  panelViewingId = null;
  sendIndex();
  req.sendEvent("addon", "click-recall-panel-view-index");
}));

function sendIndex() {
  if (! panelReady) {
    return;
  }
  let backend = require("./main").getBackend();
  recallPanel.port.emit("recallIndex", {
    backend: backend,
    shots: ss.storage.recentShots || []
  });
}

function getOrigUrlForId(id) {
  for (let item of (ss.storage.recentShots || [])) {
    if (item.id === id) {
      return item.shot.url;
    }
  }
  return null;
}

let lastShot;

function sendShot(shot) {
  if (! panelReady) {
    return;
  }
  if (! shot) {
    shot = lastShot;
  }
  lastShot = shot;
  let backend = require("./main").getBackend();
  recallPanel.port.emit("recallShot", {
    backend: backend,
    id: shot.id,
    shot: shot.asJson(),
    activeClipName: panelViewingClips[shot.id]
  });
}

exports.addRecall = function (shot) {
  let shotJson = {
    id: shot.id,
    clipCount: Object.keys(shot._clips).length,
    shot: shot.asRecallJson()
  };
  let existing = ss.storage.recentShots || [];
  let found = false;
  for (let i=0; i<existing.length; i++) {
    try {
      new AbstractShot(require("./main").getBackend(), existing[i].id, existing[i].shot);
    } catch (e) {
      console.error("Bad shot; removing:", existing[i].id);
      existing.splice(i, 1);
      i--;
      continue;
    }
    if (existing[i].id == shotJson.id) {
      existing[i] = shotJson;
      found = true;
      break;
    }
  }
  if (! found) {
    existing.splice(0, 0, shotJson);
  }
  ss.storage.recentShots = existing;
  if (! panelViewingId) {
    sendIndex();
  }
  if (panelViewingId == shot.id) {
    sendShot(shot);
  }
};

exports.deleteEverything = function () {
  ss.storage.recentShots = [];
};

exports.initialize = function (hideIp, showTourFunc) {
  hideInfoPanel = hideIp;
  showTour = showTourFunc;
};
