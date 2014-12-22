'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddsectionCtrl
 * @description
 * # AddsectionCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AddsectionCtrl', function ($scope) {
      $scope.hasExtraPricing = 'No';
      $scope.extraPricing = [{price: '', description:''}];
      $scope.addExtraPricing = function() {
         $scope.extraPricing.push({price:'', description:''});
      };
   });
