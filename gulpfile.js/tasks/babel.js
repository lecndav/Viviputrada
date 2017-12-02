
/*
Based on https://gist.github.com/danharper/3ca2273125f500429945
 */

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const babel = require('babelify');
const babelSpecs = require('../config.json').options.babel;
const gutil = require('gulp-util');

function compile(watch) {
  let bundler = browserify(
    babelSpecs.entry,
    {
      debug: true
    }
  )
    .transform(babel.configure({
      presets: [
        "env",
//        "minify" // uncomment this to minify the output
      ]
    }));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(babelSpecs.destFile))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(babelSpecs.dest))
      .on('end', function(){ gutil.log('finished bundling ...'); });

  }

  if (watch) {
    bundler = watchify(bundler);
    bundler.on('update', function() {
      console.log('-> bundling ...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
}

gulp.task('buildES6', () => compile());
gulp.task('watchES6', () => watch());

