'use strict';

angular.module('framework.account')
.controller('LoginCtrl', function ($scope, $state, Auth) {
  $scope.login = function (/*form*/) {
    Auth.login($scope.user)
      .then(function () {
        $state.go('main.home');
      });
  };
});
