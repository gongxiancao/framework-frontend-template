'use strict';

angular.module('framework.account')
.controller('SignupCtrl', function ($scope, Auth) {
  $scope.user = {};

  $scope.signup = function (/*form*/) {
    Auth.createUser($scope.user);
  };
});
