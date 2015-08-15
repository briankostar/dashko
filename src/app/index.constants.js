/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('dashKo')
    .constant('malarkey', malarkey)
    .constant('toastr', toastr)
    .constant('moment', moment);

  console.log('constant malarkey', malarkey) //malarkey.min.js
  console.log('constant toastr', toastr)
  console.log('constant moment', moment)
})();
