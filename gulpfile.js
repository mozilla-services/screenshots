/* jshint node:true */

var browserify = require("browserify"),
  gulp = require("gulp"),
  run = require("gulp-run"),
  to5 = require("gulp-babel"),
  sourcemaps = require("gulp-sourcemaps"),
  concat = require("gulp-concat-util"),
  react = require("gulp-react"),
  sass = require("gulp-sass"),
  source = require("vinyl-source-stream"),
  nodemon = require("gulp-nodemon"),
  jshint = require('gulp-jshint');

gulp.task("clean", function () {
  run("rm -rf dist").exec();
});

gulp.task("shared", function () {
  return gulp.src("shared/**/*.{js,jsx}")
    .pipe(to5())
    .pipe(gulp.dest("dist/shared"))
    .pipe(gulp.dest("dist/addon/lib/shared"));
});

gulp.task("6to5", function () {
  return gulp.src(["server/src/**/*.{js,jsx}"])
    .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(concat.header(
      "//# sourceMappingURL=<% print(file.path.replace('/src/', '/dist/')) %>.map\n" +
      "if (typeof require !== 'undefined') { require('source-map-support').install(); }\n"))
    .pipe(sourcemaps.write(".", {sourceRoot: __dirname + "/server/src"}))
    .pipe(gulp.dest("dist/server"));
});

gulp.task("sass", function () {
  return gulp.src("static/css/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/server/static/css"))
    .pipe(gulp.dest("dist/addon/data"));
});

gulp.task("imgs", function () {
  return gulp.src("static/img/*")
    .pipe(gulp.dest("dist/server/static/img"))
    .pipe(gulp.dest("dist/addon/data/icons"));
});

gulp.task("javascript", ["6to5", "shared"], function () {
  var bundler = browserify({
    entries: ["./dist/server/clientglue.js"],
    debug: true
  });

  return (function () {
    return bundler.bundle().pipe(source("server-bundle.js")).pipe(gulp.dest("dist/server/static/js"));
  }());
});

gulp.task("transforms", ["sass", "javascript", "imgs"]);

gulp.task("lint", function() {
  return gulp.src(
    ["server/src/*.js", "server/src/js/*.js"]
  ).pipe(react()).pipe(jshint()).pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task("data-addon", function () {
  return gulp.src("addon/data/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist/addon/data"));
});

gulp.task("lib-addon", function () {
  return gulp.src("addon/lib/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist/addon/lib"));
});

gulp.task("test-addon", function () {
  return gulp.src("addon/test/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist/addon/test"));
});

gulp.task("static-addon", function () {
  return gulp.src(["addon/**/*.{html,css,png,svg}", "addon/run", "addon/package.json"]).pipe(gulp.dest("dist/addon"));
});

gulp.task("javascript-addon", ["data-addon", "lib-addon", "test-addon", "static-addon", "shared"], function () {
  var bundler = browserify({
    entries: ["./dist/addon/data/shoot-panel.js"],
    debug: true
  });

  return (function () {
    return bundler.bundle().pipe(source("panel-bundle.js")).pipe(gulp.dest("dist/addon/data"));
  }());
});

gulp.task("addon", ["javascript-addon"], function () {
  nodemon({
    script: "helper.js",
    ignore: [".DS_Store", "**/.DS_Store", ".git", "server", "dist", "**/Profile", "pageshot-presentation", "node_modules", "**/node_modules"],
    ext: "html css png js",
    tasks: ["notify-start-addon", "notify-end-addon"]
  });
});

var afplayExists = require("fs").existsSync("/usr/bin/afplay");

gulp.task("notify-start-addon", function () {
  if (afplayExists) {
    require("child_process").spawn("/usr/bin/afplay", ["bin/elevator-ding-reverse.mp3"]);
  }
});

gulp.task("notify-end-addon", ["javascript-addon"], function () {
  if (afplayExists) {
    require("child_process").spawn("/usr/bin/afplay", ["bin/elevator-ding.mp3"]);
  }
});

gulp.task("notify-start-transforms", function () {
  if (afplayExists) {
    require("child_process").spawn("/usr/bin/afplay", ["bin/hole-punch-reverse.mp3"]);
  }
});

gulp.task("notify-end-transforms", ["transforms"], function () {
  if (afplayExists) {
    require("child_process").spawn("/usr/bin/afplay", ["bin/hole-punch.mp3"]);
  }
});

gulp.task("default", ["lint", "transforms"], function () {
  nodemon({
    verbose: true,
    script: "server/run",
    ignore: [".DS_Store", "**/.DS_Store", ".git", "dist", "addon", "**/Profile", "pageshot-presentation", "node_modules", "**/node_modules"],
    ext: "js jsx scss",
    tasks: ["lint", "notify-start-transforms", "notify-end-transforms"]
  });

  // Run the addon in a different process so that we can nodemon different things
  var add = require("child_process").spawn("gulp", ["addon"]);

  function log(where) {
    return function (data) {
      var lines = data.toString().split("\n");
      for (var i in lines) {
        if (lines[i]) {
          where("addon:", lines[i]);
        }
      }
    };
  }

  add.stdout.on("data", log(console.log.bind(console)));

  add.stderr.on("data", log(console.error.bind(console)));

  add.on("close", function (code) {
    console.log("addon build process finished with code", code);
  });
});
