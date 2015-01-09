'use strict';

/**
 * @ngdoc function
 * @name recommenuCmsApp.controller:AddmenuCtrl
 * @description
 * # AddmenuCtrl
 * Controller of the recommenuCmsApp
 */
angular.module('recommenuCmsApp')
   .controller('AddmenuCtrl', function ($scope, $location, menu, client, section) {
      $scope.$watch(function() {
         return menu.isAddingMenu;
      }, function(newValue) {
         $scope.addStarted = newValue;
      });
      $scope.title = '';
      $scope.description = '';
      $scope.footer = ''; 
      $scope.createMenu = function() {
         if ($scope.title === ''){
            window.alert('ENTER A TITLE');
         }
         else {
            menu.createMenu({
            name: $scope.title,
            company: client.selectedClient.url,
            description: $scope.description,
            sections: []
         }).then (
               function(data){
                  menu.menus.push(data);
                  menu.loadedMenu = true; 
                  menu.activeMenu = data;
                  section.creatingSection = true;
                  $location.path( '/sections/' );
               },
               function(err){
                  console.log(err);
                  window.alert('Server ERROR!');
               });
         }
      };
  });
