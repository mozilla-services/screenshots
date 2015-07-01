/* jshint browser:true */

const React = require("react");
const { AbstractShot } = require("../shared/shot");
const { ShotIndexFactory } = require("./views/shot-index.js");
const { setGitRevision, staticLink } = require("./linker");

let model;

exports.setModel = function (data) {
  model = data;
  data.shots = data.shots.map((shot) => new AbstractShot(data.backend, shot.id, shot.json));
  render();
};

function render() {
  setGitRevision(model.gitRevision);
  let attrs = { staticLink };
  for (let attr in model) {
    attrs[attr] = model[attr];
  }
  // FIXME: add profile-related stuff here
  let shotIndex = ShotIndexFactory(attrs);
  React.render(shotIndex, document);
}

if (typeof window != "undefined") {
  window.shotindexglue = exports;
}
