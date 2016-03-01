'use strict';

var gulp = require('gulp');

var env = process.env.NODE_ENV || 'development';
// read gulp directory contents for the tasks...
require('require-dir')('./gulp');
console.log('Invoking gulp -',env);
gulp.task('default', ['clean'], function (/*defaultTasks*/) {
  // run with paramater
  gulp.start(env);
});