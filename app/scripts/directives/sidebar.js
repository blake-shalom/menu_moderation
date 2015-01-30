'use strict';

/**
 * @ngdoc directive
 * @name recommenuCmsApp.directive:sidebar
 * @description
 * # sidebar
 */
angular.module('recommenuCmsApp')
   .controller('sidebarCtrl', function ($scope, $location, $cookies, menu, section, entry) {
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
      $scope.count = 0;
      
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
         $cookies.activeSection = newSection;
         if (newSection.entries.route === undefined){
            newSection.entries = entry.restangularizeEntries(newSection.entries);
         }
         section.activeSection = newSection;
      };
      $scope.editNewSection = function() {
         $location.path( '/sections/' );
         section.activeSection = null;         
      };
      $scope.sectionArranged = function() {
         var hasChanged = false;
         for (var i = $scope.menus[0].sections.length - 1; i >= 0; i--) {
            if ($scope.menus[0].sections[i].order !== i + 1){
               hasChanged = true;
            }
         }
         $scope.hasChanged = hasChanged;
      };
      $scope.saveOrderedChanges = function() {
         for (var i = $scope.menus[0].sections.length - 1; i >= 0; i--) {
            $scope.menus[0].sections[i].order = i+1;
         }
         section.saveAllSections($scope.menus[0].sections).then(
            function () {
               console.log('success!!!');
            },
            function (err){
               console.log(err);
            });
      };
   })
   .directive('sidebar', function () {
      return {
         templateUrl: 'views/sidebar.html',
         restrict: 'E'
      };
   });
