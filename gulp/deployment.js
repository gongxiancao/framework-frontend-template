'use strict';

var gulp = require('gulp');

var defaultTasks = ['clean', 'jshint', 'copy:buildProd'];

gulp.task('copy:buildProd', function () {
  return gulp.src(['api/**/*', 'config/**/*', '*.js', '*.json', '*.sh', '!deploy*.sh'], {base: '.'})
    .pipe(gulp.dest('deployment'));
});


gulp.task('deploy', defaultTasks);