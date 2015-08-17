(function() {
  'use strict';

  angular
    .module('dashKo')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, Group) {

    Group.find().$promise.then(function(suc) {
      console.log('got groups', suc)
      $scope.groups = suc;
    });

    $scope.getGroupLogs = function(id) {
      Group.logs({}, {
        id: id
      }).$promise.then(function(suc) {
        console.log('got log for group', suc);
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


      $('#container').highcharts({
        xAxis: {
          type: 'datetime'
        },
        series: [{
          data: data
        }]
      });
    }


  }
})();
