'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddmenuCtrl
 * @description
 * # AddmenuCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AddmenuCtrl', function ($scope) {
      $scope.addStarted = false;
      $scope.title = '';
      $scope.description = '';
  });
