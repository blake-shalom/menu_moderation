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
      }, function (newValue) {
         $scope.needsLogout = newValue;
      });
      $scope.$watch(function(){
         return client.selectedClient;
      }, function (newValue) {
         if (newValue) {
            $scope.hasSelectedClient = true;
         }
         else {
            $scope.hasSelectedClient = false;
         }
      });
      $scope.editCompany = function() {
         $location.path( '/company/' );
      };
      $scope.logout = function(){
         auth.isLogged = false;
         menu.loadedMenu = false;
         $cookies.isNotFirstTime = true;
         $cookies.token = null;
         $location.path( '/login/' );
      };
      $scope.changeCompany = function () {
         $cookies.selectedClient = null;
         client.selectedClient = null;
         menu.loadedMenu = false;
         $location.path( '/login/' );
      };
      $scope.createUser = function () {
         $location.path( '/user/' );
      };
   });
