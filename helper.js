/*jshint node:true */

console.log("Addon transformation complete.");

var firefox,
  interval = setInterval(function () { }, 1000);

process.on('SIGTERM', function () {
  if (firefox) {
    console.log("sending TERM", firefox);
    firefox.kill();
    clearInterval(interval);
  }
});

firefox = require("child_process").spawn("bash", ["-c", "cd addon/dist && SHOULD_EXEC=1 exec ./run --local >& ../../addon.log"]);
