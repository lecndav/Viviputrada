const gulp = require('gulp');
const runSequence = require('run-sequence');
const watchConfig = require('../config.json').watch;

const sequence = watchConfig.prerequisites;
sequence.push(watchConfig.watch.reduce((tasks, spec) => {
  tasks = tasks.concat(spec.tasks);
  return tasks;
}, watchConfig.start));

gulp.task('watch', () => {
  runSequence.apply(null, sequence);
  watchConfig.watch.forEach(spec =>
    gulp.watch(spec.files, spec.tasks)
  )
});
