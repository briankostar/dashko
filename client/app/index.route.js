(function() {
  'use strict';

  angular
    .module('gulpAngular')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        // templateUrl: 'app/main/main.html',
        // controller: 'MainController',
        // controllerAs: 'main'
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
