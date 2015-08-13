'use strict';

//launches dev server with bSync from .tmp/serve and src with priority on tmp

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

//special route is added for bower_components
function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;
  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(
      conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
        // 'client/vendor': 'client/vendor'
    };
  }

  //browser option is used to open defaul browser
  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});


  //can inject express middleware for proxy and redirect to another server
  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    // {
    //   //serves files in src, but in url its :3000/
    //   // baseDir: 'client'
    //   //serve static files in these folders, but their contents are after :3000/
    //   baseDir: ['.tmp/serve', 'src'],
    //   //display directory tree
    //   // directory: true,
    //   routes: {
    //     //url to match : folder to serve
    //     //'/bower_components': 'test/bower_components'
    //     //when url asks for /bower_component, serve from test/bower_compoents
    //     // '/client': 'client/vendor'
    //     '/bower_components': 'bower_components'
    //   }
    // },
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]' // Only needed for angular apps
}));

gulp.task('serve', ['watch'], function() {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function() {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function() {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function() {
  browserSyncInit(conf.paths.dist, []);
});
