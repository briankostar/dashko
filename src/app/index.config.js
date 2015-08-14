(function() {
  'use strict';

  angular
    .module('dashKo')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastr, LoopBackResourceProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastr.options.timeOut = 3000;
    toastr.options.positionClass = 'toast-top-right';
    toastr.options.preventDuplicates = true;
    toastr.options.progressBar = true;

    //LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
    LoopBackResourceProvider.setUrlBase('http://dashko.herokuapp.com/api');
  }

})();
