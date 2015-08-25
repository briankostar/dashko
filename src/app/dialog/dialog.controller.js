(function () {
  'use strict';

  angular
    .module('dashKo')
    .controller('DialogController', DialogController);

  function DialogController($scope, $mdDialog) {
    $scope.test = 'from ctrl'
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    $scope.okay = function () {
      $mdDialog.hide();
    };
  }

})();
