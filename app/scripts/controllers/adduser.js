'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AdduserCtrl
 * @description
 * # AdduserCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AdduserCtrl', function ($scope, user) {
      $scope.createUser = function () {
         if (!$scope.fName || !$scope.lName || !$scope.email || !$scope.isMale || !$scope.password || !$scope.username) {
            window.alert('FILL OUT ALL FORMS');
         }
         else {
            if ($scope.password !== $scope.matchPassword){
               window.alert('Passwords do not match!');
            }
            else {
               user.createUser({
                  username: $scope.username,
                  email: $scope.email,
                  first_name: $scope.fName,
                  last_name: $scope.lName,
                  password: $scope.password
               }).then(
               function (data) {
                  console.log(data);
               },
               function (err) {
                  console.log(err);
               });
            }
         }
      };
   });