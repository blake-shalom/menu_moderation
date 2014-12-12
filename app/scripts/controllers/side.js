'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:SideCtrl
 * @description
 * # SideCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('SideCtrl', function ($scope) {
    $scope.menus = [{name: 'lunch', sections:['apps', 'sandwiches', 'desserts']}, {name: 'dinner', sections:['food']}];
  });
