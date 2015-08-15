(function() {
  'use strict';

  angular
    .module('dashKo')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(Group) {
    console.log('home ctrl activate!')

    Group.find().$promise.then(function(suc) {
      console.log('got groups', suc)
      this.group = suc;
    });

  }
})();
