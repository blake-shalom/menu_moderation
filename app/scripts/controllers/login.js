'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('LoginCtrl', function ($scope, $location, auth, client) {
      $scope.user = '';
      $scope.pw = ''; 
      $scope.logging = '';
      $scope.myCompany = null;
      $scope.$watch(function() {
         return auth.isLogged;
      }, function(newValue) {
         $scope.isLogged = newValue;
       });
      $scope.$watch(function() {
         return client.clients;
      }, function(newValue) {
         $scope.companies = newValue;
      });      
      $scope.signIn = function(username, password) {
         // Check for missing credentials
         if (username !== undefined && password !== undefined) {
            $scope.logging = 'Connecting...';
            auth.login(username, password).then(
               function(data){
                  auth.registerToken(data.token);
                  client.getCompanies().then(
                     function(data){
                        auth.isLogged = true;
                        client.clients = data;
                        $scope.user = '';
                        $scope.pw = ''; 
                        $scope.logging = '';
                     },
                     function(err){
                        console.log(err);
                     });
             },
            function(res){
               $scope.logging = 'Denied, Try Again';
               console.log(res);
               $scope.user = '';
               $scope.pw = ''; 
            }
            );
         }
         else{
            $scope.logging = 'Please Enter a User Name and Password';
         }
      };
      $scope.selectClient = function() {
         if ($scope.myCompany !== null) {
            client.selectedClient = $scope.myCompany;
            auth.hasSelectedClient = true;
            $scope.selectLog = 'Loading...';
            $location.path( '/about/' );
         }
         else {
            $scope.selectLog = 'Please select a client!';
         }
      };

   });
