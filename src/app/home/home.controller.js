(function () {
  'use strict';

  angular
    .module('dashKo')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $mdDialog, $mdToast, Group) {

    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'left';

    var getGroups = function () {
      Group.find().$promise.then(function (suc) {
        console.log('got groups', suc);
        $scope.groups = suc;
      });
    };


    $scope.myDate = new Date();

    $scope.getGroupLogs = function (id) {
      Group.logs({}, {
        id: id
      }).$promise.then(function (suc) {
        console.log('got log for group', suc);
        // $scope.showGraph(ev);
        drawChart(suc);
      });
    };

    $scope.createGroup = function (group) {
      Group.create({
        name: group.name,
        description: group.description,
        unit: group.unit
      }).$promise.then(function (suc) {
        console.log('made new group', suc);
        getGroups();
        $scope.showSimpleToast();
      });
    };


    $scope.editGroup = function (group) {
      Group.prototype$updateAttributes({
        id: group.id,
        name: group.groupName,
        description: group.groupDescription,
        unit: group.groupUnit
      }).$promise.then(function (suc) {
        console.log('edited group', suc);
        getGroups();
        $scope.showSimpleToast();
      });
    };

    $scope.deleteGroup = function (id) {
      Group.deleteById({
        id: id
      }).$promise.then(function (suc) {
        console.log('deleted group', suc);
        $scope.getGroups();
        $scope.showSimpleToast();
      })
    }

    $scope.createLog = function (id, value, comment) {
      Group.logs.create({
        //first obj gets passed as param.
        id: id
      }, {
        //second obj gets passed as payload
        date: new Date(),
        // unit: param.unit,
        value: value,
        comment: comment
      }).$promise.then(function (suc) {
        console.log('created log', suc);
        $scope.showSimpleToast();
      });
    };

    var drawChart = function (logs) {

      //get date min and max
      //get unit min max

      var data = logs.map(function (log) {
        return [Date.parse(log.date), log.value];
      });

      $('#dialog-graph').highcharts({
        // chart: {
        //   type: 'spline'
        // },
        title: {
          text: 'Your progress'
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFortmats: {
            month: '%e. %b',
            year: '%b'
          },
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Unit'
          },
          min: 0
        },
        series: [{
          name: 'Name?',
          data: data
        }]
      });
    };

    $scope.showNoteCreate = function (ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/dialog/noteCreate.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true
        })
        .then(function (group) {
          //group from dialog is passed. pass to fcn in home ctrl
          $scope.createGroup(group);
        }, function () {

        });
    };

    //bind dialog to document.body
    $scope.showNoteEdit = function (ev, group) {
      // console.log('group', group);
      // var test = '3';
      $mdDialog.show({
          controller: DialogController,
          bindToController: true,
          controllerAs: 'dialog',
          templateUrl: 'app/dialog/noteSetting.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          //injects into the ctrl, not bind to its scope!
          locals: {
            group: group
          }
        })
        .then(function () {
          // $scope.editGroup(group);
          getGroups();
        }, function () {

        });
    };

    $scope.showGraph = function (ev, id) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/dialog/graph.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          resolve: {},
          onComplete: function () {
            console.log('dialog loaded');
            $scope.getGroupLogs(id);
          }
        })
        .then(function (suc) {

        }, function () {

        });
      //load dialog then draw graph..

    };

    getGroups();


    $scope.toastPosition = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };
    $scope.closeToast = function () {
      $mdToast.hide();
    };

    $scope.showSimpleToast = function () {
      $mdToast.show({
        controller: ToastCtrl,
        // $mdToast.simple()
        // .content('Simple Toast!')
        templateUrl: 'app/toast/success.html',
        // .position($scope.getToastPosition())
        hideDelay: 2000,
        position: 'top right fit'
      });
    };


  }

  function DialogController($scope, $mdDialog, Group) {

    //closes the modal and resolves the promise
    $scope.hide = function () {
      $mdDialog.hide();
    };

    //closes dialog and rejects promise
    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    $scope.resolveDialog = function (answer) {
      $mdDialog.hide(answer);
    };

    $scope.CreateGroup = function (name, description, unit) {
      var group = {
        name: name,
        description: description,
        unit: unit
      };
      $mdDialog.hide(group);
    };

    $scope.editGroup = function (id, groupName, groupDescription, groupUnit) {
      Group.prototype$updateAttributes({
        id: id,
        name: groupName,
        description: groupDescription,
        unit: groupUnit
      }).$promise.then(function (suc) {
        console.log('edited group', suc);
        // getGroups();
        $mdDialog.hide();
      });
      // var group = {
      //   id: id,
      //   groupName: groupName,
      //   groupDescription: groupDescription,
      //   groupUnit: groupUnit
      // };
      // $mdDialog.hide(group);
    };

    $scope.deleteGroup = function (id) {
      Group.deleteById({
        id: id
      }).$promise.then(function (suc) {
        console.log('deleted group', suc);
        // getGroups();
        $mdDialog.hide();
      });
      // $mdDialog.hide(id);
    };


  }

  function ToastCtrl($scope, $mdToast) {
    $scope.closeToast = function () {
      $mdToast.hide();
    };
  }

})();
