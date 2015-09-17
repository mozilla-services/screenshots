const config = require("./config").root();
const path = require("path");
const fs = require("fs");
const child_process = require("child_process");
const rimraf = require("rimraf");

// Convert to milliseconds:
let keepTime = config.exportKeepTime * 60 * 1000;

function exportPath(deviceId) {
  if (deviceId.search(/^[a-z0-9\-]+$/i) == -1) {
    reject(new Error("Bad deviceId"));
  }
  return path.join(config.exportBase, "export---" + deviceId);
}

function removeExportPath(dir) {
  return new Promise((resolve, reject) => {
    rimraf(dir, (error) => {
      if (error && error.code != "ENOENT") {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function launchWget(deviceId) {
  return new Promise((resolve, reject) => {
    let dir = exportPath(deviceId);
    let script = path.join(__dirname, "export-shots.sh");
    let start = Date.now();
    let subprocess = child_process.spawn(
      script,
      {
        env: {
          BASE_DIR: dir,
          AUTH: require("./dbschema").getTextKeys()[0],
          DEVICE_ID: deviceId,
          PORT: config.port,
          CONTENT_PORT: config.contentPort,
        }
      }
    );
    subprocess.on("close", function (code) {
      console.info("Exported to", dir, "in", (Date.now() - start) + "ms", "exit code:", code);
    });
    subprocess.on("error", function (e) {
      console.warn("Error launching wget:", e);
    });
    resolve();
    // FIXME: I don't think an exception here will reject
    // Also maybe this is all synchronous
  });
}

function getWgetStatus(deviceId) {
  return new Promise((resolve, reject) => {
    let dir = exportPath(deviceId);
    let result = {errors: []};
    let steps = 3;
    function resolveIfDone() {
      if (steps <= 0) {
        resolve(result);
      }
    }
    fs.readFile(path.join(dir, "wget-process.pid"), {encoding: "UTF-8"}, (error, data) => {
      if (error && error.code == "ENOENT") {
        // File doesn't exist
        result.running = false;
      } else if (error) {
        result.errors.push(["Error loading process PID:", error]);
      } else {
        result.running = true;
      }
      steps--;
      resolveIfDone();
    });
    fs.readFile(path.join(dir, "script-exit-code.txt"), {encoding: "UTF-8"}, (error, data) => {
      if (error && error.code == "ENOENT") {
        // Do nothing
      } else if (error) {
        result.errors.push(["Error loading exit code:", error]);
      } else {
        let code = parseInt(data, 10);
        if (code) {
          result.success = false;
        } else {
          result.success = true;
        }
      }
      steps--;
      resolveIfDone();
    });
    fs.stat(path.join(dir, "pageshot-export.zip"), (error, stat) => {
      if (error && error.code == "ENOENT") {
        result.zip = false;
      } else if (error) {
        result.errors.push(["Error checking zip file:", error]);
      } else {
        result.zip = {
          size: stat.size,
          mtime: stat.mtime.getTime(),
          keepTime: keepTime
        };
      }
      steps--;
      resolveIfDone();
    });
  });
}

exports.cleanExports = function () {
  let start = Date.now();
  fs.readdir(config.exportBase, (error, files) => {
    if (error && error.code == "ENOENT") {
      console.info("EXPORT: Could not clean exports, directory", config.exportBase, "does not exist");
      return;
    }
    if (error) {
      console.warn("EXPORT: Error listing", config.exportBase, ":", error);
      return;
    }
    let toCheck = files.filter((file) => file.startsWith("export--"));
    let count = toCheck.length;
    let deletedCount = 0;
    let errorCount = 0;
    function oneDone(deleted, errored) {
      count--;
      if (deleted) {
        deletedCount++;
      }
      if (errored) {
        errorCount++;
      }
      if (count <= 0) {
        console.info("EXPORT: finished cleanup run;", toCheck.length, "checked;", deletedCount, "deleted;", errorCount, "had errors; total time:", (Date.now() - start) + "ms");
      }
    }
    for (let dir of toCheck) {
      let fullDir = path.join(config.exportBase, dir);
      let file = path.join(fullDir, "pageshot-export.zip");
      fs.stat(file, (error, stat) => {
        if (error && error.code == "ENOENT") {
          fs.stat(fullDir, (error, stat) => {
            if (error && error.code == "ENOENT") {
              console.info("EXPORT: directory", fullDir, "disappeared during cleanup");
              oneDone(false, false);
              return;
            } else if (error) {
              console.warn("EXPORT: could not stat directory", fullDir, ":", error);
              oneDone(false, true);
              return;
            }
            if (stat.mtime.getTime() + keepTime < Date.now()) {
              rimraf(fullDir, (error) => {
                if (error) {
                  oneDone(false, true);
                  console.warn("EXPORT: failed to remove unfinished export", fullDir, ":", error);
                } else {
                  oneDone(true, false);
                  console.info("EXPORT: removed unfinished export", fullDir);
                }
              });
            }
          });
          return;
        } else if (error) {
          oneDone(false, true);
          console.warn("EXPORT: Error doing stat on", file, ":", error);
          return;
        }
        if (stat.mtime.getTime() + keepTime < Date.now()) {
          rimraf(fullDir, (error) => {
            if (error) {
              oneDone(false, true);
              console.warn("EXPORT: failed to remove outdated export", fullDir, ":", error);
            } else {
              oneDone(true, false);
              console.info("EXPORT: removed outdated export:", fullDir);
            }
          });
        } else {
          oneDone(false, false);
        }
      });
    }
  });
};

exports.setup = function (app) {

  app.get("/export", function (req, res) {
    if (! req.deviceId) {
      res.type("txt").status(403).send("You must have the addon installed to export your shots");
      return;
    }
    require("./views/export").render(req, res);
  });

  app.post("/export", function (req, res) {
    if (! req.deviceId) {
      res.type("txt").status(403).send("You must have the addon installed to export your shots");
      return;
    }
    launchWget(req.deviceId).then(() => {
      res.redirect("/export/status?started=" + encodeURIComponent(Date.now()));
    }).catch((e) => {
      require("./server").errorResponse(res, "Failed to launch export", e);
    });
  });

  app.get("/export/status", function (req, res) {
    if (! req.deviceId) {
      res.type("txt").status(403).send("You must have the addon installed to export your shots");
      return;
    }
    let started = parseInt(req.query.started, 10);
    getWgetStatus(req.deviceId).then((status) => {
      if ((! status.running) && ((! started) || (started + 10000 < Date.now()))) {
        res.redirect("/export");
        return;
      }
      if (started && status.zip) {
        res.redirect("/export/status");
        return;
      }
      req.wgetStatus = status;
      req.keepTime = keepTime;
      require("./views/export").renderStatus(req, res);
    }).catch((e) => {
      require("./server").errorResponse(res, "Failed to get status", e);
    });
  });

  app.get("/export/download/pageshot-export.zip", function (req, res) {
    if (! req.deviceId) {
      res.type("txt").status(403).send("You must have the addon installed to download your shots");
      return;
    }
    let dir = exportPath(req.deviceId);
    let fn = path.join(dir, "pageshot-export.zip");
    res.sendFile(fn);
  });

  app.post("/export/remove", function (req, res) {
    if (! req.deviceId) {
      res.type("txt").status(403).send("You must have the addon installed");
    }
    let dir = exportPath(req.deviceId);
    removeExportPath(dir).then(() => {
      res.redirect("/export?deleted");
    }).catch((e) => {
      require("./server").errorResponse(res, "Failed to remove directory", e);
    });
  });

};
