angular.module('dashKo', ['ngResource', 'lbServices', 'ui.router'])

.config(function (LoopBackResourceProvider) {
  LoopBackResourceProvider.setUrlBase('https://localhost:3000/api/v1');
})


