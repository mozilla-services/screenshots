/* globals window, document */

let React = require("react"),
  url = require("url"),
  { FrameFactory } = require("./views/frame.js"),
  { setGitRevision, staticLink } = require("./linker"),
  { AbstractShot } = require("../../shared/dist/shot");

function clientGlue(data) {
  setGitRevision(data.gitRevision);
  let shot = new AbstractShot(data.backend, data.id, data.shot);
  let frame = FrameFactory({
    staticLink: staticLink,
    backend: data.backend,
    shot: shot,
    id: data.id,
    shotDomain: data.shotDomain,
    query: data.query,
    params: data.params
  });
  React.render(frame, document);
}

try {
  window.React = React;
  window.url = url;
  window.clientGlue = clientGlue;
} catch (e) {

}
