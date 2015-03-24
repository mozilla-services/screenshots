var browserify = require("browserify"),
  gulp = require("gulp"),
  to5 = require("gulp-babel"),
  sass = require("gulp-sass"),
  source = require("vinyl-source-stream"),
  nodemon = require("gulp-nodemon");

gulp.task("6to5", function () {
  return gulp.src("src/**/*.{js,jsx}").pipe(to5()).pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  return gulp.src("src/**/*.scss").pipe(sass()).pipe(gulp.dest("dist/css"));
});

gulp.task("imgs", function () {
  return gulp.src("src/img/*").pipe(gulp.dest("dist/img"));
});

gulp.task("javascript", ["6to5"], function () {
  var bundler = browserify({
    entries: ["./dist/routes.js"],
    debug: true
  });

  return (function () {
    return bundler.bundle().pipe(source("bundle.js")).pipe(gulp.dest("dist/js"));
  }());
});

gulp.task("transforms", ["sass", "javascript", "imgs"]);

gulp.task("default", ["transforms"], function () {
  nodemon({
    script: "run",
    ignore: ["dist"],
    ext: "js scss",
    tasks: ["transforms"]
  });
});
