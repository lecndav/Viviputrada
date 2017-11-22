const gulp = require('gulp');
const copySpecs = require('../config.json').options.copy;

gulp.task('copy', () =>
  copySpecs.forEach(copySpec =>
    gulp
      .src(copySpec.src)
      .pipe(gulp.dest(copySpec.dest))
  )
);