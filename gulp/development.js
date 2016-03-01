'use strict';

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  through = require('through'),
  gutil = require('gulp-util'),
  plugins = gulpLoadPlugins(),
  paths = {
    js: ['./*.js', 'config/**/*.js', 'gulp/**/*.js', 'api/**/*.js'],
    html: ['assets/**/*.html'],
    css: ['assets/**/*.css'],
    less: ['assets/**/*.less'],
    sass: ['assets/**/*.scss'],
    coffee: []
  };


function count(taskName, message) {
  var fileCount = 0;

  function countFiles(/*file*/) {
    fileCount++; // jshint ignore:line
  }

  function endStream() {
    gutil.log(gutil.colors.cyan(taskName + ': ') + fileCount + ' ' + message || 'files processed.');
    this.emit('end'); // jshint ignore:line
  }
  return through(countFiles, endStream);
}


// var defaultTasks = ['coffee','clean', 'less', 'sass', 'csslint', 'devServe', 'watch'];
var defaultTasks = ['jshint'];

gulp.task('jshint', function () {
  return gulp.src(paths.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    // .pipe(plugins.jshint.reporter('fail')) to avoid shutdown gulp by warnings
    .pipe(count('jshint', 'files lint free'));
});


var cucumber = require('gulp-cucumber');

gulp.task('cucumber', function() {
    return gulp.src('tests/features/*.feature').pipe(cucumber({
        steps: 'tests/features/step_definitions/*.js',
        support: 'tests/features/support/*js',
        format: 'pretty'
    }));
});


gulp.task('development', defaultTasks);