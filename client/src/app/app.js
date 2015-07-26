angular.module('dashKo', ['ngResource', 'lbServices', 'ui.router'])

.config(['LoopBackResourceProvider', '$stateProvider', '$urlRouterProvider', function (LoopBackResourceProvider, $stateProvider, $urlRouterProvider) {
  LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');

    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('home', {
        url: "/",
        template: "<div>HOME</div>",
        controller: 'appCtrl'
      });
      //.state('state1.list', {
      //  url: "/list",
      //  templateUrl: "partials/state1.list.html",
      //  controller: function($scope) {
      //    $scope.items = ["A", "List", "Of", "Items"];
      //  }
      //})
  }])

  .factory('lbAPI', ['Log', 'Group', function (Log, Group) {
    var getLogs = function () {
      console.log('calling and returning promise..')
      return Log.find().$promise;
    };

    var getGroups = function () {
      console.log('calling and returning promise..')
      return Group.find().$promise;
    };

    return {
      getGroups : getGroups,
      getLogs: getLogs

    }
  }])

.controller('appCtrl', ['$scope', 'lbAPI', function($scope, lbAPI){
    lbAPI.getLogs().then(function(suc){
      console.log('GOT LOGS', suc)
    });

    //should prob make group model
    //

    lbAPI.getGroups().then(function(suc){
      console.log('GOT GROUPS', suc)
    })


  }]);
