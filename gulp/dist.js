'use strict';

var gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  plugins = gulpLoadPlugins(),
  merge = require('merge-stream'),
  gulpConfig = require('./gulp.json'),
  runSequence = require('run-sequence'),
  del = require('del'),
  cdnEnvironments = ['staging', 'production'],
  environment = process.env.NODE_ENV || 'development';

gulp.task('clean:dist', function() {
  return del([gulpConfig.dist.root]);
});

gulp.task('copy:dist', function() {
  return merge(
    gulp.src([gulpConfig.server.root + '/**/*'], {
      base: '.'
    })
    .pipe(gulp.dest(gulpConfig.dist.root)),
    gulp.src(['package.json'], {
      base: '.'
    })
    .pipe(gulp.dest(gulpConfig.dist.server)),
    gulp.src(gulpConfig.tmp.distAssets, {
      base: gulpConfig.tmp.root
    })
    .pipe(gulp.dest(gulpConfig.dist.client))
  );
});

gulp.task('minify:client', function() {
  return merge(
    gulp.src(gulpConfig.tmp.mainView)
      .pipe(plugins.useref())
      .pipe(plugins.if('min/!(bower)*.js', plugins.ngAnnotate({
        add: true
      })))
      .pipe(plugins.if('min/!(bower)*.js', plugins.uglify({
        mangle: true
      })))
      .pipe(plugins.if('*.css', plugins.cleanCss({
        compatibility: 'ie8'
      })))
      .pipe(plugins.if('*.js', plugins.rev()))
      .pipe(plugins.if('*.css', plugins.rev()))
      .pipe(plugins.revReplace())
      .pipe(gulp.dest(gulpConfig.tmp.root))
  );
});

function checkCdnEnv() {
  if(cdnEnvironments.indexOf(environment) < 0) {
    throw new Error('only ' + cdnEnvironments.join('/') + ' environment can run cdn task, current environment is ' + environment);
  }
}

gulp.task('cdn', function (done) {
  checkCdnEnv();
  gulp.src(gulpConfig.tmp.distAssets)
    .pipe(plugins.qiniu({
      accessKey: gulpConfig.qiniu.accessKey,
      secretKey: gulpConfig.qiniu.secretKey,
      bucket: gulpConfig.qiniu.bucket[environment],
      private: false
    }, {
      dir: 'project',
      versioning: false,
      concurrent: 10
    }));

  setTimeout(done, 10000);
});

gulp.task('cdnizer', function () {
  checkCdnEnv();
  return merge(
    gulp.src(['.tmp/public/js/**/*.js'])
      .pipe(plugins.cdnizer({
        defaultCDNBase: gulpConfig.cdn[environment],
        allowRev: true,
        allowMin: true,
        matchers: [
          {
            pattern: /(<img\s.*?src=\\["'])(.+?)(\\["'].*?>)/gi,
            fallback: true
          }
        ],
        files: gulpConfig.cdnizer.files
      }))
      .pipe(gulp.dest('.tmp/public/js')),
    gulp.src(['.tmp/public/styles/**/*.css'])
      .pipe(plugins.cdnizer({
        defaultCDNBase: gulpConfig.cdn[environment],
        allowRev: true,
        allowMin: true,
        files: gulpConfig.cdnizer.files
      }))
      .pipe(gulp.dest('.tmp/public/styles')),
    gulp.src(['.tmp/public/index.html'])
      .pipe(plugins.cdnizer({
        defaultCDNBase: gulpConfig.cdn[environment],
        allowRev: true,
        allowMin: true,
        files: gulpConfig.cdnizer.files
      }))
      .pipe(gulp.dest('.tmp/public'))
    );
});

gulp.task('copy:tmp:bowerFonts', function() {
    gulp.src(gulpConfig.tmp.bowerFonts)
      .pipe(plugins.flatten())
      .pipe(gulp.dest(gulpConfig.tmp.fontRoot));
});

gulp.task('build:dist', function(cb) {
  runSequence(
    'build:dev',
    ['minify:client', 'copy:tmp:bowerFonts'],
    'cdnizer',
    'cdn',
    'clean:dist',
    'copy:dist',
    cb);
});

