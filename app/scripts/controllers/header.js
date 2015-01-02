'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('HeaderCtrl', function ($scope, $location, $cookies, auth, client, menu) {
    $scope.$watch(function() {
      return auth.isLogged;
    }, function(newValue) {
      $scope.needsLogout = newValue;
    });
   $scope.logout = function(){
      auth.isLogged = false;
      client.selectedClient = null;
      $location.path( '/login' );
      menu.loadedMenu = false;
      $cookies.isNotFirstTime = true;
   };
   });
