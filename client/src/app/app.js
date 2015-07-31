angular.module('dashKo', ['ngResource', 'lbServices', 'ui.router'])

  .config(['LoopBackResourceProvider', '$stateProvider', '$urlRouterProvider', function (LoopBackResourceProvider, $stateProvider, $urlRouterProvider) {
    //LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    LoopBackResourceProvider.setUrlBase('http://dashko.herokuapp.com/api');

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

    var getGroupLog = function (param) {
      return Group.logs({}, {id: param.groupId}).$promise;
    };

    var createGroup = function (param) {
      return Group.create({
        name: param.name,
        description: param.description,
        unit: param.unit
      })
    };

    var createGroupLog = function (param) {
      return Group.logs.create({
        //first obj gets passed as param.
        id: param.id
      }, {
        //second obj gets passed as payload
        date: new Date(),
        unit: param.unit,
        value: param.value
      }).$promise;
    };

    return {
      getGroups: getGroups,
      getLogs: getLogs,
      getGroupLog: getGroupLog,
      createGroup: createGroup,
      createGroupLog: createGroupLog
    }
  }])

  .controller('AppCtrl', ['$scope', 'lbAPI', 'Group', function ($scope, lbAPI, Group) {
    //lbAPI.getLogs().then(function(suc){
    //  console.log('GOT LOGS', suc)
    //});

    //should prob make group model

    //get groups
    //display each groups

    //when clicked, and w input, create a log -- need

    $scope.CreateGroup = function () {
      Group.create({
        name: $scope.groupName,
        description: $scope.groupDescription,
        unit: $scope.groupUnit
      }).$promise.then(function(suc){
        console.log('made new group', suc)
          $scope.getGroups();
      })
    };

    $scope.getGroups = function(){
      lbAPI.getGroups().then(function (suc) {
        console.log('Get groups', suc)
        $scope.groups = suc;
      })
    }

    $scope.editGroup = function(id, groupName, groupDescription, groupUnit){
      Group.prototype$updateAttributes({
        id: id,
        name: groupName,
        description: groupDescription,
        unit: groupUnit
      }).$promise.then(function(suc){
          console.log('edited group', suc)
          $scope.getGroups();
        })
    }

    $scope.deleteGroup = function(id){
      Group.deleteById({
        id: id
      }).$promise.then(function(suc){
          console.log('deleted group', suc)
          $scope.getGroups();
        })
    }



    $scope.createGroupLog = function (group, value) {
      lbAPI.createGroupLog({
        id: group.id,
        unit: group.unit,
        value: value
      }).then(function (suc) {
        console.log('created log for group', suc)
      })
    }

    $scope.getGroupLogs = function (groupId) {
      lbAPI.getGroupLog({groupId: groupId})
        .then(function (suc) {
          console.log('got log for group', suc)
        })
    }


    $scope.getGroups();

  }])

.controller('ChartCtrl', ['$scope', function($scope){
      $('#container').highcharts({
        xAxis: {
          min: -0.5,
          max: 5.5
        },
        yAxis: {
          min: 0
        },
        title: {
          text: 'Scatter plot with regression line'
        },
        series: [{
          type: 'line',
          name: 'Regression Line',
          data: [[0, 1.11], [5, 4.51]],
          marker: {
            enabled: false
          },
          states: {
            hover: {
              lineWidth: 0
            }
          },
          enableMouseTracking: false
        }, {
          type: 'scatter',
          name: 'Observations',
          data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
          marker: {
            radius: 4
          }
        }]
      });
  }])
