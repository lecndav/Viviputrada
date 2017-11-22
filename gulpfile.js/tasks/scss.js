const gulp = require('gulp');
const scss = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const scssSpec = require('../config.json').options.scss;

gulp.task('scss', function () {
  return gulp.src(scssSpec.entry)
    .pipe(sourcemaps.init())
    .pipe(scss({
      "includePaths": [
        "./node_modules"
      ],
//      outputStyle: 'compressed' // uncomment this to minify the output
    }).on('error', scss.logError))
    .pipe(prefix(scssSpec.browsers))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(scssSpec.dest));
});