const gulp = require('gulp');
const del = require('del');
const cleanSpec = require('../config.json').options.clean;

gulp.task('clean', () => del(cleanSpec));
