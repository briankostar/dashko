!function(){"use strict";angular.module("gulpAngular",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngResource","ui.router","ngMaterial"])}(),function(){"use strict";function t(){function t(){return n}var n=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("gulpAngular").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var n=this;n.relativeDate=t(n.creationDate).fromNow()}var n={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return t.$inject=["moment"],n}angular.module("gulpAngular").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function n(n,r,e,o){var a,i=t(r[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});r.addClass("acme-malarkey"),angular.forEach(n.extraValues,function(t){i.type(t).pause()["delete"]()}),a=n.$watch("vm.contributors",function(){angular.forEach(o.contributors,function(t){i.type(t.login).pause()["delete"]()})}),n.$on("$destroy",function(){a()})}function r(t,n){function r(){return e().then(function(){t.info("Activated Contributors View")})}function e(){return n.getContributors(10).then(function(t){return o.contributors=t,o.contributors})}var o=this;o.contributors=[],r()}var e={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:n,controller:r,controllerAs:"vm"};return r.$inject=["$log","githubContributor"],e}angular.module("gulpAngular").directive("acmeMalarkey",t),t.$inject=["malarkey"]}(),function(){"use strict";function t(t,n){function r(r){function o(t){return t.data}function a(n){t.error("XHR Failed for getContributors.\n"+angular.toJson(n.data,!0))}return r||(r=30),n.get(e+"/contributors?per_page="+r).then(o)["catch"](a)}var e="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:e,getContributors:r};return o}angular.module("gulpAngular").factory("githubContributor",t),t.$inject=["$log","$http"]}(),function(){"use strict";function t(t,n,r){function e(){a(),t(function(){i.classAnimation="rubberBand"},4e3)}function o(){r.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function a(){i.awesomeThings=n.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1438573801709,i.showToastr=o,e()}angular.module("gulpAngular").controller("MainController",t),t.$inject=["$timeout","webDevTec","toastr"]}(),function(){"use strict";function t(t){t.debug("runBlock end")}angular.module("gulpAngular").run(t),t.$inject=["$log"]}(),function(){"use strict";function t(t,n){t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}),n.otherwise("/")}angular.module("gulpAngular").config(t),t.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("gulpAngular").constant("malarkey",malarkey).constant("toastr",toastr).constant("moment",moment)}(),function(){"use strict";function t(t,n){t.debugEnabled(!0),n.options.timeOut=3e3,n.options.positionClass="toast-top-right",n.options.preventDuplicates=!0,n.options.progressBar=!0}angular.module("gulpAngular").config(t),t.$inject=["$logProvider","toastr"]}(),angular.module("gulpAngular").run(["$templateCache",function(t){t.put("app/main/main.html",""),t.put("app/components/navbar/navbar.html",'<md-toolbar layout="row" layout-align="center center"><md-button href="https://github.com/Swiip/generator-gulp-angular">Gulp Angular</md-button><section flex="" layout="row" layout-align="left center"><md-button href="#" class="md-raised">Home</md-button><md-button href="#" class="md-raised">About</md-button><md-button href="#" class="md-raised">Contact</md-button></section><md-button class="acme-navbar-text">Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);