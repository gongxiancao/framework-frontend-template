'use strict';

angular.module('framework.main')
.config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/main.tpl.html',
      controller: 'MainCtrl',
      data: {auth: true}
    })
  ;
});