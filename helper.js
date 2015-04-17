/*jshint node:true */

console.log("Addon transformation complete.");

var firefox;

process.on('SIGTERM', function () {
  if (firefox) {
    console.log("sending TERM", firefox);
    firefox.kill();
  }
});

firefox = require("child_process").spawn("bash", ["-c", "cd addon/dist && SHOULD_EXEC=1 exec ./run --local >& ../../addon.log"]);
