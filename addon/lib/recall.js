const self = require("sdk/self");
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require("sdk/panel");
const { watchFunction, watchWorker } = require("./errors");
const ss = require("sdk/simple-storage");
const clipboard = require("sdk/clipboard");
const { AbstractShot } = require("./shared/shot");

const recallButton = ToggleButton({
  id: "pageshot-recall",
  label: "View your shots",
  icon: self.data.url("icons/icon-recall.png"),
  onChange: function (state) {
    if (state.checked) {
      recallPanel.show();
    }
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

recallPanel.port.on("copyLink", watchFunction(function (url) {
  if (typeof url != "string") {
    throw new Error("Got copyLink with non-string argument: " + url);
  }
  clipboard.set(url, "text");
}));

recallPanel.port.on("openLink", watchFunction(function (url) {
  require("sdk/tabs").open(url);
  recallPanel.hide();
}));

recallPanel.port.on("selectClip", watchFunction(function (clipId) {
  panelViewingClips[panelViewingId] = clipId;
  sendShot();
}));

recallPanel.port.on("viewShot", watchFunction(function (id) {
  if (! id) {
    throw new Error("Bad viewShot id: " + id);
  }
  let backend = require("main").getBackend();
  let url = backend + "/data/" + id;
  console.log("requesting", url);
  require("sdk/request").Request({
    url: url,
    onComplete: watchFunction(function (response) {
      let json = response.json;
      console.log("got viewShot data", Object.keys(json));
      console.log("clips:", Object.keys(json.clips));
      let clipId = Object.keys(json.clips)[0];
      if (clipId) {
        let clip = json.clips[clipId];
        console.log("clip", clipId, clip.image.url.length);
      }
      let shot = new AbstractShot(backend, id, json);
      panelViewingId = shot.id;
      panelViewingClips[shot.id] = shot.clipNames()[0];
      sendShot(shot);
    })
  }).get();
}));

recallPanel.port.on("viewRecallIndex", watchFunction(function () {
  panelViewingId = null;
  sendIndex();
}));

function sendIndex() {
  if (! panelReady) {
    return;
  }
  let backend = require("main").getBackend();
  recallPanel.port.emit("recallIndex", {
    backend: backend,
    shots: ss.storage.recentShots || []
  });
}

let lastShot;

function sendShot(shot) {
  if (! panelReady) {
    return;
  }
  if (! shot) {
    shot = lastShot;
  }
  let backend = require("main").getBackend();
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
