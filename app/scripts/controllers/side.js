'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:SideCtrl
 * @description
 * # SideCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('SideCtrl', function ($scope, menu) {
      $scope.$watch(function() {
         return menu.menus;
      }, function(newValue) {
         $scope.menus = newValue;
         $scope.loadedMenu = menu.loadedMenu;
         console.log($scope.loadedMenu);
      });
      $scope.menus = [];
      $scope.loadedMenu = false;
  });
