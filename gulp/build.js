'use strict';
//optimizes and makes dist folder

//require node path manipulation utilities
var path = require('path');

var gulp = require('gulp');
var conf = require('./conf');

//load gulp plugins from package json.
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

// var rename = require('gulp-rename');
// var loopbackAngular = require('gulp-loopback-sdk-angular');

gulp.task('lb', function() {
  return gulp.src('./server/server.js')
    .pipe($.loopbackSdkAngular())
    .pipe($.rename('lb-services.js'))
    .pipe(gulp.dest('./src/app/components/lb'));
});


//load all html from source, minify, apply ngCache, write to .tmp/partial for injection
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
      module: 'dashKo',
      root: 'app'
    }))
    //put into tmp folder
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

//main process-- rewrites index.html.
//concats & minify.
//use filters to apply transformation then rm filters with restore
gulp.task('html', ['lb', 'inject', 'partials'], function() {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp,
    '/partials/templateCacheHtml.js'), {
    read: false
  });
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    //useref loads index.html at build:... comments
    //apply transformation. concats, rewrite html.
    .pipe(assets = $.useref.assets())
    //rename w hashe to avoid cache issue
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({
      preserveComments: $.uglifySaveLicense
    })).on('error', conf.errorHandler('Uglify'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({
      title: path.join(conf.paths.dist, '/'),
      showFiles: true
    }));
});

//for bower components that use fonts files. copies and put into dist/font
gulp.task('fonts', function() {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

//for custom files in src. copies and put them in same path in dist
gulp.task('other', function() {
  var fileFilter = $.filter(function(file) {
    return file.stat.isFile();
  });

  return gulp.src([
      path.join(conf.paths.src, '/**/*'),
      path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

//run clean task seperately with callback done
gulp.task('clean', function(done) {
  $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')],
    done);
});

gulp.task('build', ['html', 'fonts', 'other']);
