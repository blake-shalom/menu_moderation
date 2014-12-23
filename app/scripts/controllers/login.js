'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('LoginCtrl', function ($scope, $location, auth, client, menu, section) {
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
               $scope.user = '';
               $scope.pw = ''; 
               console.log(res);
            }
            );
         }
         else{
            $scope.logging = 'Please Enter a User Name and Password';
         }
      };
      $scope.selectClient = function() {
         if ($scope.myCompany !== null) {
            client.selectCompany($scope.myCompany).then(
               function(data){
                  // COMMENTED OUT FOR TESTING!!!!
                  menu.menus = data;
                  menu.loadedMenu = true;
                  if (menu.menus.length === 0) {
                     $location.path( '/menus/' );
                  }
                  else {
                     menu.activeMenu = data[0];
                     section.activeSection = ((menu.activeMenu.sections.length > 0) ? menu.activeMenu.sections[0] : null);
                     $location.path( '/entries/' );
                  }
               },
                function(err){
                  console.log('ERROR');
                  console.log(err);
                });
            auth.hasSelectedClient = true;
            $scope.selectLog = 'Loading...';
         }
         else {
            $scope.selectLog = 'Please select a client!';
         }
      };

   });
