'use strict';

angular.module('framework.account')
.config(function ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/account/login/login.tpl.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/account/signup/signup.tpl.html',
      controller: 'SignupCtrl'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'app/account/settings/settings.tpl.html',
      controller: 'SettingsCtrl',
      data: {
        auth: true
      }
    })
  ;
});