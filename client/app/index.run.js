(function() {
  'use strict';

  angular
    .module('dashKo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
