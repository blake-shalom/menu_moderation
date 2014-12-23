'use strict';

/**
 * @ngdoc directive
 * @name recommenuCmsApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('recommenuCmsApp')
  .controller('sidebarCtrl', function ($scope, $location, menu, section) {
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
         section.activeSection = null;
      };
      $scope.loadActiveSection = function(newSection) {
         $location.path( '/entries/' );
         section.activeSection = newSection;
      };
      $scope.editNewSection = function() {
         $location.path( '/sections/' );
         section.activeSection = null;         
      };
   })
  .directive('sidebar', function () {
    return {
      templateUrl: 'views/sidebar.html',
      restrict: 'E'
    };
  });
