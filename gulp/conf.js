//write config variables for gulp here
var gutil = require('gulp-util');

exports.paths = {
  src: 'src',
  dist: 'client',
  tmp: '.tmp',
  e2e: 'e2e'
};

//wiredep inject bower dependencies to index.html and more
exports.wiredep = {
  directory: 'bower_components'
    // directory: 'client/vendor'
};

exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
