// var gulp = require('gulp');
// var jshint = require('gulp-jshint');
// var minifyCss = require('gulp-minify-css');
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var loopbackAngular = require('gulp-loopback-sdk-angular');
// var rename = require('gulp-rename');
// var wrench = require('wrench');
//
// var paths = {
//   scripts: './client/src/app/**/*.js',
//   styles: './client/src/sass/**/*.css'
// };
//
// // Lint Task
// gulp.task('lint', function() {
//   gulp.src(paths.scripts)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });
//
// gulp.task('concat-uglify-js', function() {
//   gulp.src(paths.scripts)
//     .pipe(concat('app.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('./client/build/src/app/'));
// });
//
// gulp.task('concat-minify-css', function() {
//   gulp.src(paths.styles)
//     .pipe(concat('app.css'))
//     .pipe(minifyCss())
//     .pipe(gulp.dest('./client/build/src/'));
// });
//
// gulp.task('watch', function() {
//   gulp.watch(paths.scripts, ['lint', 'concat-uglify-js']);
//   gulp.watch(paths.styles, ['concat-minify-css']);
// });
//
// gulp.task('lb', function() {
//   return gulp.src('./server/server.js')
//     .pipe(loopbackAngular())
//     .pipe(rename('lb-services.js'))
//     .pipe(gulp.dest('./client/src/common'));
// });
//
// gulp.task('default', ['watch', 'lint', 'concat-uglify-js', 'concat-minify-css',
//   'lb'
// ]);
/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

//gulp runs asyncronously. to run in seq., return stream, callback or promise
var gulp = require('gulp');
var wrench = require('wrench');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

require('./gulp/build.js');

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['build', 'lb']);
