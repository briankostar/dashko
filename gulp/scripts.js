'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

//broswersync inject <script async> after body.
//better live reload. across multiple devices
//$.size displays the size of the file in stream
gulp.task('scripts', function() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.size());
});
