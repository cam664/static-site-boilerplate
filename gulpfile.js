var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var ejs = require("gulp-ejs");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require("gulp-imagemin");
var watch = require("gulp-watch");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("scripts", function() {
  gulp
    .src("./src/js/*.js")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task("vendorScripts", function() {
  gulp
    .src("./src/js/vendor/**/*.js")
    .pipe(plumber())
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js/"));
});

gulp.task("styles", function() {
  return gulp
    .src("./src/scss/imports.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("style.css"))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write("../maps"))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream());
});

gulp.task("partials", function() {
  gulp
    .src("./templates/*.ejs")
    .pipe(ejs({}, {}, { ext: ".html" }))
    .pipe(gulp.dest("./"));
});

gulp.task("img", function() {
  gulp
    .src("src/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(gulp.dest("./dist/img/"));
});

gulp.task("webserver", function() {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task("jsWatch", ["scripts"], function(done) {
  browserSync.reload();
  done();
});

gulp.task("watch", function() {
  gulp.watch("./src/img/**/*", ["img"]);
  gulp.watch("./src/js/*.js", ["jsWatch"]);
  gulp.watch("./src/scss/**/*.scss", ["styles"]);
  gulp.watch("./templates/**/*.ejs", ["partials"]);
  gulp.watch("*.html").on("change", reload);
});

gulp.task("default", ["img", "partials", "styles", "scripts", "webserver", "watch"]);