'use strict';
//launched for build/dev/test, watches change, run browser sync
//only exist if using pre processor
//inject src sass and bower dependencies to index.scss //bower, //injector

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');


gulp.task('styles', function() {
  var sassOptions = {
    style: 'expanded'
  };

  //get sass files sin src, but not index.scss
  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/app/**/*.scss'),
    path.join('!' + conf.paths.src, '/app/index.scss')
  ], {
    read: false
  });

  var injectOptions = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };


  return gulp.src([
      path.join(conf.paths.src, '/app/index.scss')
    ])
    //inject files into the scss files - inject:scss in html
    .pipe($.inject(injectFiles, injectOptions))
    //wiredep inject bower components
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    //start src map. (connect production to dev source map)
    .pipe($.sourcemaps.init())
    //compile sass
    .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
    //add webkit/mozilla prefixes
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    //end src map
    .pipe($.sourcemaps.write())
    //write to .tmp/serv
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    //reload wtih bSync
    .pipe(browserSync.reload({
      stream: true 
    }));
});
