'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
  .controller('LoginCtrl', function ($scope, $state, auth) {
    $scope.user = '';
    $scope.pw = ''; 
    $scope.logging = '';
    console.log('AM I HERE???');
    $scope.signIn = function(username, password) {
        // Check for missing credentials
        if (username !== undefined && password !== undefined) {
            $scope.loging = 'Connecting...';
            auth.logIn(username, password).then(
                function(data){
                    auth.isLogged = true;
                    console.log(data);
                    //$state.go('dashboard');
                },
                function(res){
                    $scope.logging = 'Denied';
                    console.log(res);
                }
            );
            
        }
        else{
            $scope.logging = 'Please Enter a User Name and Password';
        }
    };
  });
