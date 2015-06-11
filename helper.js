/*jshint node:true */

console.log("Addon transformation complete.");

var firefox;

process.on('SIGTERM', function () {
  if (firefox) {
    console.log("sending TERM", firefox);
    firefox.kill();
  }
});

var localArg = "--local";
if (process.env.SITE_URL) {
  localArg = "--server " + process.env.SITE_URL;
}

firefox = require("child_process").spawn("bash", ["-c", "cd dist/addon && SHOULD_EXEC=1 exec ./run " + localArg + " >& ../../addon.log"]);
