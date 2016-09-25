'use strict';

angular.module('framework.home')
.config(function ($stateProvider) {
  $stateProvider
    .state('main.home', {
      url: 'home',
      templateUrl: 'app/home/home.tpl.html',
      controller: 'HomeCtrl'
    });
});
