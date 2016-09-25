'use strict';

angular.module('framework.main')
  .controller('MainCtrl', function ($scope, $state, $uibModal, Auth) {
    $scope.load = function () {
      var user = Auth.getCurrentUser();
      $scope.user = user;
    };

    $scope.load();

    $scope.logout = function () {
      Auth.logout();
      $state.go('login');
    };
  });
