'use strict';

//require node path manipulation utilities
var path = require('path');

var gulp = require('gulp');
var conf = require('./conf');

//load gulp plugins from package json.
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function() {
  return gulp.src([
      //pass two files for streaming
      path.join(conf.paths.src, '/app/**/*.html'),
      path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
    //minify the html
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    //turn to angular templatecache, setting the module name and root
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'gulpAngular',
      root: 'app'
    }))
    //put into tmp folder
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});
