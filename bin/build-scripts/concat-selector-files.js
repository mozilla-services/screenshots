#!/usr/bin/env node

const fs = require("fs");
const path = require('path');
const Concat = require("concat-with-sourcemaps");

const base = path.dirname(path.dirname(__dirname));
const filesJson = require(path.join(base, "addon/webextension/background/selectorFiles.json"));
const selectorFilename = path.join(base, "addon/webextension/build/selector.js");
const onboardingFilename = path.join(base, "addon/webextension/build/selectorWithOnboarding.js");

if (process.argv.length <= 2 || process.argv.includes("-h") || process.argv.includes("--help")) {
  console.log("Usage:")
  console.log("  concat-selector-files.js --deps")
  console.log("    Echos out all the files that this script depends on")
  console.log("  concat-selector-files.js")
  console.log("    Writes files:")
  console.log(`      ${selectorFilename}`);
  console.log(`      ${onboardingFilename}`);
}

if (process.argv.includes("--deps")) {
  for (let key in filesJson) {
    for (let name of filesJson[key]) {
      console.log(path.join("addon/webextension/", name));
    }
  }
  process.exit();
}

let plan = {
  [selectorFilename]: ["standardScripts", "selectorScripts"],
  [onboardingFilename]: ["standardScripts", "onboardingScripts", "selectorScripts"]
};

for (let outputFilename in plan) {
  let sourceKeys = plan[outputFilename];
  let concat = new Concat(true, path.basename(outputFilename), "\n");
  for (let key of sourceKeys) {
    console.log("parts", key, outputFilename, Object.keys(filesJson), filesJson[key]);
    for (let name of filesJson[key]) {
      let filename = path.join("addon/webextension", name);
      let content = fs.readFileSync(path.join(base, filename), {encoding: "UTF-8"});
      concat.add("../" + name, content);
    }
  }
  console.log("Result:", outputFilename);
  console.log(concat.content.length);
  console.log(concat.sourceMap);
  // let base64Map = Buffer.from(concat.sourceMap).toString('base64');
  // let dataUrl = `data:application/json;charset=utf-8;base64,${base64Map}`;
  let basename = path.basename(outputFilename);
  let mappingName = basename + ".map.json";
  let trailer = `
/*
//# sourceMappingURL=${mappingName}
*/
`;
  trailer = Buffer.from(trailer);
  let totalContent = Buffer.concat([concat.content, trailer]);
  fs.writeFileSync(outputFilename, totalContent);
  let mappingFullFilename = outputFilename + ".map.json";
  fs.writeFileSync(mappingFullFilename, concat.sourceMap);
}
