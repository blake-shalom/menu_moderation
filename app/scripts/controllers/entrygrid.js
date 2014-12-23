'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:EntrygridCtrl
 * @description
 * # EntrygridCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('EntrygridCtrl', function ($scope, section) {
      $scope.$watch(function() {
         return section.activeSection;
      }, function(newValue) {
         if (newValue !== null) {
            $scope.entries = newValue.entries;
         }
      });

   });
