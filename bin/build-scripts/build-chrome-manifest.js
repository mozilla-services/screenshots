#!/usr/bin/env node

// Converts the generated manifest.json into manifest.json.chrome, with the
// "applications" key removed, and the firefox-to-chrome browser polyfill
// inserted into the front of the list of scripts run in the background page.

const fs = require("fs");
const path = require("path");

// TODO: make sure this isn"t run until the manifest has been generated
let manifestPath = path.join(__dirname, "..", "..", "addon", "webextension", "manifest.json");
let chromePath = path.join(__dirname, "..", "..", "addon", "webextension", "manifest.json.chrome");
fs.readFile(manifestPath, "utf-8", (err, data) => {
  if (err) {
    console.error(`Unable to read manifest from ${manifestPath}: `, err);
    return process.exit(1);
  }
  let manifest = JSON.parse(data);

  // The "applications" manifest key is not recognized by Chrome
  delete manifest.applications;

  // Add the browser polyfill to convert Promise-based browser.* APIs into
  // callback-based chrome.* APIs
  manifest.background.scripts.unshift("browserPolyfill.js");

  // pretty-print the output
  let output = JSON.stringify(manifest, null, 2);
  fs.writeFile(chromePath, output, "utf-8", (err) => {
    if (err) {
      console.error(`Unable to write chrome-specific manifest to ${chromePath}: `, err);
      return process.exit(1);
    }
  });
});
