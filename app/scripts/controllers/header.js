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
         menu.loadedMenu = false;
         $cookies.isNotFirstTime = true;
         $cookies.token = null;
         $location.path( '/login' );
      };
      $scope.changeCompany = function () {
         client.selectedClient = null;
         menu.loadedMenu = false;
         $location.path( '/login' );
      };
      $scope.createUser = function () {
         $location.path( '/user' );
      };
   });
