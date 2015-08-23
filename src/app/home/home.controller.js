(function() {
  'use strict';

  angular
    .module('dashKo')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $mdDialog, Group) {

    Group.find().$promise.then(function(suc) {
      console.log('got groups', suc);
      $scope.groups = suc;
    });

    $scope.getGroupLogs = function(id) {
      Group.logs({}, {
        id: id
      }).$promise.then(function(suc) {
        console.log('got log for group', suc);
        // $scope.showGraph(ev);
        drawChart(suc);
      });
    };

    var drawChart = function(logs) {

      //get date min and max
      //get unit min max

      var data = logs.map(function(log) {
        return [log.date, log.value];
      });

      console.log('data to draw', data);


      $('#container2').highcharts({
        xAxis: {
          type: 'datetime'
        },
        series: [{
          data: data
        }]
      });
    };

    //bind dialog to document.body
    $scope.showLogEdit = function(ev, id) {
      $mdDialog.show({
          // controller: DialogController, //how to seperate this out
          templateUrl: 'app/dialog/dialog1.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function(answer) {
          $scope.status = 'You said...' + answer;
        }, function() {
          $scope.status = 'You cancelled!';
        });
    };

    $scope.showGraph = function(ev, id) {
      console.log('id', id)
        // $scope.getGroupLogs(id);


      $mdDialog.show({
          // controller: DialogController, //how to seperate this out
          templateUrl: 'app/dialog/graph.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          resolve: {},
          onComplete: function() {
            console.log('dialog loaded')
            $scope.getGroupLogs(id);
          }
        })
        .then(function(answer) {
          $scope.status = 'You said...' + answer;
        }, function() {
          $scope.status = 'You cancelled!';
        });
      //load dialog then draw graph..

    };


  }

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

})();
