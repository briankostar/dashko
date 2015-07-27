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
        controller: 'AppCtrl'
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
      return Log.find().$promise;
    };

    var getGroups = function () {
      return Group.find().$promise;
    };


    var createGroupLog = function (param) {
      return Group.logs.create({
        groupId: param.id,
        date: new Date(),
        unit: param.unit,
        value: param.value
      }).$promise;
    };

    return {
      getGroups: getGroups,
      getLogs: getLogs,
      createGroupLog: createGroupLog
    }
  }])

  .controller('AppCtrl', ['$scope', 'lbAPI', function ($scope, lbAPI) {
    //lbAPI.getLogs().then(function(suc){
    //  console.log('GOT LOGS', suc)
    //});

    //should prob make group model

    //get groups
    //display each groups

    //when clicked, and w input, create a log -- need

    lbAPI.getGroups().then(function (suc) {
      console.log('Get groups', suc)
      $scope.groups = suc;
    })

    $scope.createGroupLog = function (group, value) {
      lbAPI.createGroupLog({
        id: group.id,
        unit: group.unit,
        value: value
      }).then(function(){
        
      })
    }

  }]);
