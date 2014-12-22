'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:SideCtrl
 * @description
 * # SideCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('SideCtrl', function ($scope, $location, menu, section) {
      $scope.$watch(function() {
         return menu.loadedMenu;
      }, function(newValue) {
         $scope.menus = menu.menus;
         $scope.loadedMenu = newValue;
      });
      $scope.$watch(function() {
         return section.creatingSection;
      }, function(newValue) {
         $scope.isCreatingSection = newValue;
      });
      $scope.menus = [];
      $scope.loadedMenu = menu.loadedMenu;
      $scope.addMenu = function() {
         menu.isAddingMenu= true; 
      };
      $scope.addSection = function() {
         $location.path( '/sections/' );
         section.creatingSection = true;
      };
   });
