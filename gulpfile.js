"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browser_sync = require("browser-sync").create();
const child_process = require("child_process");
const cssnano = require("cssnano");
const del = require("del");
const gulp = require("gulp");
const gulp_eslint = require("gulp-eslint");
const gulp_imagemin = require("gulp-imagemin");
const gulp_newer = require("gulp-newer");
const gulp_plumber = require("gulp-plumber");
const gulp_rename = require("gulp-rename");
const gulp_postcss = require("gulp-postcss");
const gulp_sass = require("gulp-sass");
const gulp_sourcemaps = require('gulp-sourcemaps');
const gulp_uglify = require("gulp-uglify");
const postcss_assets = require('postcss-assets');
const postcss_size = require('postcss-size');
const postcss_svg = require('postcss-svg');

// BrowserSync
function browserSync(done) {
  browser_sync.init({
    server: {
      baseDir: "."
    },
    port: 4000,
    open: true
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browser_sync.reload();
  done();
}

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// Optimize Images
function images() {
  return gulp
  .src("./_images/**/*")
  .pipe(gulp_newer("./_site/assets/images"))
  .pipe(
    gulp_imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    })
  )
  .pipe(gulp.dest("./_site/assets/images"));
}

// CSS task
function css() {
  return gulp
  .src("./_sass/**/*.scss")
  .pipe(gulp_sourcemaps.init())
  .pipe(gulp_plumber())
  .pipe(gulp_sass({outputStyle: "expanded"}))
  .pipe(gulp_postcss([
    postcss_assets({
      loadPaths: ["assets/images/"],
      basePath: "./_site/"
    }),
    postcss_size,
    postcss_svg({
      paths: ["./_site/assets/images/svg"]
    }),
    autoprefixer()
    // cssnano()
  ]))
  .pipe(gulp_sourcemaps.write())
  .pipe(gulp.dest("./_site/assets/css/"))
  .pipe(browser_sync.stream());
}

// Lint scripts
function scriptsLint() {
  return gulp
  .src(["./_js/**/*", "./gulpfile.js"])
  .pipe(gulp_plumber())
  .pipe(gulp_eslint())
  .pipe(gulp_eslint.format())
  .pipe(gulp_eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
    .src(["./_js/**/*"])
    .pipe(gulp_plumber())
    .pipe(gulp_uglify())
    .pipe(gulp.dest("./_site/assets/js/"))
    .pipe(browser_sync.stream())
  );
}

// Watch files
function watchFiles() {
  gulp.watch("./_sass/**/*", css);
  gulp.watch("./_js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_pages/**/*",
      "./_posts/**/*",
      "./_projects/**/*",
      "./*.html"
    ]
  );
  gulp.watch("./_images/**/*", images);
}

// Tasks
gulp.task("images", images);
gulp.task("css", css);
gulp.task("js", gulp.series(scriptsLint, scripts));
// gulp.task("jekyll", jekyll);
gulp.task("clean", clean);
gulp.task("browsersync", browserSync);

// Watch for file changes and create server
gulp.task(
  "watch", gulp.parallel(watchFiles, browserSync)
);

// Generate _site
gulp.task(
  // "build", gulp.series(gulp.parallel(gulp.series(images, css), "js", jekyll))
);

// Generate _site and create server
// gulp.task(
//   "default", gulp.series("build", browserSync)
// );
