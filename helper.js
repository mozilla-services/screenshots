/*jshint node:true */

console.log("Addon transformation complete.");

var output = require("child_process").spawnSync("bash", ["-c", "cd addon/dist && ./run --local > ../../addon.log"]).output;

for (var i in output) {
  if (output[i]) {
    console.log(output[i].toString());
  }
}
