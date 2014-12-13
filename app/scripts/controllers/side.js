'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:SideCtrl
 * @description
 * # SideCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('SideCtrl', function ($scope, client) {
      $scope.$watch(function() {
         return client.selectedClient;
      }, function(newValue) {
         $scope.selectedClient = newValue;
      });
      $scope.menus = [{name: 'lunch', sections:['apps', 'sandwiches', 'desserts']}, {name: 'dinner', sections:['food']}];
  });
