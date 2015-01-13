'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddcompanyCtrl
 * @description
 * # AddcompanyCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AddcompanyCtrl', function ($scope, $location, client, menu) {
      $scope.createCompany = function() {
         if (!$scope.url || !$scope.name || !$scope.contact || !$scope.address || !$scope.zip || !$scope.city) {
            window.alert('FILL OUT ALL FORMS');
         }
         else {
            client.createCompany({
               name: $scope.name,
               website: $scope.url,
               city: $scope.city,
               contact_name: $scope.contact,
               zip_code: $scope.zip,
               address1: $scope.address
            }).then(
            function (data){
               client.clients.push(data);
               client.selectCompany(data).then(
                  function (data) {
                     console.log(data);
                     menu.menus = data;
                     menu.loadedMenu = true;
                     $location.path('/user/');
                  }, 
                  function (err) {
                     console.log(err);
                     window.alert('Server ERROR!');
                  });
            },
            function (err){
               console.log(err);
               window.alert('Server ERROR!');
            });
         }
      };
   });
