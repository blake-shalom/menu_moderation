'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddcompanyCtrl
 * @description
 * # AddcompanyCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AddcompanyCtrl', function ($scope, $location, $cookies, client, menu, auth) {
      if ($cookies.token && $cookies.token !== 'null') {
         auth.registerToken($cookies.token);
         client.getCompanies().then(
            function(data){
               auth.isLogged = true;
               client.clients = data;
               auth.isNotFirstTime = $cookies.isNotFirstTime || false;
            },
            function(err){
               console.log(err);
               window.alert('Server ERROR!');
            });
      }
      $scope.$watch(function() {
         return client.selectedClient;
      }, function (newValue) {
         $scope.company = newValue === null ? {} : newValue;
         $scope.isNewCompany = (newValue === null);
      });
      $scope.createCompany = function() {
         if (!$scope.company.website || !$scope.company.name || !$scope.company.contact_name || !$scope.company.address1 || !$scope.company.zip_code || !$scope.company.city || !$scope.company.menu_url) {
            window.alert('FILL OUT ALL FORMS');
         }
         else {
            client.createCompany($scope.company).then(
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
      $scope.updateCompany = function () {
         if (!$scope.company.name || !$scope.company.contact_name || !$scope.company.address1 || !$scope.company.zip_code || !$scope.company.city) {
            window.alert('FILL OUT ALL FORMS');
         }
         else {
            client.putCompany($scope.company).then(
               function (data){
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
               function (err) {
                  console.log(err);
                  window.alert('Server ERROR!');
               });
         }
      };
      $scope.encode = {
         encodeImage: function ($file, company) {
            var reader = new FileReader();
            reader.readAsDataURL($file.file);
            reader.onloadend = function () {
               console.log(reader.result);
               var baseEncoded = reader.result.slice(reader.result.indexOf(',') + 1);
               // var baseEncoded = reader.result;
               company.logo = baseEncoded;
               console.log(company.logo);
               console.log(company.logo.charAt(0));
            };
         },
         errorUploading: function ($file, $message) {
            console.log($file, $message);
         }
      };

   });
