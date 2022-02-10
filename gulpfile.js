/**
 * ACSSORI GULP FILE
 * Convert from
 *
 * gulpfile.js
 *
 * The gulp configuration file.
 *
 */

const gulp = require("gulp"), // gulp pipeline
  del = require("del"), // delete contents using globs
  clone = require("gulp-clone"), // used to fork a stream
  stylus = require("gulp-stylus"), // process stylus to css
  minifyCss = require("gulp-clean-css"), // minify files
  concat = require("gulp-concat"), // combine files
  header = require("gulp-header"), // append header content
  size = require("gulp-size"), // output asset size
  combinemq = require("gulp-group-css-media-queries"), // migrate media queries to bottom
  autoprefix = require("gulp-autoprefixer"), // prefix any css with low support
  beautify = require("gulp-cssbeautify"), // make files human readable
  rename = require("gulp-rename"), // rename files in a stream
  src_folder = "./src/", // .styl file source folder
  dist_folder = "./dist/", // .css output folder
  packageJSON = require("./package.json"); // package reference for version data

const comment = `/**
 * ACSSORI v${packageJSON.version}
 * MIT Licensed
 * https://acssori.vercel.app
 */\r\n\r\n\r\n`;

gulp.task("clear", () => del([`${dist_folder}*`]));

gulp.task("acssori-build", () => {
  // process document _base.styl first, such that config is imported
  let stream = gulp
    .src([`${src_folder}_base.styl`, `${src_folder}[!_]*.styl`])
    .pipe(concat("acssori.styl"))
    .pipe(stylus({ "resolve url": true }))
    .pipe(
      combinemq({
        beautify: false,
      })
    )
    .pipe(header(comment))
    .pipe(autoprefix("last 2 versions"));

  stream
    .pipe(clone())
    .pipe(beautify())
    .pipe(size())
    .pipe(gulp.dest(dist_folder));

  stream
    .pipe(clone())
    .pipe(minifyCss())
    .pipe(size())
    .pipe(rename("acssori.min.css"))
    .pipe(gulp.dest(dist_folder));

  return stream; // signal async completion
});

gulp.task("watch", gulp.series("acssori-build"), function () {
  gulp.watch(`${src_folder}*.styl`, gulp.series("acssori-build")); // watch for changes and run the css task
});
gulp.task("default", gulp.series("acssori-build"));
